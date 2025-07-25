import { format } from "date-fns";
import { Plan } from "../shared/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Plus } from "lucide-react";

interface PlansListProps {
  plans: Plan[];
}

export default async function PlansList({ plans }: PlansListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Link key={plan.id} href={`/plan/${plan.id}`}>
          <Card className="h-60 w-full flex flex-col justify-between cursor-pointer hover:bg-primary/10 transition duration-300 ease-in-out hover:-translate-y-1 shadow-md hover:shadow-lg">
            <CardHeader>
              <CardTitle>
                Plan created on {plan.createdAt && format(plan.createdAt, "PPP")}
              </CardTitle>
              <CardDescription>Budget: ${plan.budget}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Start Date: {format(plan.startDate, "PPP")}</p>
              <p>End Date: {format(plan.endDate, "PPP")}</p>
            </CardContent>
          </Card>
        </Link>
      ))}

      {/* Create New Plan Card with gradient futuristic style */}
      <Link href="/travel-planner" aria-label="Create a new travel plan">
        <Card className="h-60 w-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white border-2 border-dashed hover:from-pink-500 hover:via-purple-600 hover:to-blue-500 transition duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl cursor-pointer">
          <Plus className="w-20 h-20" />
        </Card>
      </Link>
    </div>
  );
}
