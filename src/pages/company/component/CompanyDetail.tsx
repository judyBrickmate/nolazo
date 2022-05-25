import { Button, Card, CardMedia, Checkbox, FormControlLabel, StyledEngineProvider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ROUTER } from "../../../router/routes";
import styled from "styled-components";
import { COLOR } from "../../../utils/colors";
import { Link } from "react-router-dom";
import moment from "moment";
import { CategoryService, StoreService } from "../../../services";
import ItemResisterModal from "./ItemResisterModal";
import ProductEditModal from "./ProductEditModal";
import DeleteModal from "./DeleteModal";
import { CategoryType, ICategory } from "../../../interface";

type LocationState = {
  id: number;
};

const listOptionItem = [
  {
    name: "반려동물 동반가능",
    value: "0",
    category: "pet",
  },
  {
    name: "유모차/휠체어",
    value: "1",
    category: "pet",
  },
  {
    name: "키즈카페",
    value: "2",
    category: "pet",
  },
  {
    name: "음식물 반입가능",
    value: "3",
    category: "pet",
  },
  {
    name: "흡연실",
    value: "4",
    category: "pet",
  },
  {
    name: "남/녀 화장실 구분",
    value: "5",
    category: "pet",
  },
  {
    name: "수유실",
    value: "6",
    category: "pet",
  },
  {
    name: "단체석",
    value: "7",
    category: "pet",
  },
  {
    name: "무선인터넷",
    value: "8",
    category: "pet",
  },
];

