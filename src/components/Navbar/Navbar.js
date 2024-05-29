import React from "react";
import styles from "../Navbar/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useValue } from "../../AlbumContext";
const Navbar = () => {
  // call useNavigate func from react-router dom
  const navigate = useNavigate();
  // destructure show, setShow using useValue function
  const { show, setShow } = useValue();
  // on click of Home button call addAlbum function where i make value of show to true if it is false
  // and if it is true make value of show to false and navigate to Album Form component
  const addAlbum = () => {
    setShow(!show);
    navigate("/AlbumForm");
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.text}>Albums List</div>
      <div className={styles.buttonContainer}>
        {/* if show is true show Home tab */}
        {show ? (
          <button className={styles.btn} onClick={addAlbum}>
            Home
          </button>
        ) : (
          // if show is false show Add Album tab
          <button className={styles.btn} onClick={addAlbum}>
            Add Album
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
