import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Home,
  User,
  FileText,
  CalendarDays,
  CircleDollarSign,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import LandlordUnitCard from "@/components/app/landlord/LandlordUnitCard";
import type { UnitType } from "@/types/unitTypes";

export function LandlordUnits() {
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<UnitType[]>(
    "http://localhost:8080/api/unit",
    token
  );

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Units</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Unit
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3 w-[400px] mb-6">
          <TabsTrigger value="all">All Units</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Available Unit Card */}
            {data?.map((item) => (
              <LandlordUnitCard key={item._id} item={item} />
            ))}

            {/* Another Occupied Unit */}
            {/* <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Unit 2C</CardTitle>
                    <CardDescription>1 Bed, 1 Bath Apartment</CardDescription>
                  </div>
                  <Badge variant="default">Occupied</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  789 Pine Rd, Apt 2C
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  Michael Chen
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  Rent paid (May)
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Lease
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card> */}

            {/* Another Available Unit */}
            {/* <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Unit 1D</CardTitle>
                    <CardDescription>Studio Apartment</CardDescription>
                  </div>
                  <Badge variant="secondary">Available</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  101 Elm St, Unit 1D
                </div>
                <div className="flex items-center text-sm">
                  <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  $850/month
                </div>
                <div className="flex items-center text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Needs renovation
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Lease
                </Button>
                <Button size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Assign Tenant
                </Button>
              </CardFooter>
            </Card> */}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Available units only */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Unit 3B</CardTitle>
                    <CardDescription>2 Bed, 1 Bath Apartment</CardDescription>
                  </div>
                  <Badge variant="secondary">Available</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  123 Main St, Apt 3B
                </div>
                <div className="flex items-center text-sm">
                  <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  $1,200/month
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Lease
                </Button>
                <Button size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Assign Tenant
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Unit 1D</CardTitle>
                    <CardDescription>Studio Apartment</CardDescription>
                  </div>
                  <Badge variant="secondary">Available</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  101 Elm St, Unit 1D
                </div>
                <div className="flex items-center text-sm">
                  <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  $850/month
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Lease
                </Button>
                <Button size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Assign Tenant
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="occupied">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Occupied units only */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Unit 5A</CardTitle>
                    <CardDescription>3 Bed, 2 Bath Condo</CardDescription>
                  </div>
                  <Badge variant="default">Occupied</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  456 Oak Ave, Unit 5A
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  Sarah Johnson
                </div>
                <div className="flex items-center text-sm">
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                  Lease ends: 05/15/2025
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Lease
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Unit 2C</CardTitle>
                    <CardDescription>1 Bed, 1 Bath Apartment</CardDescription>
                  </div>
                  <Badge variant="default">Occupied</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  789 Pine Rd, Apt 2C
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  Michael Chen
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  Rent paid (May)
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Lease
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
