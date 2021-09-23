import InstantSearch from "./SearchBar.js";

const url_ingredients = "/ingredients/get_ingredients"

let searchIngredientsBar = document.querySelector('#search_ingredients');
let searchIngredients = new InstantSearch(searchIngredientsBar, {searchURL: url_ingredients});

console.log(searchIngredients)

