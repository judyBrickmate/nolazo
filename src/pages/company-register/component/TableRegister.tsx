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

export interface ITableRegisterProps {
  allCategory: ICategoryRoot;
}

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
    { day: "월요일", time: "" },
    { day: "화요일", time: "" },
    { day: "수요일", time: "" },
    { day: "목요일", time: "" },
    { day: "금요일", time: "" },
    { day: "토요일", time: "" },
    { day: "일요일", time: "" },
  ];

  const [time, setTime] = useState(timeArray);
  const [sendTime, setSendTime]: any = useState([]);

  const [pics, setPics] = useState<any>([]);
  const [imageArray, setImageArray]: any = useState([]);
  const [sendImageArray, setSendImageArray]: any = useState([]);
  const [bannerDisplayUri, setBannerDisplayUri] = useState("");

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
    for (let i = 0; i < timeArray.length; i++) {
      let first = timeArray[i].day;
      let second = timeArray[i].time;
      sendTime.push(first + " " + second);
    }
  }, [time]);

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

  const listOptionItem = [
    {
      name: "반려동물 동반가능",
      value: "0",
      category: "pet",
    },
    {
      name: "유모차/휠체어",
      value: "1",
      category: "pet",
    },
    {
      name: "키즈카페",
      value: "2",
      category: "pet",
    },
    {
      name: "음식물 반입가능",
      value: "3",
      category: "pet",
    },
    {
      name: "흡연실",
      value: "4",
      category: "pet",
    },
    {
      name: "남/녀 화장실 구분",
      value: "5",
      category: "pet",
    },
    {
      name: "수유실",
      value: "6",
      category: "pet",
    },
    {
      name: "단체석",
      value: "7",
      category: "pet",
    },
    {
      name: "무선인터넷",
      value: "8",
      category: "pet",
    },
  ];

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
        />
        <Button style={{ marginLeft: "10px" }} variant="outlined" onClick={getLocation}>
          주소검색
        </Button>
        <TextField size="small" style={{ width: "350px", marginLeft: "10px" }} value={locationData[0]?.formatted_address} onChange={() => setLocation(locationData[0]?.formatted_address)} required />
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
    for await (const image of imageArray) {
      const response = await StoreService.uploadImage(image);
      sendImageArray.push(response?.data?.data?.image.key);
    }
    console.log(sendImageArray);

    if (sendImageArray !== "") {
      uploadAttachment();
    }

    // try {
    //   const response = await StoreService.uploadImage(formData);
    //   if (response.data?.status === 201) {
    //     imageArray.push(response?.data?.data?.image.key);
    //     if (attachment !== "") {
    //       uploadAttachment();
    //     } else {
    //       handleSubmit();
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const uploadAttachment = async () => {
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
  };

  const handleFileImages = (e: any) => {
    setImageArray(e.target.files);
  };

  const isCheckboxChecked = (index: number, checked: boolean, name: string) => {
    console.log(index, checked);

    const zero = name === listOptionItem[0].name && `${name}${checked}` === `${name}true` ? true : false;
    const one = name === listOptionItem[1].name && `${name}${checked}` === `${name}true` ? true : false;
    const two = name === listOptionItem[2].name && `${name}${checked}` === `${name}true` ? true : false;
    const three = name === listOptionItem[3].name && `${name}${checked}` === `${name}true` ? true : false;
    const four = name === listOptionItem[4].name && `${name}${checked}` === `${name}true` ? true : false;
    const five = name === listOptionItem[5].name && `${name}${checked}` === `${name}true` ? true : false;
    const six = name === listOptionItem[6].name && `${name}${checked}` === `${name}true` ? true : false;
    const seven = name === listOptionItem[7].name && `${name}${checked}` === `${name}true` ? true : false;
    const eight = name === listOptionItem[8].name && `${name}${checked}` === `${name}true` ? true : false;

    setTerms({
      "반려동물 동반가능": zero,
      "유모차/휠체어": one,
      키즈카페: two,
      "음식물 반입가능": three,
      흡연실: four,
      "남/녀 화장실 구분": five,
      수유실: six,
      단체석: seven,
      무선인터넷: eight,
    });
  };

  for (let i = 0; i < timeArray.length; i++) {
    let first = timeArray[i].day;
    let second = timeArray[i].time;
    sendTime.push(first + " " + second);
  }

  const handleSubmit = async () => {
    const formData: any = new FormData();
    const categories: any = [];
    const termsInput = JSON.stringify(terms);

    categories.push(refSelectWho?.current?.value, refSelectHowTwo?.current?.value, refSelectWhereTwo?.current?.value);

    formData.append("banner", bannerUri);
    formData.append("images", sendImageArray.join(","));
    formData.append("categories", categories.join(","));
    formData.append("title", storeName);
    formData.append("owner", ownerName);
    formData.append("businessNumber", businessNumber);
    formData.append("contact", contact);
    formData.append("contactAdditional", contactPlus);
    formData.append("location", locationData[0]?.formatted_address + " " + locationDetail);
    formData.append("attachment", attachment);
    formData.append("lat", geometry.lat);
    formData.append("lng", geometry.lng);
    formData.append("time", sendTime.join(","));
    formData.append("closed", ["월요일", "화요일"].join(","));
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
                <AppSelect ref={refSelectWho} value={"default"} listMenu={listTypeWho} />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <span style={{ color: COLOR.MAIN_COLOR }}>뭐하고</span> 카테고리 분류
            </TableCell>
            <TableCell style={{ display: "flex" }}>
              <div className="app-select" onClick={() => setIsPrimaryHow(true)}>
                <NewAppSelect ref={refSelectHowOne} value={"default"} listMenu={listTypeHow} onChange={pickSecondaryHow} />
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
                <NewAppSelect ref={refSelectWhereOne} value={"default"} listMenu={listTypeWhere} onChange={pickSecondaryWhere} />
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
              />
            </TableCell>
          </TableRow>

          {/* businessNumber */}
          <TableRow>
            <TableCell variant="head">{column[4]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                className="input-text-search"
                margin="normal"
                onChange={(e) => setBusinessNumber(e.target.value)}
                value={businessNumber}
                required
                fullWidth
                name=""
                type=""
                id="input-search"
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
              <TextField size="small" className="input-text-search" margin="normal" onChange={(e) => setContact(e.target.value)} value={contact} required fullWidth name="" type="" id="input-search" />
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
              />
            </TableCell>
          </TableRow>
          {/* location */}
          <TableRow>
            <TableCell variant="head">{column[7]}</TableCell>
            {handleGeocoding()}
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
          {/* time */}
          <TableRow>
            <TableCell variant="head">{column[8]}</TableCell>
            <TableCell>
              <div style={{ display: "flex", flexWrap: "wrap", width: "700px" }}>
                {time.map((el: any, index: number) => (
                  <div key={index} style={{ marginRight: "18px", marginBottom: "10px" }}>
                    <span style={{ marginRight: "20px" }}>{el.day}</span>
                    <input value={el.time} onChange={(e) => handleTimeChange(e, index)} placeholder="ex)00:00-12:00" />
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
          {/* workerDescription */}
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
          {/* facilities */}
          <TableRow>
            <TableCell variant="head">{column[15]}</TableCell>
            <TableCell style={{ display: "flex", alignItems: "center" }}>
              {listOptionItem.map((checkbox, index) => {
                return (
                  <FormControlLabel
                    key={index + checkbox.name}
                    className="twocolelement"
                    control={
                      <Checkbox
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => isCheckboxChecked(index, e.target.checked, checkbox.name)}
                        name={checkbox.name}
                        value={checkbox.value}
                        id={checkbox.category}
                        color="primary"
                      />
                    }
                    label={<Typography className="checkboxTypo">{checkbox.name}</Typography>}
                  />
                );
              })}
            </TableCell>
          </TableRow>
          {/* Homepage */}
          <TableRow>
            <TableCell variant="head">{column[13]}</TableCell>
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
          <Button variant="contained" className="button" style={{ width: "150px", marginLeft: "10px" }} onClick={uploadImageResource}>
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
