import logo from './logo.svg';
import './App.css';
import ScanCode from './pages/ScanCode.js';
import Dashboard from './pages/Dashboard.js';
import FormPage from './pages/FormPage.js';
import {BrowserRouter as Router,  Route,Routes} from 'react-router-dom';
import Header from './component/Header/Header';
function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
    <Route  path='/' element={<Dashboard/>} />
    <Route  path='form' element={<FormPage/>} />
    <Route  path='scan' element={<ScanCode/>} />
    </Routes>
    </div>
    </Router>
  );
}

export default App;
