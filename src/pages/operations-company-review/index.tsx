import { Box, Button, Pagination, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AppRangeDatePicker from "../../component/app-range-date-picker";
import AppSelect from "../../component/app-select/AppSelect";
import { OperationService } from "../../services";
import { COLOR } from "../../utils";
import StoreReviewList from "./component/StoreReviewList";

export default function OperationsMatchingReview() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("default");
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [textFilter, setTextFilter] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [storeReview, setStoreReview] = useState([]);
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);

  useEffect(() => {
    getStoreReview();
    return () => {};
  }, [pageNumber]);

  const getStoreReview = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).add(1, "days").toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const statusData = refSelect.current.value;

      const filters = refSelect.current.value !== "default" ? [`${refSelect.current.value}=${textFilter}`] : [`default=${textFilter}`];

      const filter = filters.filter((column) => column).join(",");

      const response = await OperationService.getStoreReviewList(startDate, endDate, true, pageNumber, 10, filter);

      if (response.status === 200) {
        setStoreReview(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error: any) {
      console.log(error?.response?.data.errorCode);
      if (error?.response?.data.errorCode === 11010) {
        alert("YYYY-MM-DD와 같은 날짜방식으로 입력하세요.");
      }
    }
    setLoading(false);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const renderEmpty = () => {
    if (storeReview.length === 0) {
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
    { label: "주문번호", value: "paymentId" },
    { label: "작성자", value: "reviewer" },
    { label: "평점", value: "rating" },
  ];

  // const listTypeOrderTwo = [
  //   { label: "주문상태", value: "default" },
  //   { label: "미결제", value: "PENDING" },
  //   { label: "결제완료", value: "SUCCESS" },
  //   { label: "결제실패", value: "FAILED" },
  //   { label: "환불요청", value: "REFUND" },
  // ];

  return (
    <div className="root-container">
      <p className="title-page">공지사항</p>
      <AppRangeDatePicker title="작성일자:" ref={refRangeDate} />

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
        <Button variant="contained" sx={{ ml: 2, pt: "9px", pb: "9px" }} onClick={getStoreReview}>
          검색
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
        <StoreReviewList storeReview={storeReview} loading={loading} />
        {renderEmpty()}
      </Box>
    </div>
  );
}
