import { useEffect } from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  buttonText,
  title,
  children,
  onSubmit,
  isValid,
}) {
  function handleEscClose(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }
  
  useEffect(() => {
    document.addEventListener("keydown", handleEscClose, false);
    return () => {
      document.removeEventListener("keydown", handleEscClose, false);
    };
  }, [isOpen]);

  return (
    <section className={`popup ${name} ${isOpen ? "popup_opened" : ""} `}>
      <div className="popup__box">
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__${name}-form`}
          name={`popup__${name}-form`}
          method="post"
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className={`popup__save-btn ${
              isValid ? "" : "popup__save-btn_disabled"
            }`}
            type="submit"
          >
            {buttonText}
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

export default PopupWithForm;
