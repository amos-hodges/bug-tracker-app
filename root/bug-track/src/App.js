import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashboardLayout from './components/DashboardLayout'
import Welcome from './features/auth/Welcome'
import TicketsList from './features/tickets/TicketsList'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dashboard" element={<DashboardLayout />} >

          <Route index element={<Welcome />} />

          <Route path="tickets">
            <Route index element={<TicketsList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

        </Route>{/* end dashboard */}

      </Route>

    </Routes>

  );
}

export default App;
