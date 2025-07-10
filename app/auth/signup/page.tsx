"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess("Signup successful! You can now sign in.")
        setTimeout(() => router.push("/auth/signin"), 1500)
      } else {
        setError(data.error || "Signup failed.")
      }
    } catch (err) {
      setError("Something went wrong.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass border-0 shadow-2xl animate-fadeInUp">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl gradient-text">Create an Account</CardTitle>
          <CardDescription className="text-gray-600">Sign up to start building your outfits</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="w-full h-12 btn-primary rounded-xl font-semibold text-lg" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
            {error && <div className="text-red-600 text-center">{error}</div>}
            {success && <div className="text-green-600 text-center">{success}</div>}
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link href="/auth/signin" className="text-indigo-600 hover:underline">Sign In</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 