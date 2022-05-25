import { Box, Button, CardMedia, CircularProgress, Collapse, IconButton, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableRow, TextareaAutosize } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { UserService } from "../../../services";

export default function FaqList(props: any) {
  const { faqList, loading } = props;

  return (
    <StyledEngineProvider injectFirst>
      <TableContainer component={Paper} style={{ marginTop: "60px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="collapsible table">
          <TableBody>
            {loading && <CircularProgress />}
            {faqList.map((row: any, index: number) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(row.answer);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer((event.target as HTMLTextAreaElement).value);
  };

  const submitAnswer = async () => {
    try {
      if (!answer) {
        alert("내용을 입력해주세요");
        return;
      }
      if (answer?.length < 10) {
        alert("내용은 10자 이상으로 입력해주세요");
        return;
      }
      const response = await UserService.submitAnswer(row.userId, row.id, answer);
      if (response.status === 204) {
        alert("답변이 등록되었습니다");
        location.reload();
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <>
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          문의 제목
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      작성자
                    </TableCell>
                    <TableCell>{row.userId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      내용
                    </TableCell>
                    <TableCell>
                      <CardMedia component="img" style={{ width: "auto" }} image={row.image?.thumbnail} alt="No image" />
                      {row.content}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      답변
                    </TableCell>
                    <TableCell>
                      {row.isAnswer ? (
                        row.answer
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <TextareaAutosize value={answer || ""} onChange={handleChange} />
                          <Button variant="outlined" size="large" onClick={submitAnswer}>
                            답변달기
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
