import { Button, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { ROUTER } from "../../../router/routes";
import { COLOR } from "../../../utils";
import { Link } from "react-router-dom";
import moment from "moment";

function TableOrder(props: any) {
  const { listStoreOrder } = props;

  const column = ["주문번호", "주문구분", "업체명", "주문정보", "수량", "주문자명", "주문상태", "결제금액", "결제수단", "결제일시", "환불요청일시"];
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

          <TableBody>
            {listStoreOrder.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{(row.type === "MATCH" && "매칭") || (row.type === "STORE" && "티켓")}</TableCell>
                <TableCell align="center">{row.store.title}</TableCell>
                <TableCell scope="row" align="center">
                  <Link to={ROUTER.STORE_OWNER_ORDER_DETAIL} state={{ id: row.id }} style={{ color: COLOR.BLACK }}>
                    {(row.type === "MATCH" && `${row.product.name}/${row.id}`) || (row.type === "STORE" && `${row.product.name}/${row.id}`)}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  {(row.status === "PENDING" && "미결제") || (row.status === "SUCCESS" && "결제완료") || (row.status === "FAILED" && "결제취소") || (row.status === "REFUND" && "환불예정")}
                </TableCell>
                <TableCell align="center">{row.paidPrice}</TableCell>
                <TableCell align="center">{"아임포트"}</TableCell>
                <TableCell align="center">{moment(row.iamport[0].createdAt).add(9, "hours").format("YYYY-MM-DD hh:mm:ss")}</TableCell>
                <TableCell align="center">{row.iamport[0].refundAt !== null && `${moment(row.iamport[0].refundAt).add(9, "hours").format("YYYY-MM-DD  hh:mm:ss")}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}

export default TableOrder;
