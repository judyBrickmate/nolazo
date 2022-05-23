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
import RegisterModal from "./component/ResisterModal";
import { useAppSelector } from "../../redux/hook";
import { USER_ROLE } from "../../helpers/storage";

export default function ManagerMember() {
  const userInfo = useAppSelector((state) => state.user.user);
  const [userRole, setUserRole] = useState<any>("");
  const [status, setStatus] = useState("default");
  const [userStatus, setUserStatus] = useState("default");
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const refSelect = useRef<any>(null);
  const [openRegister, setOpenRegister] = useState(false);

  useEffect(() => {
    getMember();
    getRole();

    return () => {};
  }, [pageNumber]);

  const getRole = () => {
    const role = window.localStorage.getItem(USER_ROLE);
    setUserRole(role);
    console.log(role);
  };

  const getMember = async () => {
    try {
      const startDate = moment("2022/01/01").toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const fieldSearch = refSelect.current?.value;
      const statusData = refSelect.current?.value;
      // const filter: any = {};
      // if (status !== "default") {
      //   filter[status] = status;
      // }
      // filter[fieldSearch] = textFilter;
      // console.log("filter", filter);

      const response = await UserService.getListUser(startDate, endDate, pageNumber, 10, true, `${statusData}=${textFilter}${userStatus !== "default" ? `,status=${userStatus}` : ""}`, "MANAGER"); // status + '=' + textFilter / JSON.stringify(filter)
      if (response.status === 200) {
        setListUser(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error: any) {
      if (error?.response.data.message[0] === "email must be an email") {
        alert("이메일 형식으로 입력해주세요.");
      }

      if (error?.response.data.message[0] === "role must be a valid enum value") {
        alert("구분은 [총괄관리자, 일반관리자, 업체관리자]중 하나로 입력해주세요");
      }
    }
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
    console.log(event.target.value);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const openRegisterModal = () => {
    setOpenRegister(true);
  };

  const listType = [
    { label: "전체", value: "default" },
    { label: "구분", value: "role" },
    { label: "ID", value: "id" },
    { label: "이름", value: "name" },
    { label: "연락처", value: "phone" },
    { label: "이메일", value: "email" },
    { label: "등록일", value: "registery" },
  ];

  return (
    <div className="root-container">
      <p className="title-page">관리자 회원 관리</p>
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
        {userRole === "총괄관리자" && (
          <Button variant="outlined" size="large" style={{ marginLeft: "20px" }} onClick={openRegisterModal}>
            관리자 회원 등록
          </Button>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
        <TableMember listUser={listUser} getMember={getMember} userRole={userRole} />
        {renderEmpty()}
      </Box>
      {openRegister && <RegisterModal setOpenRegister={setOpenRegister} getMember={getMember} pageNumber={pageNumber} />}
    </div>
  );
}
