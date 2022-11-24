const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(fileUpload({}));

// app.use(fileUpload({
// 	createParentPath: true,
// }));


app.post('/upload', (req, res) => {
	if(!req.files) {
		return res.status(400).json({msg: 'No file upload'});
	}

	const file = req.files.file;

	if(!file) return res.json({error: 'Incorrect input name'});

	const newFileName = encodeURI(Date.now() + '-' + file.name);

	file.mv(`${__dirname}/client/public/uploads/${newFileName}`, (err) => {
		if(err) {
			console.error(err);
			return res.status(500).send(err);
		}

		console.log('file was uploaded');

		res.json({
			fileName: file.name,
			filePath: `/uploads/${newFileName}`,
		});
	});
});

app.post('/doc', (req, res) => {
	// Имитация динамически создаваемого файла
	let ab = new ArrayBuffer(5); // 5 bytes
	let dataView = new DataView(ab);
	dataView.setInt8(0, 104);
	dataView.setInt8(1, 101);
	dataView.setInt8(2, 108);
	dataView.setInt8(3, 108);
	dataView.setInt8(4, 111);

	res.send(Buffer.from(ab));
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
