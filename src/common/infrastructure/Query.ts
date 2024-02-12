import { UseCase } from "./UseCase";

export interface Query<Output, Request = void> extends UseCase<Request, Output> {}