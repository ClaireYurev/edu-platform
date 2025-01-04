'use client';

import { useEffect, useState } from 'react';
import { getProviders, signIn, ClientSafeProvider } from 'next-auth/react';

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);

  useEffect(() => {
    // Fetch providers at runtime
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (!providers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Sign In</h1>
        <p className="text-lg">Loading providers...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
