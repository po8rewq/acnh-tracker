import React, { Suspense, lazy } from 'react';
import { Container } from 'reactstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';
import Loading from './components/Loading';

const RecipeList = lazy(() => import('./components/RecipeList'));
const TurnipsPage = lazy(() => import('./components/TurnipsPage'));
const FishTable = lazy(() => import('./components/FishTable'));
const BugsTable = lazy(() => import('./components/BugsTable'));
const FossilsTable = lazy(() => import('./components/FossilsTable'));
const SeaCreaturesTable = lazy(() => import('./components/SeaCreaturesTable'));

const App = () => {
  const [hemisphere, setHemisphere] = useLocalStorage('hemisphere', 'northern');

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Suspense fallback={<Loading />}>
        <Container fluid="md" style={{ marginTop: '15px' }}>
          <Switch>
            <Route path="/diy/:event">
              <RecipeList />
            </Route>
            <Route path="/bugs">
              <BugsTable hemisphere={hemisphere} setHemisphere={setHemisphere} />
            </Route>
            <Route path="/sea_creatures">
              <SeaCreaturesTable hemisphere={hemisphere} setHemisphere={setHemisphere} />
            </Route>
            <Route path="/fossils">
              <FossilsTable />
            </Route>
            <Route path="/turnips">
              <TurnipsPage />
            </Route>
            <Route path="/">
              <FishTable hemisphere={hemisphere} setHemisphere={setHemisphere} />
            </Route>
          </Switch>
        </Container>
      </Suspense>
    </Router>
  );
};

export default App;
