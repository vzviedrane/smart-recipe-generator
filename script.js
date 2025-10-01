// Store user ingredients (always lowercase)
let ingredients = [];

// Try to get API key from local config.js
const apiKey = typeof window !== "undefined" ? window.SPOONACULAR_API_KEY : undefined;
// If no key → run in DEMO mode (for GitHub Pages)
const DEMO_MODE = !apiKey;

// Input listener (Enter or comma adds ingredient)
const inputEl = document.getElementById("ingredientInput");
if (inputEl) {
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(this.value.trim());
      this.value = "";
    }
  });
}

/**
 * Add an ingredient if not empty or duplicate
 */
function addIngredient(name) {
  if (!name) return;
  const clean = name.toLowerCase();
  if (ingredients.includes(clean)) return;
  ingredients.push(clean);
  updateIngredientList();
}

/**
 * Remove an ingredient by name
 */
function removeIngredient(name) {
  const target = (name || "").toLowerCase();
  ingredients = ingredients.filter((i) => i !== target);
  updateIngredientList();
}

/**
 * Clear all ingredients and results
 */
function clearIngredients() {
  ingredients = [];
  updateIngredientList();
  setHTML("exactRecipes", "");
  setHTML("partialRecipes", "");
}

/**
 * Add a quick suggestion (example: pancakes)
 */
function suggestIngredients() {
  ingredients = ["eggs", "milk", "flour", "sugar"];
  updateIngredientList();
}

/**
 * Update ingredient pills in UI
 */
function updateIngredientList() {
  const list = document.getElementById("ingredientList");
  if (!list) return;

  list.innerHTML = "";
  ingredients.forEach((ing) => {
    const pill = document.createElement("div");
    pill.className = "ingredient-pill";
    pill.innerHTML = `${ing} <span title="Remove" onclick="removeIngredient('${ing}')">×</span>`;
    list.appendChild(pill);
  });
}

/**
 * Utility: set HTML of element
 */
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/**
 * Show/hide loading spinner
 */
function setLoading(isLoading) {
  const spinner = document.getElementById("loading");
  if (!spinner) return;
  spinner.style.display = isLoading ? "block" : "none";
}

/**
 * Fetch recipes:
 * - If DEMO_MODE → read from demo.json
 * - Else → request Spoonacular API
 */
async function fetchRecipesByIngredients(ings) {
  if (DEMO_MODE) {
    const resp = await fetch("demo.json");
    if (!resp.ok) throw new Error("Failed to load demo.json");
    return await resp.json();
  }

  const url =
    "https://api.spoonacular.com/recipes/findByIngredients" +
    `?ingredients=${encodeURIComponent(ings.join(","))}` +
    `&number=5&apiKey=${apiKey}`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Spoonacular findByIngredients failed");
  return await resp.json();
}

/**
 * Fetch recipe details (instructions, time, dishTypes)
 */
async function fetchRecipeInfo(id) {
  if (DEMO_MODE) {
    return {
      instructions: "Demo instructions: mix, cook, serve.",
      readyInMinutes: 15,
      dishTypes: ["breakfast"],
    };
  }

  const infoUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  const resp = await fetch(infoUrl);
  if (!resp.ok) throw new Error("Spoonacular information failed");
  return await resp.json();
}

/**
 * Main entry — get and display recipes
 */
async function getRecipes() {
  if (ingredients.length === 0) {
    alert("Please enter at least one ingredient.");
    return;
  }

  if (DEMO_MODE) {
    console.info(
      "Running in DEMO MODE (no API key found). Loading recipes from demo.json."
    );
  }

  setLoading(true);

  try {
    let data = await fetchRecipesByIngredients(ingredients);

    if (!Array.isArray(data) || data.length === 0) {
      setHTML(
        "exactRecipes",
        "<p>No recipes found. Try adding flour, butter, or eggs.</p>"
      );
      setHTML("partialRecipes", "");
      return;
    }

    const exactRecipes = [];
    const partialRecipes = [];

    for (const recipe of data) {
      let info = {};
      try {
        info = await fetchRecipeInfo(recipe.id);
      } catch (e) {
        console.warn("Failed to fetch recipe info:", e);
      }

      const fullInstructions =
        recipe.fullInstructions ||
        info.instructions ||
        "No instructions available.";
      const readyInMinutes = recipe.readyInMinutes || info.readyInMinutes || 15;
      const dishTypes = recipe.dishTypes || info.dishTypes || [];

      const enriched = {
        ...recipe,
        fullInstructions,
        readyInMinutes,
        dishTypes,
      };

      if ((recipe.missedIngredientCount || 0) === 0) {
        exactRecipes.push(enriched);
      } else {
        partialRecipes.push(enriched);
      }
    }

    if (exactRecipes.length === 0) {
      exactRecipes.push({
        title: "🥞 Classic Pancakes (Suggested)",
        image: "https://via.placeholder.com/556x370?text=Pancakes",
        readyInMinutes: 20,
        fullInstructions:
          "Mix eggs, milk, flour, and sugar. Pour onto a hot pan. Flip when bubbles form. Serve with syrup!",
        missedIngredients: [],
        dishTypes: ["breakfast"],
      });
    }

    displayRecipes(exactRecipes, "exactRecipes");
    displayRecipes(partialRecipes, "partialRecipes");

    const section = document.getElementById("recipesSection");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert(
      DEMO_MODE
        ? "Demo data failed to load. Please check demo.json."
        : "Something went wrong while fetching recipes. Please try again later."
    );
  } finally {
    setLoading(false);
  }
}

/**
 * Render recipe cards
 */
function displayRecipes(recipes, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (!recipes || recipes.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const missed =
      recipe.missedIngredients?.map((ing) => ing.name).join(", ") || "None";
    const dishType = recipe.dishTypes?.[0] || "meal";

    const emojiMap = {
      breakfast: "🍳",
      lunch: "🥪",
      dinner: "🍽️",
      dessert: "🍰",
      appetizer: "🥗",
      salad: "🥗",
      soup: "🍲",
      snack: "🍿",
    };
    const emoji = emojiMap[dishType] || "🍽️";

    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${emoji} ${escapeHTML(recipe.title)}</h3>
      <p><strong>Cook Time:</strong> ${Number(recipe.readyInMinutes) || 15} minutes</p>
      <p><strong>Missing Ingredients:</strong> ${escapeHTML(missed)}</p>
      <img src="${escapeAttr(recipe.image)}" alt="${escapeAttr(recipe.title)}" />
      <button onclick="toggleInstructions(this)">Show Recipe</button>
      <div class="instructions" style="display:none;">${recipe.fullInstructions}</div>
    `;
    container.appendChild(card);
  });
}

/**
 * Toggle recipe instructions
 */
function toggleInstructions(button) {
  const instructions = button.nextElementSibling;
  const isHidden = instructions.style.display === "none";
  instructions.style.display = isHidden ? "block" : "none";
  button.textContent = isHidden ? "Hide Recipe" : "Show Recipe";
}

/* ---------- Small helpers ---------- */
function escapeHTML(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
function escapeAttr(str = "") {
  return String(str).replaceAll('"', "&quot;");
}
