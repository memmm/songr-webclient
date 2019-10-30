import Header from "./Header";
import Head from "next/head";
import { Global, jsx, css } from "@emotion/core";

const Layout = props => (
  <div className="Layout">
    <Head>
      <title>SongR</title>
      <link rel="icon" href="/static/favicon.ico" importance="low" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
    </Head>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
        html,
        body,
        #__next {
          height: 100%;
          width: 100%;
        }
      `}
    />
    <Header />
    <div className="Content">{props.children}</div>
  </div>
);

export default Layout;
