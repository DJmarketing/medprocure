
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-2023-8764",
    date: "Apr 5, 2025",
    supplier: "MedSupply Co.",
    total: "$1,245.89",
    status: "Delivered",
    items: 12
  },
  {
    id: "ORD-2023-8749",
    date: "Apr 3, 2025",
    supplier: "PharmaDirect",
    total: "$856.42",
    status: "Processing",
    items: 8
  },
  {
    id: "ORD-2023-8732",
    date: "Apr 1, 2025",
    supplier: "Healthcare Supplies",
    total: "$2,104.76",
    status: "Shipped",
    items: 15
  },
  {
    id: "ORD-2023-8721",
    date: "Mar 29, 2025",
    supplier: "MedEquip Plus",
    total: "$4,589.32",
    status: "Delivered",
    items: 7
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

const RecentOrdersTable = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.supplier}</TableCell>
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
  );
};

export default RecentOrdersTable;
