import React from 'react';
import { Alert, Container } from 'reactstrap';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import FishTable from './components/FishTable';
import BugsTable from './components/BugsTable';
import HemisphereButton from './components/HemisphereButton';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [hemisphere, setHemisphere] = useLocalStorage('hemisphere', 'northern');
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Container>
        <Header />
        <p></p>
        <Alert color="warning">All data are stored locally.</Alert>
        <p></p>
        <HemisphereButton hemisphere={hemisphere} callback={setHemisphere} />
        <p></p>
        <Switch>
          <Route path="/bugs">
            <BugsTable hemisphere={hemisphere} />
          </Route>
          <Route path="/">
            <FishTable hemisphere={hemisphere} />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App;
