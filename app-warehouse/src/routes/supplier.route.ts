import express from 'express';
import multer from 'multer'
import { check, body } from 'express-validator'
import { auth } from '../middlewares/auth.middleware'
import { isAuthorize } from '../middlewares/authorize.middleware'
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

router.get('/supplier', auth, isAuthorize('supplier.read'), supplierController.getSupplier);
router.get('/supplier/create', auth, isAuthorize('supplier.read', 'supplier.create'), supplierController.createSupplier);
router.post('/supplier/post', auth, isAuthorize('supplier.read', 'supplier.create'), upload.single('logo'), validations, supplierController.postSupplier);
router.get('/supplier/:supplierId/review', auth, isAuthorize('supplier.read'), supplierController.reviewSupplier);
router.post('/supplier/:supplierId/update', auth, isAuthorize('supplier.read', 'supplier.update'),upload.single('logo'), validations, supplierController.updateSupplier);
export default router;
