import { Request, Response } from "express";
import User from "../models/user";
import redisClient, { ALL_USERS_CACHE_KEY } from "../config/redis";

export class UserController {
    public static async getAllUsers(req: Request, res: Response | any): Promise<any> {
        try {
            const data = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'userName'],
                order: [['firstName', 'ASC']],
                raw: true
            });
            const responseData = data.map(async (user: any) => {
                await redisClient.hset(ALL_USERS_CACHE_KEY, { [`${user.id}`]: JSON.stringify({ ...user, status: 0 }) });
            });
            await Promise.all(responseData);
            return res.successResponse('User response successful.', data);
        } catch (error) {
            return res.errorResponse("something went wrong.", error);

        }
    }

    public static async getUser(req: Request, res: Response | any): Promise<any> {
        try {
            const id = req.params.id
            // let resp:any = await redis.get(`user:${id}`)
            // resp = resp ? JSON.parse(resp):null
            // if(!resp){
            //     resp = await User.findOne({
            //     where :{id: id}
            //     });
            //     await redis.set(`user:${id}`,JSON.stringify(resp))
            // }

            // return res.status(200).json({
            //     data: resp,
            //     message: 'User response successful.'
            // })
        } catch (error) {
            return res.errorResponse("Something went wrong.", error, 500);
        }
    }
}