import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import SignUp from "./routes/SignUp.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Error from "./routes/ErorrPage.tsx";
import { SignUp, Error } from "./routes/index.ts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
