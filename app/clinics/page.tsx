"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ClinicsAuthPage() {
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Add sign-in logic here
    console.log("Sign in clicked")
  }

  const handleCreateAccount = () => {
    // Add create account logic here
    console.log("Create account clicked")
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 border-b border-gray-200">
        <Link 
          href="/" 
          className="text-2xl font-semibold text-black tracking-tight hover:text-teal-600 transition-colors orpheus"
        >
          Clara
        </Link>
      </header>

      <main className="max-w-md mx-auto px-8 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Clinics Portal
          </h1>
          <p className="text-gray-600">
            Sign in to your clinic account
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="clinic@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Sign In
              </button>
              
              <button
                type="button"
                onClick={handleCreateAccount}
                className="w-full bg-white hover:bg-gray-50 text-teal-600 font-semibold py-3 px-8 rounded-lg border-2 border-teal-500 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            For clinics to submit and track approval requests
          </p>
        </div>
      </main>
    </div>
  )
}
