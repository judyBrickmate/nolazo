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
export default function ProductEditModal(props: any) {
  const location = useLocation();
  const state = location.state as LocationId;
  const { id } = state;
  const { products, getCompanyInfo, setOpenEditModal } = props;
  const [productName, setProductName] = useState(products.name);
  const [price, setPrice] = useState(products.price);
  const [discountRate, setDisCountRate] = useState(products.discount);
  const ticketType = useRef<any>(products.type);
  const exposureType = useRef<any>(products.status);
  const refRangeDate = useRef<any>({startDate :products.startTime, endDate: products.expireTime});
  const startDate = moment(refRangeDate.current?.startDate).toISOString();
  const endDate = moment(refRangeDate.current?.endDate).toISOString();

  //   const productNames = products.reduce(
  //     (acc: any, curr: any) =>
  //       acc.concat({
  //         label: curr.name,
  //         value: curr.name,
  //       }),
  //     [{ label: "상품명", value: "default" }]
  //   );

  const UnitType = [
    { label: "단위", value: "default" },
    { label: "시간", value: "HOUR" },
    { label: "일(24시간)", value: "TICKET" },
  ];

  const ExposureType = [
    { label: "노출여부", value: "default" },
    { label: "노출", value: "exposed" },
    { label: "미노출", value: "unexposed" },
  ];

  const objParam = {
    name: productName,
    type: ticketType.current?.value?.toUpperCase(),
    price: Number(price),
    status: exposureType.current?.value,
    discount: Number(discountRate),
    startTime: startDate,
    expireTime: endDate,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
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

  const handleSubmit = async () => {
    console.log('click')
    if (ticketType.current.value === "default") {
      alert("단위를 선택해주세요");
      return;
    }
    if (exposureType.current.value === "default") {
      alert("노출여부를 선택해주세요");
      return;
    }
    try {
      const response = await StoreService.updateStoreProduct(id, products.id, objParam);
      if (response.status === 200) {
        setOpenEditModal(false);
        alert("수정되었습니다.");
        getCompanyInfo();
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className="product-edit-modal-container">
      <h3 className="modal-h3">상품수정</h3>
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
          id="input-search"
          placeholder={"생성할 상품명을 입력하세요"}
          style={{ margin: "10px", width: "250px" }}
        />
      </div>
      <div className="text-field">
        <div className="label">금액</div>
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
          <AppSelect
            ref={ticketType}
            value={products.type}
            listMenu={UnitType}
          />
        </div>
      </div>
      <div className="text-field">
        <div className="label">노출여부</div>
        <div className="app-select">
          <AppSelect
            ref={exposureType}
            value={products.status}
            listMenu={ExposureType}
          />
        </div>
      </div>
      <AppRangeDatePicker
        fromDate={products.startTime ? new Date(products.startTime) : new Date()}
        toDate={products.expireTime ? new Date(products.expireTime): new Date()}
        title="유효기간"
        ref={refRangeDate}
      />
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
          수정완료
        </Button>
        <Button
          variant="outlined"
          className="button"
          onClick={() => setOpenEditModal(false)}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}
