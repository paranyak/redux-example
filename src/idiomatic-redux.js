import React from 'react';
import { render } from 'react-dom';

import Root from './components/Root';
import configureStore from "./configureStore";


const store = configureStore();
console.log("Alla");
render(
    <Root store={store} />,
    document.getElementById('root')
);