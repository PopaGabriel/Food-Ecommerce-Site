import navBar from "./Navbar.js";
import Component from "../BasicComponents/Component.js";
class BasePage {
  constructor(options) {
    this.elements = {
      nav: navBar,
      body: new Component("div"),
      footer: null,
    };
    // this.elements.body.addClasses(["body_page"]);
    // document.body.append(this.html);
  }
  get html() {
    this.elements.body.html;
  }
}
const basePage = new BasePage();
// console.log(basePage);
