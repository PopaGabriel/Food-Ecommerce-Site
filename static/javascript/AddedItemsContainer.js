class ContainerAddedIngredients {
    constructor(base, options) {
        this.options = options;
        this.elements = {
            main: base,
            resultTitle: document.createElement("div"),
            resultContainer: document.createElement("div")
        }
        this.listResults = [];
        ["search__ingredients-container", "search__ingredients-container--visible"].forEach(elem => this.elements.resultContainer.classList.add(elem));
        this.elements.resultTitle.classList.add("search__title");
        this.elements.resultTitle.innerText = options["title"];

        [this.elements.resultTitle, this.elements.resultContainer].forEach(elem => this.elements.main.appendChild(elem))
    }

    addResultElement(elem) {
        if (elem[1].length < 2) return;
        if (Array.from(this.elements.resultContainer.children).filter((val => (val.innerText).toLowerCase() === elem[1].toLowerCase())).length > 0) return;

        let resultElem = document.createElement("div")
        resultElem.value = elem[0];
        resultElem.innerText = elem[1];
        resultElem.classList.add("search__result");
        resultElem.addEventListener("click", () => {
            if (resultElem.dataset.selected === "true") {
                resultElem.classList.remove("background_white")
                resultElem.dataset.selected = "false";
                this.listResults.splice(this.listResults.indexOf(resultElem, 1))
            } else {
                resultElem.classList.add("background_white")
                this.listResults.push(resultElem)
                resultElem.dataset.selected = "true";
            }
        })

        this.elements.resultContainer.appendChild(resultElem)
    }

    removeSelected() {
        while (this.listResults.length > 0)
            this.elements.resultContainer.removeChild(this.listResults.pop())
    }
}

export default ContainerAddedIngredients
