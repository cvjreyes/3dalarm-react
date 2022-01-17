import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Alarms from "./pages/alarms/alarms";
import WelcomeLoginF from './pages/welcomeLoginF/welcomeLoginF';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeLoginF/>} />
        <Route path="/3dalarm" element={<Alarms/>}/>
      </Routes>
    </BrowserRouter>
  
    </div>
  );
}

export default App;

