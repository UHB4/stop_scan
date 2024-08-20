import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage"
import RestAreaInfo from "./pages/RestAreaInfo";
import GasStation from "./pages/GasStation";
import ElecStation from "./pages/ElecStation";
function App() {
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage/> }/>
              {/*<Route path="/mainpage" element={<MainPage/> }/>*/}
              <Route path="/RestAreaInfo" element={ <RestAreaInfo/> } />
              <Route path="/GasStation" element={ <GasStation/> } />
              <Route path="/ElecStation" element={ <ElecStation/> } />



            </Routes>
          </Router>
    </div>
  );
}

export default App;
