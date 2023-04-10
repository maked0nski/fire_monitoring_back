import { JwtPayload } from "./index";

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
