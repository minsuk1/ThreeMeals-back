import { RequestHandler } from 'express';
import { Container } from 'typedi';

export const find: RequestHandler = async (req, res, next) => {
    //   try {
    //     const userService = Container.get(UserService);
    //     const getUserArgs = { id: parseInt(req.params.id, 10) };
    //     const userInfo = await userService.getUser(getUserArgs);
    //     res.json({
    //       userInfo,
    //     });
    //   } catch (err) {
    //     next(err);
    //   }
    return [{ test: 'test' }];
};
