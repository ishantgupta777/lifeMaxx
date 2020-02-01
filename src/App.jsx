import React from 'react';
import './App.css';
import MiniDrawer from './components/NavBar'
import NewsPage from './pages/NewsPage'
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import PersonForm from './pages/Form'
import Map from './pages/Map'
import Dashboard from './pages/Dashboard';
import FaceRecog from './pages/FaceRecog';

function App() {

  return (
    <div className="App">
        <Router>
            <MiniDrawer>
              <Switch>
                <Route exact path="/" component={NewsPage} />
                <Route path="/form" component={PersonForm} />
                <Route path="/map" component={Map} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/facerecg" component={FaceRecog} />
              </Switch>
            </MiniDrawer>
        </Router>
    </div>
  );
}

export default App;
