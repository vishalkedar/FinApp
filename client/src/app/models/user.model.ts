

export class User {
    public userid: number;
    public firstname: string;
    public lastname: string;
    public username: string;
    public password: string;
    public userType: string;
    public mobile: string;
    public email: string;
}

export class LoginResponse {
    user: User;
    tokenValue: string;
}