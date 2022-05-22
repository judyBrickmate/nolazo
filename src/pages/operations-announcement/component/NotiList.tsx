import { Box, Button, Collapse, IconButton, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { OperationService } from "../../../services";
import moment from "moment";

export default function NotiList(props: any) {
  const { notiList } = props;

  const column = ["No.", "공지제목", "작성자", "공지일자", ""];

  return (
    <StyledEngineProvider injectFirst>
      <TableContainer component={Paper} style={{ marginTop: "60px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {column.map((item, index) => (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {notiList.map((row: any, index: number) => (
              <Row key={index} row={row} index={index} length={notiList.length} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}

function Row(props: any) {
  const { length, index, row } = props;
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    console.log(row);
    try {
      const response = await OperationService.deleteNoificationList(row.id);
      if (response.status === 200) {
        alert("삭제가 완료되었습니다");
        location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {length - index}
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        <TableCell align="center">{row.writer}</TableCell>

        <TableCell align="center">{moment(row.createdAt).format("YYYY-MM-DD hh:mm")}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {row.content}
              <Button variant="outlined" size="medium" onClick={handleDelete}>
                삭제하기
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
