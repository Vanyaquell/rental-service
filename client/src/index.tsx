import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from "./components/app/app.tsx";
import { Setting } from "./const.ts";
import { Provider } from "react-redux";
import { store } from "./store";
import { ErrorMessage } from './components/error-message/error-message.tsx';
import { checkAuthAction, fetchOffersAction } from './store/api-action';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App rentalOffersCount={Setting.rentalOffersCount} />
    </Provider>
  </StrictMode>,
);