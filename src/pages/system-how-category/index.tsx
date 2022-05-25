import moment from "moment";
import React, { useEffect, useState } from "react";
import { CategoryService } from "../../services";
import TablePrimary from "./component/TablePrimary";
import TableSecondary from "./component/TableSecondary";

export default function SystemHowCategory() {
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getHowcategory();
  }, []);

  const getHowcategory = async () => {
    try {
      setLoading(true);
      const startDate = "2022-01-01";
      const endDate = moment().toISOString();

      const response = await CategoryService.getCategoryList("HOW", startDate, endDate, true, 1, 200);

      if (response.status === 200) {
        console.log("🚀 ~ file: index.tsx ~ line 22 ~ getHowcategory ~ response", response.data?.data?.items.length);
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
      (item as any).parent?.id === 2 ? total.primary.push(item) : total.secondary.push(item);
      return total;
    },
    { primary: [], secondary: [] }
  );

  console.log("🚀 ~ file: index.tsx ~ line 37 ~ const{primary,secondary}=allCategories.reduce ~ primary", primary);
  console.log("🚀 ~ file: index.tsx ~ line 32 ~ const{primary,secondary}=allCategories.reduce ~ secondary", secondary);
  return (
    <div>
      <TablePrimary allCategory={primary} loading={loading} />
      <TableSecondary allCategory={primary} loading={loading} />
    </div>
  );
}
