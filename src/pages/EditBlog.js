import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectBlogById, updateBlog } from "../store/blogSlice";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

const MAX_DESCRIPTION_LENGTH = 500;

const EditBlog = () => {
  const { id } = useParams();

  const blog = useSelector((state) => selectBlogById(state, id));
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [description, setDescription] = useState(blog.description);
  const [isLiked, setIsLiked] = useState(blog.isLiked);
  const [descriptionError, setDescriptionError] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [startsWithCapital, setStartsWithCapital] = useState(true); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  useEffect(() => {
    const count = countWords(description);
    setWordCount(count);
    setDescriptionError(
      count > MAX_DESCRIPTION_LENGTH
        ? "Description should be 500 words or less."
        : ""
    );
    setStartsWithCapital(/^[a-zA-Z]/.test(description.trim())); 
  }, [description]);

  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;

    if (/^\s/.test(inputText)) {
      // Check if description starts with white space
      setDescriptionError("Description should not start with white space.");
    } else {
      setDescriptionError("");
      setDescription(inputText);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);

    if (wordCount > MAX_DESCRIPTION_LENGTH || !startsWithCapital) {
      setDescriptionError("Description should not start with a number or any special character and be 500 words or less.");
      return;
    }

    if (form.checkValidity() === true) {
      setDescriptionError("");
      dispatch(updateBlog({ id, title, category, description, isLiked }));
      toast.success("Updated successfully!");

      navigate(`/blog-details/${id}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#212529",
        position: "relative",
        width: "100%",
        height: "140vh",
        padding: '10px'
      }}
    >
      <Button
        type="button"
        bg="light"
        variant="dark"
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#757373",
          color: "white",
          marginBottom: "25px",
          marginLeft: "1%",
          marginTop: "1%",
          top: "3%",
          left: "3%",
        }}
      >
        BACK
      </Button>
      <Card
        border="primary"
        text={"dark"}
        style={{
          width: '100%',
          maxWidth: '900px', // Set a smaller maximum width for the card
          margin: '0 auto',
          backgroundColor: 'rgb(216 232 244)',
          //  bottom:"10%"
        }}
      >
        <Card.Header>
          <h5 style={{ textAlign: "center" }}>Edit Blog</h5>
        </Card.Header>

        <Card.Body>
          <div
            className="mx-auto col-12 col-lg-10"
            style={{
              width: "100%",
              marginBottom: "25px",
            }}
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Title"
                    pattern="^[A-Z][A-Za-z0-9\s]*$"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={title}
                  
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid title. Use the first letter capital. It cannot start with a number or special character.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    defaultValue={category}
                    onChange={(e) => setCategory(e.target.value)}
                
                  >
                    <option value="">Select a category</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Environment">Environment</option>
                    <option value="Space">Space</option>
                    <option value="Programming">Programming</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                  </Form.Control>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please select a category.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Describe your experience in less than 500 words..."
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                 
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a description.
                  </Form.Control.Feedback>
                  {descriptionError && (
                    <div className="text-danger">{descriptionError}</div>
                  )}
                  {description.length > 0 && (
                    <div className="text-muted">
                      <b>Word Count: {wordCount}</b>
                    </div>
                  )}
                  <i>Max limit is 500 words.</i>
                </Form.Group>
              </Row>

              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditBlog;
