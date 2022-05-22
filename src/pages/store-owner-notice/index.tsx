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
import React, { useEffect, useRef, useState } from "react";
import AppRangeDatePicker from "../../component/app-range-date-picker";
import moment from "moment";
import { COLOR } from "../../utils";
import TableNotice from "./component/TableNotice";
import { NotificationService } from "../../services";

export default function StoreOwnerNotice() {
  const refRangeDate = useRef<any>(null);
  const [userStatus, setUserStatus] = useState("default");
  const [totalPage, setTotalPage] = useState(0);
  const [listNotice, setListNotice] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const refSelect = useRef<any>(null);

  useEffect(() => {
    getStoreNotice();

    return () => {};
  }, [pageNumber]);

  const getStoreNotice = async () => {
    try {
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const response = await NotificationService.getNotification(
        startDate,
        endDate,
        pageNumber,
        10,
        true
      );

      if (response.status === 200) {
        setListNotice(response.data?.data?.items);
        setTotalPage(response.data?.data.meta?.totalPages);
      }
    } catch (error: any) {}
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  const renderEmpty = () => {
    if (listNotice.length === 0) {
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
      <p className="title-page">알림조회</p>
      <div style={{ display: "flex" }}>
        <AppRangeDatePicker title="일자 :" ref={refRangeDate} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ ml: 2, pt: "9px", pb: "9px" }}
            onClick={getStoreNotice}
          >
            검색
          </Button>
        </Box>
      </div>
      <Box sx={{ mt: 4 }}>
        {totalPage > 1 && (
          <Pagination
            count={totalPage}
            shape="rounded"
            sx={{ mb: 1 }}
            onChange={handleChangePage}
          />
        )}
        <TableNotice listNotice={listNotice} />
        {renderEmpty()}
      </Box>
    </div>
  );
}
