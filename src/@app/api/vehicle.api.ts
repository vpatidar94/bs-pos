import { VehicleService } from '../services/vehicle.service';
import { VehicleVo } from '../vo/vehicle.vo';
import { URL } from '../../@shared/const/url';
import { ResponseUtility } from '../../@shared/utility/response.utility';
import { Router, Request, Response } from 'express';
import { Route } from '../../@shared/interface/route.interface';

class VehicleApi implements Route {
  public path = URL.MJR_VEHICLE;
  public router = Router();

  private vehicleService = new VehicleService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    // /api/core/v1/vehicle/list
    this.router.get(`${this.path}${URL.VEHICLE_LIST}`, async (req: Request, res: Response) => {
      try {
        const list: Array<VehicleVo> = await this.vehicleService.getVehicle();
        ResponseUtility.sendSuccess(res, list);
      } catch (error) {
        ResponseUtility.sendFailResponse(res, error);
      }
    });
  }
  
}

export default VehicleApi;
