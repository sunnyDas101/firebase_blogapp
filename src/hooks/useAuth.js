import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  profileImage: "",
};

const useAuth = ({ setActive }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    profileImage,
  } = state;

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!signUp) {
      if (email && password) {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          setActive("home");
          navigate("/");
        } catch (error) {
          console.error("Error signing in:", error);
          if (error.code === "auth/invalid-credential") {
            toast.error(
              "Invalid credentials. Please check your email and password"
            );
          } else {
            toast.error("Error signing in. Please try again.");
          }
        }
      } else {
        toast.error("All fields are mandatory");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Passsword don't match");
      }
      if (password.length < 6) {
        return toast.error("Password should be at least 6 characters");
      }
      if (firstName && lastName && email && password) {
        try {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          // Send email verification
          await sendEmailVerification(user);

          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
            photoURL: profileImage,
          });

          // Display a message to the user about email verification
          toast.info("Verification email sent. Please check your inbox.");

          setActive("home");
          navigate("/verify-email");
        } catch (error) {
          console.error("Error registering user:", error);
          if (error.code === "auth/email-already-in-use") {
            toast.error("This email is already registered.");
          } else {
            toast.error("Error registering user. Please try again.");
          }
        }
      } else {
        toast.error("All fields are mandatory");
      }
    }
  };

  return { state, setState, signUp, setSignUp, handleAuth };
};

export default useAuth;
