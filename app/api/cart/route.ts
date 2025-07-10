import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    const cartItems = await db
      .collection("cart")
      .aggregate([
        { $match: { userId: session.user.id } },
        {
          $lookup: {
            from: "clothing",
            localField: "clothingItemId",
            foreignField: "_id",
            as: "clothingItem",
          },
        },
        { $unwind: "$clothingItem" },
      ])
      .toArray()

    return NextResponse.json(
      cartItems.map((item) => ({
        id: item._id.toString(),
        quantity: item.quantity,
        clothingItem: {
          id: item.clothingItem._id.toString(),
          name: item.clothingItem.name,
          category: item.clothingItem.category,
          price: item.clothingItem.price,
          imageUrl: item.clothingItem.imageUrl,
        },
      })),
    )
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items } = await request.json()
    const { db } = await connectToDatabase()

    for (const item of items) {
      const existingItem = await db.collection("cart").findOne({
        userId: session.user.id,
        clothingItemId: new ObjectId(item.clothingItemId),
      })

      if (existingItem) {
        await db.collection("cart").updateOne({ _id: existingItem._id }, { $inc: { quantity: item.quantity } })
      } else {
        await db.collection("cart").insertOne({
          userId: session.user.id,
          clothingItemId: new ObjectId(item.clothingItemId),
          quantity: item.quantity,
          createdAt: new Date(),
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { itemId, quantity } = await request.json()
    const { db } = await connectToDatabase()

    await db
      .collection("cart")
      .updateOne({ _id: new ObjectId(itemId), userId: session.user.id }, { $set: { quantity } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get("itemId")

    if (!itemId) {
      return NextResponse.json({ error: "Item ID required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    await db.collection("cart").deleteOne({
      _id: new ObjectId(itemId),
      userId: session.user.id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing from cart:", error)
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
}
