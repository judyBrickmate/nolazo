import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from '../component/menu';
import Company from '../pages/company';
import CompanyRegister from '../pages/company-register';

import CompanyDetail from '../pages/company/component/CompanyDetail';
import CompanyDetailEdit from '../pages/company/component/CompanyDetailEdit';

import Login from '../pages/login';
import ManagerAdmin from '../pages/manager-admin';
import ManagerMember from '../pages/manager-member';
import ManagerMemberDetail from '../pages/manager-member-detail';
import TableOrderDetail from '../pages/manager-member-detail/pages/TableOrderDetail';
import TableUserDetail from '../pages/manager-member/component/TableUserDetail';
import OperationsAnnouncement from '../pages/operations-announcement';
import OperationAddNoti from '../pages/operations-announcement/component/OperationAddNoti';
import OperationsCompanyReview from '../pages/operations-company-review';
import OperationsEvent from '../pages/operations-event';
import OperationsAddEvent from '../pages/operations-event/component/OperationAddEvent';
import OperationsEventEdit from '../pages/operations-event/component/OperationEventEdit';
import OperationsAddEventDetail from '../pages/operations-event/component/OperationEventDetail';
import OperationsFAQ from '../pages/operations-faq';
import OperationsMatching from '../pages/operations-matching';
import OperationsMatchingReview from '../pages/operations-matching-review';
import Order from '../pages/order';
import OrderDetail from '../pages/order/component/OrderDetail';
import ReservationMatching from '../pages/reservation-matching';
import ReservationTicket from '../pages/reservation-ticket';

import StoreOwnerNotice from '../pages/store-owner-notice';
import StoreOwnerOrder from '../pages/store-owner-order';
import StoreOwnerOrderDetail from '../pages/store-owner-order/component/StoreOwnerOrderDetail';
import SystemBanner from '../pages/system-banner-management';
import SystemHowCategory from '../pages/system-how-category';
import SystemEnvironmentSetting from '../pages/system-environment-setting';
import SystemWhereCategory from '../pages/system-where-category';
import SystemTerm from '../pages/system-term-and-condition';
import SystemWhoCategory from '../pages/system-who-category';
import { useAppSelector } from '../redux/hook';
import AuthRouter from './AuthRouter';
import PageNotFound from './PageNotFound';
import { ROUTER } from './routes';
import { USER_ROLE, USER_TOKEN } from '../helpers/storage';

