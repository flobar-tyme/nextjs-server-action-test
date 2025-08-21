import { redirect } from "next/navigation";

import TestForm from "@/components/test/TestForm";

async function submitTestForm(formData: FormData) {
  "use server";

  const firstName = formData.get("firstName") as string;

  if (!firstName) {
    throw new Error("First name is required");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/test`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName }),
      }
    );

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
