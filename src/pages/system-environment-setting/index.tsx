import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { SystemService } from "../../services";

export default function SystemEnvironmentSetting() {
  const [setttingData, setSettingData] = useState<any>();

  useEffect(() => {
    getSettings();
    return () => {};
  }, []);

  const getSettings = useCallback(async () => {
    try {
      const response = await SystemService.getSettings();
      if (response.status === 200) {
        setSettingData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "vat":
        setSettingData((prev: any) => ({ ...prev, vat: Number(value) }));
        break;
      case "nolazoCommission":
        setSettingData((prev: any) => ({
          ...prev,
          nolazoCommission: Number(value),
        }));
        break;
      case "creditCommission":
        setSettingData((prev: any) => ({
          ...prev,
          creditCommission: Number(value),
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await SystemService.updateSettings({
        vat: setttingData.vat,
        creditCommission: setttingData.creditCommission,
        nolazoCommission: setttingData.nolazoCommission,
      });
      if (response.status === 200) {
        alert("수정되었습니다");
        getSettings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="root-container">
      <p className="title-page">환경변수 설정</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "50px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>부가세</div>
          <input
            style={{ width: "50px", marginLeft: "20px" }}
            onChange={handleChange}
            value={setttingData?.vat || ""}
            required
            name="vat"
            type="number"
            max="99"
          />
          %
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>놀아조 수수료</div>
          <input
            style={{ width: "50px", marginLeft: "20px" }}
            onChange={handleChange}
            value={setttingData?.nolazoCommission || ""}
            required
            name="nolazoCommission"
            type="number"
            max="99"
          />
          %
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>신용카드 수수료</div>
          <input
            style={{ width: "50px", marginLeft: "20px" }}
            onChange={handleChange}
            value={setttingData?.creditCommission || ""}
            required
            name="creditCommission"
            type="number"
            max="99"
          />
          %
        </div>
        <Button variant="outlined" size="large" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </div>
  );
}
