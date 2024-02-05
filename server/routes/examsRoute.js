const router = require("express").Router();
const Exam = require("../models/examModel");
const authMiddleware = require("../middleware/authMiddleware");
const Question = require("../models/questionModel");

// add exam

router.post("/add", authMiddleware, async (req, res) => {
  try {
    // chack if exam already exists
    const examExists = await Exam.findOne({ name: req.body.name });
    if (examExists) {
      return res
        .status(200)
        .send({ message: "Exam already exists", success: false });
    }
    req.body.question = [];

    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      message: "Exam added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//get all exams
router.post("/get-all-exams", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send({
      message: "Exams fetched successfully",
      data: exams,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//get exam by id
router.post("/get-exam-by-id", authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate("questions");
    res.status(200).send({
      message: "Exam fetched successfully",
      data: exam,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//edit exam by id
router.post("/edit-exam-by-id", authMiddleware, async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.body.examId, req.body);
    res.send({
      message: "Exam edited successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//delete exam by id
router.post("/delete-exam-by-id", authMiddleware, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      message: "Exam deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// //add question to exam
router.post("/add-question-to-exam", authMiddleware, async (req, res) => {
  try {
    //add question to Question collection
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();

    //add question to exam
    const exam = await Exam.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();
    res.send({
      message: "Qestion added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      message: "Vishal",
      data: error,
      success: false,
    });
  }
});

// //edit  question in exam

router.post("/edit-question-in-exam", authMiddleware, async (req, res) => {
  try {
    //edit  question to Question collection
    await Question.findByIdAndUpdate(req.body.QuestionId, req.body);
    res.send({
      message: "Question edited successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// //delete Question In exams
router.post("/delete-question-in-exam", authMiddleware, async (req, res) => {
  try {
    //delete  question to Question collection
    await Question.findByIdAndDelete(req.body.questionId);
    //delete question in exam
    const exam = await Exam.findById(req.body.examId);
    exam.questions = exam.questions.filter(
      (question) => question._id != req.body.questionId
    );
    await exam.save();
    res.send({
      message: "Question deleted  successfully",
      success: true,
    });
  } catch (error) {}
});

module.exports = router;
