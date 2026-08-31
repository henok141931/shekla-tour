"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex justify-center items-center h-full min-h-[70vh]">
      <div className="bg-white p-[40px] rounded-[24px] shadow-lg w-full max-w-[400px]">
        <h1 className="font-serif text-[32px] mb-[20px] text-ink">Admin Login</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
          <div>
            <label className="block text-sm font-bold mb-[5px] text-ink">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-[12px] border border-line rounded-[12px] outline-none focus:border-green text-ink"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-[5px] text-ink">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-[12px] border border-line rounded-[12px] outline-none focus:border-green text-ink"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-[10px] bg-green text-white font-bold py-[14px] rounded-full hover:bg-green-light transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
