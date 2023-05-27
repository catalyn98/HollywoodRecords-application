import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../context/productContext/ProductContext";
import { createProduct } from "../context/productContext/apiCalls";
import Moment from "moment";
import storage from "../firebase";
import notifySuccess from "../components/notify/notifySuccess";
import notifyError from "../components/notify/notifyError";
import TopBar from "../components/TopBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function AddProduct() {
  const [product, setProduct] = useState(null);
  const [cover, setCover] = useState(null);
  const [demo, setDemo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const navigate = useNavigate();
  const { dispatch } = useContext(ProductContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(product, dispatch);
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
            setProduct((prev) => {
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

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: cover, label: "cover" },
      { file: demo, label: "demo" },
    ]);
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
                      <h4 className="card-title">Add product</h4>
                    </Card.Header.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col lg="12">
                          <Row>
                            <div className="col-6 form-group mb-3 ">
                              <label className="form-label">Load image</label>
                              <input
                                className="form-control form_gallery-upload input-field"
                                name="image"
                                type="file"
                                id="image"
                                onChange={(e) => setCover(e.target.files[0])}
                              />
                            </div>
                            <div className="col-6 form-group mb-3">
                              <label className="form-label">Load demo</label>
                              <input
                                className="form-control form_gallery-upload input-field"
                                type="file"
                                onChange={(e) => setDemo(e.target.files[0])}
                              />
                            </div>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Artist"
                                name="artist"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Release year"
                                name="releaseYear"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Record company"
                                name="recordCompany"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Length"
                                name="length"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Col sm="6" className="form-group mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Price RON"
                                name="price"
                                className="input-field"
                                onChange={handleChange}
                              />
                            </Col>
                            <Form.Group className="col-md-6 mb-3">
                              <select
                                className="form-control input-field"
                                id="exampleFormControlSelect1"
                                onChange={handleChange}
                                name="genre"
                                defaultValue={"Genul filmului"}
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
                                name="availability"
                                defaultValue={"Availability"}
                                onChange={handleChange}
                              >
                                <option>Choose availability</option>
                                <option>CD</option>
                                <option>Vinil</option>
                              </select>
                            </Form.Group>
                            <Form.Group className="col-md-6 mb-3">
                              <select
                                className="form-control input-field"
                                id="exampleFormControlSelect1"
                                name="insStock"
                                defaultValue={"Is it in stock?"}
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
                                placeholder="Description"
                                className="input-field"
                                onChange={handleChange}
                              ></Form.Control>
                            </Form.Group>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Group className="col-12 myCustomClass">
                          {uploaded === 2 ? (
                            <Link to="/products-list">
                              <Button
                                variant="outline-primary"
                                onClick={handleSubmit}
                              >
                                Add
                              </Button>{" "}
                            </Link>
                          ) : (
                            <Link to="#">
                              <Button
                                variant="outline-primary"
                                onClick={handleUpload}
                              >
                                Upload
                              </Button>{" "}
                            </Link>
                          )}
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
