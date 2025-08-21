import { redirect } from "next/navigation";

import TestForm from "@/components/test/TestForm";

async function submitTestForm(formData: FormData) {
  "use server";

  const firstName = formData.get("firstName") as string;

  if (!firstName) {
    throw new Error("First name is required");
  }

  try {
    // Use environment variable for external API
    const apiUrl = process.env.EXTERNAL_API_URL || "http://localhost:3000";

    console.log("apiUrl :::", apiUrl);

    const response = await fetch(`${apiUrl}/api/test`, {
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
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
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
