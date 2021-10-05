import urls from "./urls.js";
const add_item_url = urls["add_item_url"];

class AddItemComponent {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: document.createElement("div"),
      base: this.createBase(),
      ingredients: options.ingredients,
      command: this.createCommand(),
    };
    this.elements.main.classList.add("form_create_review");
    let confirm_window = document.createElement("div");
    confirm_window.classList.add("confirm__window");

    let title_bar = document.createElement("div");
    title_bar.classList.add("confirm__titlebar");
    confirm_window.appendChild(title_bar);

    let span = document.createElement("span");
    span.classList.add("confirm__title");
    span.innerText = "Add Item";

    let button_exit = document.createElement("div");
    button_exit.textContent = "×";
    button_exit.classList.add("confirm__close");
    button_exit.addEventListener("click", (e) => {
      e.preventDefault();
      this.elements.main.parentElement.removeChild(this.elements.main);
    });

    title_bar.appendChild(span);
    title_bar.appendChild(button_exit);

    let confirm_content = document.createElement("div");
    confirm_content.classList.add("confirm__content");
    confirm_content.appendChild(this.elements.base);
    confirm_content.appendChild(this.elements.ingredients.elements.main);
    confirm_content.appendChild(this.elements.command);

    confirm_window.appendChild(confirm_content);

    this.elements.main.appendChild(confirm_window);
  }

  createBase() {
    let base = document.createElement("div");

    let name = this.createInput("name", "text", "Add name", "Title");
    let price = this.createInput("price", "number", "0", "Price");
    let discount = this.createInput("discount", "number", "0", "Discount");
    let adult = this.createInput(
      "adult",
      "checkbox",
      "I it for adults",
      "Is for adults"
    );
    adult.value = "adult";
    let image = this.createInput("image", "file", "Image for food", "Image");

    [name, price, discount, image, adult].forEach((elem) =>
      base.appendChild(elem)
    );
    return base;
  }

  createInput(name, type, placeholder, label) {
    let base = document.createElement("div");
    base.classList.add("m-1");

    let child = document.createElement("input");
    child.name = name;
    child.type = type;
    child.placeholder = placeholder;
    child.spellcheck = false;
    child.classList.add("input_test");

    let childTitle = document.createElement("p");
    childTitle.innerText = label;
    childTitle.appendChild(child);
    childTitle.classList.add("p_test");

    base.appendChild(childTitle);
    return base;
  }

  addListenersCommand(addButton, cancelButton) {
    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.elements.main.parentElement.removeChild(this.elements.main);
    });

    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      const ingredients = [];
      Array.from(this.elements.ingredients.Ingredients).forEach((elem) =>
        ingredients.push(elem.textContent)
      );

      const data = this.inputs;
      data["ingredients"] = ingredients;
      data["section_id"] = this.options.section_id;
      console.log(JSON.stringify(data));
      fetch(add_item_url, {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.elements.main.parentElement.removeChild(this.elements.main);
        });
    });
  }

  createCommand() {
    const base = document.createElement("div");
    ["confirm__buttons"].forEach((elem) => base.classList.add(elem));

    const button_send = document.createElement("button");
    button_send.textContent = "Add Item";
    ["confirm__button"].forEach((elem) => button_send.classList.add(elem));

    const button_cancel = document.createElement("button");
    button_cancel.textContent = "Cancel";
    ["confirm__button"].forEach((elem) => button_cancel.classList.add(elem));

    [button_cancel, button_send].forEach((elem) => base.appendChild(elem));
    this.addListenersCommand(button_send, button_cancel);

    return base;
  }

  get inputs() {
    const list_out = {};
    Array.from(this.elements.base.children).forEach((elem) => {
      if (elem.firstChild.childNodes[1].type === "checkbox")
        list_out[elem.firstChild.childNodes[1].name] =
          elem.firstChild.childNodes[1].checked;
      else
        list_out[elem.firstChild.childNodes[1].name] =
          elem.firstChild.childNodes[1].value;
    });
    return list_out;
  }

  get html() {
    return this.elements.main;
  }
}

export default AddItemComponent;
