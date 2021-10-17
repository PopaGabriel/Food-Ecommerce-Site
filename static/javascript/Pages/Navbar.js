import Component from "../BasicComponents/Component.js";

class NavBar {
  constructor() {
    this.elements = {
      navDiv: document.body.querySelector(".NavMain"),
      navLinks: new Component("ul"),
      burgerLinks: document.body.querySelector(".burger_link"),
      buttons: null,
    };
    this.createButtons();
    this.addEventListeners();
    this.elements.navDiv.appendChild(this.elements.navLinks.html);
  }
  createButtons() {
    this.elements.navLinks.addClasses(["nav_links"]);

    const buttonProfile = new Component("li")
      .addTextContent("Profile")
      .addClasses([]);

    const buttonLogin = new Component("li")
      .addTextContent("Login")
      .addClasses([]);

    const buttonSignUp = new Component("li")
      .addTextContent("SignUp")
      .addClasses([]);

    this.elements.navLinks.addChildren([
      buttonProfile.html,
      buttonLogin.html,
      buttonSignUp.html,
    ]);
    this.buttons = {
      buttonProfile: buttonProfile,
      buttonLogin: buttonLogin,
      buttonSignUp: buttonSignUp,
    };
  }
  addEventListeners() {
    //Event to open the burger when clicked on
    this.elements.burgerLinks.addEventListener("click", () => {
      if (!this.elements.navLinks.containsClass("nav_active")) this.activate();
      else this.deactivate();
    });

    //Click on any link closes the navBar
    this.elements.navLinks.addEventListener([
      "click",
      (e) => {
        if (
          e.target !== this.elements.navLinks.html &&
          this.elements.navLinks.containsClass("nav_active")
        )
          this.deactivate();
      },
    ]);
  }
  activate() {
    //Animate NavBar
    this.elements.navLinks.toggle([["nav_active", true]]);

    // Animate links
    const items = document.querySelectorAll(".nav_links li");
    items.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `navLinkAppear 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    // Animate the lines from the link burger
    this.elements.burgerLinks.classList.toggle("move");
  }
  deactivate() {
    //Dezanimate the NavBar
    this.elements.navLinks.toggle([["nav_active", false]]);

    //Dezanimate the navBar links
    const items = document.querySelectorAll(".nav_links li");
    items.forEach((item) => (item.style.animation = ""));

    // Animate the lines from the link burger
    this.elements.burgerLinks.classList.toggle("move");
  }
  get html() {
    return this.elements.navDiv;
  }
}
const navBar = new NavBar();
export default navBar;
