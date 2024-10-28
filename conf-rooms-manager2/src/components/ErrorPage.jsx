import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error); // Log the error for debugging

    // Fetch role from localStorage once
    const role = localStorage.getItem('role');

    // Define home path based on role
    const homePath = role === 'admin' ? '/admin-home' : '/home';

    return (
        <div className="container text-center mt-5">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>

            {error?.statusText || error?.message ? (
                <p>
                    <i>{error?.statusText || error?.message}</i>
                </p>
            ) : null}

            {role ? (
                <Link to={homePath} className="btn btn-primary mt-3">
                    Go Back Home
                </Link>
            ) : <Link to="/login" className="btn btn-primary mt-3">
                Go Back Home
            </Link>}
        </div>
    );
};

export default ErrorPage;
