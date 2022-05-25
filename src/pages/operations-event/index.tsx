import { Button, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTER } from "../../router/routes";
import { OperationService } from "../../services";
import OperationEventList from "./component/OperationEventList";

export default function OperationsEvent() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("default");
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [eventList, setEventList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [textFilter, setTextFilter] = useState("");
  const refSelect = useRef<any>(null);

  useEffect(() => {
    geteventList();
    return () => {};
  }, [pageNumber]);

  const geteventList = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();
      const fieldSearch = refSelect.current?.value;
      const filter: any = {};
      if (status !== "default") {
        filter[status] = status;
      }
      filter[fieldSearch] = textFilter;
      console.log("filter", filter);

      const response = await OperationService.getEventList("2022-01-01", endDate, true, pageNumber, 10, JSON.stringify(filter));
      if (response.status === 200) {
        setEventList(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  return (
    <div className="root-container">
      <p className="title-page">이벤트</p>
      <div style={{ display: "flex", justifyContent: "end", marginRight: "20px" }}>
        <Link to={ROUTER.OPERATIONS_EVENT_ADD}>
          <Button variant="outlined" sx={{ ml: 2, pt: "9px", pb: "9px" }} onClick={geteventList}>
            이벤트 작성
          </Button>
        </Link>
      </div>
      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
        <OperationEventList eventList={eventList} loading={loading} />
      </Box>
    </div>
  );
}
