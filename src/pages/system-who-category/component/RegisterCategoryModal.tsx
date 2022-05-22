import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, FilledInput } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AppSelect from "../../../component/app-select/AppSelect";
import { CategoryService } from "../../../services";

export default function RegisterCategoryModal(props: any) {
  const { setOpenRegister, getCategory, pageNumber, allCategory } = props;
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);
  const [categoryData, setCategoryData] = useState({});
  const [name, setName] = useState("");

  const [listPrimaryType, setListPrimaryType]: any = useState([]);

  useEffect(() => {
    getCategory();
    allCategory?.map((item: any) => {
      listPrimaryType.push({ label: item.name, value: item.id });
    });
  }, [pageNumber]);

  const listExposeType = [
    { label: "공개", value: "공개" },
    { label: "비공개", value: "비공개" },
  ];

  const handleSubmit = async () => {
    try {
      const formData: any = new FormData();
      formData.append("name", name);
      formData.append("type", "WHO");
      formData.append("isPrimary", false);
      formData.append("parentId", 1);
      formData.append("isActive", refSelectTwo?.current.value);

      const response = await CategoryService.createCategory(formData);

      if (response.status === 201) {
        setOpenRegister(false);
        setCategoryData(response?.data?.data);
        getCategory();
        alert("등록되었습니다.");
        console.log(formData);
        window.location.reload();
      }
    } catch (error: any) {
      if (error?.response.data) {
        console.log(error?.response.data);
      }
    }
  };

  return (
    <div className="modal-container">
      <h3 className="modal-h3">카테고리 등록</h3>
      <div className="modal-div">
        {/* {showOption()} */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            alignItems: "center",
          }}
        >
          <p className="title-filter" style={{ fontSize: "16px" }}>
            카테고리명 :
          </p>
          <div className="input-search">
            <TextField
              className="input-text-search"
              onChange={(e) => setName(e.target.value)}
              value={name}
              margin="normal"
              required
              fullWidth
              name=""
              type=""
              id="input-search"
              placeholder="카테고리명을 입력하세요."
            />
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            alignItems: "center",
          }}
        >
          <p className="title-filter" style={{ fontSize: "16px" }}>
            공개여부 :
          </p>
          <div className="app-select">
            <AppSelect ref={refSelectTwo} value={"공개"} listMenu={listExposeType} />
          </div>
        </Box>
      </div>

      <div className="button-container">
        <Button variant="contained" className="button" onClick={handleSubmit}>
          등록
        </Button>
        <Button variant="outlined" className="button" onClick={() => setOpenRegister(false)}>
          닫기
        </Button>
      </div>
    </div>
  );
}
