import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// redux
import store from "./store/index";
import { Provider } from "react-redux";

// outlets
import AllMyWorks from "pages/all-my-works";
import AllMyTodos from "pages/all-my-todos";
import AllMyDones from "pages/all-my-dones";
import CreateTodo from "pages/create-todo";

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
      { path: "/create", element: <CreateTodo /> },
    ],
  },
]);
root.render(
  <React.StrictMode>
    {/* redux store 추가 */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
