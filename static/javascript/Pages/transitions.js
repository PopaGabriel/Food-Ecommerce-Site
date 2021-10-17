window.onload = () => {
  const transition_el = document.querySelector(".transition");
  const links = document.querySelectorAll("a");

  setTimeout(() => {
    transition_el.classList.remove("is-active");
  }, 500);

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      let target = e.target.href;
      transition_el.classList.add("is-active");
    });
  }
};
