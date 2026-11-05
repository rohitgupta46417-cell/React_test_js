# ProductManagerApp

A React + Express + MongoDB product CRUD application based on the supplied project structure.

## Features
- Add, view, edit and delete products
- Product fields: Product Name, Brand, Category, Price, Stock, Description
- Product thumbnail upload with preview (images up to 5 MB)
- Search by product name, brand or category
- Responsive Bootstrap interface

## Requirements
- Node.js (LTS)
- MongoDB Community Server running locally

## Run in VS Code

Open the `project` folder in VS Code. Start MongoDB first, then open two terminals.

### 1. Backend
```bash
cd ses6_backend
npm install
npm run dev
```
The API runs at `http://localhost:4000` and uses the MongoDB database `product_manager`.

### 2. Frontend
```bash
cd ses6_frontend
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

Keep both terminals running while using the app.

## Notes
- Uploaded thumbnails are stored as data URLs in MongoDB, so no separate upload server or extra package is required.
- The backend accepts JSON bodies up to 15 MB. The frontend limits each image to 5 MB.
