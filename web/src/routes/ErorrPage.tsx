import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (!isRouteErrorResponse(error)) {
    return <h1>An error occurred</h1>;
  }
  return (
    <div>
      <h1 className="text-2 xl">Page Not Found</h1>
      <p className="text-xl">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <p>
        <i>{error.statusText || (error.error?.message && error.status)} </i>
      </p>
    </div>
  );
};

export default Error;
