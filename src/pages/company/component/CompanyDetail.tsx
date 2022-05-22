import { Button, Card, CardMedia, Checkbox, FormControlLabel, FormGroup, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate } from 'react-router';
import { ROUTER } from '../../../router/routes';
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { StoreService } from '../../../services';
import ItemResisterModal from './ItemResisterModal';
import ProductEditModal from './ProductEditModal';
import DeleteModal from './DeleteModal';

type LocationState = {
  id: number;
};

const listItem = [
  {
    name: '반려동물 동반가능',
    value: 'petAvailable',
    category: 'pet',
  },
  {
    name: '반려동물 동반가능',
    value: 'petAvailable',
    category: 'pet',
  },
  {
    name: '반려동물 동반가능',
    value: 'petAvailable',
    category: 'pet',
  },
  {
    name: '반려동물 동반가능',
    value: 'petAvailable',
    category: 'pet',
  },
];

export default function CompanyDetail(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(() => listItem.map((i) => false));
  const [openRegister, setOpenRegister] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [productParam, setProductParam] = useState([]);
  const [companyData, setCompanyData] = useState({
    title: '',
    owner: '',
    contact: '',
    businessNumber: '',
    location: '',
    openingHours: '',
    description: '',
    images: [],
    limitAge: '',
    freeAge: '',
    status: '',
    homePage: '',
    products: [],
    banner: {},
    categories: [
      {
        name: '',
        parent: {
          name: '',
        },
      },
    ],
  });

  const { id } = location?.state as LocationState;

  const column = {
    1: '업체분류',
    2: '상호명',
    3: '대표자명',
    4: '사업자등록번호',
    5: '대표 연락처',
    6: '추가 연락처',
    7: '업체주소',
    8: '영업시간',
    9: '업체 설명',
    10: '제한연령',
    11: '무료연령',
    12: '편의시설 및 서비스',
    13: '홈페이지',
    14: '영업상태',
  };

  const productColumn = ['상품코드', '업체명', '상품명', '판매가', '단위', '노출여부', '등록일', '관리'];

  useEffect(() => {
    getCompanyInfo();

    return () => {};
  }, []);

  const getCompanyInfo = async () => {
    try {
      setLoading(true);
      const response = await StoreService.getStoreDetail(id);
      if (response.status === 200) {
        setCompanyData(response?.data?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const openRegisterModal = () => {
    setOpenRegister(true);
    setOpenEditModal(false);
  };

  const openEdit = (rowInfo: any) => {
    setOpenEditModal(true);
    setOpenRegister(false);
    setProductParam(rowInfo);
  };

  const openDeleteConfirmModal = (deletekey: any) => {
    setOpenDeleteModal(true);
    setOpenEditModal(false);
    setOpenRegister(false);
    setDeleteKey(deletekey);
  };

  const showCategoryData = () => {
    return (
      companyData.categories[1]?.parent.name +
      '  >  ' +
      companyData.categories[1]?.name +
      '  |  ' +
      companyData.categories[0]?.name +
      '  |  ' +
      companyData.categories[2]?.parent.name +
      '  >  ' +
      companyData.categories[2]?.name
    );
  };

  const isCheckboxChecked = (index: number, checked: boolean) => {
    setIsChecked((isChecked) => {
      return isChecked.map((c, i) => {
        if (i === index) return checked;
        return c;
      });
    });
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Header>
          <Title>{companyData.title}</Title>님의 상세정보
        </Header>
        <TableTitle>● 업체이미지</TableTitle>
        <div style={{ display: 'flex' }}>
          {companyData?.images?.map((el: any, index: any) => (
            <Card key={index} style={{ margin: '0 10px' }}>
              <CardMedia component="img" height="140" alt="banner images" image={el.medium} />
            </Card>
          ))}
        </div>
        <TableTitle>● 기본정보</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableRow>
            <TableCell variant="head">{column[1]}</TableCell>
            <TableCell>{showCategoryData()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[2]}</TableCell>
            <TableCell>{companyData.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[3]}</TableCell>
            <TableCell>{companyData.owner}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[4]}</TableCell>
            <TableCell
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {companyData.businessNumber}
              <Button variant="outlined">첨부파일 확인</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[5]}</TableCell>
            <TableCell>{companyData.businessNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[6]}</TableCell>
            <TableCell>{companyData.businessNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[7]}</TableCell>
            <TableCell>{companyData.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[8]}</TableCell>
            <TableCell>{companyData.openingHours}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[9]}</TableCell>
            <TableCell>{companyData.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[14]}</TableCell>
            <TableCell>{companyData.status === 'closed' ? '정지' : '운영중'}</TableCell>
          </TableRow>

          <TableTitle>● 추가정보</TableTitle>
          <TableRow>
            <TableCell variant="head">{column[10]}</TableCell>
            <TableCell>{companyData.limitAge}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[11]}</TableCell>
            <TableCell>{companyData.freeAge}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[12]}</TableCell>
            <TableCell>
              {listItem.map((checkbox, index) => {
                return (
                  <FormControlLabel
                    key={index + checkbox.name}
                    className="twocolelement"
                    control={
                      <Checkbox
                        name={checkbox.name}
                        value={checkbox.value}
                        id={checkbox.category}
                        checked={isChecked[index]}
                        color="primary"
                        onChange={(e) => isCheckboxChecked(index, e.target.checked)}
                      />
                    }
                    label={checkbox.name}
                  />
                );
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[13]}</TableCell>
            <TableCell>
              <Link to={companyData.homePage} target="_blank">
                {companyData.homePage}
              </Link>
            </TableCell>
          </TableRow>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" size="large" onClick={openRegisterModal}>
            상품등록
          </Button>
        </div>
        {openRegister && <ItemResisterModal setOpenRegister={setOpenRegister} getCompanyInfo={getCompanyInfo} />}
        <TableTitle>● 상품 리스트</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {productColumn.map((item, index) => (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData?.products.map((row: any, index: number) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{companyData.title}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{((row.price * (100 - row.discount)) / 100).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
                <TableCell align="center">{row.type === 'TICKET' ? '일(24시간)' : '시간'}</TableCell>
                <TableCell align="center">{row.status === 'exposed' ? '노출' : '미노출'}</TableCell>
                <TableCell align="center">{moment(row.createdAt).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => openEdit(row)}>수정</Button>
                  <Button onClick={() => openDeleteConfirmModal(row.id)}>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={ROUTER.COMPANY_DETAIL_EDIT}>
            <Button variant="outlined" size="large">
              정보수정
            </Button>
          </Link>
          <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
        </div>
        {openEditModal && <ProductEditModal setOpenEditModal={setOpenEditModal} products={productParam} getCompanyInfo={getCompanyInfo} />}
        {openDeleteModal && <DeleteModal setOpenDeleteModal={setOpenDeleteModal} deleteKey={deleteKey} getCompanyInfo={getCompanyInfo} />}
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
