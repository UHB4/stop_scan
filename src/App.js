import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage"
import RestAreaInfo from "./pages/RestAreaInfo";
function App() {
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage/> }/>
              <Route path="/mainpage" element={<MainPage/> }/>
              <Route path="/RestAreaInfo" element={ <RestAreaInfo/> } />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
