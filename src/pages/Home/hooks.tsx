import { useContext, useState, useEffect } from "react"
import { StoreContext } from "@src/Context/StoreContext"
import { StoreContextType } from "@src/types"
import { DynamicInputApiType, CurrentStepsType } from "@src/types"
import { useNavigate } from "react-router-dom"

export const useFetchDynamicApi = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [dynamicInput, setDynamicInput] = useState<DynamicInputApiType>()

  const fetchResponse = async () => {
    try {
      const apiResponse: DynamicInputApiType = await (
        await fetch("http://localhost:3001/formFields")
      ).json()
      setDynamicInput(apiResponse)
    } catch (err) {}
    setLoading(false)
  }

  useEffect(() => {
    fetchResponse()
  }, [])

  return {
    isLoading,
    dynamicInput,
  }
}

interface UseFormWrapperType {
  stepId: string
  stepIndex: number
  setCurrentSteps: React.Dispatch<React.SetStateAction<CurrentStepsType>>
  dynamicInput: DynamicInputApiType
}

export const useFormLogic = ({
  stepId,
  stepIndex,
  setCurrentSteps,
  dynamicInput,
}: UseFormWrapperType) => {
  const { setFieldsValue } = useContext<StoreContextType>(StoreContext)
  const navigate = useNavigate()
  const { steps, logic } = dynamicInput.data
  const onFormSubmit = (data: Record<string, string>) => {
    setFieldsValue((field) => ({
      ...field,
      ...data,
    }))
    for (let formLogic of logic) {
      const { condition, target } = formLogic
      if (target !== stepId) continue

      for (let stepCondition of condition) {
        const { fieldId, value, destination } = stepCondition
        if (!(data[fieldId] === value)) continue

        return setCurrentSteps({
          stepId: destination,
          stepIndex: steps.findIndex((step) => step.stepId === destination),
        })
      }
    }
    if (stepIndex === steps.length - 1) {
      return navigate("/results")
    }
    setCurrentSteps((prevSteps) => ({
      stepId: steps[prevSteps.stepIndex + 1].stepId,
      stepIndex: prevSteps.stepIndex + 1,
    }))
  }
  const onPrevBtn = () => {
    if (stepIndex === 0) return

    setCurrentSteps((prevSteps) => ({
      stepId: steps[prevSteps.stepIndex - 1].stepId,
      stepIndex: prevSteps.stepIndex - 1,
    }))
  }

  return {
    onFormSubmit,
    onPrevBtn,
    currentStep: steps[stepIndex],
  }
}

interface UseNavigationHookType {
  stepIndex: number
  setCurrentSteps: React.Dispatch<React.SetStateAction<CurrentStepsType>>
  dynamicInput: DynamicInputApiType
}

export const useNavigationHook = ({
  dynamicInput,
  stepIndex,
  setCurrentSteps,
}: UseNavigationHookType) => {
  const { steps } = dynamicInput.data
  const onPrevBtn = () => {
    if (stepIndex === 0) return

    setCurrentSteps((prevSteps) => ({
      stepId: steps[prevSteps.stepIndex - 1].stepId,
      stepIndex: prevSteps.stepIndex - 1,
    }))
  }
  const currentStep = steps[stepIndex]

  return {
    onPrevBtn,
    currentStep,
  }
}
