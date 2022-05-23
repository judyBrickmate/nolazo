import { Box, Button, Divider, List, ListItemText } from "@mui/material";
import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import { ListMenuAdmin, ListMenuStore } from "../../utils/constants";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { COLOR } from "../../utils/colors";
import { useAppSelector } from "../../redux/hook";
import Logo from "../../assets/logo.png";
import { ROUTER } from "../../router/routes";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  function RenderMenu() {
    // return ListMenuStore.map((menu, index) => {});
    const user = useAppSelector((state) => state.user);

    if (localStorage.getItem("USER_ROLE") === "업체관리자") {
      console.log(localStorage.getItem("USER_ROLE"));
      return ListMenuStore.map((menu, index) => {
        var isActive = false;
        var indexChildren = -1;
        if (menu.children.length > 0) {
          isActive = indexChildren !== -1;
        } else {
          isActive = menu.link === location.pathname;
        }

        return (
          <Box key={index} style={{ marginTop: "20px" }}>
            <Link
              to={menu.link}
              style={{
                color: isActive ? COLOR.MAIN_COLOR : COLOR.BLACK,
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              <ListItemText
                primary={menu.name}
                style={{
                  width: "180px",
                  marginLeft: "20px",
                }}
              />
            </Link>
          </Box>
        );
      });
    } else {
      return ListMenuAdmin.map((menu, index) => {
        var isActive = false;
        var indexChildren = -1;
        if (menu.children.length > 0) {
          indexChildren = menu.children.findIndex((children) => children.links?.includes(location.pathname));
          isActive = indexChildren !== -1;
        } else {
          isActive = menu.link === location.pathname;
        }

        return (
          <Box key={index} style={{ marginTop: "20px" }}>
            <Link
              to={menu.link}
              style={{
                color: isActive ? COLOR.MAIN_COLOR : COLOR.BLACK,
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              <ListItemText
                primary={menu.name}
                style={{
                  width: "180px",
                  marginLeft: "20px",
                }}
              />
            </Link>
            {menu.children.length > 0 &&
              isActive &&
              menu.children.map((secondMenu, index) => {
                if (secondMenu.links?.length === 0) {
                  return;
                }
                console.log("secondMenu", secondMenu.links[0]);
                return (
                  <Link
                    key={index}
                    to={secondMenu.links[0]}
                    style={{
                      color: indexChildren === index ? COLOR.MAIN_COLOR : COLOR.BLACK,
                      textDecoration: "none",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                  >
                    <ListItemText primary={secondMenu.name} style={{ marginLeft: "30px" }} />
                  </Link>
                );
              })}
          </Box>
        );
      });
    }
  }

  const handleLogout = () => {
    window.localStorage.clear();
    alert("로그아웃되었습니다.");
    navigate(ROUTER.LOGIN);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MuiDrawer variant="permanent">
        <Box style={{ display: "flex", height: "150px", justifyContent: "center", alignItems: "center" }}>
          <img style={{ width: "120px", height: "42px" }} src={Logo} />
        </Box>
        <Divider />
        <List component="nav">{RenderMenu()}</List>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
          <Button variant="outlined" style={{ width: "100px", marginTop: "20px" }} onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </MuiDrawer>
    </Box>
  );
}
