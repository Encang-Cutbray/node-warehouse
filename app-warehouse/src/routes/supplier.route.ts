import express from 'express';
import multer from 'multer'
import { check, body, query } from 'express-validator'
import { auth } from '../middlewares/auth.middleware'
import { multerStorage, fileType } from '../utils/upload.utils'
import * as supplierController from '../controllers/supplier.controller';

const router = express.Router();
const upload = multer({
	storage: multerStorage(),
	fileFilter: fileType
})

const validations = [
	check('logo', 'Please upload logo supplier')
		.custom((value, { req }) => {
			if (req.params!.supplierId) {
				return true;
			}
			if (req.file === undefined) {
				return false
			}
			return true;
		}),
	body('supplierName', 'Supplier name is required').trim().notEmpty(),
	body('phone', 'Phone is required').trim().not().isEmpty(),
	body('email', 'email is invalid').trim().isEmail(),
	body('address', 'address is required').trim().notEmpty()
];

router.get('/supplier', auth, supplierController.getSupplier);
router.get('/supplier/create', auth, supplierController.createSupplier);
router.post('/supplier/post', auth, upload.single('logo'), validations, supplierController.postSupplier);
router.get('/supplier/:supplierId/review', auth, supplierController.reviewSupplier);
router.post('/supplier/:supplierId/update', auth, upload.single('logo'), validations, supplierController.updateSupplier);
export default router;
