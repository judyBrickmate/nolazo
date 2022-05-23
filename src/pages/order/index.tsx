import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import AppRangeDatePicker from "../../component/app-range-date-picker";
import AppSelect from "../../component/app-select/AppSelect";
import { COLOR } from "../../utils";
import { Button, Pagination, TextField } from "@mui/material";
import TableOrder from "./component/TableOrder";
import { PaymentService } from "../../services";

export default function Order() {
  const [orderStatus, setOrderStatus] = useState("default");
  const [listOrder, setListOrder] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const refRangeDate = useRef<any>(null);
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);
  const refSelectThree = useRef<any>(null);
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    getOrder();

    return () => {};
  }, [pageNumber]);

  const getOrder = async () => {
    try {
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const filters = refSelect.current.value !== "default" ? [`${refSelect.current.value}=${textFilter}`] : [`default=${textFilter}`];

      const types = ["STORE", "MATCH"];
      let type = refSelect.current.value;
      if (types.includes(type)) {
        if (type === "STORE") {
          type = `&type=STORE`;
        }
        if (type === "MATCH") {
          type = "&type=MATCH";
        }
      } else {
        type = "";
      }

      // select the 2nd one
      // if (refSelect.current.value !== "default") {
      //   filters.push(`&type=${refSelect.current.value}`);
      // }

      if (refSelectTwo.current.value !== "default") filters.push(`status=${refSelectTwo.current.value}`);

      const filter = filters.filter((column) => column).join(",");

      const fieldSearch = refSelect.current.value;
      const statusData = refSelect.current.value;

      const response = await PaymentService.getListPayment(startDate, endDate, pageNumber, 10, true, filter, type);
      if (response.status === 200) {
        setListOrder(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error: any) {
      if (error?.response.data.message[0] === "amount must be a number conforming to the specified constraints") {
        alert("숫자를 입력하세요.");
      }
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const renderEmpty = () => {
    if (listOrder.length === 0) {
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
  ];

  const listTypeOrderOne = [
    { label: "주문구분", value: "default" },
    { label: "티켓", value: "STORE" },
    { label: "매칭", value: "MATCH" },
  ];
  const listTypeOrderTwo = [
    { label: "주문상태", value: "default" },
    { label: "미결제", value: "PENDING" },
    { label: "결제완료", value: "SUCCESS" },
    { label: "결제실패", value: "FAILED" },
    { label: "환불예정", value: "REFUND" },
  ];

  // const listTypeOrderThree = [
  //   { label: "결제수단", value: "default" },
  //   { label: "토스", value: "toss" },
  //   { label: "네이버", value: "naver" },
  //   { label: "카카오페이", value: "kakao" },
  //   { label: "신용카드", value: "credit" },
  // ];

  return (
    <div className="root-container">
      <p className="title-page">주문관리</p>
      <AppRangeDatePicker title="일자 :" ref={refRangeDate} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        <p className="title-filter">선택 : </p>
        <div className="app-select">
          <AppSelect ref={refSelect} value={"default"} listMenu={listTypeOrderOne} />
        </div>
        <div className="app-select">
          <AppSelect ref={refSelectTwo} value={"default"} listMenu={listTypeOrderTwo} />
        </div>
        {/* <div className="app-select">
          <AppSelect ref={refSelectThree} value={"default"} listMenu={listTypeOrderThree} />
        </div> */}
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
            onChange={(e: any) => setTextFilter(e.target.value)}
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
        <Button variant="contained" sx={{ ml: 2, pt: "9px", pb: "9px" }} onClick={getOrder}>
          검색
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
        <TableOrder listOrder={listOrder} />
        {renderEmpty()}
      </Box>
    </div>
  );
}
