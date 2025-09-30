### Smart Recipe Generator

#### Video Demo: https://youtu.be/8HakqFD6clY

---

## Overview

The Smart Recipe Generator web application operates as a user-friendly system to assist people in lowering food waste by generating actual recipes based on ingredients they already have at home. This application works as a kitchen assistant by automatically providing cooking options without forcing users to perform manual recipe searches or store trips.

The application was created for CS50's final project by implementing core technologies such as HTML, CSS, JavaScript and APIs taught throughout the course. The system fulfills needs particularly for students and busy people who regularly encounter unused ingredients in their fridges.

---

## 🎯 Problem & Motivation

Food waste occurs on a massive scale because people lack ideas about how to prepare meals with their available ingredients.

Most traditional recipe apps need complete dish names or fixed shopping lists for functionality. Milk, eggs, and flour are the only ingredients a person might have on hand.

This project solves that problem:

- Users can input their available ingredients through a one-by-one or bulk input system

- Then fetching recipes from the Spoonacular’s API

- Finally, displaying available dishes as well as dishes that need additional ingredients for preparation

The interface presents a clean visual design which works on mobile devices and supports users who have few ingredients.

---

## 🔧 Features & Functional Requirements

### ✅ Core Features:

- **Ingredient Input with “Pill” UI**

The user can easily delete tags which display the entered ingredients.



- **Smart Recipe Suggestions**

The application retrieves recipes in real-time from the Spoonacular API and organizes them into:

- “You can cook these now” (no missing items)

- “You’ll need to buy a few things” (with missing ingredients listed)

- **Cooking Time & Full Instructions**

Each recipe card shows how long it takes and includes expandable instructions inline.

- **Recipe Categorization with Emoji**

Recipes receive type-based emojis like 🥞 🍝 🍰 that help users quickly identify categories.

- **Fallback Logic**

A pancake recipe is automatically inserted when no recipes are returned or matched to prevent the app from showing “nothing.”

- **Smooth UX**

After users search the app scrolls down to results and displays loading indicators and alert messages in necessary areas.

---

## 🗂 File Breakdown

### `index.html`

The app includes an input box alongside buttons and containers to display the recipe results.

The application divides sections into matching recipes and recipes with partial matches.

### `style.css`

The stylesheet includes layout styling and responsive design alongside button and pill aesthetics and recipe card presentation.

The design presents clear information to users who access the website from any device.

### `script.js`

The script manages all user interactions by handling ingredient functions and API queries and response processing as well as DOM updates and fallback recipe functionality.

Each function has a distinct purpose within the well-commented modular code structure.

---

## 🔍 Input Validation & Edge Case Handling

The system trims and converts ingredients to lowercase to prevent duplicate entries.

An alert message will appear when users attempt to submit an empty input field or when no ingredients are present.

The system displays a fallback pancake recipe when Spoonacular does not return any recipes to prevent user confusion.

The application shows a “No instructions available” message when a recipe from the API lacks instructions to preserve UX integrity.

---

## 💬 Short Justification for Algorithm Choices

The `ingredients = ingredients.filter(i => i!== name)` line removes ingredients from the list effectively and efficiently.

The DOM receives updates through `forEach()` instead of `for` loops for better simplicity and clarity.

The recipe categorization system groups results based on `missedIngredientCount` to create a smooth UX flow between ready-to-cook and almost ready meals.

The `.nextElementSibling` property enables the most semantic method to reveal and conceal recipe steps by toggling instructions under recipe buttons.

The application restricts results to five to reduce API consumption and speed up operations and satisfy Spoonacular's free tier restrictions.

- The fallback recipe ensures that the user will always get something useful, particularly when the API coverage is poor.

---

## 💡 Design Decisions

No frameworks are used in the app to ensure that it remains light and that all the logic is easy to understand. All recipe cards are generated dynamically without using any framework for DOM manipulation. The ingredients are stored in a JavaScript array and are reflected in the DOM to make pills interactive.

Fallback logic makes sure that no user will ever get an empty screen. Loading spinner enhances the feedback. Scroll behavior makes the transition between sections smoother. Buttons are labeled clearly and are grouped.

No registration or complex forms are required; the UI is minimalist and accessible. It is fast, focused and friendly.

---

## ⏱ Development Time & Workflow

- 15 hours: coding and connecting API endpoints

- 5 hours: Debugging API responses, handling edge cases

- 2 hours: Design and Styling

- 2 hours: Documentation writing, making slides and demo script.

---

## 🌍 Impact & Community Relevance

- It assists the user in minimizing food waste.

- It promotes cooking creativity.

- It makes healthy eating easier to achieve.

- Useful for students, parents and busy people with little time to cook.

---

## 🧪 Challenges & Limitations

### Challenges:

- Spoonacular sometimes returns recipes with missing data.

- API quota required logic to minimize the number of calls.

- It was a challenge to make the UI simple yet provide all the important recipe information to the user.

### Limitations:

- There is no login or saved recipe history.

- It only supports English (ingredient labels and UI).

- It only uses one endpoint for simplicity.

---

## 🚀 Future Enhancements

If I had more time to work on this project I would implement the following features:

- “Save to favorites” using local storage

- Filters by cooking time, dietary restrictions

- Language toggle and metric/imperial unit switch

- Better auto completion for misspelled inputs

---

## 🧰 Technologies Used

- **HTML5**, **CSS3**, **JavaScript (Vanilla)**

- **Spoonacular REST API**

- No frameworks, libraries, or backend dependencies


---

## 📦 How to Run

1. Replace `"YOUR_SPOONACULAR_API_KEY"` in `script.js` with your own API key from spoonacular.com

2. Open index.html in any browser.

3. Type ingredients and enjoy smart recipe results!

---

## 👩‍💻 Author

**Viktorija Zviedrāne**

CS50x Final Project

April 2025
