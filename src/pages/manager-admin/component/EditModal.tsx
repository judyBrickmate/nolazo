import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AppSelect from '../../../component/app-select/AppSelect';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { updateAdminUserInfo } from '../../../redux/slices/adminSlice';
import { REGEX_PASS } from '../../../utils';

export default function EditModal(props: any) {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector((state) => state.admin.uploadStatus);
  const { setOpenEdit, userData, getMember } = props;
  const [id, setId] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({
    role: userData?.role,
    name: userData?.name,
    password: newPassword,
    phone: userData?.phone,
    email: userData?.email,
  });
  const [passwordWrong, setPasswordWrong] = useState(false);
  const refSelect = useRef<any>(null);

  useEffect(() => {
    getMember();

    setId(userData?.id);
    if (updateStatus === 'success') {
      getMember();
    }
  }, [userData]);

  const listMenu = [
    { label: '회원구분', value: 'default' },
    { label: '총괄관리자', value: '총괄관리자' },
    { label: '일반관리자', value: '일반관리자' },
    { label: '업체관리자', value: '업체관리자' },
  ];
  const formObj = [
    {
      key: 'id',
      label: 'ID',
      value: userData.identityKey,
      placeholder: 'ID를 입력하세요.',
      disabled: true,
    },
    {
      key: 'password',
      label: '새비밀번호',
      value: newPassword,
      type: 'password',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, password: e.target.value });
        setNewPassword(e.target.value);
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
      value: userData.name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, name: e.target.value });
      },
      placeholder: '연락처를 입력하세요.',
      disabled: true,
    },

    {
      key: 'phone',
      label: '연락처',
      value: user.phone,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, phone: e.target.value });
      },
      placeholder: '연락처를 입력하세요.',
    },
    {
      key: 'email',
      label: '이메일',
      value: user.email,
      type: 'email',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, email: e.target.value });
      },
      placeholder: '이메일을 입력하세요.',
    },
  ];

  const updateUserData = () => {
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      if (newPassword.length < 10 || !REGEX_PASS.test(newPassword)) {
        alert('비밀번호는 10자 이상의 문자와 숫자를 포함해야 합니다.');
        return;
      }
      return;
    }

    dispatch(
      updateAdminUserInfo({
        user: { ...user, role: refSelect?.current?.value },
        id,
        getMember,
      })
    );
    setOpenEdit(false);
  };

  return (
    <div className="modal-container">
      <h3 className="modal-h3">관리자 회원 수정</h3>
      <div className="text-field">
        <p>회원구분</p>
        <div className="app-select">
          <AppSelect ref={refSelect} value={user.role} listMenu={listMenu} />
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
                  onChange={item?.onChange}
                  value={item.value}
                  margin="normal"
                  required
                  fullWidth
                  name=""
                  type={item.type}
                  id="input-search"
                  placeholder={item.placeholder}
                  style={{ margin: '10px', width: '250px' }}
                  disabled={item?.disabled}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <Button variant="contained" className="button" onClick={updateUserData}>
          수정
        </Button>
        <Button variant="outlined" className="button" onClick={() => setOpenEdit(false)}>
          닫기
        </Button>
      </div>
    </div>
  );
}
