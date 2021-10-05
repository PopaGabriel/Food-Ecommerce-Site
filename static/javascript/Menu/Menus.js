import Button from "../BasicComponents/Button.js";
import Section from "../Section/Section.js";
import ConfirmAlert from "../Confirms/ConfirmAlert.js";
import FormSection from "../Forms/FormSection.js";

const delete_menu_url = "/Restaurants/Menu/delete_menu/";
const url_add_menu = "/Restaurants/Menu/add_menu/";
const url_get_sections = "/section/section_get/menu=";
const url_add_section = "/section/section_add";

class Menu {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: document.createElement("div"),
      header: this.createHeader(),
      body: this.createBody(),
    };
    this.formSection = null;
    this.elements.main.appendChild(this.elements.header);
    this.elements.main.appendChild(this.elements.body);
    document.body.appendChild(this.elements.main);
  }

  createHeader() {
    const header = document.createElement("div");

    const title_div = document.createElement("div");
    title_div.classList.add("center");

    const title = document.createElement("h3");
    title.textContent = this.options.name;
    title.classList.add();
    title_div.appendChild(title);
    header.appendChild(title_div);

    const command_div = document.createElement("div");
    command_div.classList.add("center");

    const button_add_section = new Button()
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
              .addOn_cancel()
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
                      if (data !== "error")
                        this.elements.main.append(
                          new Section({
                            name: title,
                            items: [],
                            id: data,
                          }).html
                        );
                      this.formSection = null;
                    })
                    .err((this.formSection = null));
                },
              ])
              .addOn_exit();
            command_div.append(this.formSection.html);
          } else this.formSection.toggleState();
        },
      ])
      .addTextContent("Add Section").html;
    command_div.appendChild(button_add_section);

    const button_delete_Menu = new Button()
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
    command_div.appendChild(button_delete_Menu);

    const button_update_Menu = new Button()
      .addClasses(["btn-test", "draw-border"])
      .addListeners([() => {}])
      .addTextContent("Update Menu").html;
    command_div.appendChild(button_update_Menu);

    header.appendChild(command_div);
    return header;
  }
  remove() {
    this.html.parentElement.removeChild(this.html);
  }
  createBody() {
    const body = document.createElement("div");

    fetch(url_get_sections + this.options.id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++)
          body.appendChild(new Section(data[i]).html);
      });
    return body;
  }
  get html() {
    return this.elements.main;
  }
}
new Menu({ name: "Test", id: 3 }).html;
