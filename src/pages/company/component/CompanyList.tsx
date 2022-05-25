import { Button, Paper, StyledEngineProvider, Table, TableBody, TableCell, CircularProgress, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import { ROUTER } from "../../../router/routes";
import { COLOR } from "../../../utils";

export default function CompanyList(props: any) {
  const { companyList, getCompanyList, loading } = props;

  const column = ["업체번호", "업체아이디", "업체명", "업체연락처", "업체평점", "결제건수", "운영상태", "가입일"];

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
            {companyList.map((row: any, index: number) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">
                  <Link to={ROUTER.COMPANY_DETAIL} state={{ id: row?.id }} style={{ color: COLOR.BLACK }}>
                    {row.title}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.contact ?? "-"}</TableCell>
                <TableCell align="center">{Number(row.rating).toFixed(1)}</TableCell>
                <TableCell align="center">{row.paymentAmount ?? "-"}</TableCell>
                <TableCell align="center">{row.status === "open" ? "정상" : "운영중지"}</TableCell>
                <TableCell align="center">{moment(row.createdAt).format("YYYY-MM-DD HH:mm")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}
