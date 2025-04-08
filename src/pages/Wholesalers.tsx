
import { Search, Store, MapPin, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const WHOLESALERS = [
  {
    id: "w1",
    name: "MedSupply Pro",
    logo: "MS",
    description: "Full-service medical equipment and supply wholesaler with nationwide distribution.",
    categories: ["Equipment", "Supplies", "Pharmaceuticals"],
    rating: 4.8,
    location: "Chicago, IL",
    isVerified: true,
    isPreferred: true
  },
  {
    id: "w2",
    name: "CleanMed Solutions",
    logo: "CM",
    description: "Specialized in cleaning and sanitization products for medical facilities.",
    categories: ["Cleaning", "Sanitization", "PPE"],
    rating: 4.6,
    location: "Atlanta, GA",
    isVerified: true,
    isPreferred: false
  },
  {
    id: "w3",
    name: "PharmaWholesale Inc",
    logo: "PW",
    description: "Leading distributor of pharmaceuticals and medical supplies.",
    categories: ["Pharmaceuticals", "Supplies"],
    rating: 4.9,
    location: "Boston, MA",
    isVerified: true,
    isPreferred: true
  },
  {
    id: "w4",
    name: "MediTech Equipment",
    logo: "MT",
    description: "Specialized in advanced medical technology and equipment.",
    categories: ["Technology", "Equipment"],
    rating: 4.7,
    location: "San Francisco, CA",
    isVerified: true,
    isPreferred: false
  },
  {
    id: "w5",
    name: "Global Health Supplies",
    logo: "GH",
    description: "International supplier of medical consumables and basic equipment.",
    categories: ["Supplies", "Equipment", "International"],
    rating: 4.5,
    location: "Miami, FL",
    isVerified: false,
    isPreferred: false
  }
];

const Wholesalers = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Wholesalers</h1>
        <p className="text-muted-foreground">
          Find and connect with verified medical supply wholesalers.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wholesalers..."
            className="pl-9"
          />
        </div>
        <Button>Advanced Search</Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="all">All Wholesalers</TabsTrigger>
          <TabsTrigger value="preferred">Preferred Partners</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {WHOLESALERS.map((wholesaler) => (
            <Card key={wholesaler.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center justify-center w-full md:w-28 h-28 bg-medical-light/30">
                  <span className="text-2xl font-bold text-medical-primary">{wholesaler.logo}</span>
                </div>
                <div className="flex-1">
                  <CardHeader className="md:pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {wholesaler.name}
                          {wholesaler.isVerified && (
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                              Verified
                            </Badge>
                          )}
                          {wholesaler.isPreferred && (
                            <Badge className="bg-medical-primary text-white">
                              Preferred Partner
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {wholesaler.location}
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{wholesaler.rating}/5</span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="md:pt-2">
                    <p className="text-sm">{wholesaler.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {wholesaler.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button variant="outline" size="sm">
                      Save
                    </Button>
                    <Button size="sm">
                      View Catalog
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="preferred" className="space-y-4">
          {WHOLESALERS.filter(w => w.isPreferred).map((wholesaler) => (
            <Card key={wholesaler.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center justify-center w-full md:w-28 h-28 bg-medical-light/30">
                  <span className="text-2xl font-bold text-medical-primary">{wholesaler.logo}</span>
                </div>
                <div className="flex-1">
                  <CardHeader className="md:pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {wholesaler.name}
                          <Badge className="bg-medical-primary text-white">
                            Preferred Partner
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {wholesaler.location}
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{wholesaler.rating}/5</span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="md:pt-2">
                    <p className="text-sm">{wholesaler.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {wholesaler.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button variant="outline" size="sm">
                      Save
                    </Button>
                    <Button size="sm">
                      View Catalog
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card className="py-10">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Store className="h-12 w-12 text-medical-primary/20 mb-4" />
              <h3 className="text-lg font-medium mb-2">No recently viewed wholesalers</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Wholesalers you view will appear here for quick access.
              </p>
              <Button>Browse All Wholesalers</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wholesalers;
