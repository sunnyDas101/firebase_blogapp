import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Tags from '../../components/tags/Tags'
import useFirestore from "../../hooks/useFirestore";
import MostPopular from "../../components/mostPopular/MostPopular";
import "./detail.css";

const Detail = ({ setActive, setSelectedImg }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const { tags, blogs } = useFirestore("blogs")

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
        onClick={() => setSelectedImg(blog?.imgUrl)}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start">{blog?.description}</p>
            </div>
            <div className="col-md-3">
              <Tags tags={tags} />
              <MostPopular blogs={blogs}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
