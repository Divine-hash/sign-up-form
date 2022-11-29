class ValidateForm {
  constructor(form) {
    this.form = form;
    this.onSubmit = this.onSubmit.bind(this);

    form.addEventListener('submit', this.onSubmit);
  }

  onSubmit(event) {
    let result = this.validateInputs(this.form.elements);

    if (!result) {
      event.preventDefault();
    }
  }
  
  validateInputs(elements) {
    const email = /^[a-z\d-\.]+@[a-z\d-]+(\.[a-z]+){1,2}$/;
    let isValid = true;

    for (let input of elements) {
      if (input.value == '' && input.tagName !== 'BUTTON') {
        input.closest('div').classList.add('invalid');
        input.placeholder = "";
        isValid = false;
      }

      if (input.name == 'email') {
        let value = input.value;
        isValid = email.test(value);
        if (!isValid) {
          input.closest('div').classList.add('invalid');
          input.placeholder = "email@example/com";
        }
      }
    }

    return isValid;
  }
}

const form = document.getElementById('login');
new ValidateForm(form);
