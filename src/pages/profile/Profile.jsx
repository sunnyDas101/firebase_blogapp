import React, { useEffect, useState } from "react";
import useStorage from "../../hooks/useStorage";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import "./profile.css";

const Profile = ({ user, setActive }) => {
  const [newFile, setNewFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const defaultPhotoURL =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const { url } = useStorage(newFile, "profileImages");

  const { setState } = useAuth({ setActive });

  useEffect(() => {
    const updateProfileImage = async () => {
      if (url) {
        setState((prev) => ({ ...prev, profileImage: url }));

        await updateProfile(user, {
          photoURL: url,
        });
      }
    };
    updateProfileImage();
  }, [url, user, setState]);

  const handleFileChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      setNewFile(file);
    });
    input.click();
  };

  const handleEditDetails = async () => {
    setIsEditing(true);
  };

  const handleSaveDetails = async () => {
    const updatedDisplayName =
      document.getElementById("updatedDisplayName").value;

    if (updatedDisplayName) {
      await updateProfile(user, { displayName: updatedDisplayName });
      toast.info("Profile details updated successfully");
      setIsEditing(false);
    } else {
      toast.error("Please provide a valid display name");
    }
  };

  return (
    <div>
      <div className="blog-heading py-2 mb-4">Your Profile Details</div>
      {user && (
        <div className="profile-container">
          <div className="profile-img" onClick={handleFileChange}>
            <img src={user?.photoURL || defaultPhotoURL} alt="" />
          </div>
          <div className="user-info text-start">
            {isEditing ? (
              <>
                <label>New Username:</label>
                <input
                  type="text"
                  id="updatedDisplayName"
                  placeholder="Enter your username"
                />
                <button className="btn btn-add" onClick={handleSaveDetails}>
                  Save Details
                </button>
                <button
                  className="btn btn-add"
                  onClick={() => setIsEditing(false)}
                >
                  Back to Profile
                </button>
              </>
            ) : (
              <>
                <label>Username:</label>
                <p>{user.displayName}</p>
                <label>Email:</label>
                <p>{user.email}</p>
                <button className="btn btn-add" onClick={handleEditDetails}>
                  Edit Details
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
