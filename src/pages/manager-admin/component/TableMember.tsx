import { Button, CircularProgress, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserService } from "../../../services";
import { dataUpdateAdmin } from "../../../services/types";
import EditModal from "./EditModal";

export default function TableMember(props: any) {
  const { listUser, getMember, userRole, loading } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [userData, setUserData] = useState({});

  const column = ["No", "구분", "ID", "이름", "연락처", "이메일", "등록일", userRole === "총괄관리자" && "수정/삭제"];

  const handleClickEdit = (data: any) => {
    openEditModal();
    setUserData(data);
  };
  const openEditModal = () => {
    setOpenEdit(true);
  };

  const handleDelete = async (data: any) => {
    console.log(data);
    try {
      if (data.role === "총괄관리자") {
        console.log("총괄");
        alert("총괄매니저는 삭제할 수 없습니다.");
      } else {
        const response = await UserService.deleteAdminUser(data.id);
        if (response.status === 200) {
          alert("삭제가 완료되었습니다.");
          getMember();
        }
      }
    } catch (e) {
      console.log(e);
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
            {listUser.map((row: any, index: any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">{row.identityKey}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{moment(row.createdAt).format("YYYY-MM-DD")}</TableCell>
                {userRole === "총괄관리자" && (
                  <TableCell scope="row" align="center">
                    <Button variant="contained" style={{ marginRight: "10px" }} onClick={() => handleClickEdit(row)}>
                      수정
                    </Button>

                    <Button variant="contained" onClick={() => handleDelete(row)}>
                      삭제
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openEdit && <EditModal userData={userData} setOpenEdit={setOpenEdit} getMember={getMember} />}
    </StyledEngineProvider>
  );
}
