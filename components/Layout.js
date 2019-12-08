import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import "./Layout.scss";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../store/index.js";

const store = configureStore({
  reducer: rootReducer
});

const Layout = props => (
  <div className="Layout">
    <Head>
      <title>SongR</title>
      <link rel="icon" href="/static/favicon.ico" importance="low" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </Head>
    <Provider store={store}>
      <Header />
      <div className="Content">{props.children}</div>
      <Footer />
    </Provider>
  </div>
);

export default Layout;
