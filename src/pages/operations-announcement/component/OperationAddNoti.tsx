import { Button } from '@mui/material';
import  {  useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTER } from '../../../router/routes';
import { OperationService, StoreService } from '../../../services';

export default function OperationAddNoti() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title.length) {
      alert('제목을 입력해해주세요');
      return;
    }
    if (!content.length) {
      alert('내용을 입력해주세요');
      return;
    }
    try {
      const response = await OperationService.addNoificationList(
        {
          "title": title,
          "content": content,
          "type": "NOTICE",
        }
      );
      if (response.status === 201) {
        alert('등록되었습니다.');
        navigate(ROUTER.OPERATIONS_ANNOUNCEMENT);
      }
    } catch (error: any) {
      if (error?.response.data) {
        console.log(error?.response.data);
      }
    }
  };

  return (
    <>
      <div className="root-container">
        <p className="title-page">공지사항 작성</p>
      </div>
      <div style={{ marginTop: '150px'}}>
        <div style={{ margin: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <p>공지 제목:</p>
          <input name="content" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div style={{ margin: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <p>공지 내용:</p>
          <input name="content" value={content} onChange={(e)=> setContent(e.target.value)} required />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginRight: '250px',
          }}
        >
          <Button variant="outlined" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={handleSubmit}>
            작성완료
          </Button>
          <Button variant="outlined" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={() => navigate(-1)}>
            작성취소
          </Button>
        </div>
      </div>
    </>
  );
}
