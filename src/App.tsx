import { BrowserRouter, Route, Routes } from "react-router-dom"

import LeftDrawer from "./components/LeftDrawer"
import Transactions from "./pages/transactions/Transactions"
import EditTransaction from "./pages/transactions/EditTransaction"
import AddTransaction from "./pages/transactions/AddTransaction"
import Dashboard from "./pages/Dashboard"
import Reports from "./pages/Reports"
import Start from "./pages/Start"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Start />} />

        <Route path='' element={<LeftDrawer />}>
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:id" element={<EditTransaction />} />
          <Route path="transactions/add" element={<AddTransaction />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
