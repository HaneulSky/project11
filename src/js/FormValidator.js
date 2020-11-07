export default class FormValidator {
    constructor (elementForm, elementPopup){
       this.elementForm = elementForm;
       this.elementPopup = elementPopup;
    }


checkInputValidity(input, errorMessage) {

  input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity('Это обязательное поле');
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity('Должно быть от 2 до 30 символов');
      return false
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
      return false
    } 
  }

setSubmitButtonState(state) {
  const button = this.elementForm.querySelector('.button');
    if (state) {
        button.removeAttribute('disabled');
        button.classList.add(`popup__button_active`);
        button.classList.remove(`popup__button_invalid`);
    } else {
        button.setAttribute('disabled', true);
        button.classList.remove(`popup__button_active`);
        button.classList.add(`popup__button_invalid`);
    }
  }

isFieldValid(input) {
    const errorElem = this.elementForm.querySelector(`#${input.id}-error`)
    const valid = this.checkInputValidity(input);
    errorElem.textContent = input.validationMessage;
  
    return valid;
}

handlerInputForm(evt){
  const inputs = [...this.elementForm.querySelectorAll('input')];
    
        this.isFieldValid(inputs);
    
    
        if (inputs.every((input) => input.validity.valid)) {
          this.setSubmitButtonState(true);
        } else {
          this.setSubmitButtonState(false);
        }
    
}


    setEventListeners() {
        const inputs = [...this.elementForm.querySelectorAll('input')];
        this.elementForm.addEventListener('input', (event)=>{
          const inputForValidation = event.target;
          this.isFieldValid(inputForValidation);
          if (inputs.every((input) => input.validity.valid)) {
            this.setSubmitButtonState(true);
            } else {
            this.setSubmitButtonState(false);
            }
        });
    }
}
