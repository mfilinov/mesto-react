import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    element: {}
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      element: {}
    });
  }

  return (
    <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}/>
      <Footer/>
      <PopupWithForm title="Редактировать профиль" name="profile-edit" isOpen={isEditProfilePopupOpen}
                     onClose={closeAllPopups}>
        <div className="popup__field">
          <input type="text" name="nameInput" id="name-input" placeholder="Имя"
                 className="popup__input popup__input_el_name"
                 minLength="2" maxLength="40" required/>
          <span className="popup__form-input-error name-input-error"></span>
        </div>
        <div className="popup__field">
          <input type="text" name="aboutInput" id="about-input" placeholder="О себе"
                 className="popup__input popup__input_el_job"
                 minLength="2"
                 maxLength="200" required/>
          <span className="popup__form-input-error about-input-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="add-image" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className="popup__field">
          <input type="text" name="imageName" id="input-image-name" placeholder="Название"
                 className="popup__input popup__input_el_image-name"
                 minLength="2" maxLength="30" required/>
          <span className="popup__form-input-error input-image-name-error"></span>
        </div>
        <div className="popup__field">
          <input type="url" name="imageLink" id="input-image-link" placeholder="Ссылка на картинку"
                 className="popup__input popup__input_el_image-link" required/>
          <span className="popup__form-input-error input-image-link-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="update-avatar" isOpen={isEditAvatarPopupOpen}
                     onClose={closeAllPopups}>
        <div className="popup__field">
          <input type="url" name="avatarLink" id="input-avatar-link" placeholder="Ссылка на аватар"
                 className="popup__input popup__input_el_avatar-link" required/>
          <span className="popup__form-input-error input-avatar-link-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="confirm" isOpen={false} onClose={closeAllPopups}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
