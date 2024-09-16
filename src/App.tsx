import { BrowserRouter, Route, Routes } from "react-router-dom"

import LeftDrawer from "./components/LeftDrawer"
import Transactions from "./pages/transactions/Transactions"
import EditTransaction from "./pages/transactions/EditTransaction"
import AddTransaction from "./pages/transactions/AddTransaction"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='' element={<LeftDrawer />}>
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:id" element={<EditTransaction />} />
          <Route path="transactions/add" element={<AddTransaction />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
