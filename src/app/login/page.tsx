"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to Spotify Cover App
        </h1>
        <button
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
}
