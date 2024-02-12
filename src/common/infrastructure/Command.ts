import { UseCase } from "./UseCase";

export interface Command<Request, Output = void> extends UseCase<Request, Output> { }
