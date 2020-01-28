import React from 'react';
import './App.css';
import MiniDrawer from './components/NavBar'
import NewsPage from './pages/NewsPage'
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import PersonForm from './pages/Form'


function App() {

  return (
    <div className="App">
      <MiniDrawer>
        <Router>
            <Switch>
              <Route exact path="/" component={NewsPage} />
              <Route path="/form" component={PersonForm} />
            </Switch>
        </Router>
      </MiniDrawer>
    </div>
  );
}

export default App;
