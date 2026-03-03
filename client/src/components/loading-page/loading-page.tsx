import '../../../public/css/loading-page.css';

function LoadingPage() {
    return (
        <div className="loading-page">
            <div className="loading-page__spinner">
                <div className="loading-page__bounce loading-page__bounce1"></div>
                <div className="loading-page__bounce loading-page__bounce2"></div>
                <div className="loading-page__bounce loading-page__bounce3"></div>
            </div>
            <p className="loading-page__text">Загрузка предложений...</p>
        </div>
    );
}

export { LoadingPage };