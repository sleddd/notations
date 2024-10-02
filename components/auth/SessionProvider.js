"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionProviderClientComponent({
  children,
  session,
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}