import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, FilledInput } from "@mui/material";
import { string } from "prop-types";
import { useEffect, useRef, useState } from "react";
import AppSelect from "../../../component/app-select/AppSelect";
import { CategoryService } from "../../../services";

export default function EditCategoryModal(props: any) {
  const { setOpenEdit, categoryData, getCategory, setSecondCategoryData, setOpenSecondEdit, listCategory, listSecondCategory, secondCategoryData, allCategory } = props;
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);
  const [imgUri, setImgUri] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState({
    image: categoryData?.image,
    name: categoryData?.name,
    parentId: categoryData?.parentId,
    isActive: categoryData?.isActive,
  });
  const [secondCategory, setSecondCategory] = useState({
    id: secondCategoryData?.id,
    image: secondCategoryData?.image,
    name: secondCategoryData?.name,
    parentId: secondCategoryData?.parent,
    isActive: secondCategoryData?.isActive,
  });

  const [categoryId, setCategoryId] = useState(0);
  const [isSecond, setIsSecond] = useState(false);
  const [listPrimaryType, setListPrimaryType]: any = useState([]);

  useEffect(() => {
    getCategory();
    setCategoryId(categoryData === undefined ? secondCategoryData?.id : categoryData?.id);

    if (categoryData === undefined) {
      setIsSecond(true);
    }

    allCategory?.map((item: any) => {
      listPrimaryType.push({ label: item.name, value: item.id });
    });
  }, [categoryData, secondCategoryData]);

  const listExposeType = [
    { label: "공개", value: "공개" },
    { label: "비공개", value: "비공개" },
  ];

  const updateCategoryData = async () => {
    try {
      const formData = new FormData();
      // 대분류 카테고리 관리
      if (!isSecond) {
        if (imgUri !== "") {
          formData.append("image", category.image);
        }
        formData.append("name", category.name);
        formData.append("isActive", refSelectTwo.current?.value);

        const response = await CategoryService.updateCategory(formData, categoryId);

        if (response?.data.status === 200) {
          setOpenEdit(false);
          console.log(formData);

          getCategory();
          alert("수정되었습니다.");
        }
      } else {
        // 소분류 카테고리 관리
        if (imgUri !== "") {
          formData.append("image", secondCategory.image);
        }

        formData.append("name", secondCategory.name);
        formData.append("parentId", secondCategory.parentId.id);
        formData.append("isActive", refSelectTwo.current?.value);

        const response = await CategoryService.updateCategory(formData, secondCategory.id);

        if (response?.data.status === 200) {
          alert("수정되었습니다.");
          window.location.reload();
        }
      }
    } catch (error: any) {
      if (error?.response?.data) {
        console.log(error?.response.data);
      }
      if (error?.response.data?.message[0] === "isActive must be a valid enum value") {
        alert("공개여부를 선택해주세요.");
      }
    }
  };

  const handleFiles = (e: any) => {
    const file = e.target.files[0];
    setImgUri(file);
  };

  const handleModal = () => {
    if (isSecond) {
      setOpenSecondEdit(false);
    } else {
      setOpenEdit(false);
    }
  };

  const showOption = () => {
    if (isSecond) {
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
            대분류 선택 :
          </p>
          <div className="app-select">
            <AppSelect ref={refSelect} value={secondCategory.parentId.id} listMenu={listPrimaryType} />
          </div>
        </Box>
      );
    }
  };

  const showInput = () => {
    if (isSecond) {
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
                onChange={(e) => setSecondCategory({ ...secondCategory, name: e.target.value })}
                value={secondCategory.name}
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
              <AppSelect ref={refSelectTwo} value={secondCategory?.isActive} listMenu={listExposeType} />
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
              이미지 :
            </p>
            <input accept="image/*" id="raised-button-file" type="file" onChange={handleFiles} />
          </Box>
        </>
      );
    } else {
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
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                value={category.name}
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
              <AppSelect ref={refSelectTwo} value={category?.isActive} listMenu={listExposeType} />
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
              이미지 :
            </p>
            <input accept="image/*" id="raised-button-file" type="file" onChange={handleFiles} />
          </Box>
        </>
      );
    }
  };

  return (
    <div className="modal-container">
      <h3 className="modal-h3">뭐하고 카테고리 수정</h3>
      <div className="modal-div">
        {showOption()}
        {showInput()}
      </div>

      <div className="button-container">
        <Button variant="contained" className="button" onClick={updateCategoryData}>
          수정완료
        </Button>
        <Button variant="outlined" className="button" onClick={handleModal}>
          닫기
        </Button>
      </div>
    </div>
  );
}
