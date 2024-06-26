import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const postId = location.pathname.split("/")[2]; // localhost:3000/post/1 => ["", "post", "1"]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        axios.defaults.withCredentials = true; // Pass the cookies with requests to the server
        const res = await axios.get(`https://mern-fullstack-blog-app-api.vercel.app/posts/${postId}`); // Fetch a single post by ID
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://mern-fullstack-blog-app-api.vercel.app/posts/${postId}`); // Delete a post by ID
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`https://mern-fullstack-blog-app-api.vercel.app/uploads/posts/${post?.img}`} alt="" />
        <div className="user">
          <img
            src={`https://mern-fullstack-blog-app-api.vercel.app/uploads/users/${post?.uid?.img}`}
            alt=""
          />
          <div className="info">
            <span className="name">{post?.uid?.username}</span>
            <p className="date">Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.uid?.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img src={Delete} onClick={handleDelete} alt="" />
            </div>
          )}
        </div>
        <h1 className="title">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
