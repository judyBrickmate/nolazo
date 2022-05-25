
import { Button, Container, FormControlLabel, Pagination, Radio, RadioGroup, TextField } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import AppSelect from '../../component/app-select/AppSelect';
import { UserService } from '../../services';
import { UserStatus, USER_STATUS } from '../../utils';
import TableMember from '../manager-member/component/TableMember';
import { useLocation } from 'react-router-dom';
import TableOrderDetail from './pages/TableOrderDetail';
import { ROUTER } from "../../router/routes";
import PageNotFound from "../../router/PageNotFound";
import TableMatchingDetail from "./pages/TableMatchingDetail";
import SearchBar from "./component/SearchBar";
import TableStoreReviewDetail from "./pages/TableStoreReviewDetail";
import TableMatchingReviewDetail from "./pages/TableMatchingReviewDetail";


type LocationState = {
  id: number;
};

export default function ManagerMemberDetail() {
  const location = useLocation();
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const refRangeDate = useRef<any>(null);
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);
  const refSelectThree = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [textFilter, setTextFilter] = useState("");

  const [userOrderData, setUserOrderData] = useState({
    items: [],
  });

  const [userMatchingData, setUserMatchingData] = useState({
    items: [],
  });

  const [userStoreReview, setUserStoreReview] = useState({
    items: [],
  });

  const [userMatchingReview, setUserMatchingReview] = useState({
    items: [],
  });

  const { id } = location.state as LocationState;

  useEffect(() => {
    if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_ORDER) {
      getUserOrder();
    }

    if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_MATCHING) {
      getUserMatching();
    }

    if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_STORE_REVIEW) {
      getUserStoreReview();
    }

    if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_MATCHING_REVIEW) {
      getUserMatchingReview();
    }

    return () => {};
  }, [pageNumber]);

  const getUserOrder = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const filters = refSelectThree.current.value !== "default" ? [`${refSelectThree.current.value}=${textFilter}`] : [`default=${textFilter}`];

      if (refSelect.current.value !== "default") filters.push(`type=${refSelect.current.value}`);
      if (refSelectTwo.current.value !== "default") filters.push(`status=${refSelectTwo.current.value}`);

      const filter = filters.filter((column) => column).join(",");

      // const orderType = refSelect.current.value !== 'default' ? `,type=${refSelect.current.value}` : '';
      // const orderStatus = refSelectTwo.current.value !== 'default' ? `,status=${refSelectTwo.current.value}` : '';
      // const orderColumn = `${refSelectThree.current.value}=${textFilter}`;

      // const filter = `${orderColumn}${orderType}${orderStatus}`;

      const response = await UserService.getUserOrderList(id, startDate, endDate, pageNumber, 10, true, filter);
      if (response.status === 200) {
        setUserOrderData(response?.data?.data);
        setTotalPage(response.data?.data.meta?.totalPages);
        console.log(response?.data?.data);
      } else {
      }
    } catch (error: any) {
      if (error?.response?.data.message[0] === "to must be large than from") {
        alert("날짜를 다시 확인해주세요");
      }
    }
  };

  const getUserMatching = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const filters = refSelectTwo.current.value !== "default" ? [`${refSelectTwo.current.value}=${textFilter}`] : [`default=${textFilter}`];

      if (refSelect.current.value !== "default") filters.push(`status=${refSelect.current.value}`);

      const filter = filters.filter((column) => column).join(",");

      const response = await UserService.getListUserMatch(id, startDate, endDate, pageNumber, 10, true, filter, "USER");

      if (response.status === 200) {
        setTotalPage(response.data?.data.meta?.totalPages);
        setUserMatchingData(response?.data?.data);
        console.log("match", response?.data.data);
      } else {
      }
    } catch (error: any) {
      console.log(error);

      if (error?.response?.data.message[0] === "to must be large than from") {
        alert("날짜를 다시 확인해주세요");
      }
    }
  };

  const getUserStoreReview = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const filters = refSelect.current.value !== "default" ? [`${refSelect.current.value}=${textFilter}`] : [`default=${textFilter}`];

      // if (refSelect.current.value !== "default")
      //   filters.push(`status=${refSelect.current.value}`);

      const filter = filters.filter((column) => column).join(",");

      const response = await UserService.getStoreReview(id, "store", startDate, endDate, true, pageNumber, 10, filter);

      if (response.status === 200) {
        setUserStoreReview(response?.data?.data);
        setTotalPage(response.data?.data.meta?.totalPages);
      } else {
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUserMatchingReview = async () => {
    try {
      setLoading(true);
      const startDate = moment(refRangeDate.current?.startDate).toISOString();
      const endDate = moment(refRangeDate.current?.endDate).toISOString();

      const filters = refSelect.current.value !== "default" ? [`${refSelect.current.value}=${textFilter}`] : [`default=${textFilter}`];

      const filter = filters.filter((column) => column).join(",");

      const response = await UserService.getMatchReview(id, "match", startDate, endDate, true, pageNumber, 10, filter);

      if (response.status === 200) {
        setUserMatchingReview(response?.data?.data);
        setTotalPage(response.data?.data.meta?.totalPages);
      } else {
      }
    } catch (error: any) {
      console.log(error);

      if (error?.response?.data.errorCode === 11010) {
        alert("YYYY-MM-DD와 같은 날짜방식으로 입력하세요.");
      }
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const importSearchBar = () => {
    if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_ORDER) {
      return (
        <>
          <SearchBar
            detail={"order"}
            getUserOrder={getUserOrder}
            refRangeDate={refRangeDate}
            refSelect={refSelect}
            refSelectTwo={refSelectTwo}
            refSelectThree={refSelectThree}
            textFilter={textFilter}
            setTextFilter={setTextFilter}
          />
          <Box sx={{ mt: 4 }}>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
            <TableOrderDetail userOrderData={userOrderData} />
          </Box>
        </>
      );
    } else if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_MATCHING) {
      return (
        <>
          <SearchBar
            detail={"matching"}
            getUserMatching={getUserMatching}
            refRangeDate={refRangeDate}
            refSelect={refSelect}
            refSelectTwo={refSelectTwo}
            refSelectThree={refSelectThree}
            textFilter={textFilter}
            setTextFilter={setTextFilter}
          />
          <Box sx={{ mt: 4 }}>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
            <TableMatchingDetail userMatchingData={userMatchingData} />
          </Box>
        </>
      );
    } else if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_STORE_REVIEW) {
      return (
        <>
          <SearchBar
            detail={"storeReview"}
            getUserStoreReview={getUserStoreReview}
            refRangeDate={refRangeDate}
            refSelect={refSelect}
            refSelectTwo={refSelectTwo}
            refSelectThree={refSelectThree}
            textFilter={textFilter}
            setTextFilter={setTextFilter}
          />
          <Box sx={{ mt: 4 }}>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
            <TableStoreReviewDetail userStoreReview={userStoreReview} />
          </Box>
        </>
      );
    } else if (location.pathname === ROUTER.MANABER_MEMBER_DETAIL_MATCHING_REVIEW) {
      return (
        <>
          <SearchBar
            detail={"matchingReview"}
            getUserMatchingReview={getUserMatchingReview}
            setUserMatchingReview={setUserMatchingReview}
            refRangeDate={refRangeDate}
            refSelect={refSelect}
            textFilter={textFilter}
            setTextFilter={setTextFilter}
          />
          <Box sx={{ mt: 4 }}>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" sx={{ mb: 1 }} onChange={handleChangePage} />}
            <TableMatchingReviewDetail userMatchingReview={userMatchingReview} />
          </Box>
        </>
      );
    }
    return <PageNotFound />;
  };

  return <div className="root-container">{importSearchBar()}</div>;
}
