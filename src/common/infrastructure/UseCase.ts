export interface UseCase<Input, Output> {
    execute(param: Input): Promise<Output>
}
