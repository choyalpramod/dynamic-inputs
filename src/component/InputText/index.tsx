import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@src/component/ErrorMessage"
import "./index.scss"
import { FieldsType } from "@src/types"

export const InputText: React.FC<FieldsType> = ({ fieldId, properties }) => {
  if (Array.isArray(properties)) return null
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[fieldId]?.message as string | undefined
  const { description, value, label, ...rest } = properties

  return (
    <div className="input-text">
      <label htmlFor={properties.id} className="input-text__label">
        {label}
      </label>
      <input
        {...register(fieldId)}
        {...rest}
        className="input-text__input"
        type="text"
      />
      <ErrorMessage error={error} />
    </div>
  )
}
