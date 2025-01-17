import { AuthGuard } from "@nestjs/passport";
// import { AuthGuard } from "./auth.guard";

export class JwtAuthGuard extends AuthGuard('jwt') {}
// export class JwtAuthGuard extends AuthGuard('local') {}