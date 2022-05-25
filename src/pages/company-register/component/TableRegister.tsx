import AppSelect from "../../../component/app-select/AppSelect";
import NewAppSelect from "../../../component/app-select/NewAppSelect";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Card, CardMedia, Checkbox, FormControlLabel, StyledEngineProvider, Table, TableCell, TableRow, TextareaAutosize, TextField, Typography } from "@mui/material";
import { ICategory, ICategoryRoot, ICategorySelect } from "../../../interface";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { COLOR, GoogleMap, StoreStatus } from "../../../utils";
import { ROUTER } from "../../../router/routes";
import { StoreService } from "../../../services";
import { useNavigate } from "react-router";
import "../styles.scss";
import TermsChildren from "./TermsChildren";

export interface ITableRegisterProps {
  allCategory: ICategoryRoot;
}

const listOptionItem = [
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
];

const TableRegister = (props: ITableRegisterProps) => {
  const { allCategory } = props;

  const navigate = useNavigate();

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

  const [bannerUri, setBannerUri] = useState("");
  const [storeName, setStoreName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contact, setContact] = useState("");
  const [contactPlus, setContactPlus] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [attachment, setAttachment] = useState("");
  const [textLocation, setTextLocation] = useState("");
  const [location, setLocation] = useState("");
  const [geometry, setGeomtry] = useState({ lat: 0, lng: 0 });
  const [locationData, setLocationData]: any = useState([]);
  const [locationDetail, setLocationDetail] = useState("");
  const [workerDescription, setWorkerDescription] = useState("");
  const [description, setDescription] = useState("");
  const [limitAge, setLimitAge] = useState("");
  const [freeAge, setFreeAge] = useState("");
  const [homepage, setHomepage] = useState("");
  const [terms, setTerms]: any = useState({});
  //time
  const timeArray = [
    { day: "월요일", time: "", close: false },
    { day: "화요일", time: "", close: false },
    { day: "수요일", time: "", close: false },
    { day: "목요일", time: "", close: false },
    { day: "금요일", time: "", close: false },
    { day: "토요일", time: "", close: false },
    { day: "일요일", time: "", close: false },
  ];

  const [time, setTime] = useState(timeArray);
  const [sendAttachment, setSendAttachment] = useState("");

  const [pics, setPics] = useState<any>([]);
  const [imageArray, setImageArray]: any = useState([]);
  const [sendImageArray, setSendImageArray]: any = useState([]);
  const [bannerDisplayUri, setBannerDisplayUri] = useState("");

  const [termsData, setTermsData]: any = useState({});

  const mapSelect = (item: ICategory) => ({ label: item.name, value: item.id });

  useEffect(() => {
    let listWhoData: ICategorySelect[] = [];
    let listHowData: ICategorySelect[] = [];
    let listWhereData: ICategorySelect[] = [];

    allCategory.WHO?.length !== 0 && allCategory.WHO.forEach((item) => listWhoData.push(mapSelect(item)));
    allCategory.HOW?.length !== 0 && allCategory.HOW.filter((item) => item.parent?.id === 2).forEach((item) => listHowData.push(mapSelect(item)));
    allCategory.WHERE?.length !== 0 && allCategory.WHERE.filter((item) => item.parent?.id === 3).forEach((item) => listWhereData.push(mapSelect(item)));

    listTypeWho.length === 0 && setListTypeWho(listWhoData);
    listTypeHow.length === 0 && setListTypeHow(listHowData);
    listTypeWhere.length === 0 && setListTypeWhere(listWhereData);
  }, [allCategory]);

  useEffect(() => {
    saveTerms();
  }, [terms]);

  const column = {
    1: "업체 카테고리 분류",
    2: "상호명",
    3: "업체관리자ID",
    4: "사업자등록번호",
    5: "대표 연락처",
    6: "추가 연락처",
    7: "업체주소",
    8: "영업시간",
    9: "영업상태",
    10: "영업시간 비고",
    12: "업체설명",
    13: "제한연령",
    14: "무료연령",
    15: "편의시설 및 서비스",
    16: "홈페이지",
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
        <TextField size="small" style={{ width: "380px", marginLeft: "10px" }} value={locationData[0]?.formatted_address} onChange={() => setLocation(locationData[0]?.formatted_address)} required />
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

  const uploadImageResource = async () => {
    if (bannerUri === "") {
      alert("배너 이미지를 필수는 등록해야합니다.");
    } else {
      for await (const image of imageArray) {
        const response = await StoreService.uploadImage(image);
        sendImageArray.push(response?.data?.data?.image.key);
      }

      if (sendImageArray.length !== 0) {
        uploadAttachment();
      } else {
        alert("배너 이미지를 제외하고 최소 1개의 이미지를 등록해야 합니다.");
      }
    }

  };

  const uploadAttachment = async () => {
    const formData: any = new FormData();
    formData.append("documentType", "STORE_DOCUMENT");
    formData.append("document", attachment);

    try {
      const response = await StoreService.uploadFile(formData);
      if (response.data?.status === 201) {
        setSendAttachment(response?.data?.data?.document.key);
        console.log(response?.data?.data?.document.key);

        handleSubmit();
      }
    } catch (error: any) {
      alert("사업자 등록증을 첨부해주세요.");
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

    categories.push(refSelectWho?.current?.value, refSelectHowTwo?.current?.value, refSelectWhereTwo?.current?.value);

    formData.append("banner", bannerUri);
    formData.append("images", sendImageArray.join(","));
    formData.append("categories", categories.join(","));
    formData.append("title", storeName);
    formData.append("owner", ownerName);
    formData.append("businessNumber", businessNumber);
    formData.append("contact", contact);
    formData.append("contactAdditional", contactPlus);
    formData.append("location", locationData[0]?.formatted_address);
    formData.append('locationDetail', locationDetail)
    formData.append("attachment", sendAttachment);
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
      const response = await StoreService.createStore(formData);

      if (response.status === 201) {
        alert("등록되었습니다.");
        navigate(ROUTER.COMPANY);
      }
    } catch (error: any) {
      if (error?.response.data) {
        console.log(error?.response.data);

        if (error?.response.data?.errorCode === 9003) {
          alert("카페고리 선택은 필수입니다.");
        }
        // if (error.response.data.message.includes() == "lng must not be less than 125") {
        //   alert("한국 내의 업체만 등록할수 있습니다.");
        // }

        // if the error message is one of followings, it return a right message

        error.response.data.message.map((message: string) => {
          if (message === "businessNumber must be a number string") {
            alert("사업자 등록번호는 숫자만 입력해주세요.");
          } else if (message === "lat must not be less than 33") {
            alert("한국 내의 업체만 등록할수 있습니다.");
          } else if (message === "limitAge must not be less than 0") {
            alert("연령 제한은 0세 이상이어야 합니다.");
          } else if (message === "freeAge must not be less than 0") {
            alert("무료연령은 0세 이상이어야 합니다.");
          }
        });
      }

      if (error?.response.data?.errorCode === 4006) {
        alert("해당 업체관리자 ID의 스토어는 이미 등록되어있습니다.");
      }
    }
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
    setPics((prev: any) => [...prev, URL.createObjectURL(file)]);
  };

  const removeImage = (id: any) => {
    setImageArray((prev: any) => prev?.filter((item: any, index: number) => index !== id));
    setPics((prev: any) => prev?.filter((item: any, index: number) => index !== id));
  };

  const handleAttachment = (e: any) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleTimeChange = (e: any, index: number) => {
    setTime((prev: any) => prev.map((el: any, idx: number) => (idx === index ? { ...el, time: e.target.value } : el)));
  };

  // We have fix on 8 hours to make it work, please be careful soft-hand
  const pickSecondaryHow = (value: any) => {
    const tempData = allCategory.HOW.filter((item) => item.parent?.id !== 2 && item.parent?.id === value).map(mapSelect);
    setListTypeHowTwo(tempData);
  };

  const pickSecondaryWhere = (value: any) => {
    const tempData = allCategory.WHERE.filter((item) => item.parent?.id !== 3 && item.parent?.id === value).map(mapSelect);
    setListTypeWhereTwo(tempData);
  };

  const handleCloseTimeChange = (e: any, index: number) => {
    setTime((prev: any) => prev.map((el: any, idx: number) => (idx === index ? { ...el, close: e.target?.checked } : el)));
  };

  return (
    <div className="container">
      <h3 className="modal-h3">업체 등록</h3>
      <StyledEngineProvider injectFirst>
        <TableTitle>● 업체이미지</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableRow>
            <TableCell variant="head">이미지 업로드</TableCell>
            {/* <TableCell>
              <input accept="image/*" type="file" onChange={handleFilesBanner} />
              <input accept="image/*" multiple type="file" onChange={handleFileImages} />
            </TableCell> */}
            <TableCell>
              <div style={{ display: "flex", marginLeft: "20px" }}>
                <Card style={{ margin: "0 10px", display: "flex" }}>
                  <label htmlFor="banner" style={{ cursor: "pointer" }}>
                    <CardMedia component="img" height="150" width="220" style={{ lineHeight: "150px" }} alt="배너를 업로드해주세요.(필수)" image={bannerDisplayUri} />
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
            </TableCell>
          </TableRow>
        </Table>
        <TableTitle>● 기본정보</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableRow>
            <TableCell variant="head">
              <span style={{ color: COLOR.MAIN_COLOR }}>누구랑</span> 카테고리 분류
            </TableCell>
            <TableCell style={{ display: "flex" }}>
              <div className="app-select">
                <AppSelect ref={refSelectWho} value={"4"} listMenu={listTypeWho} />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <span style={{ color: COLOR.MAIN_COLOR }}>뭐하고</span> 카테고리 분류
            </TableCell>
            <TableCell style={{ display: "flex" }}>
              <div className="app-select" onClick={() => setIsPrimaryHow(true)}>
                <NewAppSelect ref={refSelectHowOne} value={"8"} listMenu={listTypeHow} onChange={pickSecondaryHow} />
              </div>
              {isPrimaryHow && listTypeHowTwo.length !== 0 && (
                <div className="app-select">
                  <AppSelect ref={refSelectHowTwo} value={"default"} listMenu={listTypeHowTwo} />
                </div>
              )}
            </TableCell>
          </TableRow>
          {/* Category Where */}
          <TableRow>
            <TableCell variant="head">
              <span style={{ color: COLOR.MAIN_COLOR }}>어디서</span> 카테고리 분류
            </TableCell>
            <TableCell style={{ display: "flex" }}>
              <div className="app-select" onClick={() => setIsPrimaryWhere(true)}>
                <NewAppSelect ref={refSelectWhereOne} value={"140"} listMenu={listTypeWhere} onChange={pickSecondaryWhere} />
              </div>
              {isPrimaryWhere && listTypeWhereTwo.length !== 0 && (
                <div className="app-select">
                  <AppSelect ref={refSelectWhereTwo} value={"default"} listMenu={listTypeWhereTwo} />
                </div>
              )}
            </TableCell>
          </TableRow>
          {/* storeName */}
          <TableRow>
            <TableCell variant="head">{column[2]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setStoreName(e.target.value)}
                value={storeName}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="상호명을 입력해주세요."
              />
            </TableCell>
          </TableRow>
          {/* storeOwnerName */}
          <TableRow>
            <TableCell variant="head">{column[3]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setOwnerName(e.target.value)}
                value={ownerName}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="업체관리자의 ID를 입력해주세요."
              />
            </TableCell>
          </TableRow>

          {/* businessNumber */}
          <TableRow>
            <TableCell variant="head">{column[4]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              <TextField
                required
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setBusinessNumber(e.target.value)}
                value={businessNumber}
                fullWidth
                name=""
                type="number"
                id="input-search"
                placeholder="사업자 등록번호를 입력해주세요."
              />
              <Button style={{ marginLeft: "10px" }} variant="outlined">
                <input type="file" id="input-file" multiple style={{ display: "none" }} onChange={handleAttachment} />
                <label htmlFor="input-file">사업자 등록증 첨부</label>
              </Button>
            </TableCell>
          </TableRow>
          {/* contact */}
          <TableRow>
            <TableCell variant="head">{column[5]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="대표 연락처를 입력해주세요."
              />
            </TableCell>
          </TableRow>
          {/* contact2 */}
          <TableRow>
            <TableCell variant="head">{column[6]}</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setContactPlus(e.target.value)}
                value={contactPlus}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
                placeholder="추가 연락처를 입력해주세요.(선택)"
                style={{ width: '300px'}}
              />
            </TableCell>
          </TableRow>
          {/* location */}
          <TableRow>
            <TableCell variant="head">{column[7]}</TableCell>
            {handleGeocoding()}
          </TableRow>
          
          {/* time */}
          <TableRow>
            <TableCell variant="head">{column[8]}</TableCell>
            <TableCell>
              <div style={{ display: "flex", flexWrap: "wrap", width: "700px" }}>
                {time.map((el: any, index: number) => (
                  <div key={index} style={{ marginRight: "18px", marginBottom: "10px" }}>
                    <span style={{ marginRight: "20px" }}>{el.day}</span>
                    <input value={el.time} onChange={(e) => handleTimeChange(e, index)} placeholder="ex)00:00-12:00" />
                    <input type="checkbox" id="closed" value={""} onChange={(e) => handleCloseTimeChange(e, index)} style={{ marginLeft: "10px" }} checked={Boolean(el.close)} />
                    <label htmlFor="closed"> 휴무</label>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
          {/* workerDescription */}
          <TableRow>
            <TableCell variant="head">{column[10]}</TableCell>
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
          {/* description */}
          <TableRow>
            <TableCell variant="head">{column[12]}</TableCell>
            <TableCell>
              <TextareaAutosize
                className="input-text-search"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                name=""
                id="input-search"
                placeholder="업체 설명을 적어주세요."
                style={{ width: "700px", height: "300px", border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "4px", padding: "20px", fontSize: "14px" }}
              />
            </TableCell>
          </TableRow>
        </Table>
        <TableTitle>● 추가정보(선택사항)</TableTitle>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{ marginBottom: "100px" }}>
          {/* Age(limit, free) */}
          <TableRow>
            <TableCell variant="head">{column[13]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              만
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setLimitAge(e.target.value)}
                value={limitAge}
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
            <TableCell variant="head">{column[14]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              만
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setFreeAge(e.target.value)}
                value={freeAge}
                fullWidth
                name=""
                type=""
                id="input-search"
                style={{ width: "50px", margin: "0 10px" }}
              />
              세 미만
            </TableCell>
          </TableRow>
          {/* terms */}
          <TableRow>
            <TableCell variant="head">{column[15]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              <TermsChildren setTerms={setTerms} />
            </TableCell>
          </TableRow>
          {/* Homepage */}
          <TableRow>
            <TableCell variant="head">{column[16]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setHomepage(e.target.value)}
                value={homepage}
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
        <div className="button-container">
          <Button variant="contained" className="button" style={{ width: "150px", marginLeft: "10px", marginTop: "20px" }} onClick={uploadImageResource}>
            업체등록
          </Button>
          <Button variant="outlined" className="button" style={{ width: "150px", marginLeft: "10px" }} onClick={() => navigate(-1)}>
            등록취소
          </Button>
        </div>
      </StyledEngineProvider>
    </div>
  );
};

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

export default TableRegister;
