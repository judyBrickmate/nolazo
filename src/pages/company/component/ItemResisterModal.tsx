import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import AppSelect from "../../../component/app-select/AppSelect";
import AppRangeDatePicker from "../../../component/app-range-date-picker";
import moment from "moment";
import { StoreService } from "../../../services";
import { useLocation } from "react-router";

interface LocationId {
  id: number;
}

export default function ItemResisterModal(props: any) {
  const location = useLocation();
  const state = location.state as LocationId;
  const { id } = state;
  const { setOpenRegister, getCompanyInfo } = props;
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discountRate, setDisCountRate] = useState("");
  const ticketType = useRef<any>(null);
  const exposureType = useRef<any>(null);
  const refRangeDate = useRef<any>(null);
  const startDate = moment(refRangeDate.current?.startDate).toISOString();
  const endDate = moment(refRangeDate.current?.endDate).toISOString();

  const UnitType = [
    { label: "단위", value: "default" },
    { label: "시간", value: "HOUR" },
    { label: "티켓", value: "TICKET" },
  ];

  const ExposureType = [
    { label: "노출여부", value: "default" },
    { label: "노출", value: "exposed" },
    { label: "미노출", value: "unexposed" },
  ];

  const objParam = {
    name: productName,
    type: ticketType.current?.value.toUpperCase(),
    price: Number(price),
    status: exposureType.current?.value,
    discount: Number(discountRate),
    startTime: startDate,
    expireTime: endDate,
  };

  const handleSubmit = async () => {
    if (ticketType.current.value === "default") {
      alert("단위를 선택해주세요");
      return;
    }
    if (exposureType.current.value === "default") {
      alert("노출여부를 선택해주세요");
      return;
    }
    try {
      const response = await StoreService.addStoreProduct(id, objParam);
      if (response.status === 201) {
        setOpenRegister(false);
        alert("등록되었습니다.");
        getCompanyInfo();
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "productName":
        setProductName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "discountRate":
        setDisCountRate(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="register-modal-container" style={{ marginBottom: "30px", top: "10%", left: "50%", transform: " translateX(-50%)", width: "50%" }}>
      <h3 className="modal-h3">상품 등록</h3>
      <div className="text-field">
        <div className="label">상품명</div>
        <TextField
          className="input-text-search"
          onChange={handleChange}
          value={productName}
          margin="normal"
          required
          fullWidth
          name="productName"
          type=""
          id="input-search"
          placeholder={"생성할 상품명을 입력하세요"}
          style={{ margin: "10px", width: "250px" }}
        />
      </div>
      <div className="text-field">
        <div className="label">금액</div>

        <>
          <TextField
            className="input-text-search"
            onChange={handleChange}
            value={price}
            margin="normal"
            required
            fullWidth
            name="price"
            type="number"
            id="input-search"
            placeholder={"금액을 입력하세요"}
            style={{ margin: "10px", width: "250px" }}
          />
          <div className="app-select">
            <AppSelect ref={ticketType} value={"HOUR"} listMenu={UnitType} />
          </div>
        </>
      </div>
      <div className="text-field">
        <div className="label">노출여부</div>
        <div className="app-select">
          <AppSelect ref={exposureType} value={"exposed"} listMenu={ExposureType} />
        </div>
      </div>

      <div className="text-field" style={{ marginBottom: "10px" }}>
        <div className="label">유효기간</div>

        <AppRangeDatePicker fromDate={new Date("2022-01-01")} title="" ref={refRangeDate} />
      </div>

      <div className="text-field">
        <div className="label">할인율</div>
        <TextField
          className="input-text-search"
          onChange={handleChange}
          value={discountRate}
          margin="normal"
          required
          fullWidth
          name="discountRate"
          type="number"
          id="input-search"
          style={{ margin: "10px", width: "250px" }}
        />{" "}
        %
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
