import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Landing, Header, Groups, Scores, Games } from './';
import Statistics from './statistics/Statistics';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, []);

  return (
    <div className='container'>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/Groups' component={Groups} />
          <Route exact path='/Games' component={Games} />
          <Route exact path='/Bets' component={Scores} />
          <Route exact path='/Statistics' component={Statistics} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;