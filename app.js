/*
 * Title: Contact Store App
 * Description: This app is Your Contact Store And Save DataBase But Not Side Effects Trusted
 * Author: Rafe Uddaraj
 * Project Date: Fri Sep 03 2021 22:36:2
 */

const BASE_URL = `https://jsonplaceholder.typicode.com/users`;

const tbody = document.getElementById("tbody");

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = this.name.value;
  const email = this.email.value;
  const phone = this.phone.value;
  if (name && email && phone) {
    axios
      .post(BASE_URL, {
        name,
        email,
        phone,
      })
      .then((data) => {
        createTdElement(data.data, (tr) => {
          tbody.appendChild(tr);
        });
      })
      .catch((err) => console.log(err.message));
  } else {
    alert("Please Enter Every Details");
  }
});

window.onload = () => {
  axios
    .get(BASE_URL)
    .then((data) => {
      data.data.forEach((text) => {
        createTdElement(text, (tr) => {
          tbody.appendChild(tr);
        });
      });
    })
    .catch((err) => console.log(err));
};

function createTdElement(text, parent) {
  const tr = createElement("tr");
  const tdName = createElement("td");
  tdName.textContent = text.name;
  const tdEmail = createElement("td");
  tdEmail.textContent = text.email ? text.email : "N/A";
  const tdPhone = createElement("td");
  tdPhone.textContent = text.phone ? text.phone : "N/A";
  const tdAction = createElement("td");
  const EditBtn = createElement("button");
  tdAction.appendChild(EditBtn);
  EditBtn.textContent = "Edit";
  EditBtn.className = "btn btn-primary me-1";
  const deleteBtn = createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-danger ms-1";
  tdAction.appendChild(deleteBtn);
  let allAppend = [tdName, tdEmail, tdPhone, tdAction];
  tr.append(...allAppend);
  parent(tr);
}

function createElement(tagName) {
  const element = document.createElement(tagName);
  return element;
}
