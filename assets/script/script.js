async function getRecipes() {
  const response = await fetch("assets/data/recette.json");
  const data = await response.json();
  return data.recipes;
}

function renderRecipes(recipes) {
  const container = document.querySelector("#recipesContainer");

  recipes.forEach((recipe) => {
    let ingredientsHtml = "";

    recipe.ingredients.forEach((ing) => {
      const qty = ing.quantity ||"";
      const unit = ing.unit ||"";
      const name = ing.ingredient ||"";

      ingredientsHtml += `<li>${qty} ${unit} ${name}</li>`;
    });

    container.innerHTML += `
      <article class="recipe-card">
        <h2>${recipe.name}</h2>
        <p><strong>Nombre de personnes :</strong> ${recipe.servings}</p>
        <ul>
          ${ingredientsHtml}
        </ul>
        <button class="openModalBtn recipe-button" data-id="${recipe.id}" type="button">
            Voir la recette
        </button>
      </article>
    `;
  });
}

getRecipes().then((recipes) => {
  renderRecipes(recipes);
});

function openModal(recipe) {
  const dialog = document.querySelector("#recipeModal");

  document.querySelector("#modalName").textContent = recipe.name || "";
  document.querySelector("#modalTime").textContent = "Temps : " + (recipe.time || "");
  document.querySelector("#modalDescription").textContent = recipe.description || "";
  document.querySelector("#modalAppliance").textContent = "Appareil : " + (recipe.appliance || "");
 
  const ustensilsUl = document.querySelector("#modalUstensils");
  ustensilsUl.innerHTML = ""; //! Clear previous content for each loop
  (recipe.ustensils || []).forEach((u) => {
    ustensilsUl.innerHTML += `<li>${u}</li>`;
  });

  const ingUl = document.querySelector("#modalIngredients");
  ingUl.innerHTML = "";
  recipe.ingredients.forEach((ing) => {
    const qty = ing.quantity || "";
    const unit = ing.unit || "";
    const name = ing.ingredient || "";
    ingUl.innerHTML += `<li>${qty} ${unit} ${name}</li>`;
  });

  dialog.showModal(); 
}

getRecipes().then((recipes) => {
  renderRecipes(recipes);

document.querySelector("#recipesContainer").addEventListener("click", (e) => {
  if (e.target.classList.contains("openModalBtn")) {
    const id = Number(e.target.dataset.id);
    const recipe = recipes.find((r) => r.id === id); 
    if (recipe) {
      openModal(recipe);
    }
  }
});

  const dialog = document.querySelector("#recipeModal");
  document.querySelector("#closeModal").addEventListener("click", () => {
    dialog.close();
  });
});
