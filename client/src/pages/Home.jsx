import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/posts/${location.search}`
        ); // Fetch posts based on the query string
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [location.search]);

  const getText = (text) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((p) => (
          <div className="post" key={p.id}>
            <div className="img">
              <Link to={`/post/${p.id}`}>
                <img
                  src={`http://localhost:8081/uploads/users/${p?.img}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="content">
              <Link className="link" to={`/post/${p.id}`}>
                <h1>{p.title}</h1>
              </Link>
              <p>{getText(p.description)}</p>
              <Link to={`/post/${p.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
