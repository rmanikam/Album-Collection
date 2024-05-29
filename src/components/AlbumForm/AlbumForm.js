import React from "react";
import styles from "../AlbumForm/AlbumForm.module.css";
import { useValue } from "../../AlbumContext";

// created AlbumForm component
const AlbumForm = () => {
  const {
    handleSubmit,
    userId,
    setUserId,
    title,
    setTitle,
    updateForm,
    handleSubmitNew,
    id,
  } = useValue();
  // if updateForm is true then call the Updated Form else call Simple Form

  return updateForm ? (
    <form
      className={styles.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitNew(id, userId, title);
      }}
    >
      <div className={styles.outerContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Update Album Details</h2>
        </div>
        <div className={styles.userIdContainer}>
          <label className={styles.userId}>User Id:</label>
          <input
            type="number"
            value={userId}
            placeholder="Enter User Id"
            className={styles.inputId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className={styles.titleContainer}>
          <label className={styles.albumTitle}>Album Title:</label>
          <input
            type="text"
            value={title}
            placeholder="Enter Title"
            className={styles.inputTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Update Album</button>
        </div>
      </div>
    </form>
  ) : (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.outerContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Enter Album Details</h2>
        </div>
        <div className={styles.userIdContainer}>
          <label className={styles.userId}>User Id:</label>
          <input
            type="number"
            placeholder="Enter User Id"
            className={styles.inputId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className={styles.titleContainer}>
          <label className={styles.albumTitle}>Album Title:</label>
          <input
            type="text"
            placeholder="Enter Title"
            className={styles.inputTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Add To List</button>
        </div>
      </div>
    </form>
  );
};

export default AlbumForm;
