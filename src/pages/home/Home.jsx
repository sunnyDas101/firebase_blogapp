import React from "react";
import useFirestore from "../../hooks/useFirestore";
import BlogSection from "../../components/blogSection/BlogSection";
import Modal from "../../components/modal/Modal";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
import Tags from "../../components/tags/Tags";
import MostPopular from "../../components/mostPopular/MostPopular";
import Trending from "../../components/trending/Trending";
import "./home.css";

const Home = ({ user, selectedImg, setSelectedImg }) => {
  const { blogs, deleteBlogDocument, loading, setLoading, tags, trendBlogs } =
    useFirestore("blogs");

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        setLoading(true);
        await deleteBlogDocument(id);
        toast.success("Blog Deleted successfully!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      {selectedImg ? (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      ) : (
        <div className="container padding">
          <div className="row mx-0">
            <Trending trendBlogs={trendBlogs} />
            <div className="col-md-8">
              <BlogSection
                blogs={blogs}
                user={user}
                setSelectedImg={setSelectedImg}
                handleDelete={handleDelete}
              />
            </div>
            <div className="col-md-3">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
