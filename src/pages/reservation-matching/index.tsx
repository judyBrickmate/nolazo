import { Button, Container, FormControlLabel, Pagination, Radio, RadioGroup, TextField } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import AppRangeDatePicker from '../../component/app-range-date-picker';
import AppSelect from '../../component/app-select/AppSelect';
import { PaymentService } from '../../services';
import { COLOR } from '../../utils';
import TableMatching from './component/TableMatching';

export default function ReservationMatching() {
  const [status, setStatus] = useState('default');
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [textFilter, setTextFilter] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [listMatching, setListMatching] = useState([]);
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);

  useEffect(() => {
    getMatching();
  }, [pageNumber]);

  const getMatching = async () => {
    try {
      const startDate = moment(refRangeDate.current?.startDate).add(1, 'days').toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const fieldSearch = refSelect.current?.value;
      const statusData = refSelect.current?.value;

      const filters = refSelect.current.value !== 'default' ? [`${refSelect.current.value}=${textFilter}`] : [`default=${textFilter}`];

      if (refSelectTwo.current.value !== 'default') filters.push(`status=${refSelectTwo.current.value}`);

      if (status !== 'default') filters.push(`status=${status}`);

      const filter = filters.filter((column) => column).join(',');

      const response = await PaymentService.getReservation(startDate, endDate, pageNumber, 10, true, filter, 'MATCH');
      if (response.status === 200) {
        setListMatching(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error: any) {
      if (error?.response?.data.errorCode === 11010) {
        alert('YYYY-MM-DD와 같은 날짜방식으로 입력하세요.');
      }
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const renderEmpty = () => {
    if (listMatching.length === 0) {
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

  const listType = [
    { label: '매칭상태', value: 'default' },
    { label: '매칭번호', value: 'store' },
    { label: '매칭방명', value: 'title' },
    { label: '매칭방매니저', value: 'name' },
    { label: '업체명', value: 'status' },
    { label: '상품명', value: 'price' },
    { label: '매칭상태', value: 'provider' },
    { label: '시작일지', value: 'date' },
  ];

  const listTypeOrderTwo = [
    { label: '주문상태', value: 'default' },
    { label: '미결제', value: 'PENDING' },
    { label: '결제완료', value: 'SUCCESS' },
    { label: '결제실패', value: 'FAILED' },
    { label: '환불요청', value: 'REFUND' },
  ];

  return (
    <div className="root-container">
      <p className="title-page">매칭 예약관리</p>
      <AppRangeDatePicker title="가입일 :" ref={refRangeDate} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 2,
          alignItems: 'center',
        }}
      >
        <p className="title-filter">선택 : </p>

        <div className="app-select">
          <AppSelect ref={refSelectTwo} value={'default'} listMenu={listTypeOrderTwo} />
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 2,
          alignItems: 'center',
        }}
      >
        <p className="title-filter">검색 : </p>
        <div className="app-select">
          <AppSelect ref={refSelect} value={'default'} listMenu={listType} />
        </div>
        <div className="input-search">
          <TextField
            className="input-text-search"
            onChange={(e) => setTextFilter(e.target.value)}
            value={textFilter}
            margin="normal"
            required
            fullWidth
            name=""
            type=""
            id="input-search"
            placeholder="검색어를 입력하세요."
          />
        </div>
        <Button variant="contained" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={getMatching}>
          검색
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
        <TableMatching listMatching={listMatching} />
        {renderEmpty()}
      </Box>
    </div>
  );
}
