import { redirect } from "next/navigation";

import TestForm from "@/components/test/TestForm";

async function submitTestForm(formData: FormData) {
  "use server";

  const firstName = formData.get("firstName") as string;

  if (!firstName) {
    throw new Error("First name is required");
  }

  try {
    // Get the base URL dynamically
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "production"
      ? "https://nextjs-server-action-test-no5h.vercel.app" // Replace with your actual domain
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName }),
    });

    if (response.ok) {
      const { uuid } = await response.json();
      redirect(`/contract/${uuid}`);
    } else {
      throw new Error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
}

export default function TestPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Test Form</h1>
      <TestForm submitTestForm={submitTestForm} />
    </div>
  );
}
