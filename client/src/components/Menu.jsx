import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

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
          <img src={p.img} alt="" />
          <h2>{p.title}</h2>
          <button>Read More </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
