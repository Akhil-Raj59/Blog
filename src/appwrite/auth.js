import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    clinet = new Client()
    account;

    constructor(){
        this.clinet
            setEndPoint(conf.appwriteUrl)
            setProject(conf.appwriteProjectId)

        this.account
            this.account = new Account(this.clinet)

    }

    async createUser({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique,email,password)
            if (userAccount) {
                return this.login({email,password})
            } else {
                return userAccount;
            }
            
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error    
        }
    }
}

const authService = new AuthService();

export default authService;