import Component from "../BasicComponents/Component.js";

export default class FormSection {
  constructor(options = { title: "", textOk: "" }) {
    this.options = options;
    this.state = "hidden";
    this.body = this.makeBody();
    return this;
  }
  makeBody() {
    const main = new Component("div").addClasses(["form_create_review"]);
    const window_div = new Component("div").addClasses(["confirm__window"]);
    const window = new Component("div").addClasses(["confirm__titlebar"]);

    const title = new Component("span")
      .addClasses(["confirm__title"])
      .addTextContent(this.options.title);

    const buttonExit = new Component("button")
      .addClasses(["confirm__close"])
      .addTextContent("×");

    window.addChildren([title.html, buttonExit.html]);
    window_div.addChild(window.html);
    main.addChild(window_div.html);

    const content = new Component("div").addClasses(["confirm__content"]);

    const input_title = new Component("input")
      .addClasses(["search__input", "input_title"])
      .addType("text")
      .addPlaceholder("write section title");

    const surrogateText = new Component("p")
      .addClasses(["p_test"])
      .addTextContent("title");

    surrogateText.addChild(input_title.html);
    content.addChild(surrogateText.html);
    window_div.addChild(content.html);

    const command = new Component("div").addClasses(["confirm__buttons"]);

    const buttonOk = new Component("button")
      .addClasses([
        "confirm__button",
        "confirm__button--fill",
        "confirm__button--add",
      ])
      .addTextContent(this.options.textOk);

    const buttonCancel = new Component("button")
      .addTextContent(this.options.textCancel)
      .addClasses([
        "confirm__button",
        "confirm__button--fill",
        "confirm__button--cancel",
      ]);
    command.addChildren([buttonOk.html, buttonCancel.html]);
    window_div.addChild(command.html);

    return main.html;
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
