import Button from "../BasicComponents/Button.js";

export default class ConfirmAlert {
  constructor(
    options = { title: "", message: "", okText: "", cancelText: "" }
  ) {
    this.options = options;
    this.body = this.makeBody();

    const confirmEl = this.body;
    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) this.close();
    });
  }
  makeBody() {
    const body = document.createElement("div");
    body.classList.add("confirm");

    const window_div = document.createElement("div");
    window_div.classList.add("confirm__window");

    const window = document.createElement("div");
    window.classList.add("confirm__titlebar");

    const title = document.createElement("span");
    title.classList.add("confirm__title");
    title.textContent = this.options.title;

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("confirm__close");
    cancelButton.textContent = "×";

    window.append(title);
    window.append(cancelButton);
    window_div.append(window);
    body.append(window_div);

    const content = document.createElement("div");
    content.classList.add("confirm__content");
    content.textContent = this.options.message;
    window_div.append(content);

    const command_div = document.createElement("div");
    command_div.classList.add("confirm__buttons");

    const button_confirm = new Button()
      .addClasses([
        "confirm__button",
        "confirm__button--fill",
        "confirm__button--ok",
      ])
      .addTextContent(this.options.okText).html;
    command_div.append(button_confirm);

    const button_cancel = new Button()
      .addClasses([
        "confirm__button",
        "confirm__button--fill",
        "confirm__button--cancel",
      ])
      .addTextContent(this.options.cancelText).html;

    command_div.append(button_cancel);
    window_div.append(command_div);
    return body;
  }
  addOn_ok(functions = []) {
    const btnOk = this.body.querySelector(".confirm__button--ok");
    for (let i = 0; i < functions.length; i++)
      btnOk.addEventListener("click", functions[i]);
    btnOk.addEventListener("click", () => this.close());
    return this;
  }
  addOn_cancel(functions = []) {
    const btnCancel = this.body.querySelector(".confirm__button--cancel");
    for (let i = 0; i < functions.length; i++)
      btnCancel.addEventListener("click", functions[i]);

    btnCancel.addEventListener("click", () => this.close());
    return this;
  }
  addOn_close(functions = []) {
    const btnClose = this.body.querySelector(".confirm__close");
    for (let i = 0; i < functions.length; i++)
      btnClose.addEventListener("click", functions[i]);

    btnClose.addEventListener("click", () => this.close());
    return this;
  }
  close() {
    this.body.parentElement.removeChild(this.body);
  }
  show() {
    document.body.append(this.html);
    return this;
  }
  get html() {
    return this.body;
  }
}
