"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export function GlobalToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isUpdated = searchParams.get("updated");
    const isSuccess = searchParams.get("success");

    if (isUpdated === "true") {
      toast.success("Successfully saved changes!", { duration: 4000 });
      router.replace(pathname, { scroll: false });
    } else if (isSuccess === "true") {
      toast.success("Your request has been received! We will be in touch shortly.", { duration: 5000 });
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}
