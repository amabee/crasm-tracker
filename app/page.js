"use client";
import LoadinPage from "@/components/LoadinPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (session?.user) {
      // Redirect based on user role
      switch (session.user.role) {
        case "Admin":
          router.push("/admin");
          break;
        case "RD":
          router.push("/regional-director");
          break;
        case "OIC/CAO":
          router.push("/oiccao");
          break;
        case "Provincial":
          router.push("/provincial");
          break;
        case "Collecting Officer":
          router.push("/cashier");
          break;
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <LoadinPage />;
  }

  return null;
}
