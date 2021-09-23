import React from 'react'
import './App.css';

// Sections
import SideBar from './Components/SideBar'
import ProjectSection from './Sections/ProjectSection';
import InboxSection from './Sections/InboxSection';
import OverviewSection from './Sections/OverviewSection';
import SettingsSection from './Sections/SettingsSection';
import TimeTracker from './Sections/TimeTracker'
import LogoutSection from './Sections/LogoutSection'
import { useUserInfo } from './Contexts/UserInfo';


import { Switch, Route, Redirect } from 'react-router-dom';



const routeData = [
  {
    path: '/',
    data: OverviewSection
  },
  {
    path: '/tracker',
    data: TimeTracker
  },
  {
    path: '/projecttracker',
    data: ProjectSection
  },
  {
    path: '/inbox',
    data: InboxSection
  },
  {
    path: '/settings',
    data: SettingsSection
  },
  {
    path: '/logout',
    data: LogoutSection
  }
]

function App() {
  const [activeMenuItem, setActiveMenuItem] = React.useState(0);
  const loggedIn = useUserInfo();
  


  return (
    <div className="App">
      
        {(!loggedIn && <Redirect to="/login?message=1" />)}
        
        <SideBar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}/>

        <div className="mainContentContainer">

            <RoutingComponenet setActiveMenuItem={setActiveMenuItem}/>

        </div>

        

    </div>
  );
}

const RoutingComponenet = ({setActiveMenuItem})=>{
  


  return (

    <Route render={()=>(
     
          <Switch>
            
            <React.Fragment>


              {routeData.map(({path, data}, index) => {
                const Component = data;
                return (
                  

                    <Route path={path} key={index} exact>
                      <Component setActiveMenuItem={setActiveMenuItem} item={index}/>

                    </Route>

                )
              })}
                              

            </React.Fragment>
          </Switch>
       
    )}>

    
    </Route>

  )
}
  


export default App;
