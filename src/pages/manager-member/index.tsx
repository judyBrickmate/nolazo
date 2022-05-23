import { Button, Container, FormControlLabel, Pagination, Radio, RadioGroup, TextField } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import AppRangeDatePicker from "../../component/app-range-date-picker";
import AppSelect from "../../component/app-select/AppSelect";
import { UserService } from "../../services";
import { COLOR, UserStatus, USER_STATUS } from "../../utils";
import TableMember from "./component/TableMember";
import "./styles.scss";
const Enum = require("../../utils/enum");

export default function ManagerMember() {
  const [status, setStatus] = useState("default");
  const [userStatus, setUserStatus] = useState("default");
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const refSelect = useRef<any>(null);

  useEffect(() => {
    getMember();

    return () => {};
  }, [pageNumber]);

  const getMember = async () => {
    try {
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const fieldSearch = refSelect.current.value;
      const statusData = refSelect.current.value;
      // const filter: any = {};
      // if (status !== 'default') {
      //   filter[status] = status;
      // }
      // filter[fieldSearch] = textFilter;
      // console.log('filter', filter);

      const response = await UserService.getListUser(startDate, endDate, pageNumber, 10, true, `${statusData}=${textFilter}${userStatus !== "default" ? `,status=${userStatus}` : ""}`, "USER"); // status + '=' + textFilter / JSON.stringify(filter)
      if (response.status === 200) {
        setListUser(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error: any) {
      if (error?.response.data.message[0] === "to must be large than from") {
        alert("날짜를 다시 확인해주세요");
      } else {
        alert("가입구분은 [연락처, 애플, 카카오]중 하나로 입력해주세요");
        console.log(error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserStatus((event.target as HTMLInputElement).value);
    console.log(event.target.value);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const renderEmpty = () => {
    if (listUser.length === 0) {
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

  const listType = [
    { label: "전체", value: "default" },
    { label: "가입구분", value: "provider" },
    { label: "이름", value: "name" },
    { label: "연락처", value: "phone" },
  ];

  return (
    <div className="root-container">
      <p className="title-page">일반회원 관리</p>
      <AppRangeDatePicker title="가입일 :" ref={refRangeDate} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        <p className="title-filter">회원 상태 : </p>
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={userStatus} onChange={handleChangeStatus}>
          <FormControlLabel value="default" control={<Radio />} label="전체" />
          {new Enum(UserStatus).toArray().map((item: any, index: number) => {
            return <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.value} />;
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
        <Button variant="contained" sx={{ ml: 2, pt: "9px", pb: "9px" }} onClick={getMember}>
          검색
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
        <TableMember listUser={listUser} getMember={getMember} />
        {renderEmpty()}
      </Box>
    </div>
  );
}
