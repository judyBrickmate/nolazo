import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";

export default function TermsChildren(props: any) {
  const { setTerms } = props;
  const [checked, setChecked] = React.useState([false, false, false, false, false, false, false, false, false]);

  React.useEffect(() => {
    setTerms(checked);
  }, [checked]);

  const listOptionItem = [
    {
      name: "반려동물 동반가능",
      value: "0",
    },
    {
      name: "유모차/휠체어",
      value: "1",
    },
    {
      name: "키즈카페",
      value: "2",
    },
    {
      name: "음식물 반입가능",
      value: "3",
    },
    {
      name: "흡연실",
      value: "4",
    },
    {
      name: "남/녀 화장실 구분",
      value: "5",
    },
    {
      name: "수유실",
      value: "6",
    },
    {
      name: "단체석",
      value: "7",
    },
    {
      name: "무선인터넷",
      value: "8",
    },
  ];

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3], checked[4], checked[5], checked[6], checked[7], checked[8]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3], checked[4], checked[5], checked[6], checked[7], checked[8]]);
  };
  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3], checked[4], checked[5], checked[6], checked[7], checked[8]]);
  };
  const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked, checked[4], checked[5], checked[6], checked[7], checked[8]]);
  };
  const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], event.target.checked, checked[5], checked[6], checked[7], checked[8]]);
  };
  const handleChange7 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], event.target.checked, checked[6], checked[7], checked[8]]);
  };
  const handleChange8 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], checked[5], event.target.checked, checked[7], checked[8]]);
  };
  const handleChange9 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], checked[5], checked[6], event.target.checked, checked[8]]);
  };
  const handleChange10 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], checked[5], checked[6], checked[7], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "row", ml: 3, fontSize: "12px" }}>
      <FormControlLabel
        name={listOptionItem[0].name}
        label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[0].name}
          </Typography>
        }
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        name={listOptionItem[1].name}
        label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[1].name}
          </Typography>
        }
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel name={listOptionItem[2].name} label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[2].name}
          </Typography>
        } control={<Checkbox checked={checked[2]} onChange={handleChange4} />} />
      <FormControlLabel name={listOptionItem[3].name} label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[3].name}
          </Typography>
        } control={<Checkbox checked={checked[3]} onChange={handleChange5} />} />
      <FormControlLabel name={listOptionItem[4].name} label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[4].name}
          </Typography>
        } control={<Checkbox checked={checked[4]} onChange={handleChange6} />} />
      <FormControlLabel name={listOptionItem[5].name} label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[5].name}
          </Typography>
        } control={<Checkbox checked={checked[5]} onChange={handleChange7} />} />
      <FormControlLabel name={listOptionItem[6].name} label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[6].name}
          </Typography>
        } control={<Checkbox checked={checked[6]} onChange={handleChange8} />} />
      <FormControlLabel name={listOptionItem[7].name} label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[7].name}
          </Typography>
        } control={<Checkbox checked={checked[7]} onChange={handleChange9} />} />
      <FormControlLabel name={listOptionItem[8].name} label={
          <Typography className="checkboxTypo" style={{ fontSize: "14px" }}>
            {listOptionItem[8].name}
          </Typography>
        } control={<Checkbox checked={checked[8]} onChange={handleChange10} />} />
    </Box>
  );

  return <div>{children}</div>;
}
