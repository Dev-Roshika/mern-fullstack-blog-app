import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/posts/?cat=${cat}`); // Fetch posts based on the query string
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((p) => (
        <div className="post" key={p.id}>
          <img src={`http://localhost:8081/uploads/posts/${p?.img}`} alt="" />
          <h2>{p.title}</h2>
          <button onClick={() => navigate(`/post/${p?.id}`)}>Read More </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
