import createAddItemForm from "../AddItemForm/instant-search.js";
import Component from "../BasicComponents/Component.js";
import ConfirmAlert from "../Confirms/ConfirmAlert.js";
import {
  EnlargedItemComponent,
  ItemComponent,
} from "../Item/EnlargedItemComponent.js";
import { get_items_base, url_section_delete } from "./urls.js";
import search_ingredient from "../AddItemForm/urls.js";

class Section {
  constructor(options) {
    this.options = options;
    this.children = [];
    this.elements = {
      main: new Component("div"),
      head: this.createHead(),
      body: this.populateSection(),
    };
    this.form_item = null;
    this.elements.main.addChildren([
      this.elements.head.html,
      this.elements.body.html,
    ]);
  }
  createHead() {
    const head = new Component("div");
    const title_div = new Component("div");
    const title = new Component("h2")
      .addTextContent(this.options.name)
      .addClasses(["center"]);
    title_div.addChild(title.html);
    head.addChild(title_div.html);

    const command_div = new Component("div").addClasses(["center"]);

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
            head.addChild(this.form_item.html);
          } else if (!this.form_item.html.classList.contains("hide"))
            this.form_item.html.classList.toggle("hide", true);
          else this.form_item.html.classList.toggle("hide", false);
        },
      ])
      .addTextContent("Add Item").html;

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
    command_div.addChildren([button_add_item, button_delete_section]);
    head.addChild(command_div.html);
    return head;
  }
  addItem(data) {
    data["rating_user"] = 0;
    data["rating"] = 0;
    data["image"] = "/media/" + data["image"];
    this.form_item = null;
    let item = new ItemComponent(data);
    this.elements.body.addChild(item.html);
    this.children.push(item);
  }
  makeDraggable(action) {
    // the item that wants to be moved
    this.item = null;
    // {} pair of target and direction in which to append the item
    this.elements.body.toggle([["section_container", true]]);
    this.elements.body.addEventListener([
      "dragover",
      (e) => {
        e.preventDefault();
        if (this.elements.body.html.children.length === 0) action.target = this;
      },
    ]);

    for (let i = 0; i < this.children.length; i++) {
      if (EnlargedItemComponent.prototype.isPrototypeOf(this.children[i]))
        this.children[i].downgrade();

      this.children[i]
        .toggle([["draggable_card", true]])
        .toggleDraggable()
        .addEventListeners([
          [
            "dragstart",
            () => {
              this.children[i].toggle([["draggable_card_selected", true]]);
              action.item = this.children[i];
            },
          ],
          [
            "dragover",
            (e) => {
              if (this.item != this.children[i]) {
                action.target = this.children[i];
                const box = this.children[i].html.getBoundingClientRect();

                if (e.clientX - box.left - box.width / 2 < 0)
                  action.direction = "left";
                else action.direction = "right";
              }
            },
          ],
          [
            "dragend",
            () => {
              this.children[i].toggle([["draggable_card_selected", false]]);
              if (Section.prototype.isPrototypeOf(action.target))
                action.target.elements.body.html.append(action.item.html);
              else if (action.target == null) return;
              else if (action.direction === "left") {
                action.target.html.parentElement.insertBefore(
                  action.item.html,
                  action.target.html
                );
              } else {
                if (action.target.html.nextSibling)
                  action.target.html.parentElement.insertBefore(
                    action.item.html,
                    action.target.html.nextSibling
                  );
                else action.target.html.parentElement.append(action.item.html);
              }
              action.target = null;
              action.item = null;
              action.direction = null;
            },
          ],
        ]);
    }
  }
  unMakeDraggable() {
    this.elements.body.toggle([["section_container", false]]);
    this.elements.body.removeEventListener([
      "dragover",
      () => {
        console.log(item);
      },
    ]);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].toggle([["draggable_card", false]]).toggleDraggable();
    }
  }
  populateSection() {
    const body = new Component("div").addClasses(["center", "row"]);
    for (let i = 0; i < this.options.items.length; i++) {
      this.options.items[i].image = "/media/" + this.options.items[i].image;
      this.options.items[i].parent = this;
      let item = new ItemComponent(this.options.items[i]);
      this.children.push(item);
      body.addChild(item.html);
    }
    return body;
  }
  changeChild(child = null, item = null) {
    if (child && item) this.children[this.children.indexOf(child)] = item;
    else if (!item) this.children.push(item);
    else return this;
    return this;
  }
  remove() {
    this.elements.main.parentElement.removeChild(this.elements.main);
  }
  get html() {
    return this.elements.main.html;
  }
}

export default Section;
