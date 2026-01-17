"use client";

import { ReactNode } from "react";
import { FloatingMatchmaking } from "@/components/shared/FloatingMatchmaking";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FloatingMatchmaking />
    </>
  );
}
