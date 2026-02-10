import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from "./components/app/app.tsx";
import { Setting } from "./const.ts";
import { offers } from "./mocks/offers.ts";
import { mapFullOffersToOffersList } from "./mocks/offers-list.ts";
import { reviews } from "./mocks/reviews.ts";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App
        rentalOffersCount={Setting.rentalOffersCount}
        offersList={mapFullOffersToOffersList(offers)}
        offers={offers}
        reviews={reviews} />
    </Provider>
  </StrictMode>,
)