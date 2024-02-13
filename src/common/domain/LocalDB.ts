export interface LocalDB {
    removeItem(key: string): void
    setItem(key: string, elem: string): void
    getItem(key: string): Promise<string | null>
    clear(): void
}
