import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectBlogById, deleteBlog } from "../store/blogSlice";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LikesContext } from "../context/LikeContext";

const BlogDetails = () => {
  const { id } = useParams();
  const blogUnit = useSelector((state) => selectBlogById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    toast.success("Post deleted successfully!");
    dispatch(deleteBlog(blogUnit.id));
    navigate("/");
  };

  const { likes, toggleLike } = useContext(LikesContext);

  const handleLikeClick = () => {
    toggleLike(id);
  };

  const isLiked = likes[id];

  const buttonStyle = isLiked
    ? { backgroundColor: "white", color: "white" }
    : { backgroundColor: "grey", color: "white" };

  const likeButton = (
    <Button
      style={buttonStyle}
      onClick={handleLikeClick}
    >
      {isLiked ? (

        <img
          src={process.env.PUBLIC_URL + "/SvgData/like-svgrepo-com.svg"}
          alt="Notebook"
          width="25px"
          height="25px"

        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + "/SvgData/emoticons-color-like-no-svgrepo-com.svg"}
          alt="Notebook"
          width="25px"
          height="25px"


        />
      )}
    </Button>
  );

  const handleEdit = () => {
    navigate(`/edit-blog/${blogUnit.id}`);
  };

  return (
    <div style={{ backgroundColor: "#212529", position: "fixed", width: "100%", height: "100%" }}>
      <Button
        type="button"
        bg="light"
        variant="dark"
        onClick={() => navigate("/")}
        style={{
          justifyContent: "center",
          position: "relative",
          top: "3%",
          left: "3%",
          marginBottom: "25px",
          color: "white",
          backgroundColor: "#757373",
        }}
      >
        BACK
      </Button>

      <Card
        key={blogUnit.id}
        text={"dark"}
        style={{
          width: "50rem",
          margin: "0 auto",
          marginTop: "50px",
          padding: "20px",
          backgroundColor: "#6996fd",

        }}
      >
        <Card.Body>
          <Card.Title>
            <div>
              <div
                style={{
                  marginRight: "25px",
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                <b>
                  {blogUnit.category}
                </b>
              </div>
              <div>{blogUnit.title}</div>
            </div>
          </Card.Title>
          <Card.Text>
            {blogUnit.description}
          </Card.Text>
        </Card.Body>


        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderTop: "1px solid #ccc" }}>
          {likeButton}
          {/* <Button
            type="button"
            bg="dark"
            variant="success"
            onClick={handleEdit}
          >
            Edit
          </Button> */}

          <img
            src={process.env.PUBLIC_URL + "/SvgData/writing-edit-svgrepo-com.svg"}
            alt="Notebook"
            width="5%"
            height="5%"
            onClick={handleEdit}

          />


          <img
            src={process.env.PUBLIC_URL + "/SvgData/delete-svgrepo-com.svg"}
            alt="Notebook"
            width="5%"
            height="5%"
            onClick={handleDelete}

          />

          {/* <Button
            type="button"
            bg="light"
            variant="danger"
            onClick={handleDelete}
          >

            Delete

          </Button> */}






        </div>
      </Card>
    </div >
  );
};

export default BlogDetails;
