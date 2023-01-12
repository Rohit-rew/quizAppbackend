export type userRegisterBody = {
  name: string;
  email: string;
  password: string;
};

export type userLoginBody = {
  email: string;
  password: string;
};

export type successRegister = {
  status: number;
  success: boolean;
  message: string;
};

export type successLogin = {
  status: number;
  success: boolean;
  message: string;
  token: string;
};
