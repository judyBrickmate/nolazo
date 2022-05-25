import moment from "moment";
import React from "react";
// import { localTime } from "../../../utils/date";

import { Button, CircularProgress, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function TableMatching(props: any) {
  const { listMatching, loading } = props;

  console.log("listmatching items length", listMatching.length);
  console.log(listMatching.map((data: any) => data.createdAt));
  console.log(listMatching.map((data: any) => moment(data.startDate).format("YYYY-MM-DD HH:mm:ss")));

  const column = ["매칭번호", "매칭방명", "매칭방매니저", "업체명", "상품명", "매칭상태", "시작일지"];

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
            {listMatching.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>

                <TableCell align="center">{row.user.name}</TableCell>
                <TableCell align="center">{row.store.title}</TableCell>
                <TableCell align="center">{row.product.name}</TableCell>
                <TableCell align="center">
                  {(row.status === "INITIAL" && "매칭대기중") || (row.status === "PENDING" && "미결제") || (row.status === "SUCCESS" && "결제완료") || (row.status === "FAILED" && "매칭취소")}
                </TableCell>
                <TableCell align="center">{moment(row.startDate).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}

export default TableMatching;
