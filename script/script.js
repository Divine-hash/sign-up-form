class ValidateForm {
  constructor(form) {
    this.form = form;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);

    form.addEventListener('submit', this.onSubmit);
    form.addEventListener('input', this.onInput);
  }

  onSubmit(event) {
    const result = this.validateInputs(this.form.elements);

    if (!result) {
      event.preventDefault();
      return;
    }

    if (result) {
      for (let elem of this.form.elements) {
        elem.value = "";
        elem.placeholder = elem.dataset.placeholder;
        elem.closest('div').className = 'widget';
      }
    }
    event.preventDefault();
  }
  
  onInput(event) {
   const target = event.target;
   const div = target.closest('div');

   if (div.className == 'widget') return;

   if (!target.value) {
    div.classList.add('invalid');
    div.classList.remove('valid');
   }

   if (target.value) {
    div.classList.add('valid');
    div.classList.remove('invalid');
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
