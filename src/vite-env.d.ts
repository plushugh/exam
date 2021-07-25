/// <reference types="vite/client" />

interface Exam {
  startTime: String;
  endTime: String;
  subject: String;
}

interface CurrentExamProps {
  currentExam?: Exam | null;
  nextExam?: Exam | null;
  currentExamTimeSpan?: string;
  nextExamTimeSpan?: string;
}

interface NextExamProps {
  currentExam?: Exam | null;
  nextExam?: Exam | null;
  nextExamTimeSpan?: string;
}

interface NoneExamProps {
  currentExam?: Exam | null;
  nextExam?: Exam | null;
}
