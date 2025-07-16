export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  options?: {
    data?: {
      firstName?: string;
      lastName?: string;
    };
  };
}
