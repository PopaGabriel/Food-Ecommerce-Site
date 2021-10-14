import Component from "../BasicComponents/Component.js";
import Section from "../Section/Section.js";
import ConfirmAlert from "../Confirms/ConfirmAlert.js";
import FormSection from "../Forms/FormSection.js";

const delete_menu_url = "/Restaurants/Menu/delete_menu/";
const url_update_menu = "/Restaurants/Menu/update_menu/";
const url_add_menu = "/Restaurants/Menu/add_menu/";
const url_get_sections = "/section/section_get/menu=";
const url_add_section = "/section/section_add";

class Menu {
  constructor(options) {
    this.options = options;
    this.options["restaurant_id"] = 1;
    this.children = [];
    this.elements = {
      main: new Component("div"),
      header: this.createHeader(),
      body: this.createBody(),
    };
    this.editMode = false;
    this.formSection = null;
    this.elements.main.addChildren([this.elements.header, this.elements.body]);
    document.body.appendChild(this.elements.main.html);
  }

  createHeader() {
    const header = new Component("div");

    const title_div = new Component("div").addClasses(["center"]);

    const title = new Component("h3").addTextContent(this.options.name);
    title_div.addChild(title.html);
    header.addChild(title_div.html);

    const command_div = new Component("div").addClasses(["center"]);

    const button_add_section = new Component("button")
      .addClasses(["btn-test", "draw-border"])
      .addListeners([
        () => {
          if (!this.formSection) {
            let title = "";
            this.formSection = new FormSection({
              title: "Add Section",
              textOk: "Confirm",
              textCancel: "Cancel",
            })
              .addOn_cancel([
                () => {
                  this.formSection = null;
                },
              ])
              .addOn_ok([
                () => {
                  title = this.formSection.value;
                  fetch(url_add_section, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application.json",
                      "X-CSRFToken": csrftoken,
                    },
                    body: JSON.stringify({
                      title: title,
                      menu: this.options.id,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data !== "error") {
                        const section = new Section({
                          parent: this,
                          name: title,
                          items: [],
                          id: data,
                        });
                        this.elements.main.addChild(section.html);
                        this.children.push(section);
                        this.formSection = null;
                      }
                    })
                    .catch((this.formSection = null));
                },
              ])
              .addOn_exit();
            command_div.addChild(this.formSection.html);
          } else this.formSection.toggleState();
        },
      ])
      .addTextContent("Add Section").html;

    const button_delete_Menu = new Component("button")
      .addClasses(["btn-test", "draw-border"])
      .addListeners([
        () => {
          new ConfirmAlert({
            title: "Cancel Menu",
            message: "Are you sure you want to delete the menu?",
            okText: "Confirm",
            cancelText: "Cancel",
          })
            .addOn_cancel()
            .addOn_close()
            .addOn_ok([
              () => {
                fetch(delete_menu_url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application.json",
                    "X-CSRFToken": csrftoken,
                  },
                  body: JSON.stringify({ menu: this.options.id }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data === "success") this.remove();
                  });
              },
            ])
            .show();
        },
      ])
      .addTextContent("Delete Menu").html;

    const button_update_Menu = new Component("button")
      .addClasses(["btn-test", "draw-border"])
      .addListeners([
        () => {
          this.action = { target: null, item: null, action: null };
          if (!this.editMode) {
            if (this.children.length === 1) {
              this.children[0]
                .makeDraggable(this.action)
                .addMoveCommand("single");
            } else {
              for (let i = 0; i < this.children.length; i++) {
                this.children[i].makeDraggable(this.action);
                if (i === 0) this.children[i].addMoveCommand("first");
                else if (i === this.children.length - 1)
                  this.children[i].addMoveCommand("last");
                else this.children[i].addMoveCommand("");
              }
            }
            this.editMode = true;
          } else {
            for (let i = 0; i < this.children.length; i++) {
              this.children[i].unMakeDraggable().removeMoveCommand();
            }
            const id = this.options.id;
            fetch(url_update_menu + this.options.restaurant_id, {
              method: "POST",
              headers: {
                "X-CSRFToken": csrftoken,
              },
              body: JSON.stringify({ id: id, sections: this.getUpdateData() }),
            }).then((response) => response.json());
            // .then((data) => console.log(data));
            this.editMode = false;
          }
        },
      ])
      .addTextContent("Update Menu").html;
    command_div.addChildren([
      button_add_section,
      button_delete_Menu,
      button_update_Menu,
    ]);
    header.addChild(command_div.html);
    return header.html;
  }
  getUpdateData() {
    const dict = {};
    for (let i = 0; i < this.children.length; i++)
      dict[this.children[i].options.id] = {
        items: this.children[i].getItemList(),
        pos: i,
      };
    return dict;
  }
  createBody() {
    const body = new Component("div");

    fetch(url_get_sections + this.options.id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        data.sort((first, second) => {
          return first.position - second.position;
        });
        for (let i = 0; i < data.length; i++) {
          data[i]["parent"] = this;
          let section = new Section(data[i]);
          body.addChild(section.html);
          this.children.push(section);
        }
      });
    this.children.sort((first, second) => {
      return first.options.position - second.options.position;
    });
    return body.html;
  }
  deleteSection(section) {
    this.children.splice(this.children.indexOf(section), 1);
    return this;
  }
  updateSectionMoveCommand() {
    if (this.children.length === 1) {
      this.children[0].updateMoveCommand("single");
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      if (i === 0) this.children[i].updateMoveCommand("first");
      else if (i === this.children.length - 1)
        this.children[i].updateMoveCommand("last");
      else this.children[i].updateMoveCommand("");
    }
    return this;
  }
  moveSection(child, direction) {
    const indexChild = this.children.indexOf(child);
    this.children.splice(indexChild, 1);
    if (direction === "upward") {
      child.remove();
      const target = this.elements.body.children[indexChild - 1];
      this.children.splice(indexChild - 1, 0, child);
      this.elements.body.insertBefore(child.html, target);
    } else if (direction === "downward") {
      child.remove();
      const target = this.elements.body.children[indexChild].nextElementSibling;

      if (target) this.elements.body.insertBefore(child.html, target);
      else this.elements.body.appendChild(child.html);
      this.children.splice(indexChild + 1, 0, child);
    }
    this.updateSectionMoveCommand();
    return this;
  }
  remove() {
    this.html.parentElement.removeChild(this.html);
  }
  set options(options) {
    this._options = options;
    return this;
  }
  get options() {
    return this._options;
  }
  get html() {
    return this.elements.main.html;
  }
}
export default Menu;
