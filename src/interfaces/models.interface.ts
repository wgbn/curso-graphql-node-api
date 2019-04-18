import { IUserModel } from "../models/user.model";
import { IPostModel } from "../models/post.interface";
import { ICommentModel } from "../models/comment.model";

export interface IModels {

    User: IUserModel;
    Post: IPostModel;
    Comment: ICommentModel;

}