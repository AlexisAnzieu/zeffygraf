"use client";

import { encryptPassword } from "@alexisanzieu/zeffy-api";
import { useState } from "react";
import { Login } from "./login";

export default function Page() {
  const [data, setData] = useState<any>();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const info = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: encryptPassword(password),
      }),
    }).then((res) => res.json());
    setData(info);
  };

  if (!data || data?.error) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Hello, {data.firstName} {data.lastName}!
              </h1>
              <p className="mt-2 text-gray-600">Welcome to your dashboard.</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Your email: {data.email}</p>
                <p>Your role: {data.role}</p>
                <p>Organization: {data.currentOrganization.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
