const router = require('express').Router()
const Appliance = require('../models/appliances')

const findById = async(id) => {
    const appliance = await Appliance.findById(id)
    return appliance ? appliance : null
}

const allAppliances = async() => {
    const all = await Appliance.find({})
    return all ? all : null
}

router.post('/addAppliances', async(req, res, next) => {
    let state = false
    if(req.body.state === 'on' && req.body.state) state = true
    const body = {
        name: req.body.name,
        watt: req.body.watt,
        state,
        unitsPerHour: (req.body.watt/1000)
    }
    const appliance = new Appliance(body)
    try {
        await appliance.save()
        // res.json({
        //     success: true,
        //     body: appliance,
        //     resCode: 201
        // })
        res.redirect('/listAll')
    } catch (error) {
        res.json({
            error: error._message
        })
    }
})

router.get('/allAppliances', async(req, res, next) => {
    try {
        const allAppliances = await Appliance.find({})
        if(!allAppliances) return res.json({
            status: true,
            body: null,
            resCode: 404,
            _message: 'no appliances found.'
        })
        res.json({
            status: true,
            body: allAppliances,
            resCode: 200,
            _message: ''
        })
    } catch (error) {
        res.json({
            status: false,
            body: null,
            resCode: 500,
            _message: error._message
        })
    }
})


router.post('/changeState/:id', async(req, res, next) => {
    try {
        const appliance = await findById(req.params.id)
        if(!appliance) return res.json({
            status: false,
            body: [],
            resCode: 404,
            _message: 'not found.'
        })
        appliance.state = !appliance.state
        await appliance.save()
        // appliance.state ? res.json({
        //     _message: 'switched on'
        // }) : res.json({
        //     _message: 'switched off'
        // })
        // res.redirect('/appliance/'+req.params.id)
        res.redirect('/listAll')
    } catch (error) {
        res.json({
            status: false,
            body: null,
            resCode: 500,
            _message: error._message
        })
    }
})

router.get('/appliance/:id', async(req, res, next) => {
    try {
        const appliance = await findById(req.params.id)
        if(!appliance) return res.json({
            status: false,
            body: [],
            resCode: 404,
            _message: 'not found.'
        })
        res.render('appliance',{
            status: true,
            appliance,
            resCode: 200,
            _message: ''
        })
    } catch (error) {
        res.json({
            status: false,
            body: null,
            resCode: 500,
            _message: error._message
        })
    }
})

router.post('/deleteAppliance/:id', async(req, res , next) => {
    try {
        const appliance = await findById(req.params.id)
        if(!appliance) return res.json({
            status: false,
            body: [],
            resCode: 404,
            _message: 'not found.'
        })
        await appliance.remove()
        // res.json({
        //     status: true,
        //     body: [],
        //     resCode: 200,
        //     _message: 'successfully deleted.'
        // })
        res.redirect('/listAll')
    } catch (error) {
        return res.json({
            status: false,
            body: null,
            resCode: 500,
            _message: error._message
        })
    }
})

module.exports = {
    router,
    allAppliances
}