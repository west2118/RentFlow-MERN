import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const TenantUnitCommunityRulesCard = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Community Rules</CardTitle>
        <CardDescription>
          Important policies for your building
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <span className="text-xs">1</span>
            </div>
            <p>Quiet hours from 10pm to 7am daily</p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <span className="text-xs">2</span>
            </div>
            <p>No smoking in units or common areas</p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <span className="text-xs">3</span>
            </div>
            <p>
              Maximum 2 overnight guests for no more than 7 consecutive
              nights
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <span className="text-xs">4</span>
            </div>
            <p>Trash must be taken to dumpsters daily</p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <span className="text-xs">5</span>
            </div>
            <p>No modifications to unit without written approval</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantUnitCommunityRulesCard;
