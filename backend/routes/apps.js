const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Apps = require('../models/Apps')


// Add new application
router.post('/add', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        let success = false
        try {
            //store data
            const { title, shortDesc, longDesc, category, link } = req.body;  // de-Structure
            let apps = await Apps.create({
                title: title,
                shortDesc: shortDesc,
                longDesc: longDesc,
                category: category,
                link: link
            })
            success = true
            res.send({ success, apps });
        } catch (error) {
            res.status(500).json({ success, error: error.message });
        }
    }
})

// Get all applications
router.get('/getAll', async (req, res) => {
    const apps = await Apps.find({});// fetch all Apps
    res.json(apps);
})

// Update Apps info
router.put('/updateapp/:id', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        let success = false
        try {
            const { title, shortDesc, longDesc, category, link } = req.body; //De-Structure
            // Create a new data object
            const newData = {};
            if (title) { newData.title = title }
            if (shortDesc) { newData.shortDesc = shortDesc }
            if (longDesc) { newData.longDesc = longDesc }
            if (category) { newData.category = category }
            if (link) { newData.link = link }

            //Find the document to be updated and update it
            let apps = await Apps.findById(req.params.id);
            if (!apps) {
                res.status(404).send("Document not found");
            } else {
                apps = await Apps.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true });
                success = true
                res.send({ success, message: 'Document has been pdated at Document id : ' + req.params.id });
            }
        } catch (error) {
            res.status(500).json({ success, error: error.message });
        }
    }
})

// Delete application
router.delete('/deleteapp/:id', async (req, res) => {
    let success = false
    try {
        //Find the Document to be deleted and delete it
        let apps = await Apps.findById(req.params.id);
        if (!apps) {
            res.status(404).send("Document not found");
        } else {
            apps = await Apps.findByIdAndDelete(req.params.id)
            success = true
            res.send({ success, message: "Document at id : " + req.params.id + " Has been deleted" });
        }
    } catch (error) {
        res.status(500).json({ success, error: error.message });
    }
})

// Get Search Results
router.post('/appsearch', async (req, res) => {
    const apps = await Apps.find({ title: new RegExp(req.body.keyword, 'i') });// fetch all apps where keyword like this
    res.json(apps);
})

// Get Apps based on category
router.post('/appscategory' , async (req, res)=>{
    const apps = await Apps.find({category:req.body.category});// fetch all apps based on category
    res.json(apps);
})

// Get All categories
router.get('/allcategories' , async (req, res)=>{
    const apps = await Apps.find({}, {category:1, _id:1}).sort().distinct("category");// fetch all categories
    res.json(apps);
})

// Get App Full Detail by id
router.get('/detail/:id' , async (req, res)=>{
    const apps = await Apps.findById(req.params.id)
    res.json(apps);
})


module.exports = router