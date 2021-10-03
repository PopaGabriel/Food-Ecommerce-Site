const get_items_base = "/Restaurants/Menu/Food/get_items/";
const url_section_delete = "/section/section_delete";

class Section {
  constructor(options) {
    this.options = options;
    this.elements = {
      head: document.createElement("div"),
      body: document.createElement("div"),
      command: document.createElement("div"),
    };
  }

  get html() {
    return this.elements.body;
  }
}

export default Section;
