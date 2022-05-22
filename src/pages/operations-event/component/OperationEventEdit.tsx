import { Button } from '@mui/material';
import moment from 'moment';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import AppRangeDatePicker from '../../../component/app-range-date-picker';
import AppSelect from '../../../component/app-select/AppSelect';
import { ROUTER } from '../../../router/routes';
import { OperationService, StoreService } from '../../../services';

interface LocationInfo {
  id: number;
  storeId: number,
  status: string;
  start: string;
  close: string;
  title: string;
  content: string;
  discount: number;
  image: {
    large?: any;
    medium?: any;
    thumbnail?: any;
  };
}

export default function OperationEventEdit() {
  const location = useLocation();
  const state = location.state as LocationInfo;
  const { id, storeId, status, start, close, image, discount, title, content } = state;
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);
  const [editTitle, setEditTitle] = useState(title);
  const [editDiscount, setEditDiscount] = useState<any>(discount);
  const [editContent, setEditContent] = useState(content);
  const [imgUri, setImgUri] = useState('');
  const refRangeDate = useRef<any>(null);
  const refSelect = useRef<any>(null);

  console.log(state);

  const storetNames = companyList.reduce(
    (acc: any, curr: any) =>
      acc.concat({
        label: curr.title,
        value: curr.id,
      }),
    [{ label: '업체명', value: 'default' }]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case 'title':
        setEditTitle(value);
        break;
      case 'content':
        setEditContent(value);
        break;
      case 'discount':
        setEditDiscount(Number(value));
        break;
      default:
        break;
    }
  };

  const handleFiles = (e: any) => {
    const file = e.target.files[0];
    setImgUri(file);
  };

  useLayoutEffect(() => {
    getCompanyList();
    return () => {};
  }, []);

  const getCompanyList = async () => {
    try {
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const fieldSearch = refSelect.current?.value;
      const filter: any = {};
      filter[fieldSearch] = '';

      const response = await StoreService.getStoreList('2022-01-01', endDate, true, 1, 10, JSON.stringify(filter));
      if (response.status === 200) {
        setCompanyList(response.data?.data?.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (refSelect.current.value === 'default') {
      alert('업체를 선택해주세요');
      return;
    }
    try {
      const formData = new FormData();

      if (imgUri !== '') {
        formData.append('image', imgUri);
      }
      formData.append('title', editTitle);
      formData.append('content', editContent);
      formData.append('discount', editDiscount);
      formData.append('start', refRangeDate.current?.startDate);
      formData.append('close', refRangeDate.current?.endDate);
      formData.append('storeId', refSelect.current?.value);

      const response = await OperationService.updateEventList(id, formData);
      if (response.status === 200) {
        alert('등록되었습니다.');
        navigate(ROUTER.OPERATIONS_EVENT);
      }
    } catch (error: any) {
      if (error?.response.data) {
        console.log(error?.response.data);
      }
    }
  };

  return (
    <>
      <div className="root-container">
        <p className="title-page">이벤트 수정</p>
      </div>
      <div>
        <div style={{ margin: '50px' }}>
          <AppRangeDatePicker fromDate={new Date()} toDate={new Date(close)} title="이벤트 기간:" ref={refRangeDate} />
        </div>
        <div style={{ margin: '50px', display: 'flex', alignItems: 'center' }}>
          <p>이벤트 썸네일 이미지:</p>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFiles} />
          </label>
        </div>
        <div style={{ margin: '-50px 0 0 200px', fontSize: '12px' }}>
          <div>* jpeg, jpg, png 파일로 첨부해주시기 바랍니다.</div>
          <div>* 이미지 사이즈는 ### x ###로 첨부해주시기 바랍니다.</div>
        </div>
        <div style={{ margin: '50px', display: 'flex', alignItems: 'center' }}>
          <p>업체 검색:</p>

          <div className="app-select">
            <AppSelect ref={refSelect} value={storeId} listMenu={storetNames} />
          </div>
        </div>
        <div style={{ margin: '50px', display: 'flex', alignItems: 'center' }}>
          <p>할인율:</p>
          <input type="number" name="discount" value={editDiscount} onChange={handleChange} required />
        </div>
        <div style={{ margin: '50px', display: 'flex', alignItems: 'center' }}>
          <p>이벤트 제목:</p>
          <input name="title" value={editTitle} onChange={handleChange} required />
        </div>
        <div style={{ margin: '50px', display: 'flex', alignItems: 'center' }}>
          <p>이벤트 내용:</p>
          <input name="content" value={editContent} onChange={handleChange} required />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginRight: '250px',
          }}
        >
          <Button variant="outlined" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={handleSubmit}>
            작성완료
          </Button>
          <Button variant="outlined" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={() => navigate(-1)}>
            작성취소
          </Button>
        </div>
      </div>
    </>
  );
}
