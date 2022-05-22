import { TableBar } from "@mui/icons-material";
import {
  Button,
  Paper,
  StyledEngineProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { userInfo } from "os";
import { number, string } from "prop-types";
import React, { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getUserById, selectUser } from "../../../redux/slices/userSlice";
import { ROUTER } from "../../../router/routes";
import { UserService } from "../../../services";
import styled from "styled-components";
import { COLOR } from "../../../utils/colors";
import { Link } from "react-router-dom";

type LocationState = {
  id: number;
};

export default function TableUserDetail(props: any) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    gender: "",
    email: "",
    status: "",
    authProvider: "",
    birthDay: "",
    phone: "",
    categories: [
      {
        name: "",
        parent: {
          name: "",
        },
      },
    ],
  });

  const { id } = location.state as LocationState;

  const column = {
    1: "회원번호",
    2: "이름",
    3: "성별",
    4: "이메일",
    5: "회원상태",
    6: "SNS",
    7: "생년월일",
    8: "연락처",
    9: "연락처",
    10: "선호놀이1",
  };

  const columnButton = ["주문내역", "매칭내역", "업체리뷰내역", "매칭리뷰내역"];

  const content = {};

  useEffect(() => {
    getUserInfo();

    return () => {};
  }, []);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const response = await UserService.getUserById(id);
      if (response.status === 200) {
        setUserData(response?.data?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const renderTable = () => {
    if (userData === null) {
      return null;
    }
    return (
      <TableRow>
        <TableCell variant="head">{column[1]}</TableCell>
        <TableCell>{userData.id}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Header>
          <Title>{userData.name}</Title>님의 상세정보
        </Header>
        <TableTitle>● 기본정보</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableRow>
            <TableCell variant="head">{column[1]}</TableCell>
            <TableCell>{userData.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[2]}</TableCell>
            <TableCell>{userData.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[3]}</TableCell>
            <TableCell>{userData.gender ?? "--"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[4]}</TableCell>
            <TableCell>{userData.email ?? "--"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[5]}</TableCell>
            <TableCell>{userData.status}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[6]}</TableCell>
            <TableCell>{userData.authProvider ?? "--"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[7]}</TableCell>
            <TableCell>{userData.birthDay ?? "--"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[8]}</TableCell>
            <TableCell>{userData.phone}</TableCell>
          </TableRow>
        </Table>
        <TableTitle>● 선호놀이</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableRow>
            {userData.categories.map((category, index) => (
              <>
                <TableCell style={{ color: COLOR.DARK_BLACK }} variant="head">
                  선호놀이{index + 1}
                </TableCell>

                <TableCell key={index}>
                  {category.parent.name} - {category.name}
                </TableCell>
              </>
            ))}
          </TableRow>
        </Table>
        <TableTitle>● 내역보기</TableTitle>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          style={{ marginBottom: "100px" }}
        >
          <TableHead>
            <TableRow>
              {columnButton.map((name, index) => (
                <>
                  <TableCell align="center" key={index}>
                    {name}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell scope="row" align="center">
                <Button variant="contained">
                  <Link
                    to={ROUTER.MANABER_MEMBER_DETAIL_ORDER}
                    state={{ id: userData.id }}
                    style={{ textDecoration: "none", color: COLOR.WHITE }}
                  >
                    내역보기
                  </Link>
                </Button>
              </TableCell>
              <TableCell scope="row" align="center">
                <Button variant="contained">
                  <Link
                    to={ROUTER.MANABER_MEMBER_DETAIL_MATCHING}
                    state={{ id: userData.id }}
                    style={{ textDecoration: "none", color: COLOR.WHITE }}
                  >
                    내역보기
                  </Link>
                </Button>
              </TableCell>
              <TableCell scope="row" align="center">
                <Button variant="contained">
                  <Link
                    to={ROUTER.MANABER_MEMBER_DETAIL_STORE_REVIEW}
                    state={{ id: userData.id }}
                    style={{ textDecoration: "none", color: COLOR.WHITE }}
                  >
                    내역보기
                  </Link>
                </Button>
              </TableCell>
              <TableCell scope="row" align="center">
                <Button variant="contained">
                  <Link
                    to={ROUTER.MANABER_MEMBER_DETAIL_MATCHING_REVIEW}
                    state={{ id: userData.id }}
                    style={{ textDecoration: "none", color: COLOR.WHITE }}
                  >
                    내역보기
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledEngineProvider>
    </>
  );
}
const Header = styled.div`
  margin: 40px 20px;
  border-bottom: 1px solid ${COLOR.GREY};
  padding: 20px 0;
`;

const TableTitle = styled.div`
  margin: 40px 20px;
  font-size: 14px;
`;

const Title = styled.span`
  font-weight: bold;
  color: ${COLOR.MAIN_COLOR};
  font-size: 18px;
`;
