import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './component/layout/Landing';
import Auth from './views/Auth';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={props => <Auth {...props} authRouter="login" />} />
        <Route exact path='/register' render={props => <Auth {...props} authRouter="register" />} />
      </Switch>
    </Router>

  );
}

export default App;
