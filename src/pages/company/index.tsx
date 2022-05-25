import { Button,  Container, FormControlLabel, Pagination, Radio, RadioGroup, TextField } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import AppSelect from "../../component/app-select/AppSelect";
import { StoreService } from "../../services";
import { COLOR, StoreStatus, UserStatus, USER_STATUS } from "../../utils";
import "./styles.scss";
import Enum from "../../utils/enum";
import CompanyList from "./component/CompanyList";
export default function Company() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("default");
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [companyList, setCompanyList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const refSelect = useRef<any>(null);

  useEffect(() => {
    getCompanyList();
    return () => {};
  }, [pageNumber]);

  const getCompanyList = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const statusData = refSelect.current.value;
      // const filter: any = {};
      // if (status !== 'default') {
      //   filter[status] = status;
      // }
      // filter[fieldSearch] = textFilter;
      // console.log('filter', filter);

      const filters = refSelect.current.value !== "default" ? [`${refSelect.current.value}=${textFilter}`] : [`default=${textFilter}`];

      if (status !== "default") filters.push(`status=${status}`);

      const filter = filters.filter((column) => column).join(",");

      const response = await StoreService.getStoreList("2022-01-01", endDate, true, pageNumber, 10, filter);
      if (response.status === 200) {
        setCompanyList(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
    console.log(event.target.value);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const listType = [
    { label: "전체", value: "default" },
    { label: "업체아이디", value: "storeId" },
    { label: "업체명", value: "title" },
    { label: "업체연락처", value: "contact" },
    { label: "업체평점", value: "rating" },
    { label: "결제건수", value: "amount" },
    { label: "가입일", value: "date" },
  ];

  const renderEmpty = () => {
    if (companyList.length === 0) {
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

  

  return (
    <div className="root-container">
      <p className="title-page">업체 리스트</p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        <p className="title-filter">업체 상태 : </p>
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={status} onChange={handleChange}>
          <FormControlLabel value="default" control={<Radio />} label="전체" />
          {new Enum(StoreStatus).toArray().map((item: any, index: number) => {
            return <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.key} />;
          })}
        </RadioGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        <p className="title-filter">검색 :</p>
        <div className="app-select">
          <AppSelect ref={refSelect} value={"default"} listMenu={listType} />
        </div>
        <div className="input-search">
          <TextField
            className="input-text-search"
            margin="normal"
            onChange={(e) => setTextFilter(e.target.value)}
            value={textFilter}
            required
            fullWidth
            name=""
            type=""
            id="input-search"
            placeholder="검색어를 입력하세요."
          />
        </div>
        <Button variant="contained" sx={{ ml: 2, pt: "9px", pb: "9px" }} onClick={getCompanyList}>
          검색
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
        
        <CompanyList companyList={companyList} getCompanyList={getCompanyList} loading={loading} />
        {renderEmpty()}
      </Box>
    </div>
  );
}
