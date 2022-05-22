import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { login, updateIsLogin, updateUserInfo } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router";
import { ROUTER } from "../../router/routes";
import { setToken, setUserRole } from "../../helpers/storage";
import { showAlert } from "../../redux/slices/alertSlice";
import { UserService } from "../../services";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {}, [dispatch, login, updateIsLogin, updateUserInfo]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const identityKey = data.get("identityKey");
    const password = data.get("password");

    // try {
    //   const response = await UserService.login(identityKey, password);
    //   console.log('response', response);
    //   if (response.status === 201) {
    //     setToken(response.data.data?.accessToken);
    //     dispatch(updateUserInfo({ user: response.data.data }));
    //     dispatch(updateIsLogin({ login: true }));
    //     navigation(ROUTER.MANAGER_MEMBER);
    //   } else {
    //     alert('다시 시도해주세요.');
    //   }
    // } catch (error: any) {
    //   if (error?.response.data?.errorCode === 1001) {
    //     alert('잘못된 비밀번호입니다. 다시 확인해주세요.');
    //   } else if (error?.response.data?.errorCode === 2000) {
    //     alert('존재하지 않는 ID입니다.');
    //   }
    // }
    try {
      const response = await dispatch(
        login({
          id: identityKey,
          password: password,
          setToken,
          setUserRole,
        })
      );

      if (response.payload !== undefined) {
        console.log(response.payload);
        // navigation(ROUTER.MANAGER_MEMBER);
        if (response.payload.role !== "업체관리자") {
          navigation(ROUTER.MANAGER_MEMBER);
        } else {
          navigation(ROUTER.STORE_OWNER_ORDER);
        }
        dispatch(updateUserInfo({ user: response.payload }));
        dispatch(updateIsLogin({ login: true }));
      } else {
        navigation(ROUTER.LOGIN);
      }
    } catch (error) {
      navigation(ROUTER.LOGIN);
    }
  };

  // if (user.status === "success") {
  //   navigation(ROUTER.MANAGER_MEMBER);
  //   dispatch(updateUserInfo({ user: user.user }));
  //   dispatch(updateIsLogin({ login: true }));
  // }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 6,
            bgcolor: "secondary.main",
            height: "80px",
            width: "80px",
          }}
        ></Avatar>
        <Typography component="h1" variant="h5">
          놀아조 관리자 센터
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="identityKey"
            label="ID를 입력 해주세요."
            name="identityKey"
            autoComplete="identityKey"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호를 입력해주세요."
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
