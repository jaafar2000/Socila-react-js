import React, { useContext, useState } from "react";
import { doc,updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import db from "../../firebase";
import "./updateProfile.css";
import { socialContext } from "../../context/socialContext";
const UpdateProfile = () => {
  const { user, handleClose } = useContext(socialContext);
  const [name, setNname] = useState("");
  const [loading, setLoadin] = useState(false);
  const [Bio, seBio] = useState("");
  const [profileImage, seProfileImage] = useState("");
  const [backgroundImage, seBackgroundImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadin(true);

    await updateDoc(doc(db, "users", `${user?.name}`), {
      displayName: name,
      name: user?.name,
      email: user?.email,
      Bio: Bio,
    });
    const storageRef = ref(storage, `${user?.name}`);

    if (profileImage) {
      await uploadBytesResumable(storageRef, profileImage).then(() => {
        getDownloadURL(storageRef).then(async (download) => {
          try {
            if (download) {
              await updateDoc(doc(db, "users", `${user?.name}`), {
                image: download,
              });
            }
          } catch {
            console.log("err");
          }
        });
      });
    }
    const storageRef3 = ref(storage, `${user?.name}fsadf`);
    if (backgroundImage) {
      await uploadBytesResumable(storageRef3, backgroundImage).then(() => {
        getDownloadURL(storageRef3).then(async (url) => {
          try {
            if (url) {
              await updateDoc(doc(db, "users", `${user?.name}`), {
                backgroundImageUrl: url,
              });
            }
          } catch {
            console.log("err");
          }
        });
      });
    }

    setNname("");
    seBio("");
    seProfileImage(null);
    seBackgroundImage(null);
    setLoadin(false);
    handleClose();
  };
  return (
    <form className="updateProfile" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          className="updateName"
          type="text"
          placeholder="Update Name"
          value={name}
          onChange={(e) => setNname(e.target.value)}
        />
      </div>
      <div>
        <textarea
          cols="30"
          rows="3"
          placeholder="Update Bio"
          value={Bio}
          onChange={(e) => seBio(e.target.value)}
        ></textarea>
      </div>
      <div className="update__photo">
        <label htmlFor="pic">Chose Profile Picture</label>
        {profileImage && (
          <img className="image" src={URL.createObjectURL(profileImage)} />
        )}
        <input
          type="file"
          id="pic"
          style={{ display: "none" }}
          onChange={(e) => seProfileImage(e.target.files[0])}
        />
      </div>
      <div className="update__photo">
        <label htmlFor="back">Chose background picture</label>
        {backgroundImage && (
          <img className="image" src={URL.createObjectURL(backgroundImage)} />
        )}
        <input
          type="file"
          id="back"
          style={{ display: "none" }}
          onChange={(e) => seBackgroundImage(e.target.files[0])}
        />
      </div>
      <button disabled={loading} className="updateBtn">
        {loading ? "Loading..." : "Update Profile"}
      </button>
    </form>
  );
};

export default UpdateProfile;
