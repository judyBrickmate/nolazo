import { Button, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ROUTER } from '../../../router/routes';
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PaymentService, StoreService } from '../../../services';
import ItemResisterModal from '../../company/component/ItemResisterModal';

type LocationState = {
  id: number;
};

export default function OrderDetail(props: any) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({
    id: '',
    status: '',
    name: '',
    phone: '',
    email: '',
    amount: 0,
    createdAt: '',
    iamport: [
      {
        id: '',
        impUID: '',
        createdAt: '',
        status: '',
        amount: 0,
      },
    ],
    price: 0,
    product: {
      id: '',
      price: 0,
      name: '',
    },
    type: '',
  });

  console.log(orderData);

  const { id } = location.state as LocationState;

  const column = {
    1: '업체분류',
    2: '상호명',
    3: '대표자명',
    4: '사업자등록번호',
    5: '대표 연락처',
    6: '추가 연락처',
    7: '업체주소',
    8: '영업시간',
    9: '업체설명',
    10: '제한연령',
    11: '무료연령',
    12: '홈페이지',
  };

  const orderColumn = ['주문번호', '주문구분', '구분번호', '주문일지', '상품명', '상품금액', '수량', '총 주문금액'];

  const ordererColumn = ['주문자명', '연락처', '이메일', '현황일자'];

  const paymentColumn = ['결제상태', '결제번호', '상품번호', '상품명', '결제수단', '결제일자', '결제금액'];

  useEffect(() => {
    getOrderInfo();

    return () => {};
  }, []);

  const getOrderInfo = async () => {
    try {
      setLoading(true);
      const response = await PaymentService.getListPaymentDetail(id);
      if (response.status === 200) {
        setOrderData(response?.data?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Header>
          <Title></Title>주문 상세정보
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
              <TableCell align="center">{(orderData.type === 'MATCH' && '매칭') || (orderData.type === 'STORE' && '티켓')}</TableCell>
              <TableCell align="center">{orderData.iamport[0].impUID}</TableCell>
              <TableCell align="center">{moment(orderData.iamport[0].createdAt).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
              <TableCell align="center">{orderData.product.name}</TableCell>
              <TableCell align="center">{orderData.product.price}</TableCell>
              <TableCell align="center">{orderData.amount}</TableCell>
              <TableCell>{orderData.price}</TableCell>
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
              <TableCell align="center">{orderData.email}</TableCell>
              <TableCell align="center">{moment(orderData.createdAt).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <TableTitle>● 결제정보</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {paymentColumn.map((item, index) => (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                {(orderData.status === 'PENDING' && '미결제') ||
                  (orderData.status === 'SUCCESS' && '결제완료') ||
                  (orderData.status === 'FAILED' && '결제취소') ||
                  (orderData.status === 'REFUND' && '환불예정')}
              </TableCell>
              <TableCell align="center">{orderData.iamport[0].id}</TableCell>
              <TableCell align="center">{orderData.id}</TableCell>
              <TableCell align="center">{orderData.product.id}</TableCell>
              <TableCell align="center">{'아임포트'}</TableCell>
              <TableCell align="center">{moment(orderData.iamport[0].createdAt).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
              <TableCell align="center">{orderData.iamport[0].amount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledEngineProvider>
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
