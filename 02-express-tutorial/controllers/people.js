const data = require("../data");

// Retrieve people
const getPeople = (req, res) => {
  res.json(data.people);
};

// Add a new person
const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }
// Add new person in the array and assigning new ID
  const newPerson = { id: data.people.length + 1, name };
  data.people.push(newPerson);
  res.status(201).json({ success: true, name });
};

// Get a specific person by ID
const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = data.people.find(person => person.id === id);
  if (!person) {
    return res.status(404).json({ success: false, message: "Person not found" });
  }
  res.json(person);
};

// Update a person by ID
const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const person = data.people.find(person => person.id === id);

  if (!person) {
    return res.status(404).json({ success: false, message: "Person not found" });
  }
  if (!name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }
  person.name = name;
  res.json({ success: true, message: "Person updated successfully" });
};

// Delete person by ID
 const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const filteredPeople = data.people.filter(person => person.id !== id);
  
  // Check if any person was removed
  if (filteredPeople.length === data.people.length) {
    return res.status(404).json({ success: false, message: "Person not found" });
  }
  
  // Update the data.people array with the filteredPeople array
  data.people = filteredPeople;
  
  res.json({ success: true, message: "Person deleted successfully" });
};


module.exports = { getPeople, addPerson, getPersonById, updatePerson, deletePerson };

