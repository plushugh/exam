import {Card, Stack, Typography} from "@material-ui/core";
import "./ExamCommon.css";
import React from "react";

export default function CurrentExam(props: CurrentExamProps) {
  return props.currentExam ? (
    <>
      <Card className="exam-container">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography className="exam-message">
            当前考试: <code>{props.currentExam.subject}</code>
          </Typography>
          <Typography className="time-span">{props.currentExamTimeSpan}</Typography>
        </Stack>
      </Card>
      {props.nextExam && (
        <Card className="exam-container">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography className="exam-message-small">
              下一个考试: <code>{props.nextExam.subject}</code>
            </Typography>
            <Typography className="time-span-small">{props.nextExamTimeSpan}</Typography>
          </Stack>
        </Card>
      )}
    </>
  ) : (
    <></>
  );
}
