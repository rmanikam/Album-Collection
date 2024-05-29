import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AlbumContext = createContext();

const useValue = () => {
  const value = useContext(AlbumContext);
  return value;
};

const CustomAlbumContext = ({ children }) => {
  const [showAlbums, setShowAlbums] = useState([]);
  const [userId, setUserId] = useState(1);
  const [id, setId] = useState(1);
  const [updateAlbum, setUpdateAlbum] = useState(null);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const navigate = useNavigate();
  // get data from url by doing axios.get in useEffect hook
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => setShowAlbums(response.data))
      .catch((error) => console.log("Error", error));
  }, []);

  // call handleSubmit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    // created album variable containing new userId, id, title
    const album = {
      userId: parseInt(userId),
      id: id,
      title: title,
    };
    // checking if id > 100
    if (id > 100) {
      // Add the new album to local state without making a request
      setShowAlbums((prevAlbums) => [...prevAlbums, album]);
      setShow(false);
      navigate("/");
    } else {
      // if id < 100 make a axios.post request
      axios
        .post("https://jsonplaceholder.typicode.com/albums", album, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          setShowAlbums((prevAlbums) => [...prevAlbums, response.data]);
          setShow(false);
          navigate("/");
        })
        .catch((error) => console.error("Error adding album:", error));
    }
  };

  // call handleUpdate function to update the album
  const handleUpdate = (album) => {
    if (album.id > 100) {
      // Update the album locally if the ID is greater than 100
      setShowAlbums((prevAlbums) =>
        prevAlbums.map((a) =>
          a.id === album.id
            ? { ...a, userId: album.userId, title: album.title }
            : a
        )
      );
      setUpdateAlbum(album);
    } else {
      // do axios.get to get the album from the JSON server
      axios
        .get(`https://jsonplaceholder.typicode.com/albums/${album.id}`)
        .then((response) => setUpdateAlbum(response.data))
        .catch((error) => console.log("Error", error));
    }

    setId(album.id);
    setTitle(album.title);
    setUserId(album.userId);
    setUpdateForm(true);
    navigate("/AlbumForm");
  };

  // call handleSubmitNew function to show the updated album along with other albums
  const handleSubmitNew = (id, userId, title) => {
    console.log("id", id, "userId", userId, "title", title);
    if (updateAlbum.id > 100) {
      // Update the album locally if the ID is greater than 100
      setShowAlbums((prevAlbums) =>
        prevAlbums.map((album) =>
          album.id === id ? { id, userId, title } : album
        )
      );
      setUpdateForm(false);
      navigate("/");
    } else {
      setShowAlbums((prevAlbums) =>
        prevAlbums.map((album) =>
          album.id === id ? { id, userId, title } : album
        )
      );
      setUpdateForm(false);
      navigate("/");

      // i did axios.put request here
      axios
        .put(
          `https://jsonplaceholder.typicode.com/albums/${updateAlbum.id}`,
          {
            userId: updateAlbum.userId,
            id: updateAlbum.id,
            title: updateAlbum.title,
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )

        .catch((error) => console.error("Error updating album:", error));
    }
  };

  // calling handleDelete func here to delete the particular album py passing id of the function
  const handleDelete = (id) => {
    const data = showAlbums.filter((item) => item.id != id);
    setShowAlbums([...data]);
    axios
      .delete(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .catch((error) => console.log("Error", error));
  };

  return (
    <AlbumContext.Provider
      value={{
        showAlbums,
        setShowAlbums,
        handleSubmit,
        userId,
        id,
        setId,
        setUserId,
        title,
        setTitle,
        show,
        setShow,
        updateForm,
        setUpdateForm,
        handleUpdate,
        updateAlbum,
        handleSubmitNew,
        handleDelete,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

export { useValue };
export default CustomAlbumContext;
