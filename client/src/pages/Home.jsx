import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
      const res = await axios.get("http://localhost:8081/posts");
      setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);


  return (
    <div className="home">
      <div className="posts">
        {posts.map((p) => (
          <div className="post" key={p._id}>
            <div className="img">
              <Link to={`/post/${p._id}`}>
                <img src={p.img} alt="" />
              </Link>
            </div>
            <div className="content">
              <Link className="link" to={`/post/${p._id}`}>
                <h1>{p.title}</h1>
              </Link>
              <p>{p.description}</p>
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
