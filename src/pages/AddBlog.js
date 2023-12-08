import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { addBlog } from '../store/blogSlice';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';

const AddPage = () => {
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState('');
  const [showWordCount, setShowWordCount] = useState(false);
  const [category, setCategory] = useState('');
  const [startsWithCapital, setStartsWithCapital] = useState(true); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);

    if (form.checkValidity() === true && startsWithCapital) {
      const id = uuid();
      const title = event.target.title.value;

     
      const selectedCategory = category;

      dispatch(addBlog({ id, title, category: selectedCategory, description }));

      toast.success('Blog post added successfully!');
      navigate('/');
    }
  };

  const handleDescriptionChange = (event) => {
    const inputText = event.target.value;
    const wordCount = countWords(inputText);
    const startsWithCapitalLetter = /^[a-zA-Z]/.test(inputText.trim());

    if (wordCount <= 500 && startsWithCapitalLetter) {
      setDescription(inputText);
      setShowWordCount(true);
    } else {
      setDescription(''); 
      setShowWordCount(false);
    }
  };

 
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div style={{ backgroundColor: '#212529', position: 'relative', width: '100%', height: '140vh', padding: '10px' }}>
      <Button
        type="button"
        onClick={() => navigate('/')}
        style={{
          justifyContent: 'center',
          marginBottom: '25px',
          backgroundColor: '#757373',
          borderColor: 'black',
          color: 'white',
        }}
      >
        BACK
      </Button>
      <Card
        text={'dark'}
        style={{
          width: '100%',
          maxWidth: '900px', 
          margin: '0 auto',
          backgroundColor: 'rgb(216 232 244)',
         
          
        }}
      >
        <Card.Header>
          <h5 style={{ justifyContent: 'center', textAlign: 'center' }}>Add Blog</h5>
        </Card.Header>
        <Card.Body>
          <div
            className="mx-auto col-12 col-lg-10"
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md="10">
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Title"
                      pattern="^[A-Z][A-Za-z0-9\s]*$"
                      title="Please provide a valid title. It must start with a capital letter and cannot begin with a number or special character."
                    />
                    <Form.Control.Feedback>Title looks fine</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid title. It must start with a capital letter and cannot begin with a number or special character.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="10">
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      value={category}
                      onChange={handleCategoryChange}
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
                    <Form.Control.Feedback>Category Looks fine</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please select a category</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="10">
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Describe about your experience..."
                      required
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                    {showWordCount && (
                      <div style={{ color: 'inherit' }}>
                        <b>{countWords(description)} / 500 words</b>
                      </div>
                    )}
                    <i>Max limit is 500 words..</i>
                    <Form.Control.Feedback type="invalid">
                      Please provide some description and it should not start with space.
                      <br />
                      Description should not start with a number or any special character and be 500 words or less.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="10">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddPage;
