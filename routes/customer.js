const express = require('express')
const router = express.Router()
const customerModel = require('../models/customer.model')

router.get('/', async(req, res) => {
    const customers = await customerModel.find()
    console.log(customers)
    res.render('customers/list', {customers: customers})
})

router.post('/add', async(req, res) => {
    try {
        const cus = new customerModel({
            name: req.body.name,
            old: req.body.old
        })
        await cus.save()
        res.redirect('/customer/add')
    } catch(e) {
        console.log(e)
        res.redirect('/')
    }
    
})

router.get('/add', (req, res) => {
    res.render('customers/add')
})

router.get('/delete/:id',async(req,res)=>{
    try{
        await customerModel.findByIdAndDelete(req.params.id)
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})



router.post('/edit/:id', async(req, res) => {
    try{
        const cus= await customerModel.findById(req.params.id)
        cus.name=req.body.name
        cus.old=req.body.old
        await cus.save()
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
    
})

router.get('/edit/:id', async(req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)
        res.render('customers/edit', {customer, customer})
    }
    catch(e) {
        console.log(e)
        res.redirect('/')
    }
})

module.exports = router