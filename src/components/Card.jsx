import React from "react";

function Card({card, onCardClick}) {

  const handleCardClick = () => {
    onCardClick({
      isOpen: true,
      element: card
    });
  }

  return (
    <li className="element">
      <article>
        <img onClick={handleCardClick} src={card.link} alt={card.name} className="element__image"/>
        <div className="element__basement">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button type="button" className="element__button-like"></button>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
        <button type="button" className="element__button-trash button-opacity"/>
      </article>
    </li>
  )
}

export default Card
