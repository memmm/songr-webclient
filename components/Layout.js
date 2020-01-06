import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import "./Layout.scss";

class Layout extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div className="Layout">
      <Head>
        <title>SongR - Connect through music</title>
        <meta name="description" content="We believe music should be a shared experience. Find people who can
          truly understand your musical taste and have a discussion!"></meta>
        <meta name="og:title" property="og:title" content="Your Awesome Open Graph Title"></meta>
        <meta name="og:description" content="We believe music should be a shared experience. Find people who can
          truly understand your musical taste and have a discussion!"></meta>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Head>
        <Header />
        <div className="Content">{this.props.children}</div>
        <Footer />
    </div>
    )}
};

export default Layout;
