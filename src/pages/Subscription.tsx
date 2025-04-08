
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  CreditCard,
  Package,
  PackageCheck,
  Info
} from "lucide-react";

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState("professional");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your MedProcure subscription
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Your current subscription plan and details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-medical-light border border-medical-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-medical-dark">Professional Plan</h3>
                  <p className="text-sm text-medical-secondary">$30.00 / month</p>
                </div>
                <Badge className="bg-medical-primary text-white">Current Plan</Badge>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-medical-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Full Platform Access</h4>
                    <p className="text-sm text-muted-foreground">Access to all suppliers and products</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-medical-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Price Comparison</h4>
                    <p className="text-sm text-muted-foreground">Compare prices across all suppliers</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-medical-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Order Management</h4>
                    <p className="text-sm text-muted-foreground">Full order history and tracking</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-medical-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Team Access</h4>
                    <p className="text-sm text-muted-foreground">Up to 5 team members</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Your subscription renews on May 7, 2025</p>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-600 hover:bg-red-50">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Compare and choose a plan that fits your needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                currentPlan === "basic" 
                  ? "border-medical-primary bg-medical-light/50" 
                  : "border-gray-200 hover:border-medical-primary/50 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPlan("basic")}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">Basic Plan</h3>
                  <p className="text-sm text-muted-foreground">$10.00 / month</p>
                </div>
                {currentPlan === "basic" && (
                  <Badge variant="outline" className="border-medical-primary text-medical-primary">
                    Selected
                  </Badge>
                )}
              </div>
              <ul className="text-sm mt-2 space-y-1">
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Limited product catalog</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Basic order management</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>1 team member</span>
                </li>
              </ul>
            </div>
            
            <div 
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                currentPlan === "professional" 
                  ? "border-medical-primary bg-medical-light/50" 
                  : "border-gray-200 hover:border-medical-primary/50 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPlan("professional")}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">Professional Plan</h3>
                  <p className="text-sm text-muted-foreground">$30.00 / month</p>
                </div>
                {currentPlan === "professional" && (
                  <Badge variant="outline" className="border-medical-primary text-medical-primary">
                    Selected
                  </Badge>
                )}
              </div>
              <ul className="text-sm mt-2 space-y-1">
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Full product catalog</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Advanced order management</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Up to 5 team members</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Price comparison</span>
                </li>
              </ul>
            </div>
            
            <div 
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                currentPlan === "enterprise" 
                  ? "border-medical-primary bg-medical-light/50" 
                  : "border-gray-200 hover:border-medical-primary/50 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPlan("enterprise")}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">Enterprise Plan</h3>
                  <p className="text-sm text-muted-foreground">Contact sales</p>
                </div>
                {currentPlan === "enterprise" && (
                  <Badge variant="outline" className="border-medical-primary text-medical-primary">
                    Selected
                  </Badge>
                )}
              </div>
              <ul className="text-sm mt-2 space-y-1">
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Unlimited access</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-medical-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={currentPlan === "professional"}>
              {currentPlan === "professional" ? "Current Plan" : "Switch Plan"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View your recent payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Professional Plan - Monthly</div>
                  <div className="text-sm text-muted-foreground">Apr 7, 2025</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$30.00</div>
                  <div className="text-sm text-green-600">Paid</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Professional Plan - Monthly</div>
                  <div className="text-sm text-muted-foreground">Mar 7, 2025</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$30.00</div>
                  <div className="text-sm text-green-600">Paid</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Professional Plan - Monthly</div>
                  <div className="text-sm text-muted-foreground">Feb 7, 2025</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$30.00</div>
                  <div className="text-sm text-green-600">Paid</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
