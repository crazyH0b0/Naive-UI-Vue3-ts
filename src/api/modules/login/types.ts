export interface IAccount {
  name: string | null
  password: string | null
  isSavePassword?: boolean | null
}
export interface ILoginResData {
  id: number
  name: string
  token: string
}

export interface ILoginRes<T = any> {
  code: number
  data: T
}

export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
}

export interface Department {
  id: number;
  name: string;
  parentId?: any;
  createAt: string;
  updateAt: string;
  leader: string;
}

export interface Data {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: string;
  updateAt: string;
  role: Role;
  department: Department;
}
