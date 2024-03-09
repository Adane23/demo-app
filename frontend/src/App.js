
import './App.css';
// Import the Router from react-router
import {Routes, Route} from "react-router";

// Import the components 
import Home from "./pages/Home";
import AddEmployee  from './pages/AddEmployee';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/add-employee' element={<AddEmployee />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
