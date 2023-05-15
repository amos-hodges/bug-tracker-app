import { Routes, Route } from 'react-router-dom'
import { ROLES } from './config/roles'
import Layout from './components/Layout'
import Public from './components/Public'
import DashboardLayout from './components/DashboardLayout'
import Welcome from './features/auth/Welcome'
import Login from './features/auth/Login'
import ProjectList from './features/projects/ProjectList'
import NewProjectForm from './features/projects/NewProjectForm'
import EditProject from './features/projects/EditProject'
import TicketsList from './features/tickets/TicketsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditTicket from './features/tickets/EditTicket'
import NewTicket from './features/tickets/NewTicket'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'




function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dashboard" element={<DashboardLayout />} >

                <Route index element={<Welcome />} />

                {/* Admin/Manager Only */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>

                  <Route path="projects">
                    <Route index element={<ProjectList />} />
                    <Route path=":id" element={<EditProject />} />
                    <Route path="new" element={<NewProjectForm />} />
                  </Route>

                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>

                </Route> {/* End Admin/Manager Only*/}

                <Route path="tickets">
                  <Route index element={<TicketsList />} />
                  <Route path=":id" element={<EditTicket />} />
                  <Route path="new" element={<NewTicket />} />
                </Route>


              </Route>{/* end dashboard */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}
      </Route>

    </Routes>

  );
}

export default App;
