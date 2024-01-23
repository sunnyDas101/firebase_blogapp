import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useStorage from "../../hooks/useStorage";
import ProgressBar from "../../components/progressBar/ProgressBar";
import { toast } from "react-toastify";
import "./auth.css";

const Auth = ({ setActive }) => {
  const [file, setFile] = useState(null);

  const { state, setState, signUp, setSignUp, handleAuth } = useAuth({
    setActive,
  });

  const { firstName, lastName, email, password, confirmPassword } = state;

  const { url } = useStorage(file, "profileImages");

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    if(url){
      setState((prev) => ({ ...prev, profileImage: url }));
      toast.info("Profile image uploaded successfully")
    }
  }, [url, setState]);

  return (
    <div className="container-fluid mb-4">
      <div className="container">
      {file && <ProgressBar setFile={setFile} file={file} />}
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signUp ? "Login Now" : "Signup Now"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              {signUp && (
                <>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {signUp && (
                <>
                  <div className="col-12 py-3">
                    <input
                      type="password"
                      className="form-control input-text-box"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 py-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                </>
              )}
              <div className="col-12 py-3 text-center">
                <button
                  className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit"
                >
                  {!signUp ? "Login" : "SignUp"}
                </button>
              </div>
            </form>
            <div>
              {!signUp ? (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?&nbsp;
                      <span
                        className="link-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSignUp(true)}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account?&nbsp;
                      <span
                        className="link-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSignUp(false)}
                      >
                        Sign In
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
