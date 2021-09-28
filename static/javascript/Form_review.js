const Create_review_form = {
  open(options) {
    options = Object.assign(
      {},
      {
        on_ok: function () {},
        on_cancel: function () {},
      },
      options
    );
    const html = options.html;
    const template = document.createElement("template");
    template.innerHTML = html;
    template.content
      .querySelector(".confirm__button--add")
      .addEventListener("click", () => {
        options.on_ok();
        this.close(confirmEl);
      });
    const confirmEl = template.content.querySelector(".form_create_review");
    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) {
        options.on_cancel();
        this.close(confirmEl);
      }
    });

    const btnClose = template.content.querySelector(".confirm__close");
    const btnCancel = template.content.querySelector(
      ".confirm__button--cancel"
    );
    [btnClose, btnCancel].forEach((item) =>
      item.addEventListener("click", () => {
        options.on_cancel();
        this.close(confirmEl);
      })
    );
    document.getElementById(options.parent_id).prepend(template.content);
  },
  close(confirmEl) {
    confirmEl.parentElement.removeChild(confirmEl);
  },
};