export default function RootRouter() {
  const location = useLocation();
  const [isUser, setIsUser]: any = useState('');

  useEffect(() => {
    const role = window.localStorage.getItem(USER_ROLE);

    setIsUser(role);
  }, [location]);

  const ListRoutes = [
    {
      path: ROUTER.MANAGER_MEMBER,
      component: <ManagerMember />,
    },
    {
      path: ROUTER.MANABER_MEMBER_DETAIL,
      component: <TableUserDetail />,
    },
    {
      path: ROUTER.MANABER_MEMBER_DETAIL_ORDER,
      component: <ManagerMemberDetail />,
    },
    {
      path: ROUTER.MANABER_MEMBER_DETAIL_MATCHING,
      component: <ManagerMemberDetail />,
    },
    {
      path: ROUTER.MANABER_MEMBER_DETAIL_STORE_REVIEW,
      component: <ManagerMemberDetail />,
    },
    {
      path: ROUTER.MANABER_MEMBER_DETAIL_MATCHING_REVIEW,
      component: <ManagerMemberDetail />,
    },
    {
      path: ROUTER.MANAGER_ADMIN,
      component: <ManagerAdmin />,
    },
    {
      path: ROUTER.COMPANY,
      component: <Company />,
    },
    {
      path: ROUTER.COMPANY_DETAIL,
      component: <CompanyDetail />,
    },
    {
      path: ROUTER.COMPANY_DETAIL_EDIT,
      component: <CompanyDetailEdit />,
    },
    {
      path: ROUTER.COMPANY_REGISTER,
      component: <CompanyRegister />,
    },
    {
      path: ROUTER.OPERATIONS_MATCHING,
      component: <OperationsMatching />,
    },
    {
      path: ROUTER.OPERATIONS_COMPANY_REVIEW,
      component: <OperationsCompanyReview />,
    },
    {
      path: ROUTER.OPERATIONS_MATCHING_REVIEW,
      component: <OperationsMatchingReview />,
    },
    {
      path: ROUTER.OPERATIONS_ANNOUNCEMENT,
      component: <OperationsAnnouncement />,
    },
    {
      path: ROUTER.OPERATIONS_ANNOUNCEMENT_ADD,
      component: <OperationAddNoti />,
    },
    {
      path: ROUTER.OPERATIONS_EVENT,
      component: <OperationsEvent />,
    },
    {
      path: ROUTER.OPERATIONS_EVENT_ADD,
      component: <OperationsAddEvent />,
    },
    {
      path: ROUTER.OPERATIONS_EVENT_EDIT,
      component: <OperationsEventEdit />,
    },
    {
      path: ROUTER.OPERATIONS_EVENT_DETAIL,
      component: <OperationsAddEventDetail />,
    },
    {
      path: ROUTER.OPERATIONS_FAQ,
      component: <OperationsFAQ />,
    },
    {
      path: ROUTER.ORDER,
      component: <Order />,
    },
    {
      path: ROUTER.ORDER_DETAIL,
      component: <OrderDetail />,
    },
    {
      path: ROUTER.RESERVATION_TICKET,
      component: <ReservationTicket />,
    },
    {
      path: ROUTER.RESERVATION_MATCHING,
      component: <ReservationMatching />,
    },
    {
      path: ROUTER.SYSTEM_COMPANY_CATEGORY,
      component: <SystemHowCategory />,
    },
    {
      path: ROUTER.SYSTEM_WHO_CATEGORY,
      component: <SystemWhoCategory />,
    },
    {
      path: ROUTER.SYSTEM_WHERE_CATEGORY,
      component: <SystemWhereCategory />,
    },
    {
      path: ROUTER.SYSTEM_ENVIRONMENT_VARIABLE_SETTING,
      component: <SystemEnvironmentSetting />,
    },
    {
      path: ROUTER.SYSTEM_TERM_AND_CONDITION,
      component: <SystemTerm />,
    },
    {
      path: ROUTER.SYSTEM_BANNER_MANAGEMENT,
      component: <SystemBanner />,
    },
    {
      path: ROUTER.STORE_OWNER_ORDER,
      component: <StoreOwnerOrder />,
    },
    {
      path: ROUTER.STORE_OWNER_ORDER_DETAIL,
      component: <StoreOwnerOrderDetail />,
    },
    {
      path: ROUTER.STORE_OWNER_NOTICE,
      component: <StoreOwnerNotice />,
    },
  ];

  const ListStoreRoutes = [
    {
      path: ROUTER.STORE_OWNER_ORDER,
      component: <StoreOwnerOrder />,
    },
    {
      path: ROUTER.STORE_OWNER_ORDER_DETAIL,
      component: <StoreOwnerOrderDetail />,
    },
    {
      path: ROUTER.STORE_OWNER_NOTICE,
      component: <StoreOwnerNotice />,
    },
  ];

  return (
    <>
      {location.pathname !== ROUTER.LOGIN && isUser !== null && <Menu />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={ROUTER.LOGIN} element={<Login />} />
        <Route path={ROUTER.ALL} element={<PageNotFound />} />

        {/* {user?.role === "업체관리자" &&
          ListStoreRoutes.map((route) => (
            <Route path={route.path} element={route.component} />
          ))} */}

        {ListRoutes.map((page, index) => {
          return <Route key={index} path={page.path} element={<AuthRouter>{page.component}</AuthRouter>} />;
        })}
      </Routes>
    </>
  );
}
