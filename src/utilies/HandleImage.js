// Save image to file system
const saveImage = async (uri) => {
	await ensureDirExists();
	const filename = new Date().getTime() + '.jpeg';
	const dest = imgDir + filename;
	await FileSystem.copyAsync({ from: uri, to: dest });
	setImages([...images, dest]);
};

// Upload image to server
// const uploadImage = async (uri) => {
// 	setUploading(true);

// 	await FileSystem.uploadAsync('http://192.168.1.52:8888/upload.php', uri, {
// 		httpMethod: 'POST',
// 		uploadType: FileSystem.FileSystemUploadType.MULTIPART,
// 		fieldName: 'file'
// 	});

// 	setUploading(false);
// };

// Delete image from file system
const deleteImage = async (uri) => {
	await FileSystem.deleteAsync(uri);
	setImages(images.filter((i) => i !== uri));
};