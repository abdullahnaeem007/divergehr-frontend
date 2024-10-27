import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddResume from './Components/AddResume';
import Navbar from './Components/Navbar';
import SideBar from './Components/SideBar';
import { Fragment } from 'react';
import Chatbot from './Components/Chatbot';
import ReportAndEvaluation from './Components/ReportAndEvaluation';
import ShowAllCandidates from './Components/ShowAllCandidates';

function App() {
  return (
    <div class='w-full min-h-screen'>
      <Navbar/>
      <SideBar/>

      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route exact path='/TopCandidates' Component={ShowAllCandidates} />
            <Route exact path='/add' Component={AddResume}/>
            <Route exact path='/chatbot' Component={Chatbot}/>
            <Route exact path='/report' Component={ReportAndEvaluation}/>
          </Routes>
        </Fragment>
      </BrowserRouter>

    </div>
  );
}

export default App;
