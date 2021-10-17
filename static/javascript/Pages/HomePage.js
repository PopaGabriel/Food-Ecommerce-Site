import Component from "../BasicComponents/Component.js";

const image_basic = "/static/images/basic_business_icon.png";
const url_get_restaurant = "/Restaurants/restaurant_get_discounts/number_of=";
const add_rating =
  "/ratings/add_review/item=<int:id>&&mark=<int:mark>&&target_type=<str:type>";

class RestaurantItem {
  constructor(options) {
    this.options = options;
    this.elements = {
      body: this.createBody(),
      head: this.createHead(),
      main: new Component("div"),
    };
    this.elements.main
      .addClasses(["coll", "restaurant_item"])
      .addChildren([this.elements.head.html, this.elements.body.html]);
  }

  createHead() {
    const head_div = new Component("div").addClasses(["restaurant_item_head"]);
    const image = new Component("img")
      .addClasses(["image_restaurant"])
      .addAlt("Image Restaurant")
      .addSrc(this.options.image !== "" ? image_basic : this.options);

    head_div.addChild(image.html);
    return head_div;
  }
  createBody() {
    const body_div = new Component("div").addClasses(["coll"]);
    const divDelivery = new Component("div").addClasses([]);
    const urlRestaurant = new Component("a")
      .addHref("/Restaurants/Restaurant_view/" + this.options.id)
      .addTextContent("See Restaurant");

    const title = new Component("h3").addTextContent(this.options.name);
    const labelDelivers = new Component("label").addClasses(["label_info"]);

    const textDelivers = new Component("p")
      .addTextContent(this.options.delivery ? "Delivers!" : "Doesn't deliver!")
      .addClasses(["info_discount"]);
    labelDelivers.addChild(textDelivers.html);

    const labelDiscount = new Component("label").addClasses(["label_info"]);
    const textDiscount = new Component("p")
      .addTextContent("Up to " + this.options.best_discount + "% discount!!")
      .addClasses(["info_discount"]);
    labelDiscount.addChild(textDiscount.html);

    body_div.addChildren([
      title.html,
      divDelivery.html,
      this.createStarSystem().html,
      labelDelivers.html,
      labelDiscount.html,
      urlRestaurant.html,
    ]);
    return body_div;
  }
  createStarSystem() {
    const body = new Component("div").addClasses(["row", "content_centered"]);

    const generalRating = new Component("p")
      .addTextContent("(" + this.options.rating + ")")
      .addClasses(["yellow_color"]);

    const list_stars = [];
    for (let i = 0; i < 5; i++) list_stars.push(new Component("span"));

    for (let i = 0; i < list_stars.length; i++) {
      const elem = list_stars[i];
      if (i < this.options.rating_user)
        elem.addClasses(["star_selected", "material-icons"]);
      else elem.addClasses(["star", "material-icons"]);
      elem
        .addTextContent("star_rate")
        .addEventListener([
          "mouseenter",
          () => {
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([["star_select", true]]);
          },
        ])
        .addEventListener([
          "mouseout",
          () => {
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([["star_select", false]]);
          },
        ])
        .addEventListener([
          "click",
          () => {
            //Unchoose
            if (
              (elem.containsClass("star_selected") &&
                list_stars[list_stars.indexOf(elem) + 1] &&
                !list_stars[list_stars.indexOf(elem) + 1].containsClass(
                  "star_selected"
                )) ||
              (elem.containsClass("star_selected") &&
                list_stars.indexOf(elem) == list_stars.length - 1)
            ) {
              for (let j = 0; j < list_stars.length; j++)
                list_stars[j].toggle([
                  ["star_selected", false],
                  ["star", true],
                ]);
              this.options.rating_user = 0;

              fetch(
                add_rating
                  .replace("<int:id>", this.options.id)
                  .replace("<int:mark>", 0)
                  .replace("<str:type>", "restaurant"),
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application.json",
                    "X-CSRFToken": csrftoken,
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  generalRating.addTextContent("(" + data + ")");
                  this.options.rating = data;
                });
              return;
            }
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([
                ["star_select", false],
                ["star_selected", true],
              ]);

            for (
              let j = list_stars.indexOf(elem) + 1;
              j < list_stars.length;
              j++
            )
              list_stars[j].toggle([
                ["star_selected", false],
                ["star", true],
              ]);

            this.options.rating_user = list_stars.indexOf(elem) + 1;
            fetch(
              add_rating
                .replace("<int:id>", this.options.id)
                .replace("<int:mark>", list_stars.indexOf(elem) + 1)
                .replace("<str:type>", "restaurant"),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application.json",
                  "X-CSRFToken": csrftoken,
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                generalRating.addTextContent("(" + data + ")");
                this.options.rating = data;
              });
          },
        ]);
      body.addChildren([elem.html]);
    }
    body.addChildren([generalRating.html]);
    return body;
  }
  get html() {
    return this.elements.main.html;
  }
}
class HomePage {
  constructor() {
    this.elements = { body: new Component("div") };
    this.fillBody();
    this.emptyBody();
    this.elements.body.addClasses([]);
    document.body.querySelector(".pageBody").appendChild(this.html);
  }
  fillBody() {
    fetch(url_get_restaurant + "6", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const sectionDiscounts = new Component("div").addClasses([
            "coll",
            "section_discounts",
          ]);
          const sectionDiscounts_body = new Component("div").addClasses([
            "row",
            "container",
            "center",
            "section_restaurants",
          ]);
          const sectionDiscounts_titleDiv = new Component("div");
          const sectionDiscounts_title = new Component("h2").addTextContent(
            "Best Discounts"
          );
          sectionDiscounts_titleDiv.addChild(sectionDiscounts_title.html);
          sectionDiscounts.addChildren([
            sectionDiscounts_titleDiv.html,
            sectionDiscounts_body.html,
          ]);

          for (let i = 0; i < data.length; i++) {
            let restaurant = new RestaurantItem(data[i]);
            // let restaurant1 = new RestaurantItem(data[i]);
            // let restaurant2 = new RestaurantItem(data[i]);
            sectionDiscounts_body.addChild(restaurant.html);
            // sectionDiscounts_body.addChild(restaurant1.html);
            // sectionDiscounts_body.addChild(restaurant2.html);
          }
          this.elements.body.addChild(sectionDiscounts.html);
        }
      });
  }
  emptyBody() {
    const body = document.body.querySelector(".pageBody");
    while (body.lastElementChild) body.removeChild(body.lastElementChild);
  }
  get html() {
    return this.elements.body.html;
  }
}
new HomePage();
