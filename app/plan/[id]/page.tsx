import Plan from "@/components/features/plan";
import { getPlan } from "@/server/plans";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PlanPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: "Your Trip Plan",
    description: "View your AI-generated travel itinerary",
  };
}

export default async function PlanPage({ params }: PlanPageProps) {
  const plan = await getPlan(params.id);

  if (!plan) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Plan plan={plan} />
    </main>
  );
}
