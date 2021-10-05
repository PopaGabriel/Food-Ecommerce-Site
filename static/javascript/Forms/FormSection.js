export default class FormSection {
  constructor(options = { title: "", textOk: "" }) {
    this.options = options;
    this.state = "hidden";
    this.body = this.makeBody();
    return this;
  }
  makeBody() {
    const main = document.createElement("div");
    main.classList.add("form_create_review");

    const window_div = document.createElement("div");
    window_div.classList.add("confirm__window");

    const window = document.createElement("div");
    window.classList.add("confirm__titlebar");

    const title = document.createElement("span");
    title.classList.add("confirm__title");
    title.textContent = this.options.title;

    const buttonExit = document.createElement("button");
    buttonExit.classList.add("confirm__close");
    buttonExit.textContent = "×";

    window.append(title);
    window.append(buttonExit);
    window_div.append(window);
    main.append(window_div);

    const content = document.createElement("div");
    content.classList.add("confirm__content");

    const input_title = document.createElement("input");
    input_title.classList.add("search__input", "input_title");
    input_title.type = "text";
    input_title.placeholder = "write section title";

    const surrogateText = document.createElement("p");
    surrogateText.classList.add("p_test");
    surrogateText.textContent = "title";

    surrogateText.append(input_title);
    content.append(surrogateText);
    window_div.append(content);

    const command = document.createElement("div");
    command.classList.add("confirm__buttons");

    const buttonOk = document.createElement("button");
    buttonOk.textContent = this.options.textOk;
    buttonOk.classList.add(
      "confirm__button",
      "confirm__button--fill",
      "confirm__button--add"
    );

    const buttonCancel = document.createElement("button");
    buttonCancel.textContent = this.options.textCancel;
    buttonCancel.classList.add(
      "confirm__button",
      "confirm__button--fill",
      "confirm__button--cancel"
    );
    command.append(buttonOk);
    command.append(buttonCancel);
    window_div.append(command);

    return main;
  }
  changeState() {
    if (this.state === "hidden") {
    }
    return this;
  }

  addOn_ok(functions = []) {
    const value = this.value;
    const buttonOk = this.body.querySelector(".confirm__button--add");
    for (let i = 0; i < functions.length; i++)
      buttonOk.addEventListener("click", functions[i]);
    buttonOk.addEventListener("click", () => this.close());
    return this;
  }
  addOn_cancel(functions = []) {
    const buttonCancel = this.body.querySelector(".confirm__close");
    for (let i = 0; i < functions.length; i++)
      buttonCancel.addEventListener("click", functions[i]);
    buttonCancel.addEventListener("click", () => this.close());
    return this;
  }
  addOn_exit(functions = []) {
    const buttonExit = this.body.querySelector(".confirm__button--cancel");
    for (let i = 0; i < functions.length; i++)
      buttonExit.addEventListener("click", functions[i]);
    buttonExit.addEventListener("click", () => this.close());
    return this;
  }
  show() {
    document.body.append(this.html);
    return this;
  }
  toggleState() {
    if (this.state == "hidden") {
      this.state = "shown";
      this.body.classList.add("hide");
    } else {
      this.state = "hidden";
      this.body.classList.remove("hide");
    }
    return this;
  }
  close() {
    this.body.parentElement.removeChild(this.body);
  }
  get value() {
    return this.body.querySelector(".input_title").value;
  }
  get html() {
    return this.body;
  }
}
