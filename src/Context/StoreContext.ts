import { createContext } from "react"
import type { StoreContextType } from "@src/types"

export const StoreContext = createContext<StoreContextType>({
  fieldsValue: {},
  setFieldsValue: () => {},
})
