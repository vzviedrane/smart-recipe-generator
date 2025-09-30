# Smart Recipe Generator

**Video demo:** https://youtu.be/8HakqFD6clY  

This is my final project for **CS50x**.  
The idea was simple: I often had random ingredients in the fridge but no idea what to cook.  
So I built a small web app that suggests recipes based on ingredients you already have.

---

## 🔍 What it does
- You type in ingredients (like `milk`, `eggs`, `flour`).
- The app uses the **Spoonacular API** to fetch recipes in real time.
- Recipes are split into two groups:
  - **You can cook these now** (all ingredients available)
  - **You’ll need to buy a few things** (shows missing items)
- Each recipe card shows cooking time and instructions.
- If the API doesn’t return anything, it falls back to pancakes 🥞 (better than showing nothing).

---

## ✨ Features
- Ingredient input with “pill” tags (easy to add/remove items).
- Emoji categories (🥞 🍝 🍰) for quick recognition.
- Works on mobile and desktop.
- Loading spinner and small alerts to improve UX.

---

## 🧰 Tech stack
- HTML, CSS, JavaScript (no frameworks)
- Spoonacular REST API

---

## 🚀 How to run
1. Get a free API key from [Spoonacular](https://spoonacular.com/food-api).
2. Replace `YOUR_SPOONACULAR_API_KEY` in `script.js`.
3. Open `index.html` in a browser and start typing ingredients.

---

## 📸 Screenshots
*(add 1–2 images of the app here)*

---

## 🧪 Challenges
- Spoonacular sometimes returned recipes with missing data.
- API free tier is limited → had to reduce the number of calls.
- Keeping the interface simple but still informative took a while.

---

## 💡 Future ideas
- Save favorite recipes (localStorage).
- Filters for diet or cooking time.
- Autocomplete for ingredients.
- Language switch (Latvian/English).

---

👩‍💻 **Author:** Viktorija Zviedrāne  
*CS50x Final Project, April 2025*
