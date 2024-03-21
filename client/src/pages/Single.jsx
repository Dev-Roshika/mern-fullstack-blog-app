import React from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://img.freepik.com/free-photo/view-cooked-crawfish_23-2150426277.jpg?w=996&t=st=1710930710~exp=1710931310~hmac=dc90e57fef8eeba9d6b7e4016ce71abd4ee6d8165d3f9c8be1f4534653d3e1c2"
          alt=""
        />

        <div className="user">
          <img
            src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?t=st=1710930926~exp=1710934526~hmac=1e95e4ab26ff26029536155c3ec31865cd1a0fe1fd16cad0c5eea3797feda8f6&w=996"
            alt=""
          />
          <div className="info">
            <span className="name">John Doe</span>
            <p className="date">1 hour ago</p>
          </div>
          <div className="edit">
            <Link to = "/write?edit=2">
            <img src = {Edit} alt = "" />
            </Link>
            <img src = {Delete} alt = "" />
          </div>
        </div>
        <h1 className="title">Lorem ipsum dolor sit amet.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate eveniet dolores repellat qui voluptatibus nulla, voluptates modi, nihil eius velit porro, quae recusandae molestiae reprehenderit cumque provident doloremque sequi officiis quis iusto nostrum cum. Molestias voluptatibus nobis sequi voluptas doloribus praesentium eligendi, consequatur laudantium officia aut ipsum eius cum tempore dolor ullam corporis doloremque. Similique minima recusandae aperiam, corporis voluptatem sint aspernatur delectus placeat quasi voluptas expedita non doloribus labore, in ab corrupti quas voluptatum blanditiis necessitatibus nobis! Consequuntur, ab ut minus aspernatur maiores molestiae sit possimus amet maxime inventore cumque adipisci impedit earum repellat neque voluptate itaque eum nam a eius, aperiam sunt quis aut! Natus ducimus iure facilis libero id nesciunt harum necessitatibus officia minus culpa consequatur, nihil accusamus rerum cumque beatae repudiandae blanditiis sit eligendi repellat provident minima iusto vero dolore reiciendis. Veritatis quod, consectetur autem maxime accusamus necessitatibus dignissimos ducimus perspiciatis! Fugit vel ratione sit atque, neque facere earum ex itaque velit exercitationem modi inventore cumque dolorum! Laudantium facilis, illum quos tempore eum eius provident dolorum sed delectus voluptate. Qui animi quos consectetur nobis similique quis id rem placeat non atque? Voluptate sint sequi quidem? Quis, consequuntur libero. Incidunt pariatur, doloremque id fugiat quo rem vero!</p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
