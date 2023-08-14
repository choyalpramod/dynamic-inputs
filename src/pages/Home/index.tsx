import { useContext, useState } from "react"

import { StoreContext } from "@src/Context/StoreContext"
import {
  StoreContextType,
  CurrentStepsType,
  DynamicInputApiType,
} from "@src/types"
import Loading from "@src/component/Loading"
import { useFetchDynamicApi } from "@src/pages/Home/hooks"
import { Form } from "@src/component/Form"
import { useFormLogic } from "./hooks"
import { getInputs } from "@src/lib/getInputs"

import "./index.scss"

const Home = () => {
  const { isLoading, dynamicInput } = useFetchDynamicApi()

  if (isLoading) return <Loading showLoading={isLoading} />
  if (!dynamicInput) return null

  return <FormWrapper dynamicInput={dynamicInput} />
}

interface FormWrapper {
  dynamicInput: DynamicInputApiType
}

const FormWrapper: React.FC<FormWrapper> = ({ dynamicInput }) => {
  const { fieldsValue } = useContext<StoreContextType>(StoreContext)
  const [currentSteps, setCurrentSteps] = useState<CurrentStepsType>({
    stepId: dynamicInput.data.steps[0].stepId,
    stepIndex: 0,
  })
  const { stepId, stepIndex } = currentSteps
  const { onFormSubmit, onPrevBtn, currentStep } = useFormLogic({
    stepId,
    stepIndex,
    setCurrentSteps,
    dynamicInput,
  })
  const { initialValues, validationSchema } = getInputs(
    currentStep.fields,
    fieldsValue
  )

  return (
    <Form
      onPrevBtn={onPrevBtn}
      onFormSubmit={onFormSubmit}
      key={stepId}
      currentStep={currentStep}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  )
}
export default Home
