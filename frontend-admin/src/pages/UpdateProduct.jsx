import React, { useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../context/productContext/ProductContext";
import { updateProduct } from "../context/productContext/apiCalls";
import Moment from "moment";
import storage from "../firebase";
import notifySuccess from "../components/notify/notifySuccess";
import notifyError from "../components/notify/notifyError";
import TopBar from "../components/TopBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function UpdateProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;
  const [productUpdate, setProductUpdate] = useState(product);
  const [cover, setCover] = useState(null);
  const [demo, setDemo] = useState(null);
  const [, setUploaded] = useState(0);
  const { dispatch } = useContext(ProductContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setProductUpdate({ ...productUpdate, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(productUpdate, dispatch);
    setTimeout(() => {
      navigate("/products-list");
    }, 6000);
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName =
        Moment(new Date().getTime()).format("HH:mm:ss") +
        " - " +
        item.file.name;
      const uploadTask = storage
        .ref(`/products-files/${fileName}`)
        .put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          notifyError("The media files could not be loaded.");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setProductUpdate((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
            notifySuccess(
              "The file " + item.file.name + " has been uploaded successfully."
            );
          });
        }
      );
    });
  };

  const handleSubmitCover = (e) => {
    e.preventDefault();
    upload([{ file: cover, label: "cover" }]);
  };

  const handleSubmitDemo = (e) => {
    e.preventDefault();
    upload([{ file: demo, label: "demo" }]);
  };

  return (
    <>
      <div className="page-content">
        <TopBar />
        <div className="d-flex justify-content-center align-items-center">
          <Container fluid>
            <Row className="justify-content-center">
              <Col sm="6">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <Card.Header.Title>
                      <h4 className="card-title">Update product</h4>
                    </Card.Header.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col lg="12">
                          <Row>
                            <div className="col-6 form-group mb-3 ">
                              <label className="form-label">
                                Load another image
                              </label>
                              <input
                                className="form-control form_gallery-upload input-field"
                                name="image"
                                type="file"
                                id="image"
                                onChange={(e) => setCover(e.target.files[0])}
                              />
                            </div>
                            <div className="col-6 form-group mb-3">
                              <label className="form-label">
                                Load another demo
                              </label>
                              <input
                                className="form-control form_gallery-upload input-field"
                                type="file"
                                onChange={(e) => setDemo(e.target.files[0])}
                              />
                            </div>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder={product.title}
                                name="title"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder={product.artist}
                                name="artist"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder={product.releaseYear}
                                name="releaseYear"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder={product.recordCompany}
                                name="recordCompany"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder={product.length}
                                name="length"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder={product.price}
                                name="price"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Form.Group className="col-md-6 mb-3">
                              <select
                                className="form-control input-field"
                                id="exampleFormControlSelect1"
                                name="genre"
                                defaultValue={product.genre}
                                onChange={handleChange}
                              >
                                <option>Choose genre</option>
                                <option>Pop</option>
                                <option>K-pop</option>
                                <option>Rock</option>
                                <option>Country</option>
                                <option>Hip hop</option>
                                <option>Latino</option>
                                <option>Rapping</option>
                              </select>
                            </Form.Group>
                            <Form.Group className="col-md-6 mb-3">
                              <select
                                className="form-control input-field"
                                id="exampleFormControlSelect1"
                                name="availibility"
                                defaultValue={product.availibility}
                                onChange={handleChange}
                              >
                                <option>Choose availibility</option>
                                <option>CD</option>
                                <option>Vinil</option>
                              </select>
                            </Form.Group>
                            <Form.Group className="col-md-6 mb-3">
                              <select
                                className="form-control input-field"
                                id="exampleFormControlSelect1"
                                name="insStock"
                                defaultValue={product.insStock}
                                onChange={handleChange}
                              >
                                <option>Is it in stock?</option>
                                <option>Yes</option>
                                <option>No</option>
                              </select>
                            </Form.Group>
                            <Form.Group className="col-12 mb-3">
                              <Form.Control
                                as="textarea"
                                id="text"
                                name="description"
                                rows="5"
                                placeholder={product.description}
                                className="input-field"
                                onChange={handleChange}
                              ></Form.Control>
                            </Form.Group>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Group className="col-12 myCustomClass">
                          <Link to="/products-list">
                            <Button
                              variant="outline-primary"
                              onClick={handleSubmit}
                            >
                              Update
                            </Button>{" "}
                          </Link>
                          <Button
                            variant="outline-primary"
                            onClick={handleSubmitCover}
                          >
                            Upload image
                          </Button>{" "}
                          <Button
                            variant="outline-primary"
                            onClick={handleSubmitDemo}
                          >
                            Upload demo
                          </Button>{" "}
                          <Link to="/products-list">
                            <Button
                              variant="outline-primary"
                              className="btn-red"
                            >
                              Cancel
                            </Button>
                          </Link>
                        </Form.Group>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
