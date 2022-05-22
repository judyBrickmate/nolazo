import { useEffect, useState } from 'react';
import { CategoryType, ICategory, ICategoryRoot } from '../../interface';
import { CategoryService } from '../../services';
import TableRegister from './component/TableRegister';

export default function CompanyRegister() {
  const [allCategory, setAllCategory] = useState<ICategoryRoot | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    getWhoCategory();
  }, []);
  const getWhoCategory = async () => {
    try {
      const response = await CategoryService.getCategoryList('WHO', '2022-01-01', '2030-01-01', true, 1, 200);

      response.status === 200 && getHowCategory(response?.data.data.items);
    } catch (error: any) {
      if (error) {
        console.log(error?.response);
      }
    }
  };

  const getHowCategory = async (who: ICategory[]) => {
    try {
      const response = await CategoryService.getCategoryList('HOW', '2022-01-01', '2030-01-01', true, 1, 200);

      response.status === 200 && getWhereCategory(who, response?.data.data.items);
    } catch (error: any) {
      if (error) {
        console.log(error?.response);
      }
    }
  };
  const getWhereCategory = async (who: ICategory[], how: ICategory[]) => {
    try {
      const response = await CategoryService.getCategoryList('WHERE', '2022-01-01', '2030-01-01', true, 1, 200);

      if (response.status === 200) {
        setAllCategory({
          [CategoryType.WHO]: who,
          [CategoryType.HOW]: how,
          [CategoryType.WHERE]: response?.data.data.items });
        setIsFetched(true);
      }
    } catch (error: any) {
      if (error) {
        console.log(error?.response);
      }
    }
  };

  return allCategory && <TableRegister allCategory={allCategory} />;
}
