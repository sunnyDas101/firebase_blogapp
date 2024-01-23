import React from "react";
import { excerpt } from "../../utility/index";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import "./blogSection.css";

const BlogSection = ({ blogs, user, setSelectedImg, handleDelete }) => {
  const userId = user?.uid;

  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>
      {blogs?.map((item) => (
        <div className="row pb-4" key={item.id}>
          <div className="col-md-5">
            <div className="hover-blogs-img">
              <div
                className="blogs-img"
                onClick={() => setSelectedImg(item.imgUrl)}
              >
                <img src={item.imgUrl} alt={item.title} />
                <div></div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="text-start">
              <h6 className="category catg-color">{item.category}</h6>
              <span className="title py-2">{item.title}</span>
              <span className="meta-info">
                <p className="author">{item.author}</p> -&nbsp;
                {item.timestamp.toDate().toDateString()}
              </span>
              <div className="short-description">
                {excerpt(item.description, 90)}
              </div>
              <Link to={`/detail/${item?.id}`}>
                <div className="btn btn-read">Read More</div>
              </Link>
              {userId && item.userId === userId && (
                <div style={{ float: "right" }}>
                  <FontAwesome
                    name="trash"
                    style={{ margin: "15px", cursor: "pointer" }}
                    size="2x"
                    onClick={() => handleDelete(item.id)}
                  />
                  <Link to={`/update/${item.id}`}>
                    <FontAwesome
                      name="edit"
                      style={{ margin: "15px", cursor: "pointer" }}
                      size="2x"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSection;
