import { useContext } from "react"
import { StoreContext } from "@src/Context/StoreContext"
import { StoreContextType } from "@src/types"

export default function Results() {
  const { fieldsValue } = useContext<StoreContextType>(StoreContext)

  return <pre>{JSON.stringify(fieldsValue, null, 2)}</pre>
}
