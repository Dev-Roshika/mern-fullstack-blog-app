import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://mern-fullstack-blog-app-api.vercel.app/posts/?cat=${cat}`); // Fetch posts based on the query string
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [cat]);

  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((p) => (
        <div className="post" key={p.id}>
          <img
            src={`https://mern-fullstack-blog-app-api.vercel.app/uploads/posts/${p?.img}`}
            alt=""
            onClick={() => handleClick(p?.id)}
          />
          <h2 style={{ cursor: "pointer" }} onClick={() => handleClick(p?.id)}>
            {p.title}
          </h2>
          <button onClick={() => handleClick(p?.id)}>Read More </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
