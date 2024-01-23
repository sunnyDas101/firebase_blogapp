import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ProgressBar from "../../components/progressBar/ProgressBar";
import useStorage from "../../hooks/useStorage";
import useFirestore from "../../hooks/useFirestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "./addEditBlog.css";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Buisness",
];

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const { title, tags, trending, category, description } = form;

  const { url, progress } = useStorage(file);
  const { addBlogDocument, updateBlogDocument } = useFirestore("blogs");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleFileChange = (e) => {
    let selected = e.target.files[0];
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          const docRef = await addBlogDocument({
            ...form,
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const docRef = await updateBlogDocument(id, {
            ...form,
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  useEffect(() => {
    if (url) {
      setForm((prev) => ({ ...prev, imgUrl: url }));
      toast.info("Image uploaded successfully");
    }
  }, [url, setForm]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        {file && <ProgressBar setFile={setFile} file={file} />}
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              <div className="col-12 py-3">
                <p className="trending">Is it a trending blog?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="radioOption"
                    value="yes"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    &nbsp;Yes&nbsp;&nbsp;&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="radioOption"
                    value="no"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    &nbsp;No
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  className="catg-dropdown"
                  onChange={onCategoryChange}
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  type="text"
                  className="form-control description-box"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-12 py-3">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
