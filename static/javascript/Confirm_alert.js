const Confirm = {
    open(options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: '',
            cancelText: '',
            value: -1,
            on_ok: function () {
            },
            on_cancel: function () {
            }
        }, options)
        const html = `<div class="confirm">
                            <div class="confirm__window">
                                <div class="confirm__titlebar">
                                    <span class="confirm__title">${options.title}</span>
                                    <button class="confirm__close">&times;</button>
                                </div>
                            <div class="confirm__content">${options.message}</div>
                            <div class="confirm__buttons">
                                <button class="confirm__button confirm__button--fill confirm__button--ok">${options.okText}</button>
                                <button class="confirm__button confirm__button--fill confirm__button--cancel">${options.cancelText}</button>
                            </div>
                            </div>
                     </div>`

        const template = document.createElement('template')
        template.innerHTML = html

        const confirmEl = template.content.querySelector('.confirm');
        confirmEl.addEventListener('click', (e) => {
            if (e.target === confirmEl) {
                options.on_cancel()
                this.close(confirmEl)
            }
        })

        const btnClose = template.content.querySelector('.confirm__close');
        btnClose.addEventListener('click', () => {
            options.on_cancel()
            this.close(confirmEl)
        })

        const btnCancel = template.content.querySelector('.confirm__button--cancel');
        btnCancel.addEventListener('click', () => {
            options.on_cancel()
            this.close(confirmEl)
        })

        const btnOk = template.content.querySelector('.confirm__button--ok');
        btnOk.addEventListener('click', async () => {
            let deleted = await options.on_ok()
            if (deleted === 'Deleted') {
                let delete_button = document.getElementById(options.value + "review_delete_button")
                delete_button.parentElement.parentElement.parentElement.removeChild(delete_button.parentElement.parentElement)
            }
            this.close(confirmEl)
        })

        document.body.appendChild(template.content);
    },
    close(confirmEl) {
        document.body.removeChild(confirmEl)
    },
}

