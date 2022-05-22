import {
  Button,
  Container,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import AppRangeDatePicker from "../../component/app-range-date-picker";
import AppSelect from "../../component/app-select/AppSelect";
import { PaymentService } from "../../services";
import { COLOR } from "../../utils";
import TableTicket from "./component/TableTicket";

export default function ReservationTicket() {
  const [status, setStatus] = useState("default");
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [textFilter, setTextFilter] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [listTicket, setListTicket] = useState([]);
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);

  useEffect(() => {
    getTicket();
    return () => {};
  }, [pageNumber]);

  const getTicket = async () => {
    try {
      const startDate = moment(refRangeDate.current?.startDate)
        .add(1, "days")
        .toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const fieldSearch = refSelect.current?.value;
      const statusData = refSelect.current?.value;

      const filters =
        refSelect.current.value !== "default"
          ? [`${refSelect.current.value}=${textFilter}`]
          : [`default=${textFilter}`];

      if (status !== "default") filters.push(`status=${status}`);

      const filter = filters.filter((column) => column).join(",");

      const response = await PaymentService.getReservation(
        startDate,
        endDate,
        pageNumber,
        10,
        true,
        filter,
        "STORE"
      );
      if (response.status === 200) {
        setListTicket(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error: any) {
      if (error?.response?.data.errorCode === 11010) {
        alert("YYYY-MM-DD와 같은 날짜방식으로 입력하세요.");
      }
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  const renderEmpty = () => {
    if (listTicket.length === 0) {
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
    { label: "구분", value: "default" },
    { label: "업체명", value: "store" },
    { label: "주문정보", value: "product" },
    { label: "수량", value: "amount" },
    { label: "주문자명", value: "name" },
    { label: "결제금액", value: "price" },
    { label: "결제수단", value: "provider" },
    { label: "결제일시", value: "date" },
    { label: "환불요청일시", value: "cancel" },
  ];

  return (
    <div className="root-container">
      <p className="title-page">티켓 예약관리</p>
      <AppRangeDatePicker title="가입일 :" ref={refRangeDate} />
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
          onClick={getTicket}
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
        <TableTicket listTicket={listTicket} />
        {renderEmpty()}
      </Box>
    </div>
  );
}
