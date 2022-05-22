import { Box, Button, Container, Modal, StandardTextFieldProps, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AppSelect from '../../../component/app-select/AppSelect';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createAdminUser } from '../../../redux/slices/adminSlice';
import { userSlice } from '../../../redux/slices/userSlice';
import { UserService } from '../../../services';
import { REGEX_PASS } from '../../../utils';

interface AdminUser {
  identityKey: string;
  role: any;
  phone: string;
  password: string;
  email: string;
  name: string;
}

export default function RegisterModal(props: any) {
  const dispatch = useAppDispatch();
  const { setOpenRegister, getMember, pageNumber } = props;
  const [textFilter, setTextFilter] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminData, setAdminData] = useState({});
  const [passwordWrong, setPasswordWrong] = useState(false);
  const refSelect = useRef<any>(null);

  useEffect(() => {}, [pageNumber, adminData]);

  const formObj = [
    {
      key: 'id',
      label: 'ID',
      value: id,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
      },
      placeholder: 'ID를 입력하세요.',
    },
    {
      key: 'password',
      label: '비밀번호',
      value: password,
      type: 'password',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      },
      placeholder: '비밀번호를 입력하세요.',
    },
    {
      key: 'confirmPassword',
      label: '비밀번호 확인',
      value: confirmPassword,
      type: 'password',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
      },
      placeholder: '비밀번호 확인',
    },
    {
      key: 'name',
      label: '이름',
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      },
      placeholder: '이름을 입력하세요.',
    },
    {
      key: 'phone',
      label: '연락처',
      value: phone,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
      },
      placeholder: '연락처를 입력하세요.',
    },
    {
      key: 'email',
      label: '이메일',
      value: email,
      type: 'email',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      },
      placeholder: '이메일을 입력하세요.',
    },
  ];

  const listTypeOrderOne = [
    { label: '회원구분', value: 'default' },
    { label: '총괄관리자', value: '총괄관리자' },
    { label: '일반관리자', value: '일반관리자' },
    { label: '업체관리자', value: '업체관리자' },
  ];

  const objParam: AdminUser = {
    identityKey: id,
    role: refSelect.current?.value,
    phone,
    password,
    email,
    name,
  };

  const handleSubmit = async () => {
    if (refSelect.current.value === 'default') {
      alert('회원구분을 선택해주세요');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 10 || !REGEX_PASS.test(password)) {
      alert('비밀번호는 10자 이상의 문자와 숫자를 포함해야 합니다.');
      return;
    }
    try {
      const response = await UserService.createAdminUser(objParam);

      if (response.status === 201) {
        setOpenRegister(false);
        setAdminData(response.data?.data);
        getMember();
        alert('등록되었습니다.');
      }
    } catch (error: any) {
      if (error?.response.data?.errorCode === 2005) {
        alert('존재하는 ID입니다.');
      } else if (error?.response.data?.message[0] === 'email must be an email') {
        alert('이메일 형식으로 입력해주세요.');
      }
    }
  };

  return (
    <div className="modal-container">
      <h3 className="modal-h3">관리자 회원 등록</h3>
      <div className="text-field">
        <p>회원구분</p>
        <div className="app-select">
          <AppSelect ref={refSelect} value={'총괄관리자'} listMenu={listTypeOrderOne} />
        </div>
      </div>
      <div className="input-search">
        {formObj.map((item, index) => {
          return (
            <div key={index}>
              <div className="text-field">
                <div className="label">{item.label}</div>
                <TextField
                  key={item.key}
                  className="input-text-search"
                  onChange={item.onChange}
                  value={item.value}
                  margin="normal"
                  required
                  fullWidth
                  name=""
                  type={item.type}
                  id="input-search"
                  placeholder={item.placeholder}
                  style={{ margin: '10px', width: '250px' }}
                />
              </div>
            </div>
          );
        })}
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
