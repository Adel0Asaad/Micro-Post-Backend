interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export type {LoginBody, TokenPayload, RegisterBody};
