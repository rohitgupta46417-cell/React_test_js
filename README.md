<img width="1087" height="423" alt="Screenshot 2026-11-05 151925" src="https://github.com/user-attachments/assets/a869b1e9-4b7a-4b10-b199-08b12403b2a7" />
<img width="1081" height="668" alt="Screenshot 2026-11-05 151843" src="https://github.com/user-attachments/assets/9e3652f8-5633-4ec0-b44a-bd8b5c9c168c" />
<img width="1087" height="557" alt="Screenshot 2026-11-05 151819" src="https://github.com/user-attachments/assets/4e575acd-5cdc-45fe-ae36-7b0115aaf6c4" />
<img width="1091" height="661" alt="Screenshot 2026-11-05 151801" src="https://github.com/user-attachments/assets/1e441c26-ecfb-430e-b3c5-50c58ddaefbb" />
<img width="1083" height="681" alt="Screenshot 2026-11-05 151722" src="https://github.com/user-attachments/assets/9d995d4a-adb8-4765-a40b-207f1231e313" />
<img width="1076" height="636" alt="Screenshot 2026-11-05 151658" src="https://github.com/user-attachments/assets/46cc441d-702f-42c2-9015-5e1a9d5785e5" />
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
