import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [deletionCardPopupOpen, setDeletionCardPopupOpen] = React.useState({
    isOpen: false,
    element: {}
  });
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    element: {}
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    id: ""
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAllCardList()
      .then(cardListRes => {
        setCards(cardListRes);
      })
      .catch(err => console.log(err));

  }, []);

  React.useEffect(() => {
    api.getUserInfo()
      .then(({name, about, avatar, _id}) => {
        setCurrentUser({name: name, about: about, avatar: avatar, id: _id})
      }).catch(err => console.log(err))
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmationClick(card) {
    setDeletionCardPopupOpen({
      isOpen: true,
      element: card
    });
  }

  function handleOnCardClick(card) {
    setSelectedCard({
      isOpen: true,
      element: card
    });
  }

  function handleOverlayClick(evt, onClose) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      element: {}
    });
    setDeletionCardPopupOpen({
      isOpen: false,
      element: {}
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser.id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(prevState => prevState.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.updateUserProfile(name, about)
      .then(({name, about, avatar, _id}) => {
        setCurrentUser({name: name, about: about, avatar: avatar, id: _id});
        closeAllPopups();
      }).catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatarLink) {
    api.updateProfileAvatar(avatarLink)
      .then(({name, about, avatar, _id}) => {
        setCurrentUser({name: name, about: about, avatar: avatar, id: _id});
        closeAllPopups();
      }).catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api.createCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch(err => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleOnCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmationClick}
              cards={cards}/>
        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          onOverlayClick={handleOverlayClick}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       onOverlayClick={handleOverlayClick}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         onOverlayClick={handleOverlayClick}/>
        <ConfirmPopup card={deletionCardPopupOpen}
                      onClose={closeAllPopups}
                      onDeleteCard={handleCardDelete}
                      onOverlayClick={handleOverlayClick}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} onOverlayClick={handleOverlayClick}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
