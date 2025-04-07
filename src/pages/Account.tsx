import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Bell, 
  Users, 
  Settings, 
  ShieldCheck, 
  Building, 
  Mail, 
  Phone,
  CreditCard as CreditCardIcon
} from "lucide-react";

const Account = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-5 h-auto">
          <TabsTrigger value="profile" className="text-xs md:text-sm py-2">
            Profile
          </TabsTrigger>
          <TabsTrigger value="organization" className="text-xs md:text-sm py-2">
            Organization
          </TabsTrigger>
          <TabsTrigger value="subscription" className="text-xs md:text-sm py-2">
            Subscription
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-xs md:text-sm py-2">
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm py-2">
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xl">JS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a new profile picture or remove the current one
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Upload New
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="Dr. Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" defaultValue="jane.smith@healthcare.org" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional title</Label>
                  <Input id="title" defaultValue="Chief Medical Officer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Medical license #</Label>
                  <Input id="license" defaultValue="ML-12345678" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Two-factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Text Message Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Receive a code via SMS to verify your identity
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Authenticator App</div>
                    <div className="text-sm text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Manage your healthcare facility information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization name</Label>
                  <Input id="orgName" defaultValue="City Medical Center" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgType">Organization type</Label>
                  <Input id="orgType" defaultValue="Hospital" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="orgAddress">Address</Label>
                  <Input id="orgAddress" defaultValue="123 Medical Plaza Dr." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgCity">City</Label>
                  <Input id="orgCity" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgState">State</Label>
                  <Input id="orgState" defaultValue="California" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgZip">ZIP code</Label>
                  <Input id="orgZip" defaultValue="94110" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgCountry">Country</Label>
                  <Input id="orgCountry" defaultValue="United States" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="orgTaxId">Tax ID / EIN</Label>
                  <Input id="orgTaxId" defaultValue="XX-XXXXXXX" />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Organization Contacts</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Billing Email</div>
                      <div className="text-sm text-muted-foreground">billing@citymedical.org</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Main Phone</div>
                      <div className="text-sm text-muted-foreground">(555) 987-6543</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Organization Details</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Dr. Jane Smith</div>
                      <div className="text-sm text-muted-foreground">jane.smith@healthcare.org</div>
                    </div>
                  </div>
                  <Badge>Admin</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Dr. John Doe</div>
                      <div className="text-sm text-muted-foreground">john.doe@healthcare.org</div>
                    </div>
                  </div>
                  <Badge variant="outline">Member</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Sarah Williams</div>
                      <div className="text-sm text-muted-foreground">sarah.w@healthcare.org</div>
                    </div>
                  </div>
                  <Badge variant="outline">Member</Badge>
                </div>
              </div>
              
              <Button className="mt-4" variant="outline">
                <Users className="h-4 w-4 mr-2" /> Invite Team Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your VitaMarket Connect subscription
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
              
              <div className="space-y-2 mt-6">
                <h3 className="font-medium">Other Available Plans</h3>
                
                <Card className="cursor-pointer hover:border-medical-primary">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Enterprise Plan</h4>
                      <p className="text-sm text-muted-foreground">Custom pricing for larger organizations</p>
                      <ul className="text-sm mt-2">
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-medical-primary" />
                          <span>Unlimited team members</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-medical-primary" />
                          <span>Volume discounts</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-medical-primary" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                    </div>
                    <Button variant="outline">Contact Sales</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Subscription History</CardTitle>
              <CardDescription>
                View your subscription payment history
              </CardDescription>
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
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <CreditCardIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">Visa ending in 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 04/2026</div>
                  </div>
                </div>
                <Badge>Primary</Badge>
              </div>
              
              <Button className="w-full" variant="outline">
                <CreditCardIcon className="h-4 w-4 mr-2" /> Add Payment Method
              </Button>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Billing Address</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Name on card</Label>
                    <Input id="billingName" defaultValue="City Medical Center" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Billing email</Label>
                    <Input id="billingEmail" type="email" defaultValue="billing@citymedical.org" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input id="billingAddress" defaultValue="123 Medical Plaza Dr." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingCity">City</Label>
                    <Input id="billingCity" defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingState">State</Label>
                    <Input id="billingState" defaultValue="California" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingZip">ZIP code</Label>
                    <Input id="billingZip" defaultValue="94110" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingCountry">Country</Label>
                    <Input id="billingCountry" defaultValue="United States" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Billing Information</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View and download your billing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">INV-2025-0423</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Apr 7, 2025</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$30.00</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">Download</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">INV-2025-0323</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Mar 7, 2025</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$30.00</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">Download</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">INV-2025-0223</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Feb 7, 2025</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$30.00</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">Download</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when we contact you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Order Status Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Receive updates about your order status
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Price Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about price changes on your saved items
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">New Products</div>
                      <div className="text-sm text-muted-foreground">
                        Be the first to know about new products from your preferred suppliers
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Special Offers</div>
                      <div className="text-sm text-muted-foreground">
                        Receive promotional offers and discounts
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">SMS Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Order Confirmations</div>
                      <div className="text-sm text-muted-foreground">
                        Receive SMS confirmations for new orders
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Shipping Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Get SMS notifications about shipping and delivery
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Low Stock Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Be notified when frequently ordered items are running low
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Reorder Reminders</div>
                      <div className="text-sm text-muted-foreground">
                        Get reminders to reorder regularly purchased items
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Team Activity</div>
                      <div className="text-sm text-muted-foreground">
                        Notifications about team members' activities
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
