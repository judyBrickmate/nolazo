import React, { useEffect, useState } from "react";
import { TableBar } from "@mui/icons-material";
import {
  Button,
  Paper,
  StyledEngineProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";

import styled from "styled-components";
import { COLOR } from "../../../utils/colors";
import { PaymentService } from "../../../services";
import { useLocation } from "react-router";

type LocationState = {
  id: number;
};

export default function StoreOwnerOrderDetail(props: any) {
  const location = useLocation();
  const [orderData, setOrderData] = useState({
    id: "",
    status: "",
    name: "",
    phone: "",
    email: "",
    amount: 0,
    createdAt: "",
    iamport: [
      {
        id: "",
        impUID: "",
        createdAt: "",
        status: "",
        amount: 0,
        provider: "",
      },
    ],
    price: 0,
    product: {
      id: "",
      price: 0,
      name: "",
    },
    type: "",
    paidPrice: 0,
  });

  const orderColumn = [
    "주문번호",
    "주문구분",
    "구분번호",
    "주문일지",
    "상품명",
    "상품금액",
    "수량",
    "총 주문금액",
  ];

  const ordererColumn = ["주문자명", "연락처", "이메일", "현황일자"];

  const orderPaymentColumn = [
    "결제상태",
    "결제번호",
    "상품번호",
    "상품명",
    "결제수단",
    "결제금액",
    "결제일시",
  ];

  useEffect(() => {
    getStoreOrder();
  }, []);

  const getStoreOrder = async () => {
    try {
      const response = await PaymentService.getListPaymentDetail(id);
      if (response.status === 200) {
        setOrderData(response?.data?.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const { id } = location.state as LocationState;

  console.log(orderData);

  return (
    <>
      <div>
        <StyledEngineProvider injectFirst>
          <Header>
            <p className="title-page">주문 상세정보</p>
          </Header>
          <TableTitle>● 주문정보</TableTitle>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {orderColumn.map((item, index) => (
                  <TableCell align="center" key={index}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{orderData.id}</TableCell>
                <TableCell align="center">
                  {(orderData.type === "MATCH" && "매칭") ||
                    (orderData.type === "STORE" && "티켓")}
                </TableCell>
                <TableCell align="center">{orderData.product.price}</TableCell>

                <TableCell align="center">
                  {moment(orderData.iamport[0].createdAt).format(
                    "YYYY-MM-DD hh:mm:ss"
                  )}
                </TableCell>
                <TableCell align="center">{orderData.product.name}</TableCell>
                <TableCell align="center">{orderData.product.price}</TableCell>
                <TableCell align="center">{orderData.amount}</TableCell>
                <TableCell align="center">{orderData.paidPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <TableTitle>● 주문자 정보</TableTitle>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {ordererColumn.map((item, index) => (
                  <TableCell align="center" key={index}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{orderData.name}</TableCell>
                <TableCell align="center">{orderData.phone}</TableCell>
                <TableCell align="center">
                  {orderData.email === null ? "--" : orderData.email}
                </TableCell>
                <TableCell align="center">
                  {moment(orderData.createdAt).format("YYYY-MM-DD hh:mm:ss")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <TableTitle>● 결제 정보</TableTitle>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {orderPaymentColumn.map((item, index) => (
                  <TableCell align="center" key={index}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {(orderData.status === "SUCCESS" && "결제완료") ||
                    (orderData.status === "REFUND" && "환불요청") ||
                    (orderData.status === "PENDING" && "미결제")}
                </TableCell>
                <TableCell align="center">{orderData.iamport[0].id}</TableCell>
                <TableCell align="center">{orderData.product.id}</TableCell>
                <TableCell align="center">{orderData.product.name}</TableCell>
                <TableCell align="center">
                  {orderData.iamport[0].provider === null
                    ? "--"
                    : orderData.iamport[0].provider}
                </TableCell>
                <TableCell align="center">{orderData.paidPrice}</TableCell>

                <TableCell align="center">
                  {moment(orderData.iamport[0].createdAt).format(
                    "YYYY-MM-DD hh:mm:ss"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledEngineProvider>
      </div>
    </>
  );
}

const Header = styled.div`
  margin: 40px 20px;
  border-bottom: 1px solid ${COLOR.GREY};
  padding: 20px 0;
`;

const TableTitle = styled.div`
  margin: 40px 20px;
  font-size: 14px;
`;

const Title = styled.span`
  font-weight: bold;
  color: ${COLOR.MAIN_COLOR};
  font-size: 18px;
`;
