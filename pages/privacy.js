import React, { Component } from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";

export default class privacy extends Component {
  render() {
    return (
      <Layout>
       <Container className="section mt-md-5 p-4 p-md-5">
          <h1 className="mb-4">Privacy Policy</h1>

          <h4>If your privacy is important to us, why do we need your data?</h4>
          <p>We need to handle some of your personal data to:</p>
          <ul>
            <li>Process your purchase</li>
            <li>Send you an email with your invoice and the purchase confirmation</li>
            <li>Connect you with the correct person</li>
            <li>Optimize our customer service</li>
            <li>Perform payment security checks</li>
          </ul>
          <h4>How long do we store your data?</h4>
          <p>We store your data just as long as it is necessary to provide you with our service. After 5 years your data will be erased.</p>


          <h4>Are we providing data to third parties?</h4>
          <p>Rest assured: we will never sell your data to 3rd parties!
          Part of the data we collect is however passed on to Google Analytics, but only anonymously. 
          So this data can not be traced back to you or any of the services you use.
          In case you make a purchase on our website, we may need to pass on part of your data to certain payment providers 
          (for instance: refer you through to the PayPal website).
          </p>
          <h4>Minors</h4>
          <p>If you are 16 or younger, you may only use our website under the supervision of your parents or legal representatives.</p>

          <h4>Complaints?</h4>
          <p>It can happen that you are not satisfied with our services, products, other issues or our customer service. 
          In that case we would like you to contact our company directly and tell us how we can improve our service. 
          In most cases an official complaint will not be necessary after first contacting us. 
          You can find the contact details of us below.</p>
        </Container>
      </Layout>
    );
  }
}
