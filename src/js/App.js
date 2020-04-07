import React, { useState } from 'react';
import shortid from 'shortid';
// eslint-disable-next-line
import regeneratorRuntime from 'regenerator-runtime';
import ItemImg from './ItemImg.js';

export default function AppR() {
  const [listFiles, setListFiles] = useState([]);

  // eslint-disable-next-line
  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', (evt) => {
        resolve(evt.currentTarget.result);
      });

      fileReader.addEventListener('error', (evt) => {
        reject(new Error(evt.currentTarget.error));
      });

      fileReader.readAsDataURL(file);
    });
  };

  const handleSelect = async (evt) => {
    const files = [...evt.target.files];
    const urls = await Promise.all(files.map((o) => fileToDataUrl(o)));
    // У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img

    setListFiles((prevListFiles) => [...prevListFiles, ...urls.map((o) => (
      { id: shortid.generate(), dataUrl: o }
    ))]);
  };

  const handleRemove = (id) => {
    setListFiles((prevListFiles) => prevListFiles.filter((o) => o.id !== id));
  };

  return (
    <React.Fragment>
      <div className="block-add-file">
        <input className="file-add" type="file" name="file" onChange={handleSelect} multiple/>
        <div className="input-form">
          Drag and Drop files here or Click to select
        </div>
      </div>
      <div className="block-img">
        <ItemImg files={listFiles} onRemove={handleRemove} />
      </div>
    </React.Fragment>
  );
}
