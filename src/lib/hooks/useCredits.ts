"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useCredits() {
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchCredits() {
      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/users/credits");
        if (!response.ok) {
          throw new Error("Failed to fetch credits");
        }
        const data = await response.json();
        setCredits(data.credits);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching credits:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCredits();
  }, [session]);

  return { credits, isLoading, error };
}
