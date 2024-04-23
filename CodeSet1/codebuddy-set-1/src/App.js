import './App.css';
import FirstPageForm from './Components/FirstPageForm';
import SecondPageForm from './Components/SecondPageForm';
import ThirdPageForm from './Components/ThirdPageForm';
import { TakeNumberOfRows } from './Components/Set2/TakeNumberOfRows';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';


function App() {
  const formData = {}
  const [seatsData, setSeatsData] = useState([])
  return (
    <Router>
    <div>
    <h1>{"Let's start for code buddy"}</h1>   
    <Routes>
        <Route path="/set1" element={<FirstPageForm formData={formData}/>} />
        <Route path="/set1/secondPage" element={<SecondPageForm formData={formData}/>} />
        <Route path="/set1/thirdPage" element={<ThirdPageForm formData={formData}/>} />
        <Route path="/set2" element={<TakeNumberOfRows setSeatsData = {setSeatsData}/>}/>
    </Routes>
    </div>
  </Router>
  );
}

export default App;
