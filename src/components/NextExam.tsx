import {Card, Stack, Typography} from "@material-ui/core";
import "./ExamCommon.css";
import React from "react";

export default function NextExam(props: NextExamProps) {
  return !props.currentExam && props.nextExam ? (
    <Card className="exam-container">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography className="exam-message">
          下一个考试: <code>{props.nextExam.subject}</code>
        </Typography>
        <Typography className="time-span">{props.nextExamTimeSpan}</Typography>
      </Stack>
    </Card>
  ) : (
    <></>
  );
}
