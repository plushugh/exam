import mongoose from "mongoose";

const ExamsSchema = new mongoose.Schema({
  startTime: mongoose.SchemaTypes.Date,
  endTime: mongoose.SchemaTypes.Date,
  subject: mongoose.SchemaTypes.String,
  grade: mongoose.SchemaTypes.String,
});

const Exams = mongoose.model("exams", ExamsSchema);

export default Exams;