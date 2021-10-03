import { TxService } from '../services/tx.service';
import { URL } from '../../@shared/const/url';
import { ResponseUtility } from '../../@shared/utility/response.utility';
import { Router, Request, Response } from 'express';
import { Route } from '../../@shared/interface/route.interface';
import { FetchOrderCriteriaDto } from '@app/dto/fetch-order-criteria.dto';

class TxApi implements Route {
  public path = URL.MJR_TX;
  public router = Router();

  private txService = new TxService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    // /api/core/v1/tx/order-all
    this.router.post(`${this.path}${URL.ORDER_ALL}`, async (req: Request, res: Response) => {
      try {
        const list = await this.txService.getReservationTxDtoList(req.body as FetchOrderCriteriaDto);
        ResponseUtility.sendSuccess(res, list);
      } catch (error) {
        ResponseUtility.sendFailResponse(res, error);
      }
    });

    // /api/core/v1/tx/order-by-name
    this.router.post(`${this.path}${URL.ORDER_BY_NAME}`, async (req: Request, res: Response) => {
      try {
        const list = await this.txService.getReservationTxDtoListByName(req.body as FetchOrderCriteriaDto);
        ResponseUtility.sendSuccess(res, list);
      } catch (error) {
        ResponseUtility.sendFailResponse(res, error);
      }
    });
  }
  
}

export default TxApi;
