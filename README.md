# Outfit Builder - WYSIWYG Fashion Editor

A modern web-based WYSIWYG (What You See Is What You Get) editor built with Next.js that allows users to visually mix and match different clothing items by dragging and dropping individual clothing icons into a virtual canvas.

## Features

- **Drag-and-Drop Interface**: Intuitive drag-and-drop functionality for clothing items
- **Virtual Canvas**: Visual outfit assembly with real-time positioning
- **Category Filtering**: Filter clothing items by category (tops, bottoms, shoes, accessories)
- **Shopping Cart Integration**: Add complete outfits to cart for purchase
- **User Authentication**: Secure login system with NextAuth
- **MongoDB Integration**: Persistent data storage for users, clothing items, and cart
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth
- **Database**: MongoDB
- **Drag & Drop**: React DnD
- **Authentication**: NextAuth with credentials provider
- **Styling**: Tailwind CSS, Lucide React icons

## Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MongoDB database (local or cloud)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd outfit-builder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit \`.env.local\` and add your configuration:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/outfit-builder
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   \`\`\`

4. **Seed the database**
   \`\`\`bash
   npm run seed
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Authentication
- Use the demo credentials: \`admin@example.com\` / \`password123\`
- Or create your own user account

### Building Outfits
1. **Browse Clothing Items**: Use the left panel to browse available clothing items
2. **Filter by Category**: Click category buttons to filter items (tops, bottoms, shoes, accessories)
3. **Drag and Drop**: Drag clothing items from the panel onto the virtual canvas
4. **Position Items**: Drag dropped items around the canvas to position them
5. **Remove Items**: Hover over items on the canvas and click the X button to remove
6. **Add to Cart**: Click "Add Outfit to Cart" to save your complete outfit

### Shopping Cart
- Click the cart icon in the header to view your cart
- Adjust quantities using the +/- buttons
- Remove items or proceed to checkout

## Project Structure

\`\`\`
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
\`\`\`

## API Endpoints

- \`GET /api/clothing\` - Fetch all clothing items
- \`GET /api/cart\` - Get user's cart items
- \`POST /api/cart\` - Add items to cart
- \`PUT /api/cart\` - Update cart item quantity
- \`DELETE /api/cart\` - Remove item from cart
- \`POST /api/auth/[...nextauth]\` - Authentication endpoints

## Database Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  email: String,
  password: String, // hashed
  name: String,
  createdAt: Date
}
\`\`\`

### Clothing Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  category: String, // "tops", "bottoms", "shoes", "accessories"
  price: Number,
  imageUrl: String,
  description: String,
  createdAt: Date
}
\`\`\`

### Cart Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: String,
  clothingItemId: ObjectId,
  quantity: Number,
  createdAt: Date
}
\`\`\`

## Customization

### Adding New Clothing Items
1. Add images to the \`public\` directory
2. Insert new documents into the MongoDB \`clothing\` collection
3. Or modify the \`scripts/seed-data.js\` file and re-run seeding

### Styling
- Modify Tailwind classes in components for visual changes
- Update \`tailwind.config.ts\` for theme customization
- Add custom CSS in \`app/globals.css\`

### Authentication
- Modify \`lib/auth.ts\` to add new providers (Google, GitHub, etc.)
- Update sign-in page in \`app/auth/signin/page.tsx\`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
1. Build the application: \`npm run build\`
2. Start the production server: \`npm start\`
3. Ensure environment variables are set

## Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature-name\`
3. Commit your changes: \`git commit -am 'Add feature'\`
4. Push to the branch: \`git push origin feature-name\`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments for implementation details

## Future Enhancements

- [ ] 3D virtual model integration
- [ ] AI-powered outfit recommendations
- [ ] Social sharing features
- [ ] Advanced filtering and search
- [ ] Outfit saving and favorites
- [ ] Mobile app version
- [ ] Integration with fashion APIs
- [ ] Real-time collaboration features
