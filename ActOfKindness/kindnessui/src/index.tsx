import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/index.css';
import {router} from "./app/router/Routes";
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {store, StoreContext} from "./app/stores/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>
);


reportWebVitals();
