import conf from "../../../blog/src/conf/config";
import { Client,ID, Databases, Storage ,Query } from "appwrite";

export class StorageService{
    client = new Client()
    databases;
    bucket; 

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost(slug,featuredImage,content,title,status,userId){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
            
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
            return { success: false, error };

        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
            return { success: false, error };
 
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return { success: false, error };

        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return { success: false, error };
        }
    }
    async  getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status","active")],
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
            return { success: false, error };

        }
    }

    // file load services/methods

    async uploadFile(file){
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return { success: false, error };

        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,

            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return { success: false, error };

        }
    }
    getFilePreview(fileId){
        this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const storageService = new StorageService()

export default storageService;