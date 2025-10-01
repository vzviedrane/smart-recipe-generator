# Smart Recipe Generator

**🌐 Live demo:** https://vzviedrane.github.io/smart-recipe-generator/

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
- **Demo mode:** runs on GitHub Pages with sample recipes (no API key needed).

---

## 🧰 Tech stack
- HTML, CSS, Vanilla JavaScript  
- Spoonacular REST API (for local use with API key)

---

## 🚀 How to run

### Option 1: Demo mode (GitHub Pages)
- Open the [live demo](https://vzviedrane.github.io/smart-recipe-generator/).
- The app will load `demo.json` with sample recipes (no API key required).

### Option 2: Local mode (with real API key)
1. Get a free API key from [Spoonacular](https://spoonacular.com/food-api).
2. Create a file `config.js` in the project root:
   ```js
   window.SPOONACULAR_API_KEY = "YOUR_KEY_HERE";
3. Make sure config.js is in .gitignore (do not commit).
4. Open index.html in a browser (or use Live Server).


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
