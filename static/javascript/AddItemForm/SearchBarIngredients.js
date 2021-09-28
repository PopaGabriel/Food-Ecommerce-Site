class InstantSearchIngredients {
  constructor(instant_search, options) {
    this.options = options;
    this.elements = {
      main: instant_search,
      resultContainer: document.createElement("div"),
    };
    let search_input = document.createElement("div");
    search_input.classList.add("search__input-container");

    [this.createInput(), this.create_icon()].forEach((elem) =>
      search_input.appendChild(elem)
    );
    instant_search.appendChild(search_input);

    this.elements.resultContainer.classList.add("search__results-container");
    this.elements.main.classList.toggle("search--loading", false);
    this.elements.main.appendChild(this.elements.resultContainer);
    this.elements["input"] = search_input.querySelector(".search__input");
    this.addListeners();
  }

  addListeners() {
    let delay;
    this.elements.input.addEventListener("input", () => {
      clearTimeout(delay);
      const query = this.elements.input.value;
      delay = setTimeout(() => {
        if (query.length < 2) {
          this.populateResults([]);
          return;
        }

        this.performSearch(query)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then((data) => {
            this.elements.main.classList.toggle("search--loading", false);
            this.populateResults(data);
          })
          .catch((error) => {
            console.error(error);
            return [];
          });
      }, 500);
    });
    this.elements.input.addEventListener("focus", () => {
      this.elements.resultContainer.classList.add(
        "search__results-container--visible"
      );
    });
    this.elements.input.addEventListener("blur", () => {
      this.elements.resultContainer.classList.remove(
        "search__results-container--visible"
      );
    });
  }

  createInput() {
    const input = document.createElement("input");
    input.classList.add("search__input");
    input.type = "text";
    input.placeholder = "Search ingredients";
    input.spellcheck = false;
    return input;
  }

  create_icon() {
    const icon = document.createElement("i");
    icon.textContent = "search";
    ["material-icons", "search-input__icon"].forEach((elem) =>
      icon.classList.add(elem)
    );
    return icon;
  }

  performSearch(query) {
    this.elements.main.classList.toggle("search--loading", true);
    return fetch(this.options["searchURL"] + "/" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
        "X-CSRFToken": csrftoken,
      },
    });
  }

  populateResults(results) {
    while (this.elements.resultContainer.firstChild)
      this.elements.resultContainer.removeChild(
        this.elements.resultContainer.lastChild
      );

    results.forEach((elem) => this.addResultElement(elem));
  }

  addResultElement(elem) {
    let resultElem = document.createElement("div");
    resultElem.value = elem[0];
    resultElem.innerText = elem[1];
    resultElem.classList.add("search__result");
    resultElem.addEventListener("click", () => {
      this.elements.input.value = resultElem.innerText;
      this.elements.input.placeholder = resultElem.value;
    });

    this.elements.resultContainer.appendChild(resultElem);
  }
}

export default InstantSearchIngredients;
