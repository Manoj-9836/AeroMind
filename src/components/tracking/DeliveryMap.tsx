/// <reference types="@types/google.maps" />
import { useEffect, useRef, useState } from "react";
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
  const mapInstanceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);

  // Map and Google Maps logic commented out. Using static image from public folder instead.
  useEffect(() => {
    setLoading(false);
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
      <div className="w-full h-full flex items-center justify-center bg-background">
        <img
          src="/maps.jpg"
          alt="Delivery"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default DeliveryMap;
