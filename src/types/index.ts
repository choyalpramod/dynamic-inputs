import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object"
import { AnyObject } from "yup/lib/types"

export type StoreInputsType = {
  [key: string]: string
}

export type StoreContextType = {
  fieldsValue: StoreInputsType
  setFieldsValue: React.Dispatch<React.SetStateAction<StoreInputsType>>
}

export type LogicConditionType = {
  fieldId: string
  value: string
  destination: string
}

export type LogicType = {
  target: string
  condition: LogicConditionType[]
}

export type FieldPropertiesType = {
  id: string
  placeholder: string
  label: string
  description: string
  value: any
}

export enum InputType {
  input = "input",
  radio = "radio",
}
export type ValidationType = Record<string, boolean>

export type FieldsType = {
  fieldId: string
  type: InputType
  properties: FieldPropertiesType | FieldPropertiesType[]
  validation: ValidationType
}

export type StepsType = {
  stepId: string
  title: string
  fields: FieldsType[]
  secondaryButtonLabel: string
  primaryButtonLabel: string
}

export type DynamicInputApiType = {
  version: string
  data: {
    steps: StepsType[]
    logic: LogicType[]
  }
}

export interface CurrentStepsType {
  stepId: string
  stepIndex: number
}

export interface IconProps {
  height?: number
  width?: number
  stroke?: string
}

export enum ButtonType {
  submit = "submit",
  button = "button",
}

export type FormValuesType = Record<string, number | string | boolean>

export type SchemaForm = OptionalObjectSchema<
  {
    [x: string]: any
  },
  AnyObject,
  TypeOfShape<{
    [x: string]: any
  }>
>
