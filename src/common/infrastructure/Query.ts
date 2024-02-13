import { UseCase } from './UseCase'

export type Query<Output, Request = void> = UseCase<Request, Output>
