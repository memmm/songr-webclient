import React from "react";
import Layout from "../components/Layout";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Image from 'react-bootstrap/Image';
import Form from "react-bootstrap/Form";




const setting = () => {
  return (
      <Layout>
        <Container className="setting-container m-auto">
          <Row>
            <Col xs={12} md={4} className="d-flex flex-column">

              <div className="py-3 border-info d-flex align-items-center justify-content-between">
                <div>
                  Account Settings
                </div>
              </div>

              <div>

                <InputGroup className="mb-3">
                  <FormControl
                      placeholder="username"
                      aria-label="username"
                      aria-describedby="basic-addon2"/>
                  <InputGroup.Append>
                    <Button variant="outline-secondary">Change</Button>
                  </InputGroup.Append>
                </InputGroup>

              </div> <div>

              <InputGroup className="mb-3">
                <FormControl  type="password"
                              placeholder="password"
                              aria-label="password"
                              aria-describedby="basic-addon2"/>
                <InputGroup.Append>
                  <Button variant="outline-secondary">Change</Button>
                </InputGroup.Append>
              </InputGroup>

            </div>

              <div>

                <InputGroup className="mb-3">
                  <FormControl
                      placeholder="Email:<email@email.nl>"
                      aria-label="email"
                      aria-describedby="basic-addon2"/>
                  <InputGroup.Append>
                    <Button variant="outline-secondary">Change</Button>
                  </InputGroup.Append>
                </InputGroup>

              </div>
              <div>

                <InputGroup className="mb-3">
                  <FormControl
                      placeholder="Thumbnail"
                      aria-label="thumbnail"
                      aria-describedby="basic-addon2"/>
                  <Col xs={2} md={3}>
                    <Image src="static/thumb.jpg"thumbnail   />
                  </Col>
                  <InputGroup.Append>
                    <Button variant="outline-secondary">Change</Button>
                  </InputGroup.Append>
                </InputGroup>

              </div>
              <div>

                <InputGroup className="mb-3">
                  <FormControl
                      placeholder="Not connected to specify"
                      aria-label="username"
                      aria-describedby="basic-addon2"/>

                  <InputGroup.Append>
                    <Button variant="outline-secondary">Change</Button>
                  </InputGroup.Append>

                </InputGroup>
                <Form.Text className="text-muted">
                  Connect now to enjoy everything that Songr has to offer!
                </Form.Text>

              </div>



            </Col>
            <Col  xs={12} md={8} className="d-flex flex-column ">

              <div className={" mx-3 p-3 flex-grow-1 rounded-bottom d-flex flex-column justify-content-between"}>
                <p>Preferences</p>
              </div>
              <div className="py-1 border border-info d-flex align-items-center justify-content-between ">


                <div  className="mx-3 p-3 flex-grow-1 rounded-bottom d-flex flex-column justify-content-between">
                  <div className="py-3 border-0  d-flex align-items-center justify-content-between">

                    <div>
                      Songs
                    </div>
                    <div>
                      <Button>+</Button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">


                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Songs list..</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl as="textarea" aria-label="With textarea" />
                    </InputGroup>

                  </div>

                  <div>

                  </div>
                  <div className="py-3 border-0  d-flex align-items-center justify-content-between">

                    <div>
                      Genres
                    </div>
                    <div>
                      <Button>+</Button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">

                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Genres list..</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl as="textarea" aria-label="With textarea" />
                    </InputGroup>

                  </div>

                  <div className="py-3 border-0  d-flex align-items-center justify-content-between" >

                    <div>
                      Artists
                    </div>
                    <div>
                      <Button>+</Button>
                    </div>
                  </div>

                  <div className=" d-flex align-items-center justify-content-between ">

                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Artists list..</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <div>
                    </div>
                  </div>

                </div>
              </div>
            </Col>
          </Row>

        </Container>
      </Layout>
  );
}
export default setting;



