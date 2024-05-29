import React from "react";
import styles from "../Home/Home.module.css";
import { useValue } from "../../AlbumContext";
const Home = () => {
  // destructuring showAlbums, handleUpdate, handleDelete using useValue function
  const { showAlbums, handleUpdate, handleDelete } = useValue();

  return (
    <div className={styles.albumsContainer}>
      {/* map over showAlbums array */}
      {showAlbums.map((albumItem) => {
        return (
          <div className={styles.albums} key={albumItem.id}>
            <h3>{albumItem.title}</h3>
            <div className={styles.buttonContainer}>
              <button
                className={styles.update}
                onClick={() => handleUpdate(albumItem)}
              >
                Update
              </button>

              <button
                className={styles.delete}
                onClick={() => handleDelete(albumItem.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
