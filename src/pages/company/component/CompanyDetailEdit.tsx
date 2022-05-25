import { Button, Card, CardMedia, Checkbox, FormControlLabel, StyledEngineProvider, Table, TableBody, TableCell, TableHead, TableRow, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { COLOR } from "../../../utils/colors";
import moment from "moment";
import { StoreService } from "../../../services";
import ItemResisterModal from "./ItemResisterModal";
import ProductEditModal from "./ProductEditModal";
import DeleteModal from "./DeleteModal";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { GoogleMap, StoreStatus } from "../../../utils";
import NewAppSelect from "../../../component/app-select/NewAppSelect";
import AppSelect from "../../../component/app-select/AppSelect";
import { ICategory, ICategoryRoot, ICategorySelect } from "../../../interface";
import { ROUTER } from "../../../router/routes";
import TermsChildren from "../../company-register/component/TermsChildren";

const openingHours = [
  {
    day: "월요일",
    time: "00:00~00:00",
    close: false,
  },
  {
    day: "화요일",
    time: "00:00~00:00",
    close: false,
  },
  {
    day: "수요일",
    time: "00:00~00:00",
    close: false,
  },
  {
    day: "목요일",
    time: "00:00~00:00",
    close: false,
  },
  {
    day: "금요일",
    time: "00:00~00:00",
    close: false,
  },
  {
    day: "토요일",
    time: "00:00~00:00",
    close: true,
  },
  {
    day: "일요일",
    time: "00:00~00:00",
    close: true,
  },
];

type LocationState = {
  data: any;
};

interface ITableRegisterProps {
  allCategory: ICategoryRoot;
}

export default function CompanyDetailEdit() {
  const location = useLocation();
  const { data } = location.state as LocationState;
  const { allCategory } = location.state as ITableRegisterProps;
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(data);
  const [categoryWho, setCategoryWho] = useState(companyData.categories[0].id);
  const [categoryHow, setCategoryHow] = useState(companyData.categories[1]?.parent.id);
  const [categoryHowTwo, setCategoryHowTwo] = useState(companyData.categories[1]?.id);
  const [categoryWhere, setCategoryWhere] = useState(companyData.categories[2]?.parent.id);
  const [categoryWhereTwo, setCategoryWhereTwo] = useState(companyData.categories[2]?.id);
  const [images, setImages] = useState(companyData.images);
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState(companyData.ownerId);
  const [contact, setContact] = useState(companyData.contact);
  const [contactPlus, setContactPlus] = useState(companyData.contactAdditional);
  const [description, setDescription] = useState(companyData.description);
  const [limitAge, setLimitAge] = useState(companyData.limitAge);
  const [freeAge, setFreeAge] = useState(companyData.freeAge);
  const [terms, setTerms]: any = useState(companyData.terms);
  const [openRegister, setOpenRegister] = useState(false);
  const [homepage, setHomepage] = useState(companyData.homePage || "");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [productParam, setProductParam] = useState([]);
  const [pics, setPics] = useState<any>([]);
  const [locationData, setLocationData]: any = useState([]);
  const [textLocation, setTextLocation] = useState("");
  const [_location, setLocation] = useState(companyData?.location);
  const [locationDetail, setLocationDetail] = useState(companyData?.locationDetail || "");
  const [workerDescription, setWorkerDescription] = useState(companyData.workerDescription);
  const [geometry, setGeomtry] = useState({
    lat: companyData.coordinates.lat,
    lng: companyData.coordinates.lng,
  });

  const refSelectWho = useRef<any>(null);
  const refSelectHowOne = useRef<any>(null);
  const refSelectHowTwo = useRef<any>(null);
  const refSelectWhereOne = useRef<any>(null);
  const refSelectWhereTwo = useRef<any>(null);

  const [listTypeWho, setListTypeWho] = useState<ICategorySelect[]>([]);
  const [listTypeHow, setListTypeHow] = useState<ICategorySelect[]>([]);
  const [listTypeHowTwo, setListTypeHowTwo] = useState<ICategorySelect[]>([]);
  const [listTypeWhere, setListTypeWhere] = useState<ICategorySelect[]>([]);
  const [listTypeWhereTwo, setListTypeWhereTwo] = useState<ICategorySelect[]>([]);

  const [isPrimaryHow, setIsPrimaryHow] = useState(false);
  const [isPrimaryWhere, setIsPrimaryWhere] = useState(false);

  const [imageArray, setImageArray]: any = useState([]);

  const [listOptionItem, setListOptionItem] = useState([
    {
      name: "반려동물 동반가능",
    },
    {
      name: "유모차/휠체어",
    },
    {
      name: "키즈카페",
    },
    {
      name: "음식물 반입가능",
    },
    {
      name: "흡연실",
    },
    {
      name: "남/녀 화장실 구분",
    },
    {
      name: "수유실",
    },
    {
      name: "단체석",
    },
    {
      name: "무선인터넷",
    },
  ]);

  const mapSelect = (item: ICategory) => ({ label: item.name, value: item.id });

  const [time, setTime] = useState(companyData.time);
  const [attachment, setAttachment] = useState(companyData?.attachment);
  const [sendAttachment, setSendAttachment] = useState("");
  const [sendImageArray, setSendImageArray]: any = useState([]);
  const [bannerUri, setBannerUri] = useState(companyData.banner?.medium);
  const [bannerDisplayUri, setBannerDisplayUri] = useState(companyData?.banner?.medium);

  const [termsData, setTermsData]: any = useState({});

  useLayoutEffect(() => {
    let listWhoData: ICategorySelect[] = [];
    let listHowData: ICategorySelect[] = [];
    let listWhereData: ICategorySelect[] = [];
    console.log(allCategory);

    allCategory.WHO?.length !== 0 && allCategory.WHO?.forEach((item) => listWhoData.push(mapSelect(item)));
    allCategory.HOW?.length !== 0 && allCategory.HOW?.filter((item) => item.parent?.id === 2)?.forEach((item) => listHowData.push(mapSelect(item)));
    allCategory.WHERE?.length !== 0 && allCategory.WHERE?.filter((item) => item.parent?.id === 3)?.forEach((item) => listWhereData.push(mapSelect(item)));

    listTypeWho.length === 0 && setListTypeWho(listWhoData);
    listTypeHow.length === 0 && setListTypeHow(listHowData);
    listTypeWhere.length === 0 && setListTypeWhere(listWhereData);
  }, [allCategory]);

  useEffect(() => {
    if (terms) saveTerms();
  }, [terms]);

  const column = {
    1: "업체분류",
    2: "상호명",
    3: "대표자명",
    4: "사업자등록번호",
    5: "대표 연락처",
    6: "추가 연락처",
    7: "업체주소",
    8: "영업시간",
    9: "업체 설명",
    10: "제한연령",
    11: "무료연령",
    12: "편의시설 및 서비스",
    13: "홈페이지",
    14: "영업상태",
    15: "영업시간 비고",
  };

  const productColumn = ["상품코드", "업체명", "상품명", "판매가", "단위", "노출여부", "등록일", "관리"];

  useEffect(() => {
    getCompanyInfo();

    return () => {};
  }, []);

  const getCompanyInfo = async () => {
    try {
      setLoading(true);
      const response = await StoreService.getStoreDetail(data.id);
      if (response.status === 200) {
        setCompanyData(response?.data?.data);
        setPics(response?.data?.data.images.map((el: any) => el.large));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const openRegisterModal = () => {
    setOpenRegister(true);
    setOpenEditModal(false);
  };

  const openEdit = (rowInfo: any) => {
    setOpenEditModal(true);
    setProductParam(rowInfo);
  };

  const openDeleteConfirmModal = (deletekey: any) => {
    setOpenDeleteModal(true);
    setOpenEditModal(false);
    setDeleteKey(deletekey);
  };

  const getLocation = async () => {
    const currentAddr = textLocation;
    if (currentAddr !== "") {
      const response: any = await GoogleMap(currentAddr);
      setLocationData(response.results);
      setGeomtry(response?.results[0].geometry.location);
    } else {
      alert("주소를 입력하고 검색해주세요.");
    }
  };

  const handleGeocoding = () => {
    return (
      <TableCell style={{ display: "flex", alignItems: "center" }}>
        <TextField
          size="small"
          style={{ width: "200px" }}
          className="input-text-search"
          margin="normal"
          required
          fullWidth
          name=""
          type=""
          id="input-search"
          value={textLocation}
          onChange={(e) => setTextLocation(e.target.value)}
          placeholder="주소 입력 후 검색"
        />
        <Button style={{ marginLeft: "10px" }} variant="outlined" onClick={getLocation}>
          주소검색
        </Button>
        <TextField size="small" style={{ width: "350px", marginLeft: "10px" }} value={_location} onChange={() => setLocation(locationData[0]?.formatted_address)} required />
        <TextField
          size="small"
          style={{ width: "350px", marginLeft: "10px" }}
          onChange={(e) => setLocationDetail(e.target.value)}
          value={locationDetail}
          placeholder="상세주소를 입력해주세요."
          required
        />
      </TableCell>
    );
  };

  const handleFilesBanner = (e: any) => {
    const file = e.target.files[0];
    setBannerUri(file);
    setBannerDisplayUri(URL.createObjectURL(file));
  };

  const handleImagesFiles = (e: any) => {
    if (imageArray.length > 5) {
      e.preventDefault();
      alert("이미지는 배너 포함 최대 7개 까지만 등록 가능합니다");
      return;
    }
    const file = e.target.files[0];
    setImageArray((prev: any) => [...prev, file]); //imageArray에 하나씩 추가
    setPics((prev: any) => [...prev, URL.createObjectURL(file)]); //미리보기용
  };

  const removeImage = async (id: any) => {
    if (confirm("삭제하시겠습니까? 이미지 삭제는 수정취소 이후에도 복구가 불가능합니다,")) {
      //delete image index
      try {
        const response = await StoreService.deleteStoreImage(companyData.id, { index: +id });
        if (response.status === 200) {
          alert("삭제되었습니다.");
          setPics((prev: any) => prev?.filter((item: any, index: number) => index !== id));
          setImageArray((prev: any) => prev?.filter((item: any, index: number) => index !== id));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("취소되었습니다.");
    }
  };

  const pickSecondaryHow = (value: any) => {
    const tempData = allCategory.HOW.filter((item) => item.parent?.id !== 2 && item.parent?.id === value).map(mapSelect);
    setListTypeHowTwo(tempData);
  };

  const pickSecondaryWhere = (value: any) => {
    const tempData = allCategory.WHERE.filter((item) => item.parent?.id !== 3 && item.parent?.id === value).map(mapSelect);
    setListTypeWhereTwo(tempData);
  };

  const handleChnage = (e: any, index: number) => {
    setTime((prev: any) => prev.map((el: any, idx: number) => (idx === index ? { ...el, time: e.target.value } : el)));
  };

  const closeDayChange = (e: any, index: number) => {
    setTime((prev: any) => prev.map((el: any, idx: number) => (idx === index ? { ...el, close: e.target.checked } : el)));
  };

  const uploadImageResource = async () => {
    for await (const image of imageArray) {
      const response = await StoreService.uploadImage(image);
      sendImageArray.push(response?.data?.data?.image.key);
    }

    if (sendImageArray !== "") {
      uploadAttachment();
    }
  };

  const uploadAttachment = async () => {
    if (attachment !== companyData?.attachment) {
      const formData: any = new FormData();
      formData.append("documentType", "STORE_DOCUMENT");
      formData.append("document", attachment);
      try {
        const response = await StoreService.uploadFile(formData);
        if (response.data?.status === 201) {
          handleSubmit();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      handleSubmit();
    }
  };

  const saveTerms = () => {
    setTermsData({
      "반려동물 동반가능": terms[0],
      "유모차/휠체어": terms[1],
      키즈카페: terms[2],
      "음식물 반입가능": terms[3],
      흡연실: terms[4],
      "남/녀 화장실 구분": terms[5],
      수유실: terms[6],
      단체석: terms[7],
      무선인터넷: terms[8],
    });
  };

  const handleSubmit = async () => {
    const formData: any = new FormData();
    const categories: any = [];
    const termsInput = JSON.stringify(termsData);
    const timeInput = JSON.stringify(time);

    categories.push(
      refSelectWho?.current?.value,
      refSelectHowTwo?.current?.value === undefined ? categoryHowTwo : refSelectHowTwo?.current?.value,
      refSelectWhereTwo?.current?.value === undefined ? categoryWhereTwo : refSelectWhereTwo?.current?.value
    );

    formData.append("banner", bannerUri);
    if (sendImageArray.length > 0) {
      formData.append("images", sendImageArray.join(","));
    }

    if(attachment !== '') {
      formData.append("attachment", attachment);
    }

    formData.append("categories", categories.join(","));
    formData.append("owner", ownerName);
    formData.append("contact", contact);
    formData.append("contactAdditional", contactPlus);
    formData.append("location", _location);
    formData.append("locationDetail", locationDetail);
    formData.append("lat", geometry.lat);
    formData.append("lng", geometry.lng);
    formData.append("time", timeInput);
    formData.append("workerDescription", workerDescription);
    formData.append("description", description);
    formData.append("limitAge", limitAge);
    formData.append("freeAge", freeAge);
    formData.append("terms", termsInput);
    formData.append("homepage", homepage);
    formData.append("status", StoreStatus.정상);

    for (let value of formData.values()) {
      console.log(value);
    }

    try {
      const response = await StoreService.updateStore(companyData.id, formData);
      if (response.status === 200) {
        alert("수정이 완료되었습니다.");
        navigate(ROUTER.COMPANY);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAttachment = (e: any) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const renderEmpty = () => {
    if (companyData?.products.length === 0) {
      return (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1
              style={{
                color: COLOR.MIDDLE_BLACK,
                fontSize: "24px",
                margin: "50px auto",
              }}
            >
              등록된 상품이 없습니다.
            </h1>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Header>
          <Title>{companyData.title}</Title> 님의 상세정보 수정
        </Header>
        <TableTitle>● 업체이미지</TableTitle>
        <div style={{ display: "flex" }}>
          <Card style={{ margin: "0 10px", display: "flex" }}>
            <label htmlFor="banner" style={{ cursor: "pointer" }}>
              <CardMedia component="img" height="150" width="220" alt="배너를 업로드해주세요.(필수)" image={bannerDisplayUri} />
            </label>
            <input
              accept="image/*"
              id="banner"
              type="file"
              onChange={handleFilesBanner}
              style={{
                display: "none",
              }}
            />
          </Card>
          {pics.map((el: any, index: number) => (
            <div key={index} style={{ margin: "0 10px" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => removeImage(index)}>X</Button>
              </div>
              <CardMedia component="img" height="140" alt="images" image={el} />
            </div>
          ))}
          <PlusImageWrapper>
            <AddCircleOutlineTwoToneIcon color="primary" style={{ position: "absolute" }}>
              add_circle
            </AddCircleOutlineTwoToneIcon>
            <input
              accept="image/*"
              id="raised-button-file"
              type="file"
              onChange={handleImagesFiles}
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
                opacity: "0",
              }}
            />
          </PlusImageWrapper>
        </div>
        <TableTitle>● 기본정보</TableTitle>
        <Table sx={{ minWidth: 700, wordBreak: "keep-all" }} aria-label="customized table">
          {/* whoCategory */}
          <TableRow>
            <TableCell variant="head">
              <span style={{ color: COLOR.MAIN_COLOR }}>누구랑</span> 카테고리 분류
            </TableCell>
            <TableCell style={{ display: "flex" }}>
              <div className="app-select">
                <AppSelect ref={refSelectWho} value={categoryWho} listMenu={listTypeWho} />
              </div>
            </TableCell>
          </TableRow>
          {/* howCategory */}
          <TableRow>
            <TableCell variant="head">
              <span style={{ color: COLOR.MAIN_COLOR }}>뭐하고</span> 카테고리 분류
            </TableCell>
            <TableCell style={{ display: "flex" }}>
              <div className="app-select" onClick={() => setIsPrimaryHow(true)}>
                <NewAppSelect ref={refSelectHowOne} value={categoryHow} listMenu={listTypeHow} onChange={pickSecondaryHow} />
              </div>
              {isPrimaryHow && listTypeHowTwo.length !== 0 && (
                <div className="app-select">
                  <AppSelect ref={refSelectHowTwo} value={categoryHowTwo} listMenu={listTypeHowTwo} />
                </div>
              )}
            </TableCell>
          </TableRow>
          {/* whereCategory */}
          <TableRow>
            <TableCell variant="head">
              <span style={{ color: COLOR.MAIN_COLOR }}>어디서</span> 카테고리 분류
            </TableCell>
            <TableCell style={{ display: "flex" }}>
              <div className="app-select" onClick={() => setIsPrimaryWhere(true)}>
                <NewAppSelect ref={refSelectWhereOne} value={categoryWhere} listMenu={listTypeWhere} onChange={pickSecondaryWhere} />
              </div>
              {isPrimaryWhere && listTypeWhereTwo.length !== 0 && (
                <div className="app-select">
                  <AppSelect ref={refSelectWhereTwo} value={categoryWhereTwo} listMenu={listTypeWhereTwo} />
                </div>
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell variant="head">{column[2]}</TableCell>
            <TableCell>{companyData.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[3]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setOwnerName(e.target.value)}
                value={ownerName || ""}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="업체관리자의 ID를 입력해주세요."
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[4]}</TableCell>
            <TableCell
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {companyData.businessNumber}
              <Button style={{ marginLeft: "10px" }} variant="outlined">
                <input type="file" id="input-file" multiple style={{ display: "none" }} onChange={handleAttachment} />
                <label htmlFor="input-file">사업자 등록증 첨부</label>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[5]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setContact(e.target.value)}
                value={contact || "-"}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="대표 연락처를 입력해주세요."
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[6]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setContactPlus(e.target.value)}
                value={contactPlus || ""}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="추가 연락처를 입력해주세요.(선택)"
                style={{ width: "300px" }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[7]}</TableCell>
            <TableCell>{handleGeocoding()}</TableCell>
          </TableRow>
          {/* time */}
          <TableRow>
            <TableCell variant="head">{column[8]}</TableCell>
            <TableCell>
              <div style={{ display: "flex", flexWrap: "wrap", width: "700px" }}>
                {time?.map((el: any, index: number) => (
                  <div key={index} style={{ marginRight: "18px", marginBottom: "10px" }}>
                    <span style={{ marginRight: "20px" }}>{el.day}</span>
                    <input value={el.time} onChange={(e) => handleChnage(e, index)} placeholder="00:00-12:00 형식으로 입력해주세요" />
                    <input type="checkbox" id="closed" value={el.day || ""} onChange={(e) => closeDayChange(e, index)} style={{ marginLeft: "10px" }} checked={Boolean(el.close)} />
                    <label htmlFor="closed">휴무 </label>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
          {/* workerDescription */}
          <TableRow>
            <TableCell variant="head">{column[15]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setWorkerDescription(e.target.value)}
                value={workerDescription}
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="영업 시간에 대한 상세정보를 입력하세요."
                style={{ width: "700px" }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[14]}</TableCell>
            <TableCell>{companyData.status === "closed" ? "정지" : "운영중"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[9]}</TableCell>
            <TableCell>
              <TextareaAutosize
                placeholder="업체 설명을 적어주세요."
                style={{ width: "700px", height: "300px", border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "4px", padding: "20px", fontSize: "14px" }}
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </TableCell>
          </TableRow>

          <TableTitle>● 추가정보</TableTitle>
          <TableRow>
            <TableCell variant="head">{column[10]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              만
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setLimitAge(e.target.value)}
                value={limitAge || ""}
                fullWidth
                name=""
                type=""
                id="input-search"
                style={{ width: "50px", margin: "0 10px" }}
              />
              세 미만
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[11]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              만
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setFreeAge(e.target.value)}
                value={freeAge || ""}
                fullWidth
                name=""
                type=""
                id="input-search"
                style={{ width: "50px", margin: "0 10px" }}
              />
              세 미만
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[12]}</TableCell>
            <TableCell style={{ display: "flex", flexWrap: "wrap", width: "700px" }}>
              <TermsChildren setTerms={setTerms} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{column[13]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setHomepage(e.target.value)}
                value={homepage || ""}
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="홈페이지 주소를 입력해주세요."
                style={{ width: "700px" }}
              />
            </TableCell>
          </TableRow>
        </Table>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" size="large" onClick={openRegisterModal}>
            상품등록
          </Button>
        </div>
        {openRegister && <ItemResisterModal setOpenRegister={setOpenRegister} getCompanyInfo={getCompanyInfo} />}
        <TableTitle>● 상품 리스트</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {productColumn.map((item, index) => (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData?.products.map((row: any, index: number) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{companyData.title}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{((row.price * (100 - row.discount)) / 100).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>{" "}
                <TableCell align="center">{row.type === "TICKET" ? "일(24시간)" : "시간"}</TableCell>
                <TableCell align="center">{row.status === "exposed" ? "노출" : "미노출"}</TableCell>
                <TableCell align="center">{moment(row.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => openEdit(row)}>수정</Button>
                  <Button onClick={() => openDeleteConfirmModal(row.id)}>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
            {renderEmpty()}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px",
          }}
        >
          <Button variant="outlined" size="large" onClick={uploadImageResource}>
            수정완료
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
            수정취소
          </Button>
        </div>
        {openEditModal && <ProductEditModal setOpenEditModal={setOpenEditModal} products={productParam} getCompanyInfo={getCompanyInfo} />}
        {openDeleteModal && <DeleteModal setOpenDeleteModal={setOpenDeleteModal} deleteKey={deleteKey} getCompanyInfo={getCompanyInfo} />}
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

const PlusImageWrapper = styled.div`
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gainsboro;
  width: 200px;
`;
