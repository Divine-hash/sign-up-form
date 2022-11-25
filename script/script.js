'use strict';
const form = document.getElementById('login');

form.addEventListener('submit', (event) => {
  let result = validateForm(form.elements);

  if (!result) {
    event.preventDefault();
  }
});

form.addEventListener('focus', (event) => {
  let target = event.target;

  if (target.tagName == 'INPUT') {
    let div = target.closest('div');
    if (div.classList.contains('invalid')) {
      div.classList.remove('invalid');
    }
  }
}, true);


function validateForm(elements) {
  let emailValidator = /^[a-z]+@[a-z]+(\.[a-z]+){1,2}$/;
  let isValid = true;

  for (let elem of elements) {
    if (elem.value == '' && elem.tagName !== 'BUTTON') {
      elem.closest('div').classList.add('invalid');
      isValid = false;
    }

    if (elem.name == 'email') {
      let value = elem.value;
      isValid = emailValidator.test(value);
      if (!isValid) {
        elem.closest('div').classList.add('invalid');
      }
    }
  }

  return isValid;
}