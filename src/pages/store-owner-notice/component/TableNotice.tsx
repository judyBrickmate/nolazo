import { Button, CircularProgress, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ROUTER } from "../../../router/routes";
import { COLOR } from "../../../utils";

function TableNotice(props: any) {
  const { listNotice, loading } = props;

  const column = ["알람번호", "알림일자", "제목", "매칭방명", "내용"];

  return (
    <StyledEngineProvider injectFirst>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {column.map((item, index) => (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading && <CircularProgress />}
          <TableBody>
            {listNotice.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="center">{moment(row.createdAt).format("YYYY-MM-DD hh:mm:ss")}</TableCell>

                <TableCell scope="row" align="center">
                  {row.title}
                </TableCell>
                <TableCell scope="row" align="center">
                  {/* {row.matching_title} fix here */}
                </TableCell>

                <TableCell align="center">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}

export default TableNotice;
