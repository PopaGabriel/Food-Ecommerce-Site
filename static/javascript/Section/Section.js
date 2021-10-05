import createAddItemForm from "../AddItemForm/instant-search.js";
import Button from "../BasicComponents/Button.js";
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

    const button_add_item = new Button()
      .addClasses(["btn-test", "draw-border"])
      .addListeners([
        () => {
          head.append(
            createAddItemForm(search_ingredient, this.options.id).html
          );
        },
      ])
      .addTextContent("Add Item").html;
    command_div.appendChild(button_add_item);

    const button_delete_section = new Button()
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

    const button_update_section = new Button()
      .addListeners([])
      .addTextContent("Update Section")
      .addClasses(["btn-test", "draw-border"]).html;
    command_div.appendChild(button_update_section);
    head.appendChild(command_div);

    return head;
  }
  populateSection() {
    const body = document.createElement("div");
    body.classList.add("center", "row");
    for (let i = 0; i < this.options.items.length; i++) {
      this.options.items[i].image = "/media/" + this.options.items[i].image;
      body.appendChild(new ItemComponent(this.options.items[i]).html);
    }
    return body;
  }
  remove() {
    this.elements.main.parentElement.removeChild(this.elements.main);
  }
  get html() {
    return this.elements.main;
  }
}

export default Section;
