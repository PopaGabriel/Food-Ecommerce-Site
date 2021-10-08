import Component from "../BasicComponents/Component.js";

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
    const body = new Component("div").addClasses(["confirm"]);
    const window_div = new Component("div").addClasses(["confirm__window"]);
    const window = new Component("div").addClasses(["confirm__titlebar"]);
    const title = new Component("span")
      .addClasses(["confirm__title"])
      .addTextContent(this.options.title);

    const cancelButton = new Component("button")
      .addClasses(["confirm__close"])
      .addTextContent("×");

    const content = new Component("div")
      .addClasses(["confirm__content"])
      .addTextContent(this.options.message);

    const command_div = new Component("div").addClasses(["confirm__buttons"]);
    const button_confirm = new Component("button")
      .addClasses([
        "confirm__button",
        "confirm__button--fill",
        "confirm__button--ok",
      ])
      .addTextContent(this.options.okText);

    const button_cancel = new Component("button")
      .addClasses([
        "confirm__button",
        "confirm__button--fill",
        "confirm__button--cancel",
      ])
      .addTextContent(this.options.cancelText);

    command_div.addChildren([button_confirm.html, button_cancel.html]);
    window.addChildren([title.html, cancelButton.html]);
    window_div.addChildren([window.html, content.html, command_div.html]);
    body.addChildren([window_div.html]);
    return body.html;
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
