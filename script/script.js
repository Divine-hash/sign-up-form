class ValidateForm {
  constructor(form) {
    this.form = form;
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);

    form.addEventListener('submit', this.onSubmit);
    form.addEventListener('focus', this.onFocus, true);
  }

  onSubmit(event) {
    let result = this.validateInputs(this.form.elements);

    if (!result) {
      event.preventDefault();
    }
  }

  onFocus(event) {
    let target = event.target;

    if (target.tagName == 'INPUT') {
      let div = target.closest('div');
      if (div.classList.contains('invalid')) {
        div.classList.remove('invalid');
      }
    }
  }

  validateInputs(elements) {
    const email = /^[a-z\d-\.]+@[a-z\d-]+(\.[a-z]+){1,2}$/;
    let isValid = true;

    for (let input of elements) {
      if (input.value == '' && input.tagName !== 'BUTTON') {
        input.closest('div').classList.add('invalid');
        isValid = false;
      }

      if (input.name == 'email') {
        let value = input.value;
        isValid = email.test(value);
        if (!isValid) {
          input.closest('div').classList.add('invalid');
        }
      }
    }

    return isValid;
  }
}

const form = document.getElementById('login');
new ValidateForm(form);