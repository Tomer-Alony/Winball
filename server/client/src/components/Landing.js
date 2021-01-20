import React from 'react';
import { Redirect } from 'react-router-dom';

const Landing = () => {
  return (
    <Redirect to='/groups' />
  );
};

export default Landing;