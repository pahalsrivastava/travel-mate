import Link from "next/link";
import { Button } from "../ui/button";
import { Plan as PlanType } from "../shared/types";

interface PlanProps {
  plan: {
    text: string;
  }
}

function highlightDates(html: string): string {

  return html.replace(
    /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b)/g,
    "<strong>$1</strong>"
  );
}

function cleanAndHighlight(text: string) {
  const cleaned = text
    .replace(/^```html\s*/i, "") 
    .replace(/```$/, "")         
    .trim();

  return highlightDates(cleaned);
}

export default function Plan({ plan }: PlanProps) {
  return (
    <section className="prose max-w-3xl mx-auto px-4 py-8 text-center">
  <div
    className="text-left"
    dangerouslySetInnerHTML={{
      __html: cleanAndHighlight(plan.text),
    }}
  />
  
  <div className="mt-8 flex justify-center">
    <Link href="/travel-planner">
      <Button className="text-white bg-blue-600 hover:bg-blue-700">
        Create a new plan
      </Button>
    </Link>
  </div>
</section>

  );
}