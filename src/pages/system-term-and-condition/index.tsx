import { Button, TextareaAutosize } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { SystemService } from "../../services";

export default function SystemTerm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPolicies();
    return () => {};
  }, []);

  const getPolicies = useCallback(async () => {
    try {
      const response = await SystemService.getPolicies();
      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="root-container">
      <p className="title-page">약관관리</p>
      {data.map((el, index) => (
        <Policies key={index} data={el} />
      ))}
    </div>
  );
}

function Policies(props: any) {
  const { data } = props;
  const [terms, setTerms] = useState(data.content);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTerms((event.target as HTMLTextAreaElement).value);
  };

  const handleSubmit = async () => {
    try {
      if (!terms.length) {
        alert("내용을 입력해주세요");
        return;
      }
      const response = await SystemService.setPolicies(data.name, {
        content: terms,
      });
      if (response.status === 200) {
        alert("수정되었습니다");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        paddingLeft: "50px",
      }}
    >
      <div style={{ width: "900px" }}>
        <div>{data.name}</div>
        <TextareaAutosize
          placeholder="내용을 입력하세요"
          onChange={handleChange}
          value={terms}
          style={{ width: "100%", height: "75px", marginTop: "10px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button variant="outlined" size="large" onClick={handleSubmit}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
