import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// outlets
import AllMyWorks from "pages/all-my-works";
import AllMyTodos from "pages/all-my-todos";
import AllMyDones from "pages/all-my-dones";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AllMyWorks /> },
      { path: "/todos", element: <AllMyTodos /> },
      { path: "/dones", element: <AllMyDones /> },
      // { path: "/", element: <AllMyWorks /> },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
