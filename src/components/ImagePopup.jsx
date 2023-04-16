function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup-open-image${card.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img src={card.element.link} alt={card.element.name} className="popup__figure-image"/>
          <figcaption className="popup__figcaption-image">{card.element.name}</figcaption>
        </figure>
        <button onClick={onClose} type="button" className="popup__button popup__button-close button-opacity"></button>
      </div>
    </div>
  );
}

export default ImagePopup
