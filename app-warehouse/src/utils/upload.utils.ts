import multer from 'multer'
import fs from 'fs'

export function multerStorage(folder = 'public') {
	const pathFile = `assets/storages/${folder}`
	return multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, pathFile)
		},
		filename: (req, file, callback) => {
			const timeUpload = Math.round(new Date().getTime() / 1000)
			callback(null, `${timeUpload}-${file.originalname}`)
		}
	})
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
