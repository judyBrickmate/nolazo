import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useImperativeHandle, useState } from 'react';

interface propsSelect {
  value?: any;
  listMenu: Array<objectMenu>;
  onChange?: any
}
interface objectMenu {
  value: any;
  label: any;
}

function NewAppSelect(props: propsSelect, ref: any) {
  const [value, setValue] = useState(props?.value || '');

  useImperativeHandle(ref, () => ({ value }), [value]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    props.onChange && props.onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select value={value} onChange={handleChange}>
        {props.listMenu.map((item, index) => {
          return (
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default React.forwardRef(NewAppSelect);
