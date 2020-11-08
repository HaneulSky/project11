export default class Card {
    constructor (name, link, openImagePopup, template){
        this.name = name;
        this.link = link;
        this.template = template;
        this.openImagePopup = openImagePopup;
 }

    create() {
        const newCard = this.template.cloneNode(true);
        const cardName = newCard.querySelector('.place-card__name');
        const cardImage = newCard.querySelector('.place-card__image');
        cardName.textContent = this.name;
        cardImage.style.backgroundImage = `url(${this.link})`;
        cardImage.dataset.url = `${this.link}`;


        this.cardElement = newCard;
        this.addListeners();
        return this.cardElement;
    }   
          
    addListeners() {
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);

        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    
        this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openPopup);
      }
    
    like (event){
  
            event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove = (event) => {
        event.stopPropagation();
        this.cardElement.remove()
        this.removeEventListeners();
    }

    removeEventListeners = () => {
        this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        this.cardElement.querySelector('.place-card__image').removeEventListener('click', this.openPopup);
        this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
      }

    openPopup = (event) => {
        this.openImagePopup(event)
    }

}