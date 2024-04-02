const express = require('express');
const router = express.Router();
const { getPeople, addPerson, getPersonById, updatePerson, deletePerson } = require("../controllers/people.js");

// GET all people
router.get('/', getPeople);

// POST a new person
router.post('/', addPerson);

// GET a specific person by ID
router.get('/:id', getPersonById);

// PUT update a person by ID
router.put('/:id', updatePerson);

// DELETE a person by ID
router.delete('/:id', deletePerson);

module.exports = router;
