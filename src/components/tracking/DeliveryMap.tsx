/// <reference types="@types/google.maps" />
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface DeliveryMapProps {
  senderLocation: string;
  receiverLocation: string;
}

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

const DeliveryMap = ({ senderLocation, receiverLocation }: DeliveryMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Fetch API key from edge function
        const { data, error: fetchError } = await supabase.functions.invoke("get-maps-key");
        
        if (fetchError || !data?.apiKey) {
          setError("Failed to load map configuration");
          setLoading(false);
          return;
        }

        // Check if Google Maps is already loaded
        if (window.google?.maps) {
          initializeMap();
          return;
        }

        // Load Google Maps script
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeMap();
        script.onerror = () => {
          setError("Failed to load Google Maps");
          setLoading(false);
        };
        document.head.appendChild(script);
      } catch (err) {
        console.error("Error loading Google Maps:", err);
        setError("Failed to load map");
        setLoading(false);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      // Initialize map centered on India
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 12.9716, lng: 77.5946 }, // Bangalore default
        styles: [
          { elementType: "geometry", stylers: [{ color: "#0a1628" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0a1628" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#00d4ff" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#00d4ff" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#5bc4c4" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#0f2847" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#1a3a5c" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#0d2644" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#1f4068" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#0f2847" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#0f2847" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#041225" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#00d4ff" }],
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      // Initialize DirectionsRenderer with custom styling
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true, // We'll add custom markers
        polylineOptions: {
          strokeColor: "#00d4ff",
          strokeWeight: 4,
          strokeOpacity: 0.8,
        },
      });

      directionsRendererRef.current = directionsRenderer;

      // Calculate and display route
      calculateRoute(map);
    };

    const calculateRoute = (map: google.maps.Map) => {
      const directionsService = new window.google.maps.DirectionsService();
      const geocoder = new window.google.maps.Geocoder();

      // Geocode both locations
      Promise.all([
        geocodeAddress(geocoder, senderLocation),
        geocodeAddress(geocoder, receiverLocation),
      ])
        .then(([senderCoords, receiverCoords]) => {
          // Add custom markers
          new window.google.maps.Marker({
            position: senderCoords,
            map,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: "#22c55e",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 3,
            },
            title: "Pickup Location",
          });

          new window.google.maps.Marker({
            position: receiverCoords,
            map,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: "#ef4444",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 3,
            },
            title: "Drop-off Location",
          });

          // Get directions
          directionsService.route(
            {
              origin: senderCoords,
              destination: receiverCoords,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK" && result && directionsRendererRef.current) {
                directionsRendererRef.current.setDirections(result);
                
                // Add drone marker at midpoint (simulating drone position)
                const route = result.routes[0];
                if (route?.overview_path) {
                  const midpoint = route.overview_path[Math.floor(route.overview_path.length / 2)];
                  
                  new window.google.maps.Marker({
                    position: midpoint,
                    map,
                    icon: {
                      url: "/drone-marker.png",
                      scaledSize: new window.google.maps.Size(40, 40),
                    },
                    title: "Drone Position",
                  });
                }
              }
              setLoading(false);
            }
          );
        })
        .catch((err) => {
          console.error("Geocoding error:", err);
          setError("Could not find one or more addresses");
          setLoading(false);
        });
    };

    const geocodeAddress = (
      geocoder: google.maps.Geocoder,
      address: string
    ): Promise<google.maps.LatLngLiteral> => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            const location = results[0].geometry.location;
            resolve({ lat: location.lat(), lng: location.lng() });
          } else {
            reject(new Error(`Geocoding failed for: ${address}`));
          }
        });
      });
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      mapInstanceRef.current = null;
      directionsRendererRef.current = null;
    };
  }, [senderLocation, receiverLocation]);

  if (error) {
    return (
      <div className="w-full h-[400px] rounded-xl bg-card/50 flex items-center justify-center border border-border">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-primary/30">
      {loading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default DeliveryMap;
