
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, BarList, DonutChart } from "@tremor/react";
import ProductCategoryCard from "@/components/dashboard/ProductCategoryCard";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import { Search, ArrowRight, Pill, ShoppingCart, HeartPulse, TrendingUp, Users, Filter } from "lucide-react";

// Mock data
const productCategories = [
  { id: 1, name: "Pharmaceuticals", count: 2145, icon: Pill },
  { id: 2, name: "Medical Supplies", count: 1879, icon: HeartPulse },
  { id: 3, name: "Equipment", count: 943, icon: TrendingUp },
  { id: 4, name: "PPE", count: 742, icon: Users },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your medical procurement platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Link to="/products">
            <Button size="sm" className="gap-1">
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">348</div>
                <p className="text-xs text-muted-foreground">
                  +12.3% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$56,489.32</div>
                <p className="text-xs text-muted-foreground">
                  +7.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  +1 new supplier this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,942.18</div>
                <p className="text-xs text-muted-foreground">
                  Through price comparison
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>
                  Browse products by category
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {productCategories.map((category) => (
                  <ProductCategoryCard key={category.id} category={category} />
                ))}
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your recent procurement activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrdersTable />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>You May Need to Reorder</CardTitle>
              <CardDescription>
                Based on your order history and current inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Pill className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {["Acetaminophen 500mg", "Surgical Gloves", "IV Solution", "Bandages"][item - 1]}
                    </h4>
                    <p className="text-xs text-muted-foreground">Last ordered: 30 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Procurement Analytics</CardTitle>
              <CardDescription>
                Your spending and ordering patterns across suppliers and categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <p className="text-center text-muted-foreground pt-16">
                Advanced analytics dashboard would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Procurement Reports</CardTitle>
              <CardDescription>
                Generate and download detailed procurement reports
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <p className="text-center text-muted-foreground pt-16">
                Report generation interface would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications & Alerts</CardTitle>
              <CardDescription>
                Important updates about your orders and inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <p className="text-center text-muted-foreground pt-16">
                Notification center would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
