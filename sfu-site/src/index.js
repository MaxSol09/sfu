import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import * as Msal from '@azure/msal-browser'
import * as MsalReact from '@azure/msal-react'
import store from './redux/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));

const msalConfig = {
  auth: {
    clientId: 'a8f9a734-8c4c-4d69-8464-deece744f7dd', // Replace with your client ID
    authority: 'https://login.microsoftonline.com/de36771e-2ded-41fc-b339-3d5fbcbc371d',
    redirectUri: '/login', // Replace with your redirect URI
    postLogoutRedirectUri: '/login'
  }
};

export const msalInstance = new Msal.PublicClientApplication(msalConfig)

root.render(
  <BrowserRouter>
    <MsalReact.MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalReact.MsalProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
