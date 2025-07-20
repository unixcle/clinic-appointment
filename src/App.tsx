
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homePage';
import AppointmentPage from './pages/appointmentPage';
import UsersPage from './pages/usersPage';
import RegisterPage from './pages/registerPage';
import DashboardPage from './pages/dashboardPage';
import SecretaryPanel from './components/secretaryPage/secretaryPanel';
import DoctorPage from './pages/doctorPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path='/doctorPage/:id' element={<DoctorPage/>}></Route>
        <Route path='/user' element={<UsersPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/secretary' element={<SecretaryPanel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

