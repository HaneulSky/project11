export default class Popup {
    constructor (elem, classOpenPopup) {
       this.elem = elem;
       this.elem.querySelector('.popup__close').addEventListener("click", () => this.close());
		this.classOpenPopup = classOpenPopup;
    }

    open () {
        this.elem.classList.add(this.classOpenPopup);
    }

    close () {
        this.elem.classList.remove(this.classOpenPopup);
        this.elem.querySelectorAll('.popup__error-message').forEach((elem) => {elem.textContent = '';});
    }
}