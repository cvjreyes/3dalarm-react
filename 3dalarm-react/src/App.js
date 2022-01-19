import React from 'react';
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
        <Route path={"/"+process.env.REACT_APP_PROJECT+"/"} element={<WelcomeLoginF/>} />
        <Route path={"/"+process.env.REACT_APP_PROJECT+"/manager"} element={<Alarms/>}/>
      </Routes>
    </BrowserRouter>
  
    </div>
  );
}

export default App;

