"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Avoid double redirects
    if (!isRedirecting) {
      setIsRedirecting(true);

      if (isLoggedIn) {
        router.push("/dashboard");
      } else {
        router.push("/auth/signin");
      }
    }
  }, [isLoggedIn, isRedirecting, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
