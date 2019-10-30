import Header from "./Header";
import Head from "next/head";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%"
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const Layout = props => (
  <div>
    <Head>
      <title>SongR</title>
      <link rel="icon" href="/static/favicon.ico" importance="low" />
    </Head>
    <div className="Layout" style={layoutStyle}>
      <Header />
      <div className="Content" style={contentStyle}>
        {props.children}
      </div>
    </div>
  </div>
);

export default Layout;
