//import logo from './logo.svg';
import './App.css';
//import Form from './Components/form';
import 'bootstrap/dist/css/bootstrap.css';
//import  Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BothSide from './Components/Login/BothSide'
import LandingPage from "./Components/LandingPage/LandingPage"
import CreatePolicy from './Components/CreatePolicy/CreatePolicy';
import ViewPolicy from './Components/viewPolicy/ViewPolicy';
import IssuePolicy from './Components/issuePolicy/IssuePolicy';
import GetQuotes from './Components/getQuotes/GetQuotes';
import ViewConsumerBusiness from './Components/ConsumerBusiness/ViewConsumerBusiness'
import CreateConsumerBusiness from './Components/ConsumerBusiness/CreateConsumerBusiness'
import ViewBusinessProperty from './Components/BusinessProperty/ViewBusinessProperty'
import CreateBusinessProperty from './Components/BusinessProperty/CreateBusinessProperty'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={< BothSide />}></Route>
        <Route exact path='/Home' element={< LandingPage />}></Route>
        <Route exact path='/ConsumerBusiness' element={< ViewConsumerBusiness />}></Route>
        <Route exact path='/ConsumerBusiness/CreateConsumerBusiness' element={< CreateConsumerBusiness />}></Route>
        <Route exact path='/BusinessProperty' element={< ViewBusinessProperty />}></Route>
        <Route exact path='/BusinessProperty/CreateBusinessProperty' element={< CreateBusinessProperty />}></Route>
        <Route exact path='/CreatePolicy' element={< CreatePolicy />}></Route>
        <Route exact path='/ViewPolicy' element={< ViewPolicy />}></Route>
        <Route exact path='/IssuePolicy' element={< IssuePolicy />}></Route>
        <Route exact path='/ViewQuotes' element={< GetQuotes />}></Route>
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
