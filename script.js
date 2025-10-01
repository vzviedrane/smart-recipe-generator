// Store ingredients input by user as lowercase strings
let ingredients = [];

// Listen for Enter or comma key to add ingredient
document.getElementById("ingredientInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    addIngredient(this.value.trim());
    this.value = "";
  }
});

/**
 * Adds an ingredient to the list if not already included
 */
function addIngredient(name) {
  if (!name || ingredients.includes(name.toLowerCase())) return;
  ingredients.push(name.toLowerCase());
  updateIngredientList();
}

/**
 * Removes an ingredient when user clicks the ×
 */
function removeIngredient(name) {
  ingredients = ingredients.filter(i => i !== name);
  updateIngredientList();
}

/**
 * Clears all ingredients and recipe results
 */
function clearIngredients() {
  ingredients = [];
  updateIngredientList();
  document.getElementById("exactRecipes").innerHTML = "";
  document.getElementById("partialRecipes").innerHTML = "";
}

/**
 * Adds a set of suggested ingredients (e.g. for pancakes)
 */
function suggestIngredients() {
  ingredients = ["eggs", "milk", "flour", "sugar"];
  updateIngredientList();
}

/**
 * Visually updates the ingredient pills shown in UI
 */
function updateIngredientList() {
  const list = document.getElementById("ingredientList");
  list.innerHTML = "";
  ingredients.forEach(ing => {
    const pill = document.createElement("div");
    pill.className = "ingredient-pill";
    pill.innerHTML = `${ing} <span onclick="removeIngredient('${ing}')">×</span>`;
    list.appendChild(pill);
  });
}

/**
 * Fetches recipes from Spoonacular API using ingredients input
 * Sorts them into full-match (exact) and partial-match (with missing ingredients)
 * Limits results to 5 to reduce API usage
 */
async function getRecipes() {'z
  if (ingredients.length === 0) {
    alert("Please enter at least one ingredient.");
    return;
  }

  const apiKey = window.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients.join(","))}&number=5&apiKey=${apiKey}`;

  document.getElementById("loading").style.display = "block";

  try {
    const response = await fetch(url);
    let data = await response.json();

    // Handle empty API results
    if (!data || data.length === 0) {
      document.getElementById("exactRecipes").innerHTML = "<p>No recipes found. Try adding flour, butter, or eggs.</p>";
      document.getElementById("partialRecipes").innerHTML = "";
      return;
    }

    // Separate recipes by how many ingredients are missing
    const exactRecipes = [];
    const partialRecipes = [];

    for (const recipe of data) {
      // Fetch full instructions and metadata
      const infoUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
      const infoRes = await fetch(infoUrl);
      const info = await infoRes.json();

      recipe.fullInstructions = info.instructions || "No instructions available.";
      recipe.readyInMinutes = info.readyInMinutes;
      recipe.dishTypes = info.dishTypes;

      if (recipe.missedIngredientCount === 0) {
        exactRecipes.push(recipe);
      } else {
        partialRecipes.push(recipe);
      }
    }

    // If no exact matches, show fallback pancake recipe
    if (exactRecipes.length === 0) {
      exactRecipes.push({
        title: "🥞 Classic Pancakes (Suggested)",
        image: "https://spoonacular.com/recipeImages/605213-556x370.jpg",
        readyInMinutes: 20,
        fullInstructions: "Mix eggs, milk, flour, and sugar. Pour onto a hot pan. Flip when bubbles form. Serve with syrup!",
        missedIngredients: [],
        dishTypes: ["breakfast"]
      });
    }

    // Show recipes in UI
    displayRecipes(exactRecipes, "exactRecipes");
    displayRecipes(partialRecipes, "partialRecipes");

    // Scroll smoothly to result area
    document.getElementById("recipesSection").scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}

/**
 * Renders recipe cards for each recipe in a section (exact or partial)
 * Adds dish type emoji based on recipe metadata
 */
function displayRecipes(recipes, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const missed = recipe.missedIngredients?.map(ing => ing.name).join(", ") || "None";
    const dishType = recipe.dishTypes?.[0] || "meal";

    // Map dish types to emojis for visual categorization
    const emojiMap = {
      breakfast: "🍳",
      lunch: "🥪",
      dinner: "🍽️",
      dessert: "🍰",
      appetizer: "🥗",
      salad: "🥗",
      soup: "🍲",
      snack: "🍿"
    };
    const emoji = emojiMap[dishType] || "🍽️";

    // Create card
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${emoji} ${recipe.title}</h3>
      <p><strong>Cook Time:</strong> ${recipe.readyInMinutes} minutes</p>
      <p><strong>Missing Ingredients:</strong> ${missed}</p>
      <img src="${recipe.image}" alt="${recipe.title}" />
      <button onclick="toggleInstructions(this)">Show Recipe</button>
      <div class="instructions" style="display:none;">${recipe.fullInstructions}</div>
    `;

    container.appendChild(card);
  });
}

/**
 * Toggle show/hide instructions on button click
 * Instructions appear inline under the image
 */
function toggleInstructions(button) {
  const instructions = button.nextElementSibling;
  if (instructions.style.display === "none") {
    instructions.style.display = "block";
    button.textContent = "Hide Recipe";
  } else {
    instructions.style.display = "none";
    button.textContent = "Show Recipe";
  }
}
