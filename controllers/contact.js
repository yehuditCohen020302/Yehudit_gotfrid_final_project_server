
const Contact = require("../models/contact");

const sendMessage = async (req, res) => {

  let contact = req.body;
  await Contact.findOne({ userId: contact.userId })
    .then(async (data) => {
      if (data === null) {
        const newMessage = new Contact(
          {
            userId: contact?.userId,
            messages: [{ date: new Date(), content: contact?.message }]
          })
        try {
          await newMessage.save();
          res.status(200);
          res.send({ data: newMessage, message: "Create New Contact For Current User" });
        }
        catch (err) {
          console.log(err.message)
          return res.status(400).send(err.message)
        }
      }

      else {
        const newMessage =
        {
          userId: contact?.userId,
          messages: data.messages?.concat({ date: new Date(), content: contact?.message })
        }

        try {
          console.log("state 2");
          await Contact.updateOne(
            { userId: contact?.userId },
            newMessage
          )
          res.status(200);
          res.send({ data: newMessage, message: "add Contact For Current User" });
        }
        catch (err) {
          console.log(err.message)
          return res.status(400).send(err.message)
        }

      }
    })
    .catch(err => res.status(404).send('Not found Contact ' + err))
}


async function getMessagesByUser(req, res) {
  let userId = req.params.id;
  try {
    let contact = await Contact.findOne({ userId: userId })
    if (contact !== null) {
      res.status(200);
      res.send({ data: contact, message: "messages by user" });
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


module.exports = { sendMessage, getMessagesByUser }