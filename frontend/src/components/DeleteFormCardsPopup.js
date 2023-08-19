import React, { useState, useEffect } from "react";

function DeleteFormCardsPopup({
  name,
  isOpen,
  isClose,
  onClose,
  buttonText,
  title,
  onSubmit,
  card,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsDeleting(true);
    onSubmit(card);
  }

  useEffect(() => {
    if (!isOpen && isDeleting) {
      setIsDeleting(false);
    }
  }, [isOpen, isDeleting]);

  return (
    <section
      className={`popup popup_purpose_${name} ${isOpen ? "popup_opened" : ""} ${
        isClose ? "popup__opened" : ""
      }`}
    >
      <div className="popup__box">
        <form
          onSubmit={handleSubmit}
          className={`popup__form popup__${name}-form`}
          name={`popup__${name}-form`}
          method="post"
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          <button
            className="popup__save-btn popup__delete-button"
            type="submit"
            disabled={isDeleting}
          >
            {isDeleting ? "Удаление..." : buttonText}
          </button>
        </form>
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

export default DeleteFormCardsPopup;
