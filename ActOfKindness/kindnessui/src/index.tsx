import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/index.css';
import { router } from './app/router/Routes';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { store, StoreContext, useStore } from './app/stores/store';
import LoadingComponent from './app/common/LoadingComponent';
import agent from './app/api/agent';
import { observer } from 'mobx-react-lite'; // Import observer from mobx-react-lite

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const AppWrapper = observer(() => {
    return (
        <StoreContext.Provider value={store}>
            <RouterProvider router={router} />
        </StoreContext.Provider>
    );
});

root.render(<AppWrapper />);

reportWebVitals();
