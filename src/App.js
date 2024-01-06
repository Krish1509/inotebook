import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './components/context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null)
const showAlert= (message,type)=>{
  setAlert({
    message:message,
    type:type    
  })
  setTimeout(()=>{
    setAlert(null)
  },3000);
}
  return (
  <>
    <NoteState>
    <Router>
    <Navbar showAlert={showAlert}/>
    <Alert alert={alert}/>
    <div className="container">
    <Switch>
          <Route   path="/" exact >
            <Home showAlert={showAlert}/>
          </Route>
          <Route  path="/about" exact element={<About />}>
            <About showAlert={showAlert}/>
          </Route>  
          <Route  path="/Login" exact element={<Login />}>
            <Login showAlert={showAlert}/>
          </Route>  
          <Route  path="/Signup" exact element={<Signup />}>
            <Signup showAlert={showAlert}/>
          </Route>  
    </Switch>
    </div>
    </Router>
    </NoteState>
  </>
  
  );
}

export default App;
