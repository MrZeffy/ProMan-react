
import './App.css';
import SideBar from './Components/SideBar'
import ProjectSection  from './Sections/ProjectSection';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <SideBar />

        <div className="mainContentContainer">
          <Switch>
            <Route path="/" exact>
              {/* Home componenet */}
              Home
            </Route>
            <Route path="/tracker" exact>
              {/* Time tracker */}
              Time Tracker
            </Route>
            <Route path="/projecttracker" exact>
              {/* Project tracker */}
              <ProjectSection></ProjectSection>
            </Route>
            <Route path="/inbox" exact>
              {/* Inbox */}
              Inbox
            </Route>
            <Route path="/settings" exact>
              {/* Settings */}
              Settings
            </Route>
            <Route path="/logout">
              {/* Logout */}
              Logout
            </Route>
          </Switch>
        </div>

      </Router>
      

    </div>
  );
}

export default App;
