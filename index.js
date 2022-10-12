const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.j3jgmrf.mongodb.net/?retryWrites=true&w=majority"
);
const cors = require("cors");
require("dotenv").config();
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// mongoose model
const User = mongoose.model("User", { name: String });
const Exercise = mongoose.model("Exercise", {
  username: String,
  description: String,
  duration: Number,
  date: String,
  userId: String,
});

app.post("/api/users", async (req, res) => {
  const username = req.body.username;
  const user = User({ name: username });
  const savedUser = await user.save();
  res.json({ username: savedUser["name"], _id: savedUser["_id"] });
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const _id = req.body[":_id"];
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  // find the user
  const theuser = await User.findById(_id);
  const username = theuser.name;

  // create exercise
  const exercise = Exercise({
    username: username,
    description: description,
    duration: parseFloat(duration),
    date: date,
    userId: _id
  });

  const savedExercise = await exercise.save()

  res.json({
    username: savedExercise['username'],
    description: savedExercise['description'],
    duration: savedExercise['duration'],
    date: savedExercise['date'],
    _id: savedExercise['userId']
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
