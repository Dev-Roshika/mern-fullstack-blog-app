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
          `https://mern-fullstack-blog-app-api.vercel.app/posts/${location.search}`
        ); // Fetch posts based on the query string
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [location.search]);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    const truncated = description.substr(0, maxLength);
    // Ensure we don't truncate in the middle of a word
    return (
      truncated.substr(
        0,
        Math.min(truncated.length, truncated.lastIndexOf(" "))
      ) + " ..."
    );
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((p) => (
          <div className="post" key={p.id}>
            <div className="img">
              <Link to={`/post/${p.id}`}>
                <img
                  src={`https://mern-fullstack-blog-app-api.vercel.app/uploads/posts/${p?.img}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="content">
              <Link className="link" to={`/post/${p.id}`}>
                <h1>{p.title}</h1>
              </Link>
              <div
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(p.description, 150),
                }}
              />
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
