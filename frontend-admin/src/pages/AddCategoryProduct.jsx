import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CategoryContext } from "../context/categoryContext/CategoryContext";
import { createCategoryProduct } from "../context/categoryContext/apiCalls";
import { ProductContext } from "../context/productContext/ProductContext";
import { getProducts } from "../context/productContext/apiCalls";
import Moment from "moment";
import storage from "../firebase";
import notifySuccess from "../components/notify/notifySuccess";
import notifyError from "../components/notify/notifyError";
import TopBar from "../components/TopBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function AddCategoryProduct() {
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContext(CategoryContext);
  const { products, dispatch: dispatchProduct } = useContext(ProductContext);
  const [uploaded, setUploaded] = useState(0);

  useEffect(() => {
    getProducts(dispatchProduct);
  }, [dispatchProduct]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({ ...category, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategory({ ...category, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategoryProduct(category, dispatch);
    setTimeout(() => {
      navigate("/categories-list");
    }, 6000);
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName =
        Moment(new Date().getTime()).format("HH:mm:ss") +
        " - " +
        item.file.name;
      const uploadTask = storage
        .ref(`/categories-products-files/${fileName}`)
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
            setCategory((prev) => {
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
    upload([{ file: image, label: "image" }]);
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
                      <h4 className="card-title">Add category</h4>
                    </Card.Header.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg="12">
                        <Form>
                          <div className="col-12 form-group mb-3 ">
                            <label className="form-label">Load image</label>
                            <input
                              className="form-control form_gallery-upload input-field"
                              name="image"
                              type="file"
                              id="image"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </div>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Title"
                              name="title"
                              className="input-field"
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <select
                              className="form-control input-field"
                              name="genre"
                              defaultValue="Genre category"
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
                          <Form.Group className="mb-3">
                            <Col lg="12">
                              <label>
                                Choose the songs that will be part of this
                                category
                              </label>
                            </Col>
                            <Form.Group>
                              <select
                                multiple
                                className="form-control input-field"
                                name="content"
                                onChange={handleSelect}
                              >
                                {products
                                  .sort((a, b) =>
                                    a.title.localeCompare(b.title)
                                  )
                                  .map((product) => (
                                    <option
                                      key={product._id}
                                      value={product._id}
                                    >
                                      {product.title},&nbsp;&nbsp;
                                      {product.artist},&nbsp;&nbsp;
                                      {product.genre}
                                    </option>
                                  ))}
                              </select>
                            </Form.Group>
                          </Form.Group>
                          <Form.Group className="form-group mb-3">
                            {uploaded === 1 ? (
                              <Link to="/categories-list">
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
                            <Link to="/categories-list">
                              <Button
                                variant="outline-primary"
                                className="btn-red"
                              >
                                Cancel
                              </Button>
                            </Link>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
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
