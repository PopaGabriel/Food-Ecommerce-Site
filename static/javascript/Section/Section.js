import createAddItemForm from "../AddItemForm/instant-search.js";
import Component from "../BasicComponents/Component.js";
import ConfirmAlert from "../Confirms/ConfirmAlert.js";
import { ItemComponent } from "../Item/EnlargedItemComponent.js";
import { get_items_base, url_section_delete } from "./urls.js";
import search_ingredient from "../AddItemForm/urls.js";

class Section {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: document.createElement("div"),
      head: this.createHead(),
      body: this.populateSection(),
    };
    this.form_item = null;
    this.elements.main.appendChild(this.elements.head);
    this.elements.main.appendChild(this.elements.body);
  }
  createHead() {
    const head = document.createElement("div");
    const title_div = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = this.options.name;
    title.classList.add("center");
    title_div.appendChild(title);
    head.appendChild(title_div);

    const command_div = document.createElement("div");
    command_div.classList.add("center");

    const button_add_item = new Component("button")
      .addClasses(["btn-test", "draw-border"])
      .addListeners([
        () => {
          if (!this.form_item) {
            this.form_item = createAddItemForm(
              search_ingredient,
              this.options.id,
              this
            );
            head.append(this.form_item.html);
          } else if (!this.form_item.html.classList.contains("hide"))
            this.form_item.html.classList.toggle("hide", true);
          else this.form_item.html.classList.toggle("hide", false);
        },
      ])
      .addTextContent("Add Item").html;
    command_div.appendChild(button_add_item);

    const button_delete_section = new Component("buton")
      .addTextContent("Delete Section")
      .addClasses(["btn-test", "draw-border"])
      .addListeners([
        () => {
          new ConfirmAlert({
            title: "Delete Section?",
            message: "Are you sure you want to delete the section?",
            okText: "Confirm",
            cancelText: "Cancel",
          })
            .addOn_cancel()
            .addOn_close()
            .addOn_ok([
              () => {
                fetch(url_section_delete, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application.json",
                    "X-CSRFToken": csrftoken,
                  },
                  body: JSON.stringify({ id: this.options.id }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data !== "error") {
                      this.remove();
                    }
                  });
              },
            ])
            .show();
        },
      ]).html;
    command_div.appendChild(button_delete_section);

    const button_update_section = new Component("button")
      .addListeners([])
      .addTextContent("Update Section")
      .addClasses(["btn-test", "draw-border"]).html;
    command_div.appendChild(button_update_section);
    head.appendChild(command_div);

    return head;
  }
  addItem(data) {
    data["rating_user"] = 0;
    data["rating"] = 0;
    data["image"] = "/media/" + data["image"];
    this.form_item = null;
    this.elements.body.append(new ItemComponent(data).html);
  }
  populateSection() {
    const body = new Component("div").addClasses(["center", "row"]);
    let arrayCards = [];
    for (let i = 0; i < this.options.items.length; i++) {
      this.options.items[i].image = "/media/" + this.options.items[i].image;
      arrayCards.push(new ItemComponent(this.options.items[i]).html);
    }
    body.addChildren(arrayCards);
    return body.html;
  }
  remove() {
    this.elements.main.parentElement.removeChild(this.elements.main);
  }
  get html() {
    return this.elements.main;
  }
}

export default Section;
