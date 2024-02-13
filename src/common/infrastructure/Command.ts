import { UseCase } from './UseCase'

export type Command<Request = void, Output = void> = UseCase<Request, Output>
