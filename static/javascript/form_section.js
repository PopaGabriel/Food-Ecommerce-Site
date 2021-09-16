const url_add_section = 'section/section_add'


let button_show_form_section = document.getElementsByName('button_show_form_section')

button_show_form_section.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        if (user !== 'AnonymousUser') {
            Create_review_form.open({
                parent_id: 'section_inside_menu' + item.value,
                html: `<div class="form_create_review">
                        <div class="confirm__window" >
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
                    console.log(document.getElementById('section_title_input'))
                    console.log(document.getElementsByName('section_title_input'))
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
        }
    })
})