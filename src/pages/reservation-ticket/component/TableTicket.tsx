import { Button, CircularProgress, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import moment from "moment";

function TableTicket(props: any) {
  const { listTicket, loading } = props;

  console.log(listTicket);

  const column = ["주문번호", "업체명", "주문정보", "수량", "주문자명", "주문상태", "결제금액", "결제수단", "결제일시"];

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
            {listTicket.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.store.title}</TableCell>
                <TableCell align="center">{`${row.product.name}/${row.iamport[0].id}`}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  {(row.status === "PENDING" && "미결제") || (row.status === "SUCCESS" && "결제완료") || (row.status === "FAILED" && "결제취소") || (row.status === "REFUND" && "환불예정")}
                </TableCell>
                <TableCell align="center">{row.paidPrice}</TableCell>
                <TableCell align="center">{row.iamport[0].provider === "nice" && "나이스 페이먼츠"}</TableCell>
                <TableCell align="center">{moment(row.iamport[0].createdAt).format("YYYY-MM-DD hh:mm:ss")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}

export default TableTicket;
