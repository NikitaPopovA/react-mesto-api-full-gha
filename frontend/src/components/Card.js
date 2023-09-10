import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const contextValue = useContext(CurrentUserContext);
  const isOwn = card.owner._id === contextValue.currentUser._id;
  const isLiked = card.likes.some((i) => i._id === contextValue.currentUser._id);
  const cardLikeButtonClassName = `grid-card__like ${
    isLiked && "grid-card__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <article className="grid-card">
      <button
        className={`grid-card__btn-delete ${
          isOwn && "grid-card__btn-delete_visible"
        }`}
        onClick={handleDeleteCard}
      ></button>
      <img
        style={{ backgroundImage: `url(${card.link})` }}
        className="grid-card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="grid-card__description">
        <h2 className="grid-card__title">{card.name}</h2>
        <div className="grid-card__likes-info">
          <button
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
            type="button"
            aria-label="Лайк"
          ></button>
          <span className="grid-card__counter-likes">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
