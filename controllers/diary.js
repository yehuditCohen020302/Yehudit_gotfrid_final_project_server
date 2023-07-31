const express = require('express')

const Diary = require("../models/diary");
const { mongoose, user } = require('../models');


const addFoodToDiary = async (req, res) => {
  let userId = req.body.userId;
  let currentFood = req.body.currentFood;
  let currentDate = req.body.date;
  await Diary.findOne({ userId: userId })
    .then(async (diary) => {

      if (diary === null) {
        console.log("state 1");
        const newDiary = new Diary({ userId: userId, diaryDays: [{ date: currentDate, meals: [currentFood] }] })
        try {
          await newDiary.save();
          res.status(200);
          res.send({ data: newDiary, message: "Create New Diary For Current User" });
        }
        catch (err) {
          console.log(err.message)
          return res.status(400).send(err.message)
        }
      }
      else {
        const diaryUserByCurrentDate = await diary.diaryDays.filter(x => x.date === currentDate)
        const oldDiary = await diary.diaryDays.filter(x => x.date !== currentDate)
        if (diaryUserByCurrentDate.length > 0) {
          console.log("state 2");
          const newDiary = {
            userId: userId,
            diaryDays: oldDiary.concat({ date: currentDate, meals: diaryUserByCurrentDate[0].meals.concat(currentFood) })
          }
          try {
            await Diary.updateOne(
              { userId: userId },
              newDiary
            )
            res.status(200);
            res.send({ data: newDiary, message: "add Diary For Current User" });
          }
          catch (err) {
            console.log(err.message)
            return res.status(400).send(err.message)
          }
        }
        else {
          console.log("state 3");

          const newDiary = {
            userId: userId,
            diaryDays: diary.diaryDays.concat({ date: currentDate, meals: [currentFood] })
          }
          try {
            await Diary.updateOne(
              { userId: userId },
              newDiary
            )
            res.status(200);
            res.send({ data: newDiary, message: "add Diary For Current User" });
          }
          catch (err) {
            console.log(err.message)
            return res.status(400).send(err.message)
          }
        }
      }
    })
    .catch(err => res.status(404).send('Not found diary' + err))
}

async function getDiaryByUser(req, res) {
  let userId = req.params.id;
  try {
    let diary = await Diary.findOne({ userId: userId })
    if (diary !== null) {
      res.status(200);
      res.send({ data: diary, message: "diary by user" });
    }
    else {
      res.status(200);
      res.send({ message: "not found" });
    }

  }
  catch (err) {
    console.log(err.message)
    return res.status(400).send(err.message)
  }
}

function updateTask(req, res) {
  let { newTask } = req.body;
  newTask.deadline = new Date(`${newTask.deadline}Z`).toString();
  newTask.noticeDue = new Date(`${newTask.noticeDue}Z`).toString();
  task.updateOne({ _id: newTask.id }, newTask).then(function (task) {//מונגו מחזיר לנוד את הטאסק החדש
    res.send(task);
  }).catch(function (ex) {
    res.send(ex);
  })
}





module.exports = { addFoodToDiary, getDiaryByUser }