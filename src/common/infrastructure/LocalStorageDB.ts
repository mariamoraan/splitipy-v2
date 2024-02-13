import { LocalDB } from '../domain/LocalDB'

export class LocalStorageDB implements LocalDB {
    removeItem = async (key: string) => {
        await localStorage.removeItem(key)
    }
    setItem = async (key: string, elem: string) => {
        await localStorage.setItem(key, elem)
    }
    getItem = async (key: string): Promise<string | null> => {
        const item = await localStorage.getItem(key)
        return item
    }
    clear = async () => {
        localStorage.clear()
    }
}
