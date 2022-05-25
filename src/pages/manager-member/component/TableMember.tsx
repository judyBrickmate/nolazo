import { Button, CircularProgress, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ROUTER } from "../../../router/routes";
import { UserService } from "../../../services";
import { COLOR } from "../../../utils";
import TableUserDetail from "./TableUserDetail";

export default function TableMember(props: any) {
  const { listUser, getMember, loading } = props;
  const [isBlocked, setIsBlocked] = React.useState(false);
  const navigate = useNavigate();

  const column = ["회원번호", "가입구분", "이름", "연락처", "회원상태", "가입일", "주문내역", "매칭내역", "업체리뷰내역", "매칭리뷰내역", "차단설정"];

  const handleBlock = async (data: any) => {
    try {
      if (data.status === "정상") {
        setIsBlocked(true);

        const response = await UserService.blockUser(data.id, !isBlocked);

        if (response.status === 200) {
          alert("차단되었습니다.");
          getMember();
        } else {
          console.log("error...");
        }
      } else {
        setIsBlocked(false);
        const response = await UserService.blockUser(data.id, isBlocked);

        if (response.status === 200) {
          alert("차단이 해제되었습니다.");
          getMember();
        }
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {column.map((item, index) => (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading && <CircularProgress />}
          <TableBody>
            {listUser.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.authProvider ?? "--"}</TableCell>
                <TableCell align="center">
                  <Link to={ROUTER.MANABER_MEMBER_DETAIL} state={{ id: row.id }} style={{ color: COLOR.BLACK }}>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                <TableCell scope="row" align="center">
                  <Button variant="contained">
                    <Link to={ROUTER.MANABER_MEMBER_DETAIL_ORDER} state={{ id: row.id }} style={{ textDecoration: "none", color: COLOR.WHITE }}>
                      내역보기
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained">
                    <Link to={ROUTER.MANABER_MEMBER_DETAIL_MATCHING} state={{ id: row.id }} style={{ textDecoration: "none", color: COLOR.WHITE }}>
                      내역보기
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained">
                    <Link to={ROUTER.MANABER_MEMBER_DETAIL_STORE_REVIEW} state={{ id: row.id }} style={{ textDecoration: "none", color: COLOR.WHITE }}>
                      내역보기
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained">
                    <Link to={ROUTER.MANABER_MEMBER_DETAIL_MATCHING_REVIEW} state={{ id: row.id }} style={{ textDecoration: "none", color: COLOR.WHITE }}>
                      내역보기
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" onClick={() => handleBlock(row)}>
                    {row.status === "정상" ? "차단" : "차단해제"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}
