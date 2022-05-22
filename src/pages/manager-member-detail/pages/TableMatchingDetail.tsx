import { Box, Button, Pagination, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { UserService } from '../../../services';
import { COLOR } from '../../../utils';
import styled from 'styled-components';

type LocationState = {
  id: number;
};

export default function TableMatchingDetail(props: any) {
  const { userMatchingData } = props;

  const location = useLocation();
  const [userName, setUserName] = useState('');

  const { id } = location.state as LocationState;

  const column = ['매칭번호', '매칭방명', '매칭방매니저', '업체명', '상품명', '결제금액', '결제상태', '매칭일자'];

  useEffect(() => {
    getUserName();
    return () => {};
  }, []);

  const getUserName = async () => {
    try {
      const response = await UserService.getUserById(id);

      if (response.status === 200) {
        setUserName(response?.data?.data.name);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderEmpty = () => {
    if (userMatchingData.items.length === 0) {
      return (
        <>
          <div style={{ display: 'flex' }}>
            <h1
              style={{
                color: COLOR.MIDDLE_BLACK,
                fontSize: '24px',
                margin: '100px auto',
              }}
            >
              데이터가 없습니다.
            </h1>
          </div>
        </>
      );
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Header>
        <Title>{userName}</Title>님의 매칭내역
      </Header>
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
            {userMatchingData.items.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.user.name}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {row.store.title}
                </TableCell>

                <TableCell align="center">{row.product.name}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">
                  {row.payments.status === 'INITIAL' && '매칭대기중'}
                  {row.payments.status === 'PENDING' && '미결제'}
                  {row.payments.status === 'SUCCESS' && '결제완료'}
                  {row.payments.status === 'FAILED' && '결제실패'}
                  {row.payments.status === 'REFUND' && '환불요청'}
                </TableCell>

                <TableCell align="center">{moment(row.createdAt).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {renderEmpty()}
    </StyledEngineProvider>
  );
}

const Header = styled.div`
  margin: 40px 20px;
  border-bottom: 1px solid ${COLOR.GREY};
  padding: 20px 0;
`;

const Title = styled.span`
  font-weight: bold;
  color: ${COLOR.MAIN_COLOR};
  font-size: 18px;
`;
