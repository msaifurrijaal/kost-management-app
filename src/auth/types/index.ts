export interface UserJwtPayload extends Record<string, unknown> {
  sub: string;
  email: string;
  role: string;
}
