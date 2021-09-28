class SearchAddedIngredients {
  constructor(options) {
    this.elements = {
      main: document.createElement("div"),
      search: options.search,
      result: options.result,
      connection: this.createConnection(),
    };
    this.elements.main.classList.add("row");
    this.elements.main.classList.add("parent_ingredient_form");
    [
      this.elements.search.elements.main,
      this.elements.connection,
      this.elements.result.elements.main,
    ].forEach((elem) => this.elements.main.appendChild(elem));
  }

  createConnection() {
    let main_part = document.createElement("div");
    main_part.classList.add("coll");

    let addIngredient = document.createElement("button");
    addIngredient.classList.add("small_button");

    let icon_add = document.createElement("i");
    icon_add.classList.add("material-icons");
    icon_add.textContent = "add";
    addIngredient.appendChild(icon_add);

    let removeIngredient = document.createElement("button");
    removeIngredient.classList.add("small_button");

    let icon_rem = document.createElement("i");
    icon_rem.classList.add("material-icons");
    icon_rem.textContent = "remove";
    removeIngredient.appendChild(icon_rem);

    [removeIngredient, addIngredient].forEach((elem) =>
      main_part.appendChild(elem)
    );
    this.addListenersButtons(addIngredient, removeIngredient);
    return main_part;
  }

  addListenersButtons(addIngredient, removeIngredient) {
    addIngredient.addEventListener("click", () => {
      let id = this.elements.search.elements.input.placeholder;
      let name = this.elements.search.elements.input.value;

      this.elements.result.addResultElement([id, name]);
      this.elements.search.elements.input.placeholder =
        "Search for ingredients";
      this.elements.search.elements.input.value = "";
    });
    removeIngredient.addEventListener("click", () => {
      this.elements.result.removeSelected();
    });
  }
  get Ingredients() {
    return this.elements.result.Ingredients;
  }
}

export default SearchAddedIngredients;
