import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import * as supplierService from '../services/supplier.service'

export async function getSupplier(req: Request, res: Response, next: NextFunction) {
	try {
		const page = req.query.page || 1
		const perPage = 10
		const suppliers = await supplierService.getAllSupplier(+page, perPage);
		const data = {
			suppliers: suppliers.rows,
			total: suppliers.count,
			page: req.query.page,
			perPage: perPage
		}

		return res.renderVue('pages/supplier/SupplierIndex.vue', data);
	} catch (error) {
		return res.status(500).redirect('/500')
	}

}
export async function createSupplier(req: Request, res: Response, next: NextFunction) {
	const errorMessage = req.flash('error')
	const populate = req.flash('populate')
	const data = {
		errorMessage: errorMessage.length ? errorMessage : null,
		populate: populate.length ? populate[0] : null
	}
	res.renderVue('pages/supplier/Supplier.vue', data);
}

export async function postSupplier(req: Request, res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			throw errors.array()[0]
		}
		const { phone, supplierName, email, address } = req.body;
		const userId = req.session!.userLogin.id
		const logo = req.file.path
		const newSupplier = await supplierService.createSupplier({
			phone, supplierName, email, address, logo, userId
		})
		const message = `Supplier ${newSupplier.name} created !!`
		req.flash('success', message)
		return res.status(201).redirect(`/supplier/${newSupplier.id}/review`)
	} catch (error) {
		req.flash('error', error)
		req.flash('populate', req.body)
		return res.status(422).redirect('back')
	}
}
export async function reviewSupplier(req: Request, res: Response, next: NextFunction) {
	try {
		const errorMessage = req.flash('error')
		const successMessage = req.flash('success')
		const populate = req.flash('populate')
		const supplierId = req.params.supplierId
		const supplier = await supplierService.findSupplierById(supplierId)
		if (!supplier) {
			throw "Supplier not exists"
		}
		const data = {
			successMessage: successMessage.length ? successMessage : null,
			errorMessage: errorMessage.length ? errorMessage : null,
			populate: populate.length ? populate[0] : null,
			supplier: supplier.dataValues
		}
		res.renderVue('pages/supplier/Supplier.vue', data);
	} catch (error) {
		return res.status(404).redirect('/404')
	}

}
export async function updateSupplier(req: Request, res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			throw errors.array()[0]
		}
		const supplierId = req.params.supplierId
		const { phone, supplierName, email, address } = req.body;
		const logo = req.file ? req.file.path : null
		const userId = req.session!.userLogin.id
		const supplier = await supplierService.updateSupplierById(supplierId,
			{ phone, supplierName, email, address, logo, userId }
		)
		const message = `Supplier ${supplier.name} updated !!`
		req.flash('success', message)
		return res.status(200).redirect('back')
	} catch (error) {
		console.log(error);

		req.flash('error', error)
		req.flash('populate', req.body)
		return res.status(422).redirect('back')
	}

}

