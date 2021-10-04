import { URL } from '../const/url';
import { ResponseUtility } from '../utility/response.utility';
import { Router, Request, Response } from 'express';
import { Route } from '../interface/route.interface';
import { UserService } from '../service/user.service';
import { UserVo } from 'codeartist-core';

class UserApi implements Route {
  public path = URL.MJR_USER;
  public router = Router();

  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    // /api/core/v1/user/app-update
    this.router.post(`${this.path}${URL.ADD_UPDATE}`, async (req: Request, res: Response) => {
      try {
        const user = await this.userService.saveUser(req.body as UserVo);
        ResponseUtility.sendSuccess(res, user);
      } catch (error) {
        ResponseUtility.sendFailResponse(res, error);
      }
    });
  }
}
export default UserApi;
