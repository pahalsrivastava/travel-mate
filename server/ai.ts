"use server";
import { db } from "@/db/drizzle";
import { z } from "zod";
import { plans } from "@/db/schemas";
import { currentUser } from "@clerk/nextjs/server";
import { formSchema } from "./schemas";

export async function generateTripPlan(formData: z.infer<typeof formSchema>) {
  const { startDate, endDate, budget, activities, destination } = formData;

  let prompt = `
I am planning a trip from ${startDate} to ${endDate} with a budget of $${budget}.
My preferred activities are: ${activities.join(", ")}.
Please generate a **short** and **concise** HTML itinerary with **1-2 sentences per day** and keep the total length under 150 words and in bullets, start it like Destination: label destiation and then give itenary.
Use basic HTML only: <h1>, <h2>, <p>, and <ul>/<li>.
`;

  if (destination) {
    prompt += ` I want to go to ${destination}.`;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite", // or try: "meta-llama/llama-3-70b-instruct"
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const user = await currentUser();

  const [plan] = await db
    .insert(plans)
    .values({
      text: data.choices[0].message.content,
      userId: user?.id,
      budget,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    })
    .returning();

  return plan.id;
}
