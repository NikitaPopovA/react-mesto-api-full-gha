import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddPlacePopup({
  onClose,
  isOpen,
  onAddPlace,
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
      reset({ name: "", link: "" });
    }
  }, [isOpen, reset]);

  function onSubmit(data) {
    onAddPlace(data);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit(onSubmit)}
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
            value: 30,
            message: "Максимум 30 символов",
          },
        })}
        className="popup__input"
        type="text"
        placeholder="Название"
        id="placename"
        minLength="2"
        maxLength="30"
      />
      <span
        className={`popup__input-error ${
          errors?.name && "form__item-error_active"
        }`}
      >
        {errors?.name?.message}
      </span>

      <input
        {...register("link", {
          required: "Поле обязательно к заполнению",
          pattern: {
            value:
              /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            message: "Введите URL",
          },
        })}
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        id="placelink"
      />
      <span
        className={`popup__input-error  ${
          errors?.link && "form__item-error_active"
        }`}
      >
        {errors?.link?.message}
      </span>
    </PopupWithForm>
  );
}
