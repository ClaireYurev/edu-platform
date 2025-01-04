import { getProviders, signIn } from "next-auth/react";
// import { Button } from "@/components/ui/button";

export default async function SignIn() {
  const providers = await getProviders();

  // Handle case when no providers are returned
  if (!providers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Sign In</h1>
        <p className="text-lg">No providers are available at the moment.</p>
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