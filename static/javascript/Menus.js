const delete_menu_url = "/Restaurants/Menu/delete_menu/";
const url_add_menu = "/Restaurants/Menu/add_menu/";

let delete_menus = document.getElementsByName("delete_menu_button");
let add_menu_button = document.getElementById("add_menu_button");

delete_menus.forEach((elem) =>
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    Confirm.open({
      title: "Salut",
      message: "Scuze",
      okText: "Delete menu",
      cancelText: "Cancel",
      value: elem.value,
      on_ok: function () {
        fetch(delete_menu_url, {
          method: "POST",
          headers: {
            "Content-Type": "application.json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            menu: elem.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data === "Success") {
              elem.parentElement.parentElement.parentElement.parentElement.removeChild(
                elem.parentElement.parentElement.parentElement
              );
            }
          });
      },
    });
  })
);

add_menu_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (user !== "AnonymousUser") {
    if (
      document
        .getElementById("Action_owner_form")
        .querySelector(".form_create_review") == null
    )
      Create_review_form.open({
        parent_id: "Action_owner_form",
        html: `<div class="form_create_review">
                        <div class="confirm__window" >
                            <div class="confirm__titlebar">
                                <span class="confirm__title">Create review</span>
                                <button class="confirm__close">&times;</button>
                            </div>
                            <div class="confirm__content">
                                <label for="review_title"> Title: </label>
                                <input id="menu_title_input" name='section_title_input' type="text" placeholder="Write comments title"/>
                            </div>
                            <div class="confirm__buttons">
                                <button class="confirm__button confirm__button--fill confirm__button--add" name="button-add-review">Add Review</button>
                                <button class="confirm__button confirm__button--fill confirm__button--cancel">Cancel</button>
                            </div>
                        </div>
                      </div>`,
        on_ok: function () {
          fetch(url_add_menu, {
            method: "POST",
            headers: {
              "Content-Type": "application.json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              restaurant_id: restaurant_id,
              title: document.getElementById("menu_title_input").value,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data === "Success") {
                //TODO
                console.log("TODO");
              }
            });
        },
      });
    else if (
      document
        .getElementById("Action_owner_form")
        .querySelector(".form_create_review")
        .classList.contains("hide")
    )
      document
        .getElementById("Action_owner_form")
        .querySelector(".form_create_review")
        .classList.remove("hide");
    else
      document
        .getElementById("Action_owner_form")
        .querySelector(".form_create_review")
        .classList.add("hide");
  }
});
