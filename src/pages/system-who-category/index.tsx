import React, { useEffect, useState } from "react";
import { CategoryService } from "../../services";
import moment from "moment";
import TablePrimary from "./component/TablePrimary";

export default function SystemWhoCategory() {
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getWhocategory();
  }, []);

  const getWhocategory = async () => {
    try {
      setLoading(true);
      const startDate = "2022-01-01";
      const endDate = moment().toISOString();

      const response = await CategoryService.getCategoryList("WHO", startDate, endDate, true, 1, 200);

      if (response.status === 200) {
        setAllCategories(response.data?.data?.items);
      }
    } catch (error: any) {
      if (error?.response?.data.errorCode === 11010) {
        alert("YYYY-MM-DD와 같은 날짜방식으로 입력하세요.");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <TablePrimary allCategories={allCategories} loading={loading} />
    </div>
  );
}
