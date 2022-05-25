import moment from "moment";
import React, { useEffect, useState } from "react";
import { CategoryService } from "../../services";
import TablePrimary from "./component/TablePrimary";
import TableSecondary from "./component/TableSecondary";

export default function SystemWhereCategory() {
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getWherecategory();
  }, []);

  const getWherecategory = async () => {
    try {
      setLoading(true);
      const startDate = "2022-01-01";
      const endDate = moment().toISOString();

      const response = await CategoryService.getCategoryList("WHERE", startDate, endDate, true, 1, 200);

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

  const { primary, secondary } = allCategories.reduce(
    (total, item) => {
      (item as any).parent?.id === 3 ? total.primary.push(item) : total.secondary.push(item);
      return total;
    },
    { primary: [], secondary: [] }
  );

  console.log(primary);
  console.log(secondary);

  return (
    <div>
      <TablePrimary allCategory={primary} loading={loading} />
      <TableSecondary allCategory={primary} loading={loading} />
    </div>
  );
}
