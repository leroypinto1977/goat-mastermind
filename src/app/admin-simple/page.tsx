"use client";

import { useSession } from "next-auth/react";

export default function SimpleAdminDashboard() {
  const { data: session, status } = useSession();

  console.log("Simple Admin - Session status:", status);
  console.log("Simple Admin - Session data:", session);

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="p-8">Not authenticated - you should be redirected</div>
    );
  }

  if (session.user.role !== "ADMIN") {
    return <div className="p-8">Not authorized - you should be redirected</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Simple Admin Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <p>Temporary: {session.user.isTemporary ? "Yes" : "No"}</p>
    </div>
  );
}
