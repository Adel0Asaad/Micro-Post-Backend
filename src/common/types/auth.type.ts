interface LoginBody {
  email: string;
  password: string;
}

interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export type {LoginBody, TokenPayload};
