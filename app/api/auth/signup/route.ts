import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
      createdAt: new Date(),
    }
    await db.collection("users").insertOne(newUser)
    return NextResponse.json({ message: "User created successfully." }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
} 