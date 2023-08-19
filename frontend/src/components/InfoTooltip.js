import { useEffect } from "react";
import errorLogo from "../images/Tooltip-error.svg";
import successLogo from "../images/Tooltip-union.svg";

function InfoTooltip({ name, isOpen, onClose, isSubmitSucceed }) {
  let infoToolTipLogo;
  let infoToolTipText;

  if (isSubmitSucceed) {
    infoToolTipLogo = successLogo;
    infoToolTipText = "Вы успешно зарегистрировались!";
  } else {
    infoToolTipLogo = errorLogo;
    infoToolTipText = "Что-то пошло не так! Попробуйте ещё раз.";
  }

  function handleEscClose(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose, false);
    } else {
      document.removeEventListener("keydown", handleEscClose, false);
    }
  }, [isOpen]);

  return (
    <div className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__box popup__container_purpose_${name}`}>
        <button
          className="popup__close-btn"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
        <img
          src={infoToolTipLogo}
          alt="Знак успешной регистрации"
          className={`popup__${name}-image`}
        />
        <p className={`popup__${name}-text`}>{infoToolTipText}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
