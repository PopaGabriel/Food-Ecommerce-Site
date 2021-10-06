// let show_review_form = document.getElementsByName("add_review_first_button")[0];
// let review_like_buttons = document.getElementsByName("review_like_button");
// let review_dislike_buttons = document.getElementsByName(
//   "review_dislike_button"
// );
// let review_delete_buttons = document.getElementsByName("review_delete_button");

// const url_review = "/Restaurants/Reviews/add_review/";
// const url_review_delete = "/Restaurants/Reviews/delete_review/";
// const url_review_like_dislike = "/likes/like_dislike_review";

// review_delete_buttons.forEach((elem) =>
//   elem.addEventListener("click", async function (e) {
//     e.preventDefault();
//     Confirm.open({
//       title: "Salut",
//       message: "Scuze",
//       okText: "Da",
//       cancelText: "Nu",
//       parent_id: "div_review_add",
//       value: elem.value,
//       on_ok: function () {
//         fetch(url_review_delete, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application.json",
//             "X-CSRFToken": csrftoken,
//           },
//           body: JSON.stringify({
//             id: elem.value,
//           }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data === "Success") {
//               elem.parentElement.parentElement.parentElement.removeChild(
//                 elem.parentElement.parentElement
//               );
//             }
//           });
//       },
//     });
//   })
// );

// show_review_form.addEventListener("click", function (e) {
//   e.preventDefault();
//   if (user === "AnonymousUser") {
//     console.log("Not logged in");
//   } else if (
//     document
//       .getElementById("div_review_add")
//       .querySelector(".form_create_review") == null
//   ) {
//     Create_review_form.open({
//       parent_id: "div_review_add",
//       html: `<div class="form_create_review">
//                         <div class="confirm__window" >
//                             <div class="confirm__titlebar">
//                                 <span class="confirm__title">Create review</span>
//                                 <button class="confirm__close">&times;</button>
//                             </div>
//                             <div class="confirm__content" style="height: 70px;">
//                                <label for="review_mark"> Mark: </label>
//                                <select name='review_mark' id="review_mark_select" aria-label="Floating label select example">
//                                    <option value="0/5">0/5</option>
//                                    <option value="1">1/5</option>
//                                    <option value="2">2/5</option>
//                                    <option value="3" selected>3/5</option>
//                                    <option value="4">4/5</option>
//                                    <option value="5">5/5</option>
//                                </select>
//                                <label for="review_mark">Works with selects</label>
//                             </div>
//                             <div class="confirm__content">
//                                 <label for="review_title"> Title: </label>
//                                 <input id="review_title_input" type="text" placeholder="Write comments title"/>
//                             </div>
//                             <div class="confirm__content " style="height: 175px; margin-bottom: 10px; margin-top: 0">
//                                 <label> Body: </label>
//                                 <textarea class="input" id="body_review_input" name="review_body" type="text" placeholder="Write your comment" style="width: 100%; height: 80%"></textarea>
//                             </div>
//                             <div class="confirm__buttons">
//                                 <button class="confirm__button confirm__button--fill confirm__button--add" name="button-add-review">Add Review</button>
//                                 <button class="confirm__button confirm__button--fill confirm__button--cancel">Cancel</button>
//                             </div>
//                         </div>
//                       </div>`,
//       on_ok: function () {
//         fetch(url_review, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application.json",
//             "X-CSRFToken": csrftoken,
//           },
//           body: JSON.stringify({
//             restaurant: restaurant_id,
//             title: document.getElementById("body_review_input").value,
//             body: document.getElementById("review_title_input").value,
//             mark: document.getElementById("review_mark_select").value,
//             action: "add",
//           }),
//         })
//           .then((response) => response.json())
//           .then((data) => console.log(data));
//       },
//     });
//   } else if (
//     document
//       .getElementById("div_review_add")
//       .querySelector(".form_create_review")
//       .classList.contains("hide")
//   ) {
//     document
//       .getElementById("div_review_add")
//       .querySelector(".form_create_review")
//       .classList.remove("hide");
//   } else {
//     document
//       .getElementById("div_review_add")
//       .querySelector(".form_create_review")
//       .classList.add("hide");
//   }
// });

// for (let i = 0; i < review_like_buttons.length; i++) {
//   review_like_buttons[i].addEventListener("click", function (e) {
//     e.preventDefault();
//     fetch(url_review_like_dislike, {
//       method: "Post",
//       headers: {
//         "Content-Type": "application.json",
//         "X-CSRFToken": csrftoken,
//       },
//       body: JSON.stringify({
//         action: "like",
//         review: review_like_buttons[i].value,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         let label = document.getElementById(
//           "" + review_like_buttons[i].value + "review_label"
//         );
//         label.innerHTML = data["likes"] + " - " + data["dislikes"];
//       });
//   });
// }
// for (let i = 0; i < review_dislike_buttons.length; i++) {
//   review_dislike_buttons[i].addEventListener("click", function (e) {
//     e.preventDefault();
//     fetch(url_review_like_dislike, {
//       method: "Post",
//       headers: {
//         "Content-Type": "application.json",
//         "X-CSRFToken": csrftoken,
//       },
//       body: JSON.stringify({
//         action: "dislike",
//         review: review_like_buttons[i].value,
//       }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         let label = document.getElementById(
//           "" + review_like_buttons[i].value + "review_label"
//         );
//         label.innerHTML = data["likes"] + " - " + data["dislikes"];
//       });
//   });
// }
