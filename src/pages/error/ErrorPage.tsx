import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import whiteLogo from "../../assets/white_logo.png";

export function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred";
  let errorCode = "Error";

  if (isRouteErrorResponse(error)) {
    errorCode = String(error.status);
    errorMessage =
      error.status === 404
        ? "The page you're looking for doesn't exist"
        : error.statusText || errorMessage;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-4">
      <Link to="/" className="mb-8 transition-transform hover:scale-105">
        <img src={whiteLogo} alt="Logo" className="h-16 w-auto" />
      </Link>

      <div className="text-center">
        <h1 className="text-8xl font-bold text-cyan-500 mb-4">{errorCode}</h1>
        <p className="text-xl text-neutral-400 mb-8">{errorMessage}</p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
