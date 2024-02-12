import { LocalDB } from "../domain/LocalDB";
import { LocalStorageDB } from "./LocalStorageDB";

export const localDB: LocalDB = new LocalStorageDB()