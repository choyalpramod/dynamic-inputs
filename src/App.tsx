import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { StoreContext } from "@src/Context/StoreContext"
import { StoreInputsType } from "@src/types"

import Results from "@src/pages/Results"
import Home from "@src/pages/Home"
import "./styles/index.scss"

function App() {
  const [inputs, setInputs] = useState<StoreInputsType>({})

  return (
    <StoreContext.Provider
      value={{
        fieldsValue: inputs,
        setFieldsValue: setInputs,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  )
}

export default App
