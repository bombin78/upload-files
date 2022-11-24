import React from "react";


const hostUrl = process.env.REACT_APP_API_URL + 'doc';

const DownloadFile = () => {
  const downloadData = async () => {
	const res = await request();
	const data = await res.blob();
	const url = URL.createObjectURL(data);
	const anchor = document.createElement('a');

	anchor.href = url;
	anchor.download = 'document.txt';
	anchor.style = "display: none";
	document.body.append(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(url);

	console.log('url', url);
	console.log('anchor', anchor);
  };

  async function request() {
    return await fetch(hostUrl, {
      method: 'POST',
	  header: {
		'Content-type': 'application/octet-stream'
	  }
    });
  }

  return (
    <div>
      <h1>Downloads</h1>

      <div>
        <a download href="/logo192.png" alt="логотип">
          Скачать статический файл (логотип)
        </a>
      </div>

      <button onClick={downloadData}>Скачать динамически созданный файл</button>
    </div>
  );
};

export default DownloadFile;
