import { localDB } from "../../../../common/infrastructure/instances";
import { CreateUserCommand } from "../../application/commands/create-user.command";
import { GetCurrentUserQuery } from "../../application/queries/get-current-user.query";
import { GetUserByIdQuery } from "../../application/queries/get-user-by-id.query";
import { GetUsersQuery } from "../../application/queries/get-users.query";
import { SignOutCommand } from "../../application/commands/sign-out.command";
import { SignUpCommand } from "../../application/commands/sign-up.command";
import { AuthLocalDBRepository } from "../repositories/AuthLocalDBRepository";

export class AuthLocator {
    static repository = new AuthLocalDBRepository(localDB)
    static getCreateUser() {
        return new CreateUserCommand(this.repository)
    }
    static getSignUp() {
        return new SignUpCommand(this.repository)
    }
    static getSignOut() {
        return new SignOutCommand(this.repository)
    }
    static getGetCurrentUser() {
        return new GetCurrentUserQuery(this.repository)
    }
    static getGetUsers() {
        return new GetUsersQuery(this.repository)
    }
    static getGetUserById() {
        return new GetUserByIdQuery(this.repository)
    }
}