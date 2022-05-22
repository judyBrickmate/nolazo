import {
  Box,
  Button,
  Pagination,
  Paper,
  StyledEngineProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AppSelect from "../../../component/app-select/AppSelect";
import { ROUTER } from "../../../router/routes";
import { CategoryService, UserService } from "../../../services";
import { COLOR } from "../../../utils";
import EditCategoryModal from "./EditCategoryModal";
import RegisterCategoryModal from "./RegisterCategoryModal";

export default function TablePrimary(props: any) {
  const { allCategories } = props;
  const [totalPage, setTotalPage] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const refRangeDate = useRef<any>(null);
  const [textFilter, setTextFilter] = useState("");
  const refSelect = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [categoryData, setCategoryData] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    getCategory();
  }, [pageNumber]);
  const column = [
    "No",
    "카테고리명",
    "카테고리 코드",
    "공개여부",
    "등록일",
    "관리",
  ];

  const getCategory = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const filters: [string] =
        refSelect.current.value !== "default"
          ? [`${refSelect.current.value}=${textFilter},layer=primary`]
          : [`default=${textFilter},layer=primary`];
      const response = await CategoryService.getCategoryList(
        "WHO",
        "2022-01-01",
        endDate,
        true,
        pageNumber,
        10,
        filters
      );

      if (response.status === 200) {
        setListCategory(response.data?.data?.items);
        setTotalPage(response.data?.data?.meta?.totalPages);
      }
    } catch (error: any) {
      if (error?.response?.data.errorCode === 11010) {
        alert("YYYY-MM-DD와 같은 날짜방식으로 입력하세요.");
      }
    }
  };

  //   if (primaryCategory.length > 5) {
  //     setTotalPage(primaryCategory?.length);
  //   }
  const renderEmpty = () => {
    if (listCategory?.length === 0) {
      return (
        <>
          <div style={{ display: "flex" }}>
            <h1
              style={{
                color: COLOR.MIDDLE_BLACK,
                fontSize: "24px",
                margin: "100px auto",
              }}
            >
              데이터가 없습니다.
            </h1>
          </div>
        </>
      );
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  const listType = [
    { label: "전체", value: "default" },
    { label: "카테고리명", value: "name" },
    { label: "카테고리 코드", value: "categoryId" },
    { label: "공개여부", value: "isActive" },
    { label: "등록일", value: "date" },
  ];
  const openRegisterModal = () => {
    setOpenRegister(true);
  };
  const handleClickEdit = (data: any) => {
    openEditModal();
    setCategoryData(data);
  };
  const openEditModal = () => {
    setOpenEdit(true);
  };

  return (
    <div className="root-container">
      <p className="title-page">대분류 카테고리 관리</p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        <p className="title-filter">검색 : </p>
        <div className="app-select">
          <AppSelect ref={refSelect} value={"default"} listMenu={listType} />
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
        <Button
          variant="contained"
          sx={{ ml: 2, pt: "9px", pb: "9px" }}
          onClick={getCategory}
        >
          검색
        </Button>
        <Button
          variant="outlined"
          size="large"
          style={{ marginLeft: "20px" }}
          onClick={openRegisterModal}
        >
          누구랑 카테고리 등록
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && (
          <Pagination
            count={totalPage}
            shape="rounded"
            sx={{ mb: 1 }}
            onChange={handleChangePage}
          />
        )}
        <StyledEngineProvider injectFirst>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              size="small"
              aria-label="customized table"
            >
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
                {listCategory.map((row: any, index) => (
                  <TableRow key={row.id} className="table_row">
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.isActive}</TableCell>
                    <TableCell align="center">
                      {moment(row.createdAt).format("YYYY-MM-DD hh:mm")}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleClickEdit(row)}
                      >
                        수정
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {openEdit && (
            <EditCategoryModal
              categoryData={categoryData}
              setOpenEdit={setOpenEdit}
              getCategory={getCategory}
              listCategory={listCategory}
              allCategories={allCategories}
            />
          )}
        </StyledEngineProvider>
        {openRegister && (
          <RegisterCategoryModal
            setOpenRegister={setOpenRegister}
            listCategory={listCategory}
            getCategory={getCategory}
            pageNumber={pageNumber}
            setTotalPage={setTotalPage}
            allCategories={allCategories}
          />
        )}
        {renderEmpty()}
      </Box>
    </div>
  );
}
