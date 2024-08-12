import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage"
import RestAreaInfo from "./pages/RestAreaInfo";
import GasStation from "./pages/GasStation";
function App() {
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage/> }/>
              {/*<Route path="/mainpage" element={<MainPage/> }/>*/}
              <Route path="/RestAreaInfo" element={ <RestAreaInfo/> } />
                <Route path="/GasStation" element={ <GasStation/> } />



            </Routes>
          </Router>
    </div>
  );
}

export default App;
