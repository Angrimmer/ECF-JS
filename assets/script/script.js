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
      const qty = ing.quantity;
      const unit = ing.unit;
      const name = ing.ingredient;

      ingredientsHtml += `<li>${qty} ${unit} ${name}</li>`;
    });

    container.innerHTML += `
      <article class="recipe-card">
        <h2>${recipe.name}</h2>
        <p><strong>Nombre de personnes :</strong> ${recipe.servings}</p>
        <ul>
          ${ingredientsHtml}
        </ul>
      </article>
    `;
  });
}

getRecipes().then((recipes) => {
  renderRecipes(recipes);
});