import multer from 'multer'
import fs from 'fs'

export function multerStorage(folder = 'public') {
	try {
		let pathFile = `assets/storages/public/${folder}`

		return multer.diskStorage({
			destination: (req, file, callback) => {
				if (!fs.existsSync(pathFile)) {
					fs.mkdirSync(pathFile);
				}
				callback(null, pathFile)
			},
			filename: (req, file, callback) => {
				const timeUpload = Math.round(new Date().getTime() / 1000)
				callback(null, `${timeUpload}-${file.originalname}`)
			}
		})
	} catch (error) {
		console.log(error);

	}

}

export function fileType(req: any, file: any, callback: Function) {
	if (file.mimetype === 'image/png'
		|| file.mimetype === 'image/jpg'
		|| file.mimetype === 'image/jpeg') {
		callback(null, true)
	}
	else {
		callback(null, false)
	}
}

export async function deleteFile(filePath: string) {
	if (filePath) {
		try {
			await fs.unlink(filePath, () => { })
		} catch (error) {
		}
	}
}
