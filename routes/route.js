const express = require('express')
const router = express.Router()

const Task = require('../models/tasks')

// GET Request
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// POST Request
router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).send(task)
    } catch (error) {
        res.status(401).send({ message: 'Please do not send empty Document', errorMessgae: error.message})
    }
})

// PATCH/POST Request
router.patch('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(updatedTask)
    } catch (error) {
        res.status(400).send({ message: error.message})
    }
})

// DELETE Request
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndRemove(req.params.id, req.body)
        res.status(200).send(deletedTask)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router