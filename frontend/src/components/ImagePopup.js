function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_magnification ${
        Object.keys(card).length ? "popup_opened" : ""
      }`}
    >
      <div className="popup__magnification-box">
        <img
          className="popup__magnification-imag"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__full-photo-description">{card.name}</p>
        <button
          className="popup__close-btn"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
