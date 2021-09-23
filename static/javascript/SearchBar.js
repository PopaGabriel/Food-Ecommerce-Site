class InstantSearch {
    constructor(instant_search, options) {
        this.options = options;
        this.elements = {
            main: instant_search,
            input: instant_search.querySelector(".search__input"),
            resultContainer: document.createElement("div"),
        }
        this.elements.resultContainer.classList.add("search__results-container");
        this.elements.main.classList.toggle("search--loading", false)
        this.elements.main.appendChild(this.elements.resultContainer);
        this.addListeners()
    }

    addListeners() {
        let delay;
        this.elements.input.addEventListener("input", () => {
            clearTimeout(delay)
            const query = this.elements.input.value;
            delay = setTimeout(() => {
                if (query.length < 2) {
                    this.populateResults([]);
                    return;
                }

                this.performSearch(query).then(response => {
                    if (response.status !== 200) {
                        throw new Error("Something went wrong");
                    }
                    return response.json()
                }).then(data => {
                    this.elements.main.classList.toggle("search--loading", false);
                    this.populateResults(data);
                }).catch(error => {
                    console.error(error);
                    return [];
                })
            }, 500)
        })
        this.elements.input.addEventListener("focus", () => {
            this.elements.resultContainer.classList.add("search__results-container--visible");
        })
        this.elements.input.addEventListener("blur", () => {
            this.elements.resultContainer.classList.remove("search__results-container--visible");
        })
    }

    performSearch(query) {
        this.elements.main.classList.toggle("search--loading", true)
        return fetch(this.options["searchURL"] + "/" + query, {
            method: "GET",
            headers: {
                'Content-Type': 'application.json',
                'X-CSRFToken': csrftoken,
            }
        })
    }

    populateResults(results) {
        while (this.elements.resultContainer.firstChild)
            this.elements.resultContainer.removeChild(this.elements.resultContainer.lastChild);

        results.forEach(elem => this.addResultElement(elem));
    }

    addResultElement(elem) {
        let resultElem = document.createElement("div")
        resultElem.value = elem[0];
        resultElem.innerText = elem[1];
        resultElem.classList.add("search__result");
        resultElem.addEventListener("click", () => {
            this.elements.input.value = resultElem.innerText;
            this.elements.input.placeholder = resultElem.value;
        })

        this.elements.resultContainer.appendChild(resultElem)
    }
}

export default InstantSearch;