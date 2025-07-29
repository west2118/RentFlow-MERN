import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const LandlordUnitCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-4">
        <Skeleton className="h-8 w-28 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default LandlordUnitCardSkeleton;
