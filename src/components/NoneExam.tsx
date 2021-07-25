import {Card, Stack, Typography} from "@material-ui/core";
import "./ExamCommon.css";
import React from "react";

export default function NoneExam(props: NoneExamProps) {
  return !props.currentExam && !props.nextExam ? (
    <Card className="exam-container">
      <Stack justifyContent="space-between">
        <Typography className="exam-message">选中的年级后续没有考试</Typography>
      </Stack>
    </Card>
  ) : (
    <></>
  );
}
