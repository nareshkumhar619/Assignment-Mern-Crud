const express = require('express');
const router = express.Router();


const NewPeople = require('../models/NewPeople');

// READ (ALL)
router.get('/NewPeople', (req, res) => {
    NewPeople.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

router.get('/NewPeople/:id', (req, res) => {
  NewPeople.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// CREATE
router.post('/NewPeople', (req, res) => {
  const { name, email, age, gender } = req.body;

  if (!name || !email || !age || !gender) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  let newUser = new NewPeople({
    name, email, age, gender
  });

  newUser.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// UPDATE
router.put('/NewPeople/:id', (req, res) => {
  const { name, email, age, gender } = req.body;

  if (!name || !email || !age || !gender) {
    return res.status(422).json({ error: "Please provide all the fields" });
  }

  const updatedUser = {
    name, email, age, gender
  };

  NewPeople.findOneAndUpdate({ _id: req.params.id }, updatedUser, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        msg: `Successfully updated!`,
        result: {
          _id: result._id,
          name: result.name,
          email: result.email,
          age: result.age,
          gender: result.gender
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// DELETE
router.delete('/NewPeople/:id', (req, res) => {
  NewPeople.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        msg: `User has been deleted.`,
        result: {
          _id: result._id,
          name: result.name,
          email: result.email,
          age: result.age,
          gender: result.gender
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


module.exports = router;
