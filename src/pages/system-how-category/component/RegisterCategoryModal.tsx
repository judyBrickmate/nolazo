import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, FilledInput } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AppSelect from "../../../component/app-select/AppSelect";
import { CategoryService } from "../../../services";

interface Category {
  image: string;
  name: string;
  type: string;
  isPrimary: boolean;
  parentId: number;
  isActive: string;
}

export default function RegisterCategoryModal(props: any) {
  const { setOpenRegister, getCategory, pageNumber, allCategory } = props;
  const [categoryStatus, setCategoryStatus] = useState("primary");
  const refSelect = useRef<any>(null);
  const refSelectTwo = useRef<any>(null);
  const [textFilter, setTextFilter] = useState("");
  const [imgUri, setImgUri] = useState("");
  const [categoryData, setCategoryData] = useState({});
  const [name, setName] = useState("");
  const [listPrimaryType, setListPrimaryType]: any = useState([]);

  useEffect(() => {
    getCategory();
    allCategory?.map((item: any) => {
      listPrimaryType.push({ label: item.name, value: item.id });
    });
  }, [pageNumber]);

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryStatus((event.target as HTMLInputElement).value);
    console.log(event.target.value);
  };

  // const listPrimaryType = [
  //   { label: '감상/관람/체험', value: 1 },
  //   { label: '미용/관리', value: 2 },
  //   { label: '스포츠', value: 3 },
  //   { label: '익스트림스포츠', value: 4 },
  //   { label: '휴양/휴식', value: 5 },
  //   { label: '유아/아동 놀이체험', value: 5 },
  //   { label: '방문화', value: 6 },
  // ];

  const listExposeType = [
    { label: "공개", value: "공개" },
    { label: "비공개", value: "비공개" },
  ];

  // const objParam: Category = {
  //   image: imgUri,
  //   name,
  //   type: 'HOW',
  //   isPrimary: userStatus === 'primary' ? true : false,
  //   parentId: refSelect.current?.value,
  //   isActive: refSelectTwo.current?.value,
  // };

  const showOption = () => {
    if (categoryStatus === "secondary") {
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
            <AppSelect ref={refSelect} value={"default"} listMenu={listPrimaryType} />
          </div>
        </Box>
      );
    }
  };

  const handleFiles = (e: any) => {
    const file = e.target.files[0];
    setImgUri(file);
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //   setImgUri(reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const formData: any = new FormData();
      if (categoryStatus === "primary") {
        formData.append("image", imgUri);
        formData.append("name", name);
        formData.append("type", "HOW");
        formData.append("isPrimary", true);
        //formData.append('parentId', refSelect.current?.value);
        formData.append("isActive", refSelectTwo.current?.value);
      } else {
        formData.append("image", imgUri);
        formData.append("name", name);
        formData.append("type", "HOW");
        formData.append("isPrimary", false);
        formData.append("parentId", refSelect.current?.value);
        formData.append("isActive", refSelectTwo.current?.value);
      }

      const response = await CategoryService.createCategory(formData);

      if (response.status === 201) {
        setOpenRegister(false);
        setCategoryData(response.data?.data);
        getCategory();
        alert("등록되었습니다.");
        console.log(formData);
        // window.location.reload(); // 소분류 카테고리 업데이트
      }
    } catch (error: any) {
      if (error?.response.data) {
        console.log(error?.response.data);
      }
    }
  };

  return (
    <div className="modal-container">
      <h3 className="modal-h3">뭐하고 카테고리 등록</h3>
      <div className="modal-div">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            alignItems: "center",
          }}
        >
          <p className="title-filter" style={{ fontSize: "16px" }}>
            분류 :
          </p>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={categoryStatus}
            onChange={(e) => handleChangeStatus(e)}
          >
            <FormControlLabel value="primary" control={<Radio />} label="대분류" />
            <FormControlLabel value="secondary" control={<Radio />} label="소분류" />
          </RadioGroup>
        </Box>
        {showOption()}
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
