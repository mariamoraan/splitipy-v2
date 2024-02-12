import { LocalDB } from "../../../../common/domain/LocalDB";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { v4 as uuidv4 } from 'uuid';

const USERS = 'USERS'
const ACTIVE_USER_IUD = 'ACTIVE_USER_IUD'

export class AuthLocalDBRepository implements AuthRepository {
    
    constructor(private localDB: LocalDB) {}

    public signUp = async(user: Omit<User, 'id'>) => {
        const newUser = await this.createUser(user)
        await this.localDB.setItem(ACTIVE_USER_IUD, newUser.id)
        return newUser
    };
    signOut = async() => {
        await this.localDB.removeItem(USERS)
        await this.localDB.removeItem(ACTIVE_USER_IUD)
        await this.localDB.clear()
    };
    createUser = async(user: Omit<User, "id">): Promise<User> => {
        const users: User[] = await this.getUsers()
        const newUser:User = {...user, id: uuidv4()}
        users.push(newUser)
        this.localDB.setItem(USERS, JSON.stringify(users))
        return newUser
    }
    getUsers = async(): Promise<User[]> => {
        const users: User[] = JSON.parse(await this.localDB.getItem(USERS) || '[]')
        return users
    }
    getUserById = async(id: string):Promise<User | null> => {
        const users = await this.getUsers()
        return users.find(user => user.id === id) || null
    }
    getCurrentUser = async(): Promise<User | null> => {
        const authenticatedUserId = await this.localDB.getItem(ACTIVE_USER_IUD)
        if(authenticatedUserId) {
            return await this.getUserById(authenticatedUserId)
        }
        return null
    }
}