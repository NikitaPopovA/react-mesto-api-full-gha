import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
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
      reset({ avatar: "" });
    }
  }, [isOpen, reset]);

  function onSubmit(data) {
    onUpdateAvatar(data);
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <input
        {...register("avatar", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          pattern: {
            value:
              /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            message: "Введите URL",
          },
        })}
        type="url"
        className="popup__input popup__card-link"
        id="avatar"
        placeholder="Ссылка на аватар"
      />
      <span
        className={`popup__input-error ${
          errors?.avatar && "form__item-error_active"
        }`}
      >
        {errors?.avatar?.message}
      </span>
    </PopupWithForm>
  );
}
