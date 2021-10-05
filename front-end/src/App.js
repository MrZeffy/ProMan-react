
import WebApp from './WebApp';
// import UserLoginContext from './Contexts/UserInfo';
import Login from './Sections/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoProvider } from './Contexts/UserInfo';
import SignUp from './Sections/SignUp';

const App = () => {

    


    return (
        <Router>
            <UserInfoProvider>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/signup" component={SignUp}/>                    
                    <Route path="/" component={WebApp} />
                </Switch>
            </UserInfoProvider>
        
        </Router>

    )
}

export default App
