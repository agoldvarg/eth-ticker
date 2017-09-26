import React from 'react';
import ReactDOM from 'react-dom';
import './Stylesheets/style.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
