import { Button, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTER } from '../../../router/routes';
import { COLOR } from '../../../utils';

interface LocationInfo {
  status: string;
  start: string;
  close: string;
  title: string;
  content: string;
  image: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

function OperationEventDetail() {
  const location = useLocation();
  const state = location.state as LocationInfo;
  const navigate = useNavigate();
  const { status, start, close, image, title, content } = state;
  console.log(location);

  const showStatus = (status: string) => {
    if (status === 'Planned') return '|진행예정|';
    if (status === 'Ongoing') return '|진행중|';
    if (status === 'Complete') return '|완료|';
  };

  return (
    <div className="root-container">
      <p className="title-page">이벤트 상세정보</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px 80px',
          paddingBottom: '5px',
          borderBottom: '1px solid #000',
          padding: '0 50px 10px 50px',
          fontWeight: 'bold',
        }}
      >
        <div style={{ color: COLOR.BLACK }}>
          {showStatus(status)} {title}
        </div>
        <div style={{ color: COLOR.BLACK }}>
          {start} ~ {close}
        </div>
      </div>
      <Card sx={{ maxWidth: 600, margin: '50px auto' }}>
        <CardActionArea>
          <CardMedia component="img" height="400" image={image?.medium} alt="green iguana" />
        </CardActionArea>
        <Typography align="center" gutterBottom variant="h5" component="div" fontSize="large">
          {content}
        </Typography>
      </Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginRight: '190px',
        }}
      >
        <Link to={ROUTER.OPERATIONS_EVENT_EDIT} state={state} style={{ color: COLOR.BLACK }}>
          <Button variant="outlined" sx={{ ml: 2, pt: '9px', pb: '9px' }}>
            수정하기
          </Button>
        </Link>
        <Button variant="outlined" sx={{ ml: 2, pt: '9px', pb: '9px' }} onClick={() => navigate(-1)}>
          수정취소
        </Button>
      </div>
    </div>
  );
}

export default OperationEventDetail;
