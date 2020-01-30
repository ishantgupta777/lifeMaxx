import React from 'react';
import './App.css';
import MiniDrawer from './components/NavBar'
import NewsPage from './pages/NewsPage'
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import PersonForm from './pages/Form'
import Map from './pages/Map'


function App() {

  return (
    <div className="App">
        <Router>
            <MiniDrawer>
              <Switch>
                <Route exact path="/" component={NewsPage} />
                <Route path="/form" component={PersonForm} />
                <Route path="/map" component={Map} />
              </Switch>
            </MiniDrawer>
        </Router>
    </div>
  );
}

export default App;
