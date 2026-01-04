import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Plane, 
  Wrench, 
  PauseCircle, 
  TrendingUp,
  ArrowLeft,
  Calendar
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  // Mock data
  const totalOrders = 1247;
  
  const droneStatusData = [
    { name: "Running", value: 35, color: "hsl(142, 76%, 36%)" },
    { name: "Standby", value: 22, color: "hsl(185, 100%, 50%)" },
    { name: "In Repair", value: 8, color: "hsl(0, 84%, 60%)" },
  ];

  const weeklyData = [
    { name: "Mon", orders: 45 },
    { name: "Tue", orders: 62 },
    { name: "Wed", orders: 58 },
    { name: "Thu", orders: 71 },
    { name: "Fri", orders: 89 },
    { name: "Sat", orders: 95 },
    { name: "Sun", orders: 67 },
  ];

  const totalDrones = droneStatusData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="min-h-screen bg-background p-6">
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
              <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Admin</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Orders</p>
              <p className="text-3xl font-bold font-display text-foreground mt-1">{totalOrders.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-success">+12.5%</span>
            <span className="text-muted-foreground">from last month</span>
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
              <p className="text-muted-foreground text-sm">Active Drones</p>
              <p className="text-3xl font-bold font-display text-success mt-1">35</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Plane className="h-6 w-6 text-success" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-4">Currently in operation</p>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Standby</p>
              <p className="text-3xl font-bold font-display text-primary mt-1">22</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <PauseCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-4">Ready for deployment</p>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">In Repair</p>
              <p className="text-3xl font-bold font-display text-destructive mt-1">8</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-4">Under maintenance</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drone Status Pie Chart */}
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Drone Fleet Status</h2>
            <span className="text-muted-foreground text-sm">{totalDrones} Total Drones</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={droneStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {droneStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {droneStatusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Orders Bar Chart */}
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Weekly Orders</h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              This Week
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Bar 
                  dataKey="orders" 
                  fill="hsl(185, 100%, 50%)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
