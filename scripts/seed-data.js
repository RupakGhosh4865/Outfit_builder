// Run this script to seed initial data
// node scripts/seed-data.js

const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://rupakghosh:<db_password>@cluster0.jp9reke.mongodb.net/outfit-builder"

async function seedData() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("outfit-builder")

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("clothing").deleteMany({})
    await db.collection("cart").deleteMany({})

    // Create demo user
    const hashedPassword = await bcrypt.hash("password123", 12)
    await db.collection("users").insertOne({
      email: "admin@example.com",
      password: hashedPassword,
      name: "Demo User",
      createdAt: new Date(),
    })

    // Create sample clothing items with better variety
    const clothingItems = [
      // Tops
      {
        name: "Classic White T-Shirt",
        category: "tops",
        price: 29.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=White+Tee",
        description: "Comfortable cotton t-shirt perfect for any occasion",
        createdAt: new Date(),
      },
      {
        name: "Black Hoodie",
        category: "tops",
        price: 59.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Black+Hoodie",
        description: "Warm and cozy hoodie for casual wear",
        createdAt: new Date(),
      },
      {
        name: "Leather Jacket",
        category: "tops",
        price: 199.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Leather+Jacket",
        description: "Premium leather jacket for a stylish look",
        createdAt: new Date(),
      },
      {
        name: "Striped Long Sleeve",
        category: "tops",
        price: 45.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Striped+Shirt",
        description: "Classic striped long sleeve shirt",
        createdAt: new Date(),
      },
      {
        name: "Denim Jacket",
        category: "tops",
        price: 89.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Denim+Jacket",
        description: "Vintage-style denim jacket",
        createdAt: new Date(),
      },

      // Bottoms
      {
        name: "Blue Denim Jeans",
        category: "bottoms",
        price: 79.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Blue+Jeans",
        description: "Classic fit denim jeans in blue",
        createdAt: new Date(),
      },
      {
        name: "Black Skinny Jeans",
        category: "bottoms",
        price: 69.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Black+Jeans",
        description: "Slim fit black jeans",
        createdAt: new Date(),
      },
      {
        name: "Khaki Chinos",
        category: "bottoms",
        price: 55.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Khaki+Chinos",
        description: "Comfortable khaki chino pants",
        createdAt: new Date(),
      },
      {
        name: "Athletic Shorts",
        category: "bottoms",
        price: 35.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Athletic+Shorts",
        description: "Breathable athletic shorts",
        createdAt: new Date(),
      },

      // Shoes
      {
        name: "White Sneakers",
        category: "shoes",
        price: 89.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=White+Sneakers",
        description: "Comfortable white sneakers for everyday wear",
        createdAt: new Date(),
      },
      {
        name: "Black Boots",
        category: "shoes",
        price: 129.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Black+Boots",
        description: "Stylish black leather boots",
        createdAt: new Date(),
      },
      {
        name: "Running Shoes",
        category: "shoes",
        price: 119.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Running+Shoes",
        description: "High-performance running shoes",
        createdAt: new Date(),
      },
      {
        name: "Canvas Shoes",
        category: "shoes",
        price: 49.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Canvas+Shoes",
        description: "Casual canvas shoes",
        createdAt: new Date(),
      },

      // Accessories
      {
        name: "Baseball Cap",
        category: "accessories",
        price: 24.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Baseball+Cap",
        description: "Adjustable baseball cap",
        createdAt: new Date(),
      },
      {
        name: "Leather Belt",
        category: "accessories",
        price: 39.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Leather+Belt",
        description: "Genuine leather belt",
        createdAt: new Date(),
      },
      {
        name: "Sunglasses",
        category: "accessories",
        price: 79.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Sunglasses",
        description: "UV protection sunglasses",
        createdAt: new Date(),
      },
      {
        name: "Watch",
        category: "accessories",
        price: 149.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Watch",
        description: "Stylish wrist watch",
        createdAt: new Date(),
      },
      {
        name: "Backpack",
        category: "accessories",
        price: 69.99,
        imageUrl: "/placeholder.svg?height=120&width=120&text=Backpack",
        description: "Durable everyday backpack",
        createdAt: new Date(),
      },
    ]

    await db.collection("clothing").insertMany(clothingItems)

    console.log("✅ Database seeded successfully!")
    console.log(`📦 Created ${clothingItems.length} clothing items`)
    console.log("👤 Created demo user: admin@example.com / password123")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedData()
