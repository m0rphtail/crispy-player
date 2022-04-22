import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);

  const onFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    let body = new FormData();
    body.append("file", selectedFile);

    axios.post("http://localhost:8080/file/upload", body).then((response) => {
      if (response.status === 200) {
        setVideoPath(response.data);
      } else alert("Error uploading to server!");
    });
  }, [selectedFile]);

  return (
    <div className="main-container">
      <div className="top-container">
        <h5>crispy-player</h5>
      </div>
      <div className="bottom-container">
        <div className="left-container">
          <div className="file-selector">
            <button>
              <input
                type="file"
                style={{ opacity: 0 }}
                name="file-button"
                id="file-button"
                accept="video/mp4"
                onChange={onFileChange}
              />
              <p>Upload Video</p>
            </button>
          </div>
        </div>
        <div className="right-container">
          <h3>SPPU BE IT Final Year Project</h3>
          <h2>Video SuperResolution using Convolutional Neural Networks</h2>
          <br />
          <p className="title">Team</p>
          <ul>
            <li>
              <img
                src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_250,q_auto:good,w_250/v1/gcs/platform-data-dsc/events/webhunt-yatish.png"
                alt="yatish"
              />
              <a href="yatishkelkar.netlify.com">Yatish Kelkar</a>
            </li>
            <li>
              <img
                src="https://pbs.twimg.com/profile_images/1064232902601232384/My5GbY-d_400x400.jpg"
                alt="mahesh"
              />
              <a href="yatishkelkar.netlify.com">Mahesh Nahak</a>
            </li>
            <li>
              <img
                src="https://tedxpvgcoet.com/team/img/kshitij-chitnis.webp"
                alt="kshitij"
              />
              <a href="yatishkelkar.netlify.com">Kshitij Chitnis</a>
            </li>
            <li>
              <img
                src="https://miro.medium.com/fit/c/176/176/0*cQhCBGeImKWKjMHw.jpg"
                alt="gaurav"
              />
              <a href="yatishkelkar.netlify.com">Gaurav Khairnar</a>
            </li>
          </ul>

          <br />

          <p className="title">Github</p>

          <div className="github-card">
            <h4>m0rphtail/crispy-player</h4>
            <small>
              A video player that performs video super-resolution in realtime.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
