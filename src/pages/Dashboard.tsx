import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Package, 
  Plane, 
  MapPin,
  Clock, 
  CheckCircle2,
  ArrowLeft,
  Truck
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  bookingId: string;
  droneType: string;
  sender: {
    fullName: string;
    location: string;
  };
  receiver: {
    fullName: string;
    location: string;
  };
  status: "pending" | "in-transit" | "delivered";
  createdAt: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, fetch orders from Supabase
    // For now, retrieve from localStorage (orders saved during booking)
    const savedOrders = localStorage.getItem(`orders_${user?.email}`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setLoading(false);
  }, [user?.email]);

  useEffect(() => {
    // Auto-mark orders as delivered after 1 minute
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.status !== "delivered") {
            const createdTime = new Date(order.createdAt).getTime();
            const currentTime = new Date().getTime();
            const diffInMinutes = (currentTime - createdTime) / (1000 * 60);
            
            if (diffInMinutes >= 1) {
              return { ...order, status: "delivered" };
            }
          }
          return order;
        })
      );
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "in-transit":
        return "bg-blue-500/10 text-blue-500";
      case "delivered":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in-transit":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isLoggedIn={true} />
      <main className="flex-1 pt-20 p-6">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">My Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user?.email}</p>
            </div>
          </div>
          <Link to="/book">
            <Button variant="hero" size="lg">
              <Plane className="h-5 w-5 mr-2" />
              Book a Drone
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Orders</p>
              <p className="text-3xl font-bold font-display text-foreground mt-1">{orders.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">In Transit</p>
              <p className="text-3xl font-bold font-display text-blue-500 mt-1">
                {orders.filter(o => o.status === "in-transit").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Delivered</p>
              <p className="text-3xl font-bold font-display text-green-500 mt-1">
                {orders.filter(o => o.status === "delivered").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Orders List */}
      <motion.div
        className="chart-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Your Bookings</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">No orders yet. Book your first drone delivery!</p>
            <Link to="/book">
              <Button variant="hero">
                <Plane className="h-4 w-4 mr-2" />
                Book a Drone
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                className="border border-border rounded-lg p-4 hover:bg-card/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-foreground">Booking #{order.bookingId}</p>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Drone Type: {order.droneType}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">From</p>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{order.sender.fullName}</p>
                            <p className="text-xs text-muted-foreground">{order.sender.location}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">To</p>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{order.receiver.fullName}</p>
                            <p className="text-xs text-muted-foreground">{order.receiver.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3">
                      Booked: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <Link to="/tracking" state={order}>
                    <Button variant="outline" size="sm">Track Order</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
