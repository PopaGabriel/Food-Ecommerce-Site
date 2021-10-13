export default class Component {
  constructor(type) {
    this.base = document.createElement(type);
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
  addEventListener(listener = []) {
    this.base.addEventListener(listener[0], listener[1]);
    return this;
  }
  removeEventListener(listener = []) {
    this.base.removeEventListener(listener[0], listener[1]);
    return this;
  }
  addName(name = "") {
    this.base.name = name;
    return this;
  }
  addChildBefore(current, destination) {
    this.base.insertBefore(current, destination.element);
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
  addChildren(children = []) {
    for (let i = 0; i < children.length; i++) this.base.append(children[i]);
    return this;
  }
  addType(type = "") {
    this.base.type = type;
    return this;
  }
  addPlaceholder(placeholder = "") {
    this.base.placeholder = placeholder;
    return this;
  }
  addMin(min = 0) {
    this.base.min = min;
    return this;
  }
  addMax(max = 0) {
    this.base.max = max;
    return this;
  }
  toggle(classes = []) {
    for (let i = 0; i < classes.length; i++)
      this.base.classList.toggle(classes[i][0], classes[i][1]);
    return this;
  }
  addSrc(src = "") {
    this.base.src = src;
    return this;
  }
  addChild(child = "") {
    this.base.append(child);
    return this;
  }
  containsClass(classes = "") {
    return this.base.classList.contains(classes);
  }
  toggleDraggable() {
    this.base.draggable = !this.base.draggable;
    return this;
  }
  removeAllChildren() {
    while (this.base.firstChild) this.base.removeChild(this.base.lastChild);
    return this;
  }
  get html() {
    return this.base;
  }
}
