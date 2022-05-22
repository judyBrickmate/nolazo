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
import AppSelect from "../../../component/app-select/AppSelect";
import { CategoryService } from "../../../services";
import { COLOR } from "../../../utils";
import EditCategoryModal from "./EditCategoryModal";

export default function TableSecondary(props: any) {
  const { allCategory } = props;
  const [totalPage, setTotalPage] = useState(0);
  const [listSecondCategory, setListSecondCategory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const refRangeDate = useRef<any>(null);
  const [textFilter, setTextFilter] = useState("");
  const refSelect = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [openSecondEdit, setOpenSecondEdit] = useState(false);
  const [secondCategoryData, setSecondCategoryData] = useState({});

  const column = [
    "No",
    "대분류 지역",
    "소분류 지역",
    "소분류 코드",
    "공개여부",
    "등록일",
    "관리",
  ];
  useEffect(() => {
    getCategory();
  }, [pageNumber]);

  const getCategory = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const filters: [string] =
        refSelect.current.value !== "default"
          ? [`${refSelect.current.value}=${textFilter},layer=secondary`]
          : [`default=${textFilter},layer=secondary`];

      const response = await CategoryService.getCategoryList(
        "WHERE",
        "2022-01-01",
        endDate,
        true,
        pageNumber,
        10,
        filters
      );

      if (response.status === 200) {
        setListSecondCategory(response.data?.data?.items);

        setTotalPage(response.data?.data?.meta?.totalPages);
      }
    } catch (error: any) {
      if (error?.response?.data.errorCode === 11010) {
        alert("YYYY-MM-DD와 같은 날짜방식으로 입력하세요.");
      }
    }
  };

  const renderEmpty = () => {
    if (listSecondCategory.length === 0) {
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

  const handleClickEdit = (data: any) => {
    openEditModal();
    setSecondCategoryData(data);
  };

  const openEditModal = () => {
    setOpenSecondEdit(true);
  };

  const listType = [
    { label: "전체", value: "default" },
    { label: "대분류명", value: "parentName" },
    { label: "소분류명", value: "name" },
    { label: "소분류코드", value: "categoryId" },
    { label: "공개여부", value: "isActive" },
    { label: "등록일", value: "date" },
  ];

  return (
    <div className="root-container">
      <p className="title-page">소분류 카테고리 관리</p>
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
                {listSecondCategory.map((row: any, index) => (
                  <TableRow key={row.id} className="table_row">
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.parent.name}</TableCell>
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
          {openSecondEdit && (
            <EditCategoryModal
              secondCategoryData={secondCategoryData}
              setOpenSecondEdit={setOpenSecondEdit}
              listSecondCategory={listSecondCategory}
              getCategory={getCategory}
              allCategory={allCategory}
            />
          )}
        </StyledEngineProvider>
        {renderEmpty()}
      </Box>
    </div>
  );
}
