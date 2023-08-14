import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, useForm } from "react-hook-form"
import { InputRadio } from "@src/component/InputRadio"
import { InputText } from "@src/component/InputText"
import { ButtonType, StepsType, StoreInputsType, SchemaForm } from "@src/types"
import WarningIcon from "@src/SVGIcons/WarningIcon"
import { Button } from "@src/component/Button"

interface Props {
  onFormSubmit: (data: StoreInputsType) => void
  onPrevBtn: () => void
  initialValues: StoreInputsType
  validationSchema: SchemaForm
  currentStep: StepsType
}

export const Form = (props: Props) => {
  const {
    initialValues,
    onFormSubmit,
    validationSchema,
    currentStep,
    onPrevBtn,
  } = props
  const { primaryButtonLabel, secondaryButtonLabel, title, fields } =
    currentStep

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { ...initialValues },
  })
  console.log(initialValues)

  const createInputs = () =>
    fields.map((field) => {
      switch (field.type) {
        case "radio":
          return <InputRadio {...field} key={field.fieldId} />
        default:
          return <InputText {...field} key={field.fieldId} />
      }
    })
  const isAnyRequiredField = currentStep.fields.some(
    (field) => field.validation.required
  )

  return (
    <div className="steps">
      <div className="steps__child">
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onFormSubmit)}>
            <div className="steps__container">
              {isAnyRequiredField && (
                <div>
                  <div className="steps__required--field">
                    <WarningIcon /> Required
                  </div>
                </div>
              )}
              <div className="steps__title">{title}</div>
              <div className="steps__input-fields">{createInputs()}</div>
              <div className="steps-navigation-container">
                <div>
                  <Button
                    isVisible={!!secondaryButtonLabel}
                    label={secondaryButtonLabel}
                    onClickCallback={onPrevBtn}
                  />
                </div>
                <div>
                  <Button
                    label={primaryButtonLabel}
                    isPrimaryBtn={true}
                    btnType={ButtonType.submit}
                  />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
