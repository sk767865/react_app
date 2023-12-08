import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs.blogs);

  const colors = [
    "#741190",   // Purple
    "#FF5733",   // Orange
    "#00CC99",   // Teal
    "#FFD700",   // Gold
    "#4B0082",   // Indigo
    "#00FFFF",   // Cyan
    "#FF1493",   // Pink
    "#32CD32",   // Lime Green
    "#8A2BE2",   // Blue Violet
    "#FFA500",   // Orange
    "#9932CC",   // Dark Orchid
    "#1E90FF",   // Dodger Blue
    "#8B0000",   // Dark Red
    "#228B22",   // Forest Green
    "#4682B4",   // Steel Blue
    "#FF69B4",   // Hot Pink
  ];

  const truncateDescription = (description) => {
    const maxLength = 4;
    if (description.split(" ").length > maxLength) {
      return `${description.split(" ").slice(0, maxLength).join(" ")}...`;
    }
    return description;
  };

  useEffect(() => {
    if (blogs.length === 0) {

      navigate("/no-data-found");
    }
  }, [blogs, navigate]);

  return (
    <Container style={{ backgroundColor: "#212529", padding: "20px", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "white" }}>
        <img
          src={process.env.PUBLIC_URL + "/SvgData/notebook-svgrepo-com.svg"}
          alt="Notebook"
          width="6%"
          height="6%"

        />
        Blog Post App</h2>

      <Row>
        {blogs.map((blog, index) => (
          <Col md={4} key={blog.id} style={{ marginBottom: "4%" }}>
            <Card

              className="mb-3 card-with-shadow"
              style={{ backgroundColor: colors[index % colors.length] }}
              text="white"


            >
              <Card.Header>
                <Card.Title>
                  <span ><b>{blog.category}</b></span>
                  <br />
                  {blog.title}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>{truncateDescription(blog.description)}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link
                  to={`/blog-details/${blog.id}`}
                  className="text-white"


                >
                  <span>
                    <a className="read-more-link" >Click here to read more...</a>
                  </span>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

