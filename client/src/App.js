import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (

      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/auth' exact element={ <Auth/>  }/>
          <Route path="/" element={  <> <Navbar/> <Home /> </>} />
          <Route path="*" element={<Navigate to="/" />} />
      
        </Routes>
        <div style={{marginBottom : 20}}></div>
      </BrowserRouter>
  );
}

export default App;
