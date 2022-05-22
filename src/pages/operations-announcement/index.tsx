import { Box, Button, Pagination, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AppSelect from "../../component/app-select/AppSelect";
import { ROUTER } from "../../router/routes";
import { OperationService } from "../../services";
import { COLOR } from "../../utils";
import NotiList from "./component/NotiList";

export default function OperationsAnnouncement() {
  const navigate = useNavigate();
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [notiList, setNotiList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [textFilter, setTextFilter] = useState("");
  const refSelect = useRef<any>(null);

  const listType = [
    { label: "구분", value: "default" },
    { label: "공지제목", value: "title" },
    { label: "작성자", value: "writer" },
    { label: "공지일자", value: "date" },
  ];

  const renderEmpty = () => {
    if (notiList.length === 0) {
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

  useEffect(() => {
    getNotiList();
    return () => {};
  }, [pageNumber]);

  const getNotiList = async () => {
    try {
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const statusData = refSelect.current.value;

      const filters = refSelect.current.value !== "default" ? [`${refSelect.current.value}=${textFilter}`] : [`default=${textFilter}`];

      const filter = filters.filter((column) => column).join(",");

      const response = await OperationService.getNoificationList("2022-01-01", endDate, pageNumber, 10, true, filter);
      if (response.status === 200) {
        const noticeList = response.data.data.items.filter((item: any) => item.type === "NOTICE");
        console.log(noticeList);

        setNotiList(noticeList);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  return (
    <div className="root-container">
      <p className="title-page">공지사항</p>
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
        <Button variant="contained" sx={{ ml: 2, pt: "9px", pb: "9px" }} onClick={getNotiList}>
          검색
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <NotiList notiList={notiList} />
        {renderEmpty()}
        {totalPage > 1 && (
          <Pagination
            count={totalPage}
            shape="rounded"
            sx={{ mb: 1 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
            onChange={handleChangePage}
          />
        )}
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button variant="outlined" size="medium" onClick={() => navigate(ROUTER.OPERATIONS_ANNOUNCEMENT_ADD)}>
          작성하기
        </Button>
      </div>
    </div>
  );
}
