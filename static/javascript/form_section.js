import createAddItemForm from "./AddItemForm/instant-search.js";

const url_add_section = '/section/section_add';
const url_section_delete = '/section/section_delete';
const url_section_update = '/section/section_update';
const url_ingredients = "/ingredients/get_ingredients";


let section_delete_buttons = document.getElementsByName('delete_section_button');
let button_show_form_section = document.getElementsByName('button_show_form_section');
let button_update_section = document.getElementsByName('button_update_section');
let buttons_add_item = document.getElementsByName("add_item_button");

button_show_form_section.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        if (user !== 'AnonymousUser')
            if (document.getElementById('section_inside_menu' + item.value).querySelector('.form_create_review') == null)
                Create_review_form.open({
                    parent_id: 'section_inside_menu' + item.value,
                    html: `<div class="form_create_review">
                        <div class="confirm__window">
                            <div class="confirm__titlebar">
                                <span class="confirm__title">Create review</span>
                                <button class="confirm__close">&times;</button>
                            </div>
                            <div class="confirm__content">
                                <label for="review_title"> Title: </label>
                                <input id="section_title_input" name='section_title_input' type="text" placeholder="Write comments title"/>
                            </div>
                            <div class="confirm__buttons">
                                <button class="confirm__button confirm__button--fill confirm__button--add" name="button-add-review">Add Review</button>
                                <button class="confirm__button confirm__button--fill confirm__button--cancel">Cancel</button>
                            </div>
                        </div>
                      </div>`,
                    on_ok: function () {
                        fetch(url_add_section, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application.json',
                                    'X-CSRFToken': csrftoken,
                                },
                                body: JSON.stringify({
                                    'menu': item.value,
                                    'title': document.getElementById('section_title_input').value
                                })
                            }
                        ).then(response => response.json()).then(data => console.log(data))
                    }
                })
            else if (document.getElementById('section_inside_menu' + item.value).querySelector('.form_create_review').classList.contains('hide'))
                document.getElementById('section_inside_menu' + item.value).querySelector('.form_create_review').classList.remove('hide')
            else
                document.getElementById('section_inside_menu' + item.value).querySelector('.form_create_review').classList.add('hide')
    })
})

section_delete_buttons.forEach(elem => elem.addEventListener('click', (e) => {
    e.preventDefault()
    Confirm.open({
        title: 'Salut',
        message: 'Scuze',
        okText: 'Delete section',
        cancelText: 'Cancel section',
        value: elem.value,
        on_ok: function () {
            fetch(url_section_delete, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application.json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({
                    'id': elem.value
                })
            }).then(data => data.json()).then(data => {
                    if (data === 'Success')
                        elem.parentElement.parentElement.parentElement.parentElement.removeChild(elem.parentElement.parentElement.parentElement)
                }
            )
        }
    })
}))

button_update_section.forEach(elem => elem.addEventListener('click', (e) => {
    e.preventDefault()

}));

buttons_add_item.forEach(elem => elem.addEventListener("click", () => {
    elem.parentElement.parentElement.parentElement.appendChild(createAddItemForm(url_ingredients, elem.value).html);
}));
