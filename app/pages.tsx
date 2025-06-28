"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("https://v0-general-inquiry-cyan-seven.vercel.app/");
  }, []);

  return <p>Redirecting to admin panel...</p>;
}
