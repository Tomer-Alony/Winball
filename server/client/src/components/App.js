import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Landing, Header } from './';
import Groups from './groups/Groups'
import Games from './games/Games'
import Staticits from './statistics/Statistics'
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
          <Route exact path='/Statistics' component={Staticits} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;