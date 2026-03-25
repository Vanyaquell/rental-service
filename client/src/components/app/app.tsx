import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../../pages/main-page/main-page";
import { AppRoute, AuthorizationStatus } from "../../const";
import { LoginPage } from "../../pages/login-page/login-page";
import { FavoritesPages } from "../../pages/favorites-page/favorites-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFound } from "../not-found/not-found";
import { PrivateRoute } from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import { LoadingPage } from "../loading-page/loading-page";
import { useEffect } from "react";
import { checkAuthAction, fetchOffersAction } from "../../store/api-action";
import { useAppDispatch } from "../../hooks";
import { ErrorMessage } from "../error-message/error-message";

type AppMainPageProps = {
    rentalOffersCount: number;
}

function App({ rentalOffersCount }: AppMainPageProps) {
    const dispatch = useAppDispatch();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
    const isServerUnavailable = useAppSelector((state) => state.isServerUnavailable);
    const offers = useAppSelector((state) => state.offers);

    useEffect(() => {
        dispatch(checkAuthAction());
        dispatch(fetchOffersAction());
    }, [dispatch]);

    if (isServerUnavailable) {
        return <LoadingPage />;
    }

    if (authorizationStatus === AuthorizationStatus.UnknownAuth || isOffersDataLoading) {
        return <LoadingPage />;
    }

    return (
        <>
            <ErrorMessage />
            <BrowserRouter>
                <Routes>
                    <Route
                        path={AppRoute.Main}
                        element={<MainPage rentalOffersCount={rentalOffersCount} offersList={offers} />}
                    />
                    <Route path={AppRoute.Login} element={<LoginPage />} />
                    <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route
                        path={AppRoute.Favorites}
                        element={
                            <PrivateRoute authorizationStatus={authorizationStatus}>
                                <FavoritesPages offersList={offers} />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export { App };