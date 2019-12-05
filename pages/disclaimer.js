import React, { Component } from "react";
import Layout from "../components/Layout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class disclaimer extends Component {
  render() {
    return (
      <Layout>
        <Container className="section mt-md-5 p-4">
          <h1>Disclaimer</h1>
          <div>
            In this disclaimer, the following terms shall have the following
            meanings: the web page: every web page in which the publisher
            includes a hyperlink to this disclaimer with the intention of making
            this disclaimer applicable to it; The publisher: the authorised
            publisher of the web page, being Korsit based in Eindhoven; use(s):
            including loading, logging in, requesting, consulting, reading,
            viewing, listening, editing, filling in (forms), sending,
            (temporarily) copying, storing, forwarding, distributing, making use
            of services, committing legal acts (e.g. buying, renting); you: the
            natural or legal person, whether or not represented, who uses the
            web page; the content: including texts, images, hyperlinks, sound
            and/or video fragments and/or other objects; damage: direct or
            indirect damage of any nature whatsoever, including lost data and
            business, lost turnover, profit or other economic disadvantage. The
            following applies to this web page. By using this web page you agree
            with this disclaimer. The publisher makes every effort to regularly
            update and/or supplement the content of the web page. Despite this
            care and attention, it is possible that the content is incomplete
            and/or incorrect. The publisher provides the content of the web page
            in the state in which it actually is, without warranty or guarantee
            regarding the soundness, suitability for a particular purpose or
            otherwise. The content is experimental and intended for private use.
            The publisher is not liable for damage that has been or threatens to
            be inflicted and results from or in any way related to the use of
            the web page or to the inability to consult the web page. The
            publisher may change or terminate the web page (or have it changed)
            at his own discretion and at any time he wishes, with or without
            prior notice. The publisher is not liable for the consequences of
            the change or termination. Subject to this disclaimer, the publisher
            is not responsible for files of third parties that are clearly
            linked to the web page. Linking does not imply ratification of those
            files. Unauthorised or improper use of the web page or its content
            may result in an infringement of intellectual property rights,
            regulations regarding privacy, publication and/or communication in
            the broadest sense of the word. You are responsible for everything
            you send from the web page. The publisher reserves the right to deny
            you permission to use the web page and/or certain services offered
            on the web page. In addition, the publisher can monitor access to
            the web page. See also your cookie policy as part of our Privacy
            Policy. You will protect and indemnify the publisher, its employees,
            representatives, licensees, trading partners and the author of this
            disclaimer against judicial and extrajudicial measures, convictions,
            etc., including the costs for legal assistance, accountants, etc.
            that are instituted by third parties as a result of or related to
            your use of the web page, your violation of any statutory regulation
            or the rights of third parties.
          </div>
        </Container>
      </Layout>
    );
  }
}
