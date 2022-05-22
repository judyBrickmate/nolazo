import { Box, Button, Collapse, IconButton, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import moment from 'moment';
import { OperationService } from '../../../services';

export default function StoreReviewList(props: any) {
  const { storeReview } = props;

  const column = ['업체리뷰번호', '업체명', '주문번호', '작성자', '평점', '작성일자', '답변일자', ''];

  return (
    <StyledEngineProvider injectFirst>
      <TableContainer component={Paper} style={{ marginTop: '60px' }}>
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
            {storeReview.map((row: any, index: number) => (
              <Row key={index} row={row} index={index} length={storeReview.length} />
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
      const response = await OperationService.deleteMatchReview(row.store.id, row.id);

      if (response.status === 204) {
        alert('삭제가 완료되었습니다');
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TableRow key={row.id}>
        <TableCell align="center" component="th" scope="row">
          {length - index}
        </TableCell>
        <TableCell align="center">{row.store.title}</TableCell>
        <TableCell align="center">{row.paymentId}</TableCell>
        <TableCell align="center">{row.user.name}</TableCell>
        <TableCell align="center">{row.rating}</TableCell>
        <TableCell align="center">{moment(row.createdAt).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
        <TableCell align="center">{moment(row.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              {row.comment}
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
