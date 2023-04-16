import React from "react";
import {api} from "../utils/api";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("#");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
        api.getUserInfo(),
        api.getAllCardList()
      ]
    )
      .then(([userInfoRes, cardListRes]) =>{
        setUserName(userInfoRes.name);
        setUserDescription(userInfoRes.about);
        setUserAvatar(userInfoRes.avatar);
        setCards(cardListRes);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img src={userAvatar} alt="Аватар" className="profile__avatar-image"/>
            <button onClick={onEditAvatar} type="button"
                    className="profile__button-avatar button-opacity"></button>
          </div>
          <div className="profile__text">
            <h1 className="profile__title">{userName}</h1>
            <button onClick={onEditProfile} type="button"
                    className="profile__button-edit button-opacity"></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__button-add button-opacity"></button>
      </section>
      <section className="elements" aria-label="галерея">
        <ul className="elements__list list">
          {cards.map(card => (<Card key={card['_id']} card={card} onCardClick={onCardClick}/>))}
        </ul>
      </section>
    </main>
  );
}

export default Main
