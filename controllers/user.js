const express = require('express')
const db = require('../models');
const user = db.user;
const User = require("../models/user");

const login = async (req, res) => {
  await User.findOne({ email: req.params.email, password: req.params.password })
    .then((user) => {
      if (user == null) {
        res.status(200).json({ message: "user not found" })
      }
      res.status(200).json({ data: user })
    })
    .catch(err => res.status(404).send('not found user'))
}

const createUser = async (req, res) => {
  let user = req.body;
  let newUser = new User(user);
  try {
    await newUser.save();
    res.status(200);
    res.send(newUser);
  } catch (err) {
    console.log(err.message)
    return res.status(400).send(err.message)
  }
}

const getAllUsers = async (req, res) => {
  await User.find()
    .then((users) => {
      res.status(200);
      res.send({ data: users });
    })
    .catch(err => res.status(404).send('Not found users' + err))
}

async function deleteUser(req, res) {
  _id = req.params._id;
  await User.deleteOne({ _id: _id }).then(() => {
    res.status(200)
    res.send({ message: "use was deleted" })
  })
    .catch((err) => {
      console.log(err);
    })
}

const sendMessage = async (req, res) => {
  let contact = req.body;
  console.log("contact", contact);
  await User.findOne({ email: req.params.email, password: req.params.password })

  let newUser = new User(user);
  try {
    await newUser.save();
    res.status(200);
    res.send(newUser);
  } catch (err) {
    console.log(err.message)
    return res.status(400).send(err.message)
  }
}

async function updateUser(req, res) {
  const updateUser = req.body;
  try {
    await User.updateOne(
      { userId: updateUser?.userId },
      updateUser
    )
    res.status(200);
    res.send({ data: updateUser, message: "update User" });
  }
  catch (err) {
    console.log(err.message)
    return res.status(400).send(err.message)
  }
}
const getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.userId })
    .then((user) => {
      res.status(200).json({ data: user })
    })
    .catch(err => res.status(404).send('not found user'))

}
module.exports = { login, createUser, getAllUsers, deleteUser, updateUser, sendMessage, getUserById }