export default function CompanyDetail(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [terms, setTerms]: any = useState({});
  const [openRegister, setOpenRegister] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [productParam, setProductParam] = useState([]);
  const [companyData, setCompanyData] = useState({
    title: "",
    ownerId: "",
    contact: "",
    contactAdditional: "",
    businessNumber: "",
    location: "",
    time: [{ day: "", time: "", close: "" }],
    description: "",
    images: [],
    limitAge: "",
    freeAge: "",
    status: "",
    homePage: "",
    products: [],
    terms: [],
    banner: { large: "", medium: "", thumbnail: "" },
    categories: [
      {
        name: "",
        parent: {
          name: "",
        },
      },
    ],
  });

  const { id } = location?.state as LocationState;

  const column = {
    1: "업체분류",
    2: "상호명",
    3: "대표자명",
    4: "사업자등록번호",
    5: "대표 연락처",
    6: "추가 연락처",
    7: "업체주소",
    8: "영업시간",
    9: "업체 설명",
    10: "제한연령",
    11: "무료연령",
    12: "편의시설 및 서비스",
    13: "홈페이지",
    14: "영업상태",
  };

  const productColumn = ["상품코드", "업체명", "상품명", "판매가", "단위", "노출여부", "등록일", "관리"];

  const [allCategory, setAllCategory]: any = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    getWhoCategory();
  }, []);
  const getWhoCategory = async () => {
    try {
      const response = await CategoryService.getCategoryList("WHO", "2022-01-01", "2030-01-01", true, 1, 200);

      response.status === 200 && getHowCategory(response?.data.data.items);
    } catch (error: any) {
      if (error) {
        console.log(error?.response);
      }
    }
  };

  const getHowCategory = async (who: ICategory[]) => {
    try {
      const response = await CategoryService.getCategoryList("HOW", "2022-01-01", "2030-01-01", true, 1, 200);

      response.status === 200 && getWhereCategory(who, response?.data.data.items);
    } catch (error: any) {
      if (error) {
        console.log(error?.response);
      }
    }
  };
  const getWhereCategory = async (who: ICategory[], how: ICategory[]) => {
    try {
      const response = await CategoryService.getCategoryList("WHERE", "2022-01-01", "2030-01-01", true, 1, 200);

      if (response.status === 200) {
        setAllCategory({
          [CategoryType.WHO]: who,
          [CategoryType.HOW]: how,
          [CategoryType.WHERE]: response?.data.data.items,
        });
        setIsFetched(true);
      }
    } catch (error: any) {
      if (error) {
        console.log(error?.response);
      }
    }
  };

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
      companyData.categories[0]?.parent.name +
      "  > " +
      companyData.categories[0]?.name +
      "  |  " +
      companyData.categories[2]?.parent.name +
      "  >  " +
      companyData.categories[2]?.name +
      "  |  " +
      companyData.categories[1]?.parent.name +
      "  >  " +
      companyData.categories[1]?.name
    );
  };

  const isCheckboxChecked = (index: number, checked: boolean, name: string) => {
    console.log(index, checked);

    const zero = name === listOptionItem[0].name && `${name}${checked}` === `${name}true` ? true : false;
    const one = name === listOptionItem[1].name && `${name}${checked}` === `${name}true` ? true : false;
    const two = name === listOptionItem[2].name && `${name}${checked}` === `${name}true` ? true : false;
    const three = name === listOptionItem[3].name && `${name}${checked}` === `${name}true` ? true : false;
    const four = name === listOptionItem[4].name && `${name}${checked}` === `${name}true` ? true : false;
    const five = name === listOptionItem[5].name && `${name}${checked}` === `${name}true` ? true : false;
    const six = name === listOptionItem[6].name && `${name}${checked}` === `${name}true` ? true : false;
    const seven = name === listOptionItem[7].name && `${name}${checked}` === `${name}true` ? true : false;
    const eight = name === listOptionItem[8].name && `${name}${checked}` === `${name}true` ? true : false;

    setTerms({
      "반려동물 동반가능": zero,
      "유모차/휠체어": one,
      키즈카페: two,
      "음식물 반입가능": three,
      흡연실: four,
      "남/녀 화장실 구분": five,
      수유실: six,
      단체석: seven,
      무선인터넷: eight,
    });
  };

  const renderEmpty = () => {
    if (companyData?.products.length === 0) {
      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1
              style={{
                color: COLOR.MIDDLE_BLACK,
                fontSize: '24px',
                margin: '50px auto',
              }}
            >
              등록된 상품이 없습니다.
            </h1>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Header>
          <Title>{companyData.title}</Title>님의 상세정보
        </Header>
        <TableTitle>● 업체이미지</TableTitle>
        <div style={{ display: "flex", margin: "20px" }}>
          <Card style={{ margin: "0 10px" }}>
            <CardMedia component="img" height="140" alt="banner images" image={companyData?.banner?.medium} />
          </Card>
          {companyData?.images?.map((el: any, index: any) => (
            <Card key={index} style={{ margin: "0 10px" }}>
              <CardMedia component="img" height="140" alt="banner images" image={el.medium} />
            </Card>
          ))}
        </div>
        <TableTitle>● 기본정보</TableTitle>
        <Table sx={{ minWidth: 700, wordBreak: "keep-all" }} aria-label="customized table">
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
            <TableCell>{companyData.ownerId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[4]}</TableCell>
            <TableCell
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {companyData.businessNumber}
              <Button variant="outlined">첨부파일 확인</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[5]}</TableCell>
            <TableCell>{companyData.contact}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[6]}</TableCell>
            <TableCell>{companyData.contactAdditional || "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[7]}</TableCell>
            <TableCell>{companyData.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[8]}</TableCell>
            <TableCell>
              <div style={{ display: "flex", flexWrap: "wrap", width: "700px" }}>
                {companyData.time?.map((el, index) => (
                  <div key={index} style={{ marginRight: "20px" }}>
                    {el.day} : {el.time}
                    <input
                      type="checkbox"
                      id="closed"
                      checked={Boolean(el.close)}
                      onClick={() => {
                        return false;
                      }}
                      readOnly
                    />
                    <label htmlFor="closed">휴무 </label>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[9]}</TableCell>
            <TableCell>{companyData.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[14]}</TableCell>
            <TableCell>{companyData.status === "closed" ? "정지" : "운영중"}</TableCell>
          </TableRow>

          <TableTitle>● 추가정보</TableTitle>
          <TableRow>
            <TableCell variant="head">{column[10]}</TableCell>
            <TableCell>만 {companyData.limitAge}세 미만</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[11]}</TableCell>
            <TableCell>만 {companyData.freeAge}세 미만</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[12]}</TableCell>
            <TableCell>
              {companyData.terms &&
                Object.entries(companyData.terms)
                  .map((el) => ({ name: el[0], value: el[1] }))
                  .map((data, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        className="twocolelement"
                        control={
                          <Checkbox
                            disabled
                            defaultChecked={data.value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => isCheckboxChecked(index, e.target.checked, data.name)}
                            name={data.name}
                            value={data.value}
                            color="default"
                          />
                        }
                        label={<Typography className="checkboxTypo">{data.name}</Typography>}
                      />
                    );
                  })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[13]}</TableCell>
            <TableCell>
              <Link to={companyData.homePage || ""} target="_blank">
                {companyData.homePage}
              </Link>
            </TableCell>
          </TableRow>
        </Table>
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "30px 30px 0 30px" }}>
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
                <TableCell align="center">{((row.price * (100 - row.discount)) / 100).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                <TableCell align="center">{row.type === "TICKET" ? "일(24시간)" : "시간"}</TableCell>
                <TableCell align="center">{row.status === "exposed" ? "노출" : "미노출"}</TableCell>
                <TableCell align="center">{moment(row.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => openEdit(row)}>수정</Button>
                  <Button onClick={() => openDeleteConfirmModal(row.id)}>삭제</Button>
                </TableCell>
                
              </TableRow>
              
            ))}
            {renderEmpty()}
          </TableBody>
        </Table>
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px 30px 80px 20px" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() =>
              navigate(ROUTER.COMPANY_DETAIL_EDIT, {
                state: { data: companyData, allCategory: allCategory, id: id },
              })
            }
            style={{ marginRight: "10px" }}
          >
            정보수정
          </Button>
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
