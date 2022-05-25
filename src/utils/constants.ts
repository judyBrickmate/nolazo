import { ROUTER } from '../router/routes';
import Enum from './enum';

export const ListMenuAdmin = [
  {
    link: ROUTER.MANAGER_MEMBER,
    name: '회원관리',
    children: [
      {
        links: [ROUTER.MANAGER_MEMBER],
        name: '일반회원 관리',
      },
      {
        links: [ROUTER.MANAGER_ADMIN],
        name: '관리자 회원 관리',
      },
    ],
  },
  {
    link: ROUTER.COMPANY,
    name: '업체관리',
    children: [
      {
        links: [ROUTER.COMPANY],
        name: '업체 리스트',
      },
      {
        links: [ROUTER.COMPANY_REGISTER],
        name: '업체 등록',
      },
    ],
  },
  {
    link: ROUTER.ORDER,
    name: '주문관리',
    children: [],
  },
  {
    link: ROUTER.RESERVATION_TICKET,
    name: '예약관리',
    children: [
      {
        links: [ROUTER.RESERVATION_TICKET],
        name: '티켓 예약관리',
      },
      {
        links: [ROUTER.RESERVATION_MATCHING],
        name: '매칭 예약관리',
      },
    ],
  },
  {
    link: ROUTER.OPERATIONS_MATCHING,
    name: '운영관리',
    children: [
      {
        links: [ROUTER.OPERATIONS_MATCHING],
        name: '매칭관리',
      },
      {
        links: [ROUTER.OPERATIONS_COMPANY_REVIEW],
        name: '업체 리뷰관리',
      },
      {
        links: [ROUTER.OPERATIONS_MATCHING_REVIEW],
        name: '매칭 리뷰관리',
      },
      {
        links: [ROUTER.OPERATIONS_ANNOUNCEMENT],
        name: '공지사항',
      },
      {
        links: [ROUTER.OPERATIONS_EVENT],
        name: '이벤트',
      },
      {
        links: [ROUTER.OPERATIONS_FAQ],
        name: '고객문의',
      },
    ],
  },
  {
    link: ROUTER.SYSTEM_COMPANY_CATEGORY,
    name: '시스템관리',
    children: [
      {
        links: [ROUTER.SYSTEM_COMPANY_CATEGORY],
        name: '뭐하고 카테고리 관리',
      },
      {
        links: [ROUTER.SYSTEM_WHO_CATEGORY],
        name: '누구랑 카테고리 관리',
      },
      {
        links: [ROUTER.SYSTEM_WHERE_CATEGORY],
        name: "지역 카테고리 관리",

      },
      {
        links: [ROUTER.SYSTEM_ENVIRONMENT_VARIABLE_SETTING],
        name: '환경변수 설정',
      },
      {
        links: [ROUTER.SYSTEM_TERM_AND_CONDITION],
        name: '약관 관리',
      },
    ],
  },
];

export const ListMenuStore = [
  {
    link: ROUTER.STORE_OWNER_ORDER,
    name: '주문조회',
    children: [],
  },
  {
    link: ROUTER.STORE_OWNER_NOTICE,
    name: '알림관리',
    children: [],
  },
];

export enum PaymentType {
  STORE = 'STORE',
  MATCH = 'MATCH',
}

export enum PaymentStatus {
  INITIAL = 'INITIAL',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUND = 'REFUND',
}

export interface IFilterPayment {
  name: string;
  type: PaymentType;
  store: string;
  product: string;
  amount: number;
  price: number;
  status: PaymentStatus;
  provider: string;
  date?: string; //YYYY-MM-DD
  refund: string; //YYYY-MM-DD
}

export const STORAGE_KEY = {
  LIST_SEARCH: 'LIST_SEARCH',
};

export const SEARCH_TYPE = {
  CATEGORY: 'CATEGORY',
  LOCATION_STORE_NAME: 'LOCATION_STORE_NAME',
};

export const pageSize = 10;

export const TYPE_GET_NOTIFICATION = {
  NOTIFICATION: 'MATCH',
  NOTICE: 'NOTICE',
};
export const SORT_TYPE = {
  RATING: 'rating.desc',
  PRICE: 'price.desc',
  LOCATION: 'location.desc',
};

export const SORT_DATA = [
  { key: 'rate', value: SORT_TYPE.RATING, name: '인기순' },
  { key: 'price', value: SORT_TYPE.PRICE, name: '가격순' },
  { key: 'location', value: SORT_TYPE.LOCATION, name: '거리순' },
];

export const REGEX_PASS = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,30}$/;

export const GENDER = {
  MALE: 'M',
  FEMALE: 'F',
};
export const KOREAN = '대한민국';

export const RESERVATION = {
  MY_MATCH: 'my-match',
  COMPLETE: 'complete',
  STAND_BY: 'stand-by',
};

export const STATUS_MATCHING = {
  INITIAL: 'INITIAL', // create matching
  PENDING: 'PENDING', // matching full user
  SUCCESS: 'SUCCESS', // all user payment
  FAILED: 'FAILED', // owner cancel matching
  REFUND: 'REFUND', // user payment and  owner cancel matching
};

export enum MatchingStatus {
  INITIAL = 'INITIAL',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export const STATUS_PAYMENT = {
  INITIAL: 'INITIAL', // request matching
  PENDING: 'PENDING', // matching full user and wait other
  SUCCESS: 'SUCCESS', // payment success
  FAILED: 'FAILED', // payment failed
  REFUND: 'REFUND', // cancel matching when payment
};

export const TYPE_NOTIFICATION_DETAIL_MATCH = {
  MATCHING_CANCEL: 'matching_canceled',
  MATCHING_ADDITION: 'matching_additional',
  MATCHING_PAY_SUCCESS: 'matching_success',
  MATCHING_CANCEL_AND_REFUND: 'payment_refund',
  STORE_PAY_SUCCESS: 'payment_paid',
};

export const TYPE_MATCHING = {
  SINGLE: 'SINGLE',
  ADDITIONAL: 'ADDITIONAL',
};

export enum RoleManager {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STORE_OWNER = 'store owner',
  USER = 'user',
}

export enum UserAuthProvider {
  APPLE = '애플',
  KAKAO = '카카오',
  PHONE = '연락처',
}

export enum UserStatus {
  ACTIVE = '정상',
  BLOCKED = '차단',
}

export enum StoreStatus {
  '정상' = 'open',
  '운영중지' = 'closed',
}

export enum AdditionalStatus {
  "예" = "true",
  "아니오" = "false",
}

export interface IUserFilter {
  provider: UserAuthProvider;
  name: string;
  phone: string;
  status: UserStatus;
}

export const USER_STATUS = {
  ACTIVE: '정상',
  BLOCKED: '차단',
};

export interface UserState {
  authProvider: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthDay: string;
  profileImage: any;
  categories: [Object];
  categoryIds: [number];
  deviceToken: string;
  role: Enum;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
