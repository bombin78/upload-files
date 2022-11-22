import React, { 
	useState,
} from 'react';


const hostUrl = '/upload';

const UploadFile = () => {
	// Локальный стейт для выбранного файла
	const [selectedFile, setSelectedFile] = useState(null);
	// Локальный стейт для ответа сервера с информацией об имени файла и пути где он храниться
	const [upload, seUpload] = useState();

	const handleChange = (event) => {
		console.log(event.target.files);
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			alert('Please select file');
			return;
		}
	};

	return (
		<>
			<input 
				type="file" 
				onChange={handleChange}
				// accept="image/*,.png,.jpg,.gif,.web"
			/>

			<button onClick={handleUpload}>Upload now!</button>

			{selectedFile && (
				<ul>
					<li>Name: {selectedFile.name}</li>
					<li>Type: {selectedFile.type}</li>
					<li>Size: {selectedFile.size}</li>
					<li>
						LastModifiedDate: {" "}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</li>
				</ul>

			)}
		</>
	);
};

export default UploadFile;
