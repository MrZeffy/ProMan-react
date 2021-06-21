
import './App.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import SideBar from './Components/SideBar'
import ProjectSection from './Sections/ProjectSection';

import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';



const routeData = [
  {
    path: '/',
    data: 'Home'
  },
  {
    path: '/tracker',
    data: 'Time Tracker'
  },
  {
    path: '/projecttracker',
    data: <ProjectSection />
  },
  {
    path: '/inbox',
    data: 'inbox'
  },
  {
    path: '/settings',
    data: 'Settings'
  },
  {
    path: '/logout',
    data: 'Log out'
  }
]

function App() {
  


  return (
    <div className="App">
      
        <Router>
        <SideBar />

        <div className="mainContentContainer">


          

            <RoutingComponenet />

          

          


        </div>

        </Router>

      


    </div>
  );
}

const RoutingComponenet = ()=>{
  const location = useLocation();

  return (
    <Switch>
      



        {routeData.map((ele, index) => (
          
            <Route path={ele.path} exact>

              {ele.data}

            </Route>
          
        ))}

      
    </Switch>

  )
}
  


export default App;
