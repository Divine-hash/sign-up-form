class ValidateForm {
  constructor(form) {
    this.form = form;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onFocusout = this.onFocusout.bind(this);

    form.addEventListener('submit', this.onSubmit);
    form.addEventListener('input', this.onInput);
    form.addEventListener('focusout', this.onFocusout)
  }

  onSubmit(event) {
    let result = this.validateInputs(this.form.elements);

    if (!result) {
      event.preventDefault();
      return;
    }
  }
  
  onInput(event) {
    let target = event.target;
    let div = target.closest('div');
    let isInvalid = div.classList.contains('invalid');
    if (isInvalid) {
      div.classList.remove('invalid');
      div.classList.add('valid');
    }
  }

  onFocusout(event) {
    let target = event.target;
    if (!event.target.value) {
      target.closest('div').classList.remove('valid');
      target.closest('div').classList.add('invalid');
    }
  }

  validateInputs(elements) {
    const email = /^[a-z\d-\.]+@[a-z\d-]+(\.[a-z]+){1,2}$/;
    const set = new Set();
    set.add(true);

    for (let input of elements) {
      let div = input.closest('div');
      if (input.value == '' && input.tagName !== 'BUTTON') {
        div.classList.add('invalid');
        input.placeholder = "";
        set.add(false);
      }

      if (input.name == 'email') {
        let value = input.value;
        
        if ( !email.test(value) ) {
          set.add(false);
          div.classList.add('invalid');
          input.placeholder = "email@example/com";
        }
      }
    }

    return !set.has(false);
  }
}

const form = document.getElementById('login');
new ValidateForm(form);
