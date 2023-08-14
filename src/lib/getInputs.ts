import * as Yup from "yup"
import { AnyObject } from "yup/lib/types"
import { StoreInputsType, FieldsType, ValidationType } from "@src/types"

type YupString = Yup.StringSchema<
  string | undefined,
  AnyObject,
  string | undefined
>

const generateValidations = (validations: ValidationType): YupString | null => {
  let schema = Yup.string()
  for (const rule in validations) {
    if (!validations[rule]) continue
    switch (rule) {
      case "email":
        schema = schema.email("Please provide valid email address")
        break
      case "required":
        schema = schema.required("It's a required field")
        break
    }
  }

  return schema
}

export const getInputs = (
  fields: FieldsType[],
  fieldsValue: StoreInputsType
) => {
  let initialValues: StoreInputsType = {}

  let validationsFields: Record<string, any> = {}

  for (const field of fields) {
    const { fieldId, validation, properties } = field
    const savedValue = fieldsValue[fieldId]
    if (Array.isArray(properties)) {
      initialValues[fieldId] = savedValue || ""
    } else {
      initialValues[fieldId] = savedValue ?? properties.value
    }

    validationsFields[fieldId] = generateValidations(validation)
  }

  return {
    validationSchema: Yup.object({ ...validationsFields }),
    initialValues: initialValues,
  }
}
