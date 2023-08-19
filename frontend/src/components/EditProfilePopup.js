import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const contextValue = useContext(CurrentUserContext);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: contextValue.currentUser.name,
        about: contextValue.currentUser.about,
      });
    }
  }, [contextValue.currentUser, isOpen, reset]);

  function onSubmit(data) {
    onUpdateUser(data);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      isOpen={isOpen}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isValid={isValid}
    >
      <input
        {...register("name", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 40,
            message: "Максимум 40 символов",
          },
        })}
        className="popup__input popup__profile-name"
        type="text"
        id="fullname"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />
      <span
        className={`popup__input-error ${
          errors?.name && "form__item-error_active"
        }`}
      >
        {errors?.name?.message}
      </span>

      <input
        {...register("about", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 200,
            message: "Максимум 200 символов",
          },
        })}
        className="popup__input popup__profile-job"
        type="text"
        id="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
      />
      <span
        className={`popup__input-error ${
          errors?.about && "form__item-error_active"
        }`}
      >
        {errors?.about?.message}
      </span>
    </PopupWithForm>
  );
}
