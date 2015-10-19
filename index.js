import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import CatModel from './src/CatModel';

(function(storage, document) {

    ReactDOM.render(
        React.createElement(App, { catModel: new CatModel(storage) }),
        document.getElementById('app')
    );

}(window.localStorage, window.document));