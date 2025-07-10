# ✨ StyleCraft: WYSIWYG Outfit Builder

![StyleCraft Banner](public/placeholder-logo.png)

[![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **StyleCraft** is a beautiful, modern, and fully interactive WYSIWYG outfit builder. Mix, match, and visualize your style with drag-and-drop ease. Perfect for fashion lovers, e-commerce, and creative teams!

---

## 🚀 Quick Start

```bash
git clone <repository-url>
cd outfit-builder
npm install
cp .env.example .env.local # Add your MongoDB URI and NextAuth secret
npm run seed # (Optional) Seed demo data
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) and start building outfits!

---

## 🎨 Features

- **Drag-and-Drop Canvas**: Instantly build outfits by dragging clothing items onto a virtual model.
- **Smart Sequencing**: Items snap into the correct order (accessories, top, belts, bottom, shoes).
- **Category Filtering & Search**: Find items by type or name.
- **Responsive Design**: Looks great on desktop and mobile.
- **Authentication**: Secure login with NextAuth.
- **Shopping Cart**: Save and review your favorite outfits.
- **MongoDB Integration**: Persistent storage for users, items, and carts.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth
- **Database**: MongoDB Atlas
- **Drag & Drop**: Custom React logic
- **Styling**: Tailwind CSS, Lucide React icons

---

## 📸 Demo

![Demo GIF](public/placeholder.gif)

---

## 📂 Project Structure

```
outfit-builder/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── outfit-builder.tsx # Main outfit builder component
│   ├── clothing-panel.tsx # Clothing items sidebar
│   ├── virtual-canvas.tsx # Drag-and-drop canvas
│   └── shopping-cart.tsx  # Shopping cart component
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   └── mongodb.ts        # MongoDB connection
├── scripts/              # Database scripts
│   └── seed-data.js      # Initial data seeding
├── types/                # TypeScript type definitions
└── README.md
```

---

## 🔑 Authentication
- Use demo credentials: `admin@example.com` / `password123`
- Or sign up for your own account

---

## 🧑‍💻 Usage
1. **Browse**: Use the left panel to browse and search clothing items.
2. **Filter**: Click category buttons to filter (tops, bottoms, shoes, accessories).
3. **Drag & Drop**: Drag items onto the canvas. They snap into the correct order.
4. **Remove**: Click the X on any item to remove it from the canvas.
5. **Add to Cart**: Save your outfit to the cart for later.

---

## 🗃️ API Endpoints
- `GET /api/clothing` - Fetch all clothing items
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add items to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart
- `POST /api/auth/[...nextauth]` - Authentication endpoints

---

## 🏗️ Database Schema

**Users**
```json
{
  _id: ObjectId,
  email: String,
  password: String, // hashed
  name: String,
  createdAt: Date
}
```
**Clothing**
```json
{
  _id: ObjectId,
  name: String,
  category: String, // "tops", "bottoms", "shoes", "accessories"
  price: Number,
  imageUrl: String,
  description: String,
  createdAt: Date
}
```
**Cart**
```json
{
  _id: ObjectId,
  userId: String,
  clothingItemId: ObjectId,
  quantity: Number,
  createdAt: Date
}
```

---

## ✨ Customization
- Add new items: Place images in `public/Assets/` and update the database.
- Change styles: Edit Tailwind classes or `globals.css`.
- Add providers: Edit `lib/auth.ts` for Google, GitHub, etc.

---

## 🚀 Deployment
- **Vercel**: Push to GitHub, connect to Vercel, add env vars, and deploy.
- **Other**: `npm run build` then `npm start`.

---

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feature-name`
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature-name`
5. Open a pull request

---

## 📄 License
MIT — see [LICENSE](LICENSE)

---

## 💬 Support
For questions, suggestions, or to show off your outfits, open an issue or reach out!

---

> Made with ❤️ by the StyleCraft Team
