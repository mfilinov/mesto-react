function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name}${props.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form name={`popup-${props.name}-form`} className="popup__form" noValidate>
          {props.children}
          <button type="submit" className="popup__button popup__button-submit">Сохранить</button>
        </form>
        <button onClick={props.onClose} type="button"
                className="popup__button popup__button-close button-opacity"></button>
      </div>
    </div>
  );
}

export default PopupWithForm
