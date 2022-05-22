import { Button } from "@mui/material";
import { useLocation } from "react-router";
import { StoreService } from "../../../services";

interface LocationId {
  id: number;
}

export default function DeleteModal(props: any) {
  const location = useLocation();
  const state = location.state as LocationId;
  const { id } = state;
  const { deleteKey } = props;
  const { setOpenDeleteModal, getCompanyInfo } = props;

  const handleSubmit = async () => {
    try {
      const response = await StoreService.deleteStoreProduct(id, deleteKey);
      if (response.status === 200) {
        setOpenDeleteModal(false);
        alert("삭제되었습니다.");
        getCompanyInfo();
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className="product-edit-modal-container">
      <h3 style={{ textAlign: "center" }}>상품을 삭제 하시겠습니까?</h3>
      <div className="button-container">
        <Button variant="outlined" className="button" onClick={handleSubmit}>
          확인
        </Button>
        <Button
          variant="outlined"
          className="button"
          onClick={() => setOpenDeleteModal(false)}
        >
          취소
        </Button>
      </div>
    </div>
  );
}
