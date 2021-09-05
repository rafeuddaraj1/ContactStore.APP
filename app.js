/*
 * Title: Contact Store App
 * Description: This app is Your Contact Store And Save DataBase But Not Side Effects Trusted
 * Author: Rafe Uddaraj
 * Project Date: Fri Sep 03 2021 22:36:2
 */

// Local Server Url
const BASE_URL = `http://localhost:3000/user`;
// Table Body Bootstrap
const tbody = document.getElementById('tbody');

// Bootstrap FROM
const form = document.getElementById('form');

// Click Event
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = this.name.value;
  const email = this.email.value;
  const phone = this.phone.value;
  if (name && email && phone) {
    this.name.style.border = '1px solid #ced4da';
    this.email.style.border = '1px solid #ced4da';
    this.phone.style.border = '1px solid #ced4da';
    axios // Post Request
      .post(BASE_URL, {
        name,
        email,
        phone,
      })
      .then((data) => {
        createTdElement(data.data, (tr) => {
          tbody.appendChild(tr);
          this.name.value = '';
          this.email.value = '';
          this.phone.value = '';
        });
      })
      .catch((err) => console.log(err.message));
  } else {
    this.name.style.border = '1px solid red';
    this.email.style.border = '1px solid red';
    this.phone.style.border = '1px solid red';
    alert('Please Provide Every Details');
  }
});

// Get Request
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

// Create Element
function createTdElement(text, parent) {
  const tr = createElement('tr'); // Tr Element
  const tdName = createElement('td'); // td element
  tdName.textContent = text.name;

  const tdEmail = createElement('td');
  tdEmail.textContent = text.email ? text.email : 'N/A';
  const tdPhone = createElement('td');
  tdPhone.textContent = text.phone ? text.phone.split(' ').slice(0, 1) : 'N/A';

  const tdAction = createElement('td');
  const EditBtn = createElement('button');
  tdAction.appendChild(EditBtn);

  EditBtn.textContent = 'Edit';
  EditBtn.className = 'btn btn-primary me-1';

  const dataBs = document.createAttribute('data-bs-toggle'); // Bootstrap Toggle Selector
  const d = document.createAttribute('data-bs-target');
  dataBs.value = 'modal';
  d.value = '#inp';

  EditBtn.setAttributeNode(dataBs);
  EditBtn.setAttributeNode(d);

  // Edit BTN Click Event
  EditBtn.addEventListener('click', function () {
    const editName = document.getElementById('edit-name');
    const editEmail = document.getElementById('edit-email');
    const editPhone = document.getElementById('edit-phone');
    editName.value = text.name;
    editEmail.value = text.email;
    editPhone.value = text.phone;
    const saveBtn = document.getElementById('save-button');
    const dismiss = document.createAttribute('data-bs-dismiss');
    dismiss.value = 'modal';
    saveBtn.setAttributeNode(dismiss);

    saveBtn.addEventListener('click', function () {
      const obj = {
        name: editName.value,
        email: editEmail.value,
        phone: editPhone.value,
      };
      axios // Put Request
        .put(`${BASE_URL}/${text.id}`, obj)
        .then((data) => {
          tdName.innerHTML = data.data.name;
          tdEmail.innerHTML = data.data.email;
          tdPhone.innerHTML = data.data.phone;
        })
        .catch((err) => console.log(err.message));
    });
  });

  const deleteBtn = createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'btn btn-danger ms-1';

  //delete BTN Event
  deleteBtn.addEventListener('click', () => {
    axios.delete(`${BASE_URL}/${text.id}`); // Delete Request
    tr.remove();
  });

  tdAction.appendChild(deleteBtn);
  let allAppend = [tdName, tdEmail, tdPhone, tdAction];

  tr.append(...allAppend);

  parent(tr);
}

// tag create Function
function createElement(tagName) {
  const element = document.createElement(tagName);
  return element;
}
// Ending
