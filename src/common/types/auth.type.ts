interface LoginBody {
  email: string;
  password: string;
}

interface CreatePostBody {
  content: string;
}

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

interface TokenPayload {
  id: string;
  email: string;
  name: string;
}

interface FollowBody {
  userId: string;
}

export type {LoginBody, CreatePostBody, TokenPayload, RegisterBody, FollowBody};
