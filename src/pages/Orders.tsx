
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  FileText, 
  Eye, 
  ShoppingCart, 
  TrendingUp, 
  ArrowUpDown, 
  Package
} from "lucide-react";

// Mock data for orders
const orders = [
  {
    id: "ORD-2023-8764",
    date: "Apr 5, 2025",
    supplier: "MedSupply Co.",
    total: "$1,245.89",
    status: "Delivered",
    items: 12,
    tracking: "1Z999AA10123456784"
  },
  {
    id: "ORD-2023-8749",
    date: "Apr 3, 2025",
    supplier: "PharmaDirect",
    total: "$856.42",
    status: "Processing",
    items: 8,
    tracking: null
  },
  {
    id: "ORD-2023-8732",
    date: "Apr 1, 2025",
    supplier: "Healthcare Supplies",
    total: "$2,104.76",
    status: "Shipped",
    items: 15,
    tracking: "9400111202555842761493"
  },
  {
    id: "ORD-2023-8721",
    date: "Mar 29, 2025",
    supplier: "MedEquip Plus",
    total: "$4,589.32",
    status: "Delivered",
    items: 7,
    tracking: "1Z999AA10123456784"
  },
  {
    id: "ORD-2023-8710",
    date: "Mar 25, 2025",
    supplier: "VitalCare",
    total: "$398.75",
    status: "Delivered",
    items: 5,
    tracking: "9400111202555842761493"
  },
  {
    id: "ORD-2023-8699",
    date: "Mar 20, 2025",
    supplier: "MedSupply Co.",
    total: "$1,875.23",
    status: "Delivered",
    items: 18,
    tracking: "9400111202555842761493"
  },
  {
    id: "ORD-2023-8688",
    date: "Mar 15, 2025",
    supplier: "PharmaDirect",
    total: "$754.30",
    status: "Cancelled",
    items: 6,
    tracking: null
  }
];

const recentlyViewedItems = [
  {
    id: 1,
    name: "Sterile Surgical Gloves (Box of 100)",
    image: "/placeholder.svg",
    price: "$49.99",
    supplier: "MedSupply Co."
  },
  {
    id: 2,
    name: "Digital Infrared Thermometer",
    image: "/placeholder.svg",
    price: "$89.99",
    supplier: "MedEquip Plus"
  },
  {
    id: 3,
    name: "Acetaminophen 500mg (Bottle of 100)",
    image: "/placeholder.svg",
    price: "$12.99",
    supplier: "PharmaDirect"
  },
  {
    id: 4,
    name: "Disposable Face Masks (Box of 50)",
    image: "/placeholder.svg",
    price: "$19.99",
    supplier: "Healthcare Supplies"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Shipped":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            View and manage your order history
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search orders..." 
              className="pl-8 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter by Status</SelectLabel>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowUpDown className="h-4 w-4" /> Sort
                </Button>
              </div>
              <CardDescription>
                View and manage your recent orders across all suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter(order => 
                        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>{order.items} items</TableCell>
                          <TableCell className="text-right">{order.total}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(order.status))}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/orders/${order.id.toLowerCase()}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View order</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/invoices/${order.id.toLowerCase()}`}>
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Invoice</span>
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              {orders.filter(order => 
                  order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders matching your search</p>
                </div>
              )}
              <div className="flex justify-center mt-4">
                <Button variant="outline">Load More</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Tracking</CardTitle>
                <CardDescription>
                  Track your shipments from all suppliers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders
                  .filter(order => order.status === "Shipped" && order.tracking)
                  .slice(0, 2)
                  .map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.supplier}
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("font-normal", getStatusColor(order.status))}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Tracking:</span> {order.tracking}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Package className="h-4 w-4" /> Track Package
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/orders/${order.id.toLowerCase()}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                {orders.filter(order => order.status === "Shipped" && order.tracking).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No active shipments to track</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recently Viewed Products</CardTitle>
                <CardDescription>
                  Products you've viewed recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {recentlyViewedItems.slice(0, 4).map((item) => (
                    <Link 
                      key={item.id} 
                      to={`/products/${item.id}`}
                      className="border rounded-lg overflow-hidden hover:border-medical-primary hover:shadow-sm transition-all flex flex-col"
                    >
                      <div className="h-20 bg-gray-100 flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="max-h-full max-w-full object-contain p-2"
                        />
                      </div>
                      <div className="p-2 flex-grow">
                        <p className="text-xs font-medium line-clamp-2">{item.name}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">{item.price}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ShoppingCart className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Statistics</CardTitle>
              <CardDescription>
                Overview of your ordering patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
                <div className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
                </div>
              </div>
              
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5 text-green-600"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="text-2xl font-bold">$12,874</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
                <div className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8% from last month
                </div>
              </div>
              
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <Package className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-2xl font-bold">147</div>
                <div className="text-sm text-muted-foreground">Items Ordered</div>
                <div className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +15% from last month
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>
                Orders that are currently being processed by suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter(order => order.status === "Processing")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>{order.items} items</TableCell>
                          <TableCell className="text-right">{order.total}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(order.status))}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/orders/${order.id.toLowerCase()}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View order</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/invoices/${order.id.toLowerCase()}`}>
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Invoice</span>
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              {orders.filter(order => order.status === "Processing").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders currently being processed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipped">
          <Card>
            <CardHeader>
              <CardTitle>Shipped Orders</CardTitle>
              <CardDescription>
                Orders that have been shipped and are in transit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter(order => order.status === "Shipped")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>
                            {order.tracking ? (
                              <div className="flex items-center gap-1">
                                <span className="text-xs">{order.tracking}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Package className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">No tracking available</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{order.total}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(order.status))}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/orders/${order.id.toLowerCase()}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View order</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/invoices/${order.id.toLowerCase()}`}>
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Invoice</span>
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              {orders.filter(order => order.status === "Shipped").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders currently being shipped</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivered">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>
                Orders that have been successfully delivered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter(order => order.status === "Delivered")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>{order.items} items</TableCell>
                          <TableCell className="text-right">{order.total}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(order.status))}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/orders/${order.id.toLowerCase()}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View order</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/invoices/${order.id.toLowerCase()}`}>
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Invoice</span>
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              {orders.filter(order => order.status === "Delivered").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No delivered orders</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
