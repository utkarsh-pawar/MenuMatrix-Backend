export {};

declare global {
  namespace Express {
    interface userInterface extends Request {
      user?: any;
      token?: string;
      role?: string;
    }
  }
}
