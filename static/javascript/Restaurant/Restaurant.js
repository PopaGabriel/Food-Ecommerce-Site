import Menu from "../Menu/Menus.js";
import { url_get_menus } from "./urls.js";

class Restaurant {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: document.createElement("div"),
      header: document.createElement("div"),
      body: document.createElement("div"),
      menus: this.createMenus(),
      reviews_div: document.createElement("div"),
    };
    this.elements.main.classList.add("container");

    this.elements.main.append(this.elements.menus);
  }
  createMenus() {
    const body = document.createElement("div");
    // body.classList.add("");

    fetch(url_get_menus + this.options.restaurant_id, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          body.append(new Menu({ name: data[i].type, id: data[i].id }).html);
        }
      });

    return body;
  }
  get html() {
    return this.elements.main;
  }
}
// export default Restaurant;

document.body.append(new Restaurant({ restaurant_id: restaurant_id }).html);
