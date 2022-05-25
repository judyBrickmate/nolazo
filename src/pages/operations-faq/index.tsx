import { Box, Pagination } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { UserService } from "../../services";
import { COLOR } from "../../utils";
import FaqList from "./component/FaqList";

export default function OperationsFAQ() {
  const [loading, setLoading] = useState(false);
  const refRangeDate = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [faqList, setFaqList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const renderEmpty = () => {
    if (faqList.length === 0) {
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
    getFaqList();
    return () => {};
  }, [pageNumber]);

  const getFaqList = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const response = await UserService.getInquiriesList(0, "2022-01-01", endDate, pageNumber, 10, true);
      if (response.status === 200) {
        setFaqList(response.data?.data?.items);
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
      <p className="title-page">고객 문의</p>
      <Box sx={{ mt: 4 }}>
        <FaqList faqList={faqList} loading={loading} />
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
    </div>
  );
}
