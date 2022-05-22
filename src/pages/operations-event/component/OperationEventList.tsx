import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTER } from "../../../router/routes";

export default function OperationEventList(props: any) {
  const { eventList } = props;

  const showStatus = (status: string) => {
    if (status === "Planned") return "|진행예정|";
    if (status === "Ongoing") return "|진행중|";
    if (status === "Complete") return "|완료|";
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexBasis: "auto",
      }}
    >
      {eventList?.map((el: any) => (
        <Card sx={{ flexBasis: "30%", margin: "15px" }} key={el.id}>
          <CardActionArea>
            <Link to={ROUTER.OPERATIONS_EVENT_DETAIL} state={el}>
              <CardMedia
                component="img"
                height="140"
                image={el.image?.medium}
                alt="green iguana"
              />
            </Link>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {showStatus(el.status)}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {el.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.start} ~ <br />
                {el.close}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
