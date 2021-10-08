import InstantSearchIngredients from "./SearchBarIngredients.js";
import ContainerAddedIngredients from "./AddedItemsContainer.js";
import SearchAddedIngredients from "./SearchAddedIngredients.js";
import AddItemComponent from "./AddItemComponent.js";

function createAddItemForm(url_ingredients, section_id, parent) {
  let searchIngredientsBar = document.createElement("div");
  ["search", "search--loading", "search__ingredients-container"].forEach(
    (elem) => searchIngredientsBar.classList.add(elem)
  );

  let search = new InstantSearchIngredients(searchIngredientsBar, {
    searchURL: url_ingredients,
  });
  let result = new ContainerAddedIngredients(document.createElement("div"), {
    title: "Added ingredients",
  });

  let searchAddComponent = new SearchAddedIngredients({
    search: search,
    result: result,
  });
  return new AddItemComponent({
    ingredients: searchAddComponent,
    section_id: section_id,
    parent: parent,
  });
}

export default createAddItemForm;
