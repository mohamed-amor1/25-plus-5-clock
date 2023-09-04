import React from "react";
import ReactDOM from "react-dom/client";
import PomodoroApp from "./App.tsx";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "DM Sans",
          },
        }}
      >
        <PomodoroApp />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
