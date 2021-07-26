import React, {useEffect, useState} from "react";
import "./App.css";
import dayjs from "dayjs";

import axios from "axios";
import CurrentExam from "./components/CurrentExam";
import NextExam from "./components/NextExam";
import NoneExam from "./components/NoneExam";
import {
  ListItemText,
  DialogTitle,
  Dialog,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
  DialogContentText,
  DialogContent,
  Slide,
  Stack,
  DialogActions, Button, Checkbox, FormControl, FormControlLabel, Tooltip, Link, useTheme, useMediaQuery,
} from "@material-ui/core";

import {
  ChangeCircleOutlined, Close,
  Filter6Outlined,
  Filter7Outlined,
  Filter8Outlined,
  Filter9Outlined, GavelOutlined, InfoOutlined
} from "@material-ui/icons"

import {TransitionProps} from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let pad2 = (number: number) => (number <= 99 ? `0${number}`.slice(-2) : number);

function App() {
  const [hms, setHms] = useState("");
  const [currentExam, setCurrentExam] = useState<Exam | null>();
  const [nextExam, setNextExam] = useState<Exam | null>();
  const [currentExamTimeSpan, setCurrentExamTimeSpan] = useState("");
  const [nextExamTimeSpan, setNextExamTimeSpan] = useState("");
  const [grade, setGrade] = useState<"6" | "7" | "8" | "9">("9");
  const [openChange, setOpenChange] = useState(true);
  const [openInfo, setOpenInfo] = useState(false);
  const [openAgreement, setOpenAgreement] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function updateExams(currentGrade: "6" | "7" | "8" | "9") {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_BASE_URL}/current/${currentGrade}`,
    }).then((res) => {
      if (res.data.exists) {
        setCurrentExam(res.data);
        const start = dayjs(res.data.startTime);
        const end = dayjs(res.data.endTime);

        setCurrentExamTimeSpan(
          `${pad2(start.hour())}:${pad2(start.minute())}-${pad2(
            end.hour()
          )}:${pad2(end.minute())}`
        );
      } else {
        setCurrentExam(null);
      }
    });
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_BASE_URL}/next/${currentGrade}`,
    }).then((res) => {
      if (res.data.exists) {
        setNextExam(res.data);
        const start = dayjs(res.data.startTime);
        const end = dayjs(res.data.endTime);

        setNextExamTimeSpan(
          `${pad2(start.hour())}:${pad2(start.minute())}-${pad2(
            end.hour()
          )}:${pad2(end.minute())}`
        );
      } else {
        setNextExam(null);
      }
    });
    console.log(currentExam, nextExam);
  }

  useEffect(() => {
    updateExams(grade);

    const now = dayjs();
    const [hour, min, sec] = [now.hour(), now.minute(), now.second()];
    setHms(`${pad2(hour)}:${pad2(min)}:${pad2(sec)}`);

    const timeUpdateInterval = setInterval(() => {
      const now = dayjs();
      const [hour, min, sec] = [now.hour(), now.minute(), now.second()];
      setHms(`${pad2(hour)}:${pad2(min)}:${pad2(sec)}`);
    }, 1);

    const examUpdateInterval = setInterval(() => updateExams(grade), 10000);

    return () => {
      clearInterval(timeUpdateInterval);
      clearInterval(examUpdateInterval);
    };
  }, [grade]);

  useEffect(() => updateExams(grade), [grade])

  return (
    <>
      <Dialog fullScreen={fullScreen} fullWidth maxWidth="xs" open={openChange} TransitionComponent={Transition}>
        <DialogTitle>选择年级</DialogTitle>
        <List sx={{pt: 0}}>
          <ListItem
            onClick={() => {
              setGrade("6");
              setOpenChange(false);
            }}
          >
            <ListItemButton sx={{borderRadius: 1}}>
              <ListItemIcon>
                <Filter6Outlined/>
              </ListItemIcon>
              <ListItemText primary="6 年级"/>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              setGrade("7");
              setOpenChange(false);
            }}
          >
            <ListItemButton sx={{borderRadius: 1}}>
              <ListItemIcon>
                <Filter7Outlined/>
              </ListItemIcon>
              <ListItemText primary="7 年级"/>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              setGrade("8");
              setOpenChange(false);
            }}
          >
            <ListItemButton sx={{borderRadius: 1}}>
              <ListItemIcon>
                <Filter8Outlined/>
              </ListItemIcon>
              <ListItemText primary="8 年级"/>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              setGrade("9");
              setOpenChange(false);
            }}
          >
            <ListItemButton sx={{borderRadius: 1}}>
              <ListItemIcon>
                <Filter9Outlined/>
              </ListItemIcon>
              <ListItemText primary="9 年级"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
      <Dialog fullScreen={fullScreen} open={openInfo} onClose={() => setOpenInfo(false)}
              TransitionComponent={Transition}>
        <Stack pr={2} direction="row" justifyContent="space-between" alignItems="center">
          <DialogTitle>关于</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenInfo(false)}
          >
            <Close/>
          </IconButton>
        </Stack>
        <DialogContent>
          <DialogContentText>
            本应用是 Tree Studio 旗下应用，为老师和同学提供考试有关的服务<br/>
            本应用是MIT许可证下的自由开源软件，源代码储存在 <Link href="https://github.com/plushugh/exam">GitHub</Link><br/>
            作者：<Link href="https://github.com/plushugh">Hugh He[plushugh]</Link>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog fullScreen={fullScreen} scroll="paper" fullWidth maxWidth="xs" open={openAgreement}
              TransitionComponent={Transition}>
        <DialogTitle>使用条款</DialogTitle>
        <DialogContent>
          <DialogContentText color="#fff">
            The english version is below the chinese version.<br/>
            简体中文版：<br/>
            本应用仅提供显示时间与考试信息的服务，不提供作弊工具等违规服务，如果考场上有任何违规行为，本应用及作者不承担任何责任。<br/>
            本应用不确保考试信息的完全准确，本应用提供的任何信息仅供参考，请以校方发布的考试信息为准。<br/>
            本应用是MIT许可下的开源软件，如果对此应用的安全、合规与隐私问题有任何疑问请访问本应用的源代码来检查。<br/>
            选中以下的复选框即表示您已同意本条款。<br/>
            本应用的功能可能会随时更改，更改的内容请参照本应用的代码仓库，任何更改对您造成的不便我们概不负责。<br/>
            本条款可能随时被修改，上次修改日期为：2021/7/25<br/>
            本条款的英文翻译可能不是百分百准确，请参考简体中文版。
            <br/><br/>
            English Version:<br/>
            This app only provides services that display time and exam information, and does not provide services that
            violate regulations such as cheating tools. If there are any violations during the exam, this app and the
            author will not take any responsibility.<br/>
            This application does not guarantee the complete accuracy of the exam information. Any information provided
            by this application is for reference only. Please refer to the exam information published by the
            school.<br/>
            This application is open source software under the MIT license. If you have any questions about the
            security, compliance and privacy of this application, please visit the source code for inspection of this
            application.<br/>
            By checking the following checkbox, you have agreed to these terms.<br/>
            The functions of this application may be changed at any time. Please refer to the code repository of this
            application for the changelog. We are not responsible for any inconvenience caused to you by any
            changes.<br/>
            These terms may be revised at any time, the last revision date is: 2021/7/25<br/>
            The english translation of these terms may not be 100% accurate, please refer to the Simplified Chinese
            version of these terms.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{pr: 2, pl: 3, alignItems: "center", justifyContent: "space-between"}}>
          <FormControl>
            <FormControlLabel control={<Checkbox color="info" value={isAgreed}
                                                 onChange={(event => setIsAgreed(event.target.checked))}/>}
                              label="监考老师已经仔细阅读并同意此条款"/>
          </FormControl>
          <Button variant="text" disabled={!isAgreed} onClick={() => setOpenAgreement(false)}
                  color="success">继续</Button>
        </DialogActions>
      </Dialog>
      <div className="App">
        <main>
          <div className="time">
            <p className="h">{hms.slice(0, 2)}</p>
            <p className="sep">{hms.slice(2, 3)}</p>
            <p className="m">{hms.slice(3, 5)}</p>
            <p className="secsep">{hms.slice(5, 6)}</p>
            <p className="sec">{hms.slice(6, 8)}</p>
          </div>
          <div className="exam-info">
            <CurrentExam
              currentExam={currentExam}
              nextExam={nextExam}
              currentExamTimeSpan={currentExamTimeSpan}
              nextExamTimeSpan={nextExamTimeSpan}
            />
            <NextExam
              currentExam={currentExam}
              nextExam={nextExam}
              nextExamTimeSpan={nextExamTimeSpan}
            />
            <NoneExam currentExam={currentExam} nextExam={nextExam}/>
          </div>
        </main>
      </div>
      <Paper className="grade-info"><Typography>年级: <code>{grade}</code></Typography></Paper>
      <Tooltip title="切换年级">
        <IconButton aria-label="Change grade" className="change-grade" size="large"
                    onClick={() => setOpenChange(true)}><ChangeCircleOutlined/></IconButton></Tooltip>
      <Tooltip title="关于Exam"><IconButton aria-label="App info" className="show-info" size="large"
                                          onClick={() => setOpenInfo(true)}><InfoOutlined/></IconButton></Tooltip>
      <Tooltip title="重新显示条款"><IconButton aria-label="Agreement" className="show-agreement" size="large"
                                          onClick={() => {
                                            setIsAgreed(false)
                                            setOpenAgreement(true);
                                          }}><GavelOutlined/></IconButton></Tooltip>
    </>
  );
}

export default App;
