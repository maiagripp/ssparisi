import { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Form = () => {
  const [file, setFile] = useState();

  const uploadFile = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button id="btn-styled" onClick={uploadFile}>
        Upload
      </button>
    </div>
  );
};

export default Form;
