
const ManagerMessages = require("../models/managerMessages");

const sendMessage = async (req, res) => {
  let contact = req.body;

  const newMessage = new ManagerMessages(
    {
      date: new Date(),
      name: contact?.name,
      email: contact?.email,
      phone: contact?.phone
    })
  try {
    await newMessage.save();
    res.status(200);
    res.send({ data: newMessage, message: "Create New Contact For Manager" });
  }
  catch (err) {
    console.log(err.message)
    return res.status(400).send(err.message)
  }
}



async function getAll(req, res) {
  try {
    let messages = await ManagerMessages.find()
      res.status(200);
    res.send({ data: messages, message: "messages manager" });
  }
  catch (err) {
    console.log(err.message)
    return res.status(400).send(err.message)
  }
}


async function removeUserContact(req, res) {
  id = req.params.id;
  console.log("lll", id);
  try{
  await ManagerMessages.deleteOne({ _id: id })
    res.status(200)
    res.send({ message: "user was deleted" })
  }
  catch(err) {
      console.log(err);
  }
}

module.exports = { sendMessage, getAll, removeUserContact }