
export type AuthState = {
  isAuthenticated: boolean;
};

// Simple authentication logic with a fixed password
export const authenticate = (password: string): boolean => {
  return password === "adminWeroAdmin";
};
