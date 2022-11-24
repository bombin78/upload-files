import React, { 
  useRef,
  useState,
  useEffect,
} from 'react';


const hostUrl = process.env.REACT_APP_API_URL + 'upload';

const UploadFile = () => {
  const filePicker = useRef(null);
  // Локальный стейт для выбранного файла
  const [selectedFile, setSelectedFile] = useState(null);
  // Локальный стейт для ответа сервера с информацией об имени файла и пути где он храниться
  const [uploaded, setUploaded] = useState();
  // Локальный стейт для перемещенного файла
  const [dndFile, setDndFile] = useState(false);
  const [drag, setDrag] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select file');
      return;
    }

    const data = await request(selectedFile);
    setUploaded(data);
  };

  const handlePick = () => {
    filePicker.current.click();
    console.log('filePicker', filePicker);
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = async (e) => {
    e.preventDefault();

    setDndFile(e.dataTransfer.files[0]);
    setDrag(false);
  };

  useEffect(() => {
    const uploadData = async () => {
      const data = await request(dndFile)
      setUploaded(data);
    };
    if (dndFile) {
      uploadData();
    }
  }, [dndFile]);

  async function request(file) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(hostUrl, {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  }

  return (
    <div className="wrapper">
      <h1>Uploads</h1>
      <div className="btns">
        <button onClick={handlePick}>Pick file</button>
        <input
          className="hidden"
          type="file"
          ref={filePicker}
          onChange={handleChange}
          // multiple
          // accept="image/*,.png,.jpg,.gif,.web"
        />

        <button onClick={handleUpload}>Upload now!</button>
      </div>

      <div className="dnd">
        {drag ? (
          <div
            className="dnd-area"
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            Отпустите файлы, чтобы загрузить их
          </div>
        ) : (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
          >
            Перетащите файлы, чтобы загрузить их
          </div>
        )}
      </div>

      {selectedFile && (
        <ul>
          <li>Name: {selectedFile.name}</li>
          <li>Type: {selectedFile.type}</li>
          <li>Size: {selectedFile.size}</li>
          <li>
            LastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </li>
        </ul>
      )}

      {dndFile && (
        <ul>
          <li>Name: {dndFile.name}</li>
          <li>Type: {dndFile.type}</li>
          <li>Size: {dndFile.size}</li>
          <li>
            LastModifiedDate: {dndFile.lastModifiedDate.toLocaleDateString()}
          </li>
        </ul>
      )}

      {uploaded && (
        <div>
          <h2>{uploaded.fileName}</h2>
          <img src={uploaded.filePath} width="200" alt="" />
        </div>
      )}
    </div>
  );
};

export default UploadFile;
