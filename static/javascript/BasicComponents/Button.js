export default class Button {
  constructor() {
    this.base = document.createElement("button");
  }
  addClasses(classes = []) {
    for (let i = 0; i < classes.length; i++)
      this.base.classList.add(classes[i]);
    return this;
  }
  addListeners(listeners = []) {
    for (let i = 0; i < listeners.length; i++)
      this.base.addEventListener("click", listeners[i]);
    return this;
  }
  addName(name = "") {
    this.base.name = name;
    return this;
  }
  addId(id = "") {
    this.base.id = id;
    return this;
  }
  addTextContent(text = "") {
    this.base.textContent = text;
    return this;
  }

  get html() {
    return this.base;
  }
}
