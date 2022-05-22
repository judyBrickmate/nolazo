import { ImageFormat } from ".";

export enum CategoryType {
  WHO = 'WHO',
  HOW = 'HOW',
  WHERE = 'WHERE',
}

export enum CategoryTree {
  LIST = 'list',
}

export enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum CategoryLayer {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface ICategory {
  id: number;
  name: string;
  image: ImageFormat;
  type: CategoryType;
  parent: ICategory | null
  children: ICategory[] | null
}

export interface ICategoryRoot {
  [CategoryType.WHO]: ICategory[]
  [CategoryType.HOW]: ICategory[]
  [CategoryType.WHERE]: ICategory[]
}

export interface ICategorySelect {
  label: string;
  value: number;
}