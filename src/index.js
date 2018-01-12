import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchMovie from './SearchMovie';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SearchMovie />, document.getElementById('root'));
registerServiceWorker();
