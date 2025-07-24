
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homePage';
import AppointmentPage from './pages/appointmentPage';
import UsersPage from './pages/usersPage';
import RegisterPage from './pages/registerPage';
import DashboardPage from './pages/dashboardPage';
import SecretaryPanel from './components/secretaryPage/secretaryPanel';
import GetOTP from './pages/getOTP';
import DoctorPage from './pages/doctorPage';
import PrivateRoute from './routes/privateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path='/doctorPage/:id' element={<DoctorPage/>}></Route>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
          
        <Route path='/getOTP' element={<GetOTP/>}></Route>
        <Route path='/user' element={<UsersPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        
        <Route path='/secretary' element={<SecretaryPanel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

