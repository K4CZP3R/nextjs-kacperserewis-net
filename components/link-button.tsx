"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export function LinkButton({
  children,
  href,
  size,
  variant,
  noLoading,
}: {
  href: string;
  children: React.ReactNode;
  size?: any;
  variant?: any;
  noLoading?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading && !noLoading) {
    return (
      /* Style so that icon is in center */
      <Button disabled size={size} variant={variant}>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        {size !== "icon" ? "..." : ""}
      </Button>
    );
  }

  return (
    <Button
      size={size}
      asChild
      variant={variant}
      onClick={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
