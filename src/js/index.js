import Api from './Api'
import Card from './Card'
import CardList from './CardList'
import FormValidator from './FormValidator'
import Popup from './Popup'
import UserInfo from './UserInfo'
import '../index.css'

const module = (function () {
  const placesList = document.querySelector(".places-list");
  const template = placesList
    .querySelector("#place-template")
    .content.querySelector(".place-card");
  const userInfoButton = document.querySelector(".user-info__button");
  const editButton = document.querySelector(".button__edit");
  const popupClose = document.querySelectorAll(".popup__close");
  const form = document.forms.new;
  const formEdit = document.forms.edit;
  const popupCard = document.querySelector(".popup__addcard");
  const popupEdit = document.querySelector(".popup__edit");
  const popupPhoto = document.querySelector(".popup_photo");
  const popupPhotoImage = document.querySelector(".popup__image");
  const userName = document.querySelector(".user-info__name");
  const userJob = document.querySelector(".user-info__job");
  const userPhoto = document.querySelector(".user-info__photo");
  const popupForm = document.querySelector(".popup__form");
  const popupEditButtonSave = document.querySelector(".popup__button_edit");
  const popupEditButtonCard = document.querySelector(".popup__button_card");
  const popupFormEdit = document.querySelector(".popup__form_edit");
  const name = document.querySelector(".popup__input_type_name");
  const link = document.querySelector(".popup__input_type_link-url");
  const inputJob = document.querySelector(".popup__input_type_about");
  const nameEdit = formEdit.elements.name;
  const aboutEdit = formEdit.elements.about;

  //const author = "https://nomoreparties.co/cohort12/users/me";

  const config = {
    baseUrl: `${(NODE_ENV==='development')?'http://nomoreparties.co/cohort12' : 'https://nomoreparties.co/cohort12'}`,
    headers: {
      authorization: "52cb3d9c-9b1e-48d6-b69c-5749ea84fb0e",
      "Content-Type": "application/json",
    },
  };
  //ООП

  function addNewCard(event) {
    event.preventDefault();

    cardList.addCard(name.value, link.value);
    popupOpenCloseCard.close();
    popupForm.reset();
    validatorFormAdd.setSubmitButtonState(false);
  }

  function openUserEdit() {
    nameEdit.value = userInfo.name;
    aboutEdit.value = userInfo.about;

    editButton.addEventListener("click", function () {
      popupOpenCloseEdit.open();
    });
  }

  function onUserInfoSubmit(event) {
    event.preventDefault();
    const userNameEdit = event.currentTarget.querySelector(
      ".popup__input_type_name"
    );
    const userJob = event.currentTarget.querySelector(
      ".popup__input_type_about"
    );

    userInfo.setUserInfo(userNameEdit.value, userJob.value);

    api
      .userInfoChange(userNameEdit.value, userJob.value)
      .then(() => {
        userInfo.updateUserInfo();
        popupOpenCloseEdit.close();
      })
      .catch((err) => console.log(err));
    validatorFormEdit.setSubmitButtonState(false);
  }

  const openImagePopup = (event) => {
    popupPhotoImage.src = event.target.style.backgroundImage.slice(5, -2);
    popupOpenClosePhoto.open();
  };

  const createCardFunction = (...args) => {
    // не забываем передавать фукнцию открытия попапа
    const card = new Card(...args, openImagePopup, template);

    return card.create();
  };

  const api = new Api(config);

  const cardList = new CardList(
    document.querySelector(".places-list"),
    api,
    createCardFunction
  );

  cardList.render(cardList);

  const userInfo = new UserInfo(userName, userJob);
  userInfo.setUserInfo(userName.textContent, userJob.textContent);

  api
    .getInfo()
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      userPhoto.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => console.log(err));

  const popupOpenCloseCard = new Popup(popupCard, "popup_is-opened");
  userInfoButton.addEventListener("click", function () {
    popupOpenCloseCard.open();
  });

  const popupOpenCloseEdit = new Popup(popupEdit, "popup_is-opened");

  const popupOpenClosePhoto = new Popup(popupPhoto, "popup_is-opened");

  const validatorFormAdd = new FormValidator(form);
  validatorFormAdd.setEventListeners();
  const validatorFormEdit = new FormValidator(formEdit);
  validatorFormEdit.setEventListeners();

  popupClose.forEach(function (item) {
    item.addEventListener("click", function () {
      popupOpenCloseCard.close();
      popupOpenClosePhoto.close();
    });
  });

  popupCard.addEventListener("submit", addNewCard);

  openUserEdit();

  popupEdit.addEventListener("submit", (event) => {
    onUserInfoSubmit(event);
  });
})();

