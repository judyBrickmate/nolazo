import { Button, Container, FormControlLabel, Pagination, Radio, RadioGroup, TextField } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import { useRef } from 'react';
import AppRangeDatePicker from '../../../component/app-range-date-picker';
import AppSelect from '../../../component/app-select/AppSelect';
import '../styles.scss';

export default function SearchBar(props: any) {
  const { detail, getUserOrder, getUserMatching, getUserStoreReview, getUserMatchingReview, refRangeDate, refSelect, refSelectTwo, refSelectThree, textFilter, setTextFilter } = props;

  const renderOption = () => {
    if (detail === 'order') {
      const listTypeOrderOne = [
        { label: '주문구분', value: 'default' },
        { label: '티켓', value: 'STORE' },
        { label: '매칭', value: 'MATCH' },
      ];
      const listTypeOrderTwo = [
        { label: '주문상태', value: 'default' },
        { label: '미결제', value: 'PENDING' },
        { label: '결제완료', value: 'SUCCESS' },
        { label: '환불요청', value: 'REFUND' },
      ];

      const listTypeOrderThree = [
        { label: '전체', value: 'default' },
        { label: '업체명', value: 'store' },
        { label: '주문정보', value: 'product' },
        { label: '수량', value: 'amount' },
        { label: '결제금액', value: 'price' },
        { label: '결제수단', value: 'provider' },
      ];
      return (
        <>
          <p className="title-filter">선택 : </p>
          <div className="app-select">
            <AppSelect ref={refSelect} value={'default'} listMenu={listTypeOrderOne} />
          </div>
          <div className="app-select">
            <AppSelect ref={refSelectTwo} value={'default'} listMenu={listTypeOrderTwo} />
          </div>
          <p className="title-filter">검색 : </p>
          <div className="app-select">
            <AppSelect ref={refSelectThree} value={'default'} listMenu={listTypeOrderThree} />
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
          <Button variant="contained" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={getUserOrder}>
            검색
          </Button>
        </>
      );
    } else if (detail === 'matching') {
      const listTypeOrderOne = [
        { label: '결제상태', value: 'default' },
        { label: '매칭대기중', value: 'INITIAL' },
        { label: '미결제', value: 'PENDING' },
        { label: '결제완료', value: 'SUCCESS' },
        { label: '결제실패', value: 'FAILED' },
        { label: '환불요청', value: 'REFUND' },
      ];

      const listTypeOrderTwo = [
        { label: '전체', value: 'default' },
        { label: '매칭방명', value: 'title' },
        { label: '매칭방매니저', value: 'userName' },
        { label: '업체명', value: 'store' },
        { label: '상품명', value: 'product' },
        { label: '결제금액', value: 'price' },
      ];

      return (
        <>
          <p className="title-filter">선택 : </p>
          <div className="app-select">
            <AppSelect ref={refSelect} value={'default'} listMenu={listTypeOrderOne} />
          </div>

          <p className="title-filter">검색 : </p>
          <div className="app-select">
            <AppSelect ref={refSelectTwo} value={'default'} listMenu={listTypeOrderTwo} />
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

          <Button variant="contained" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={getUserMatching}>
            검색
          </Button>
        </>
      );
    } else if (detail === 'storeReview') {
      const listTypeOrderOne = [
        { label: '전체', value: 'default' },
        { label: '업체명', value: 'store' },
        { label: '주문번호', value: 'paymentId' },
        { label: '평점', value: 'rating' },
      ];

      return (
        <>
          <p className="title-filter">검색 : </p>
          <div className="app-select">
            <AppSelect ref={refSelect} value={'default'} listMenu={listTypeOrderOne} />
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

          <Button variant="contained" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={getUserStoreReview}>
            검색
          </Button>
        </>
      );
    } else if (detail === 'matchingReview') {
      const listTypeOrderOne = [
        { label: '전체', value: 'default' },
        { label: '매칭방명', value: 'matchingTitle' },
        { label: '매칭방장', value: 'name' },
        { label: '평점', value: 'rating' },
        { label: '작성일자', value: 'date' },
      ];

      return (
        <>
          <p className="title-filter">검색 : </p>
          <div className="app-select">
            <AppSelect ref={refSelect} value={'default'} listMenu={listTypeOrderOne} />
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

          <Button variant="contained" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={getUserMatchingReview}>
            검색
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <AppRangeDatePicker title="일자 :" ref={refRangeDate} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 2,
          alignItems: 'center',
        }}
      >
        {renderOption()}
      </Box>
    </>
  );
}
