import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const clothingItems = await db.collection("clothing").find({}).toArray();
    return NextResponse.json(
      clothingItems.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        image: item.image,
        price: item.price,
        type: item.type,
      }))
    );
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return NextResponse.json({ error: "Failed to fetch clothing items" }, { status: 500 });
  }
}
