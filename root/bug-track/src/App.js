import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashboardLayout from './components/DashboardLayout'
import Welcome from './features/auth/Welcome'
import TicketsList from './features/tickets/TicketsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditTicket from './features/tickets/EditTicket'
import NewTicket from './features/tickets/NewTicket'

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dashboard" element={<DashboardLayout />} >

          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>

          <Route path="tickets">
            <Route index element={<TicketsList />} />
            <Route path=":id" element={<EditTicket />} />
            <Route path="new" element={<NewTicket />} />
          </Route>


        </Route>{/* end dashboard */}

      </Route>

    </Routes>

  );
}

export default App;
