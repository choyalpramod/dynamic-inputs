import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@src/component/ErrorMessage"
import "./index.scss"
import { FieldsType } from "@src/types"

export const InputRadio: React.FC<FieldsType> = ({ fieldId, properties }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[fieldId]?.message as string | undefined

  if (!Array.isArray(properties)) return null

  return (
    <>
      <div className="input-radio-container">
        {properties.map((property) => {
          const { id, label, description, ...rest } = property
          return (
            <div className="input-radio" key={`${id}-${fieldId}`}>
              <input
                {...register(fieldId)}
                {...rest}
                className="input-radio__input"
                type="radio"
                id={id}
              />
              <label htmlFor={id} className="input-radio__btn">
                <span className="input-radio__checked" />
                <span className="input-radio__label">{label}</span>
              </label>
            </div>
          )
        })}
      </div>
      <ErrorMessage error={error} />
    </>
  )
}
