import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import penIcon from "../images/Pen-icon.svg";

function Main({
  onEditAvatar,
  onCardClick,
  onEditProfile,
  onAddPlace,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const contextValue = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${contextValue.currentUser.avatar})` }}
        >
          <img
            src={penIcon}
            className="profile__avatar-image"
            alt="Обновить аватар"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{contextValue.currentUser.name}</h1>
          <p className="profile__subtitle">{contextValue.currentUser.about}</p>
        </div>

        <button
          className="profile__edit-button"
          type="button"
          aria-label="Редактировать"
          onClick={onEditProfile}
        ></button>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>
      <section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              {...card}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

export default Main;
