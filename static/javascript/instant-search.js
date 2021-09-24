import InstantSearchIngredients from "./SearchBarIngredients.js";
import ContainerAddedIngredients from "./AddedItemsContainer.js";
import SearchAddedIngredients from "./SearchAddedIngredients.js";
import AddItemComponent from "./AddItemComponent.js";

const url_ingredients = "/ingredients/get_ingredients";

let test = document.createElement("div");
test.classList.add("row");

let searchIngredientsBar = document.createElement("div");
["search", "search--loading", "search__ingredients-container"].forEach(elem => searchIngredientsBar.classList.add(elem));
let search = new InstantSearchIngredients(searchIngredientsBar, {searchURL: url_ingredients});

let searchIngredientsContainer = document.createElement("div");
let result = new ContainerAddedIngredients(searchIngredientsContainer, {title:"Added ingredients"})

let searchAddComponent = new SearchAddedIngredients({search: search, result: result})

document.body.appendChild(searchAddComponent.elements.main)
console.log()
