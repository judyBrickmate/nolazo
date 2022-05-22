import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  FilledInput,
} from "@mui/material";
import { string } from "prop-types";
import { useEffect, useRef, useState } from "react";
import AppSelect from "../../../component/app-select/AppSelect";
import { CategoryService } from "../../../services";

export default function EditCategoryModal(props: any) {
  const { setOpenEdit, getCategory, categoryData, allCategories } = props;
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState({
    name: categoryData.name,
    isActive: categoryData.isActive,
  });
  const [listPrimaryType, setListPrimaryType]: any = useState([]);

  useEffect(() => {
    getCategory();
    setCategoryId(categoryData.id);

    allCategories?.map((item: any) => {
      listPrimaryType.push({ label: item.name, value: item.id });
    });
  }, []);

  const listExposeType = [
    { label: "공개", value: "공개" },
    { label: "비공개", value: "비공개" },
  ];

  const updateCategoryData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("isActive", refSelectTwo?.current.value);

      const response = await CategoryService.updateCategory(
        formData,
        categoryId
      );

      if (response.status === 200) {
        setOpenEdit(false);
        console.log(formData);

        getCategory();
        alert("수정되었습니다.");
      }

      if (response.status === 200) {
        setOpenEdit(false);
        console.log(formData);
      }
    } catch (err) {}
  };

  const handleModal = () => {
    setOpenEdit(!true);
  };

  const showOption = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        <p className="title-filter" style={{ fontSize: "16px" }}>
          카테고리 선택 :
        </p>
        <div className="app-select">
          <AppSelect
            ref={refSelect}
            listMenu={listPrimaryType}
            value={categoryData.id}
          />
        </div>
      </Box>
    );
  };
  const showInput = () => {
    return (
      <>
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
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              value={category.name}
              // value={secondCategory.name}
              margin="normal"
              required
              fullWidth
              name=""
              type=""
              id="input-search"
              placeholder=" 소분류 카테고리명을 입력하세요."
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
            공개 여부 :
          </p>
          <div className="app-select">
            <AppSelect
              ref={refSelectTwo}
              value={category.isActive}
              // value={secondCategory}
              listMenu={listExposeType}
            />
          </div>
        </Box>
      </>
    );
  };

  return (
    <div className="modal-container">
      <h3 className="modal-h3">누구랑 카테고리 수정</h3>
      <div className="modal-div">
        {/* {showOption()} */}
        {showInput()}
      </div>

      <div className="button-container">
        <Button
          variant="contained"
          className="button"
          onClick={updateCategoryData}
        >
          수정완료
        </Button>
        <Button variant="outlined" className="button" onClick={handleModal}>
          닫기
        </Button>
      </div>
    </div>
  );
}
