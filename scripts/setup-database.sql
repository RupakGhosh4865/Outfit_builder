-- MongoDB Collections Setup
-- This is a reference for the collections structure

-- Users Collection
{
  "_id": ObjectId,
  "email": String,
  "password": String (hashed),
  "name": String,
  "createdAt": Date
}

-- Clothing Collection
{
  "_id": ObjectId,
  "name": String,
  "category": String, // "tops", "bottoms", "shoes", "accessories"
  "price": Number,
  "imageUrl": String,
  "description": String,
  "createdAt": Date
}

-- Cart Collection
{
  "_id": ObjectId,
  "userId": String,
  "clothingItemId": ObjectId,
  "quantity": Number,
  "createdAt": Date
}
