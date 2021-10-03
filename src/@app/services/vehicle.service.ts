import { DbService } from "../../@shared/service/db.service";
import { VehicleVo } from "../../@app/vo/vehicle.vo";
import { TABLE } from "../../@shared/const/table.name";

export class VehicleService {
    /* ************************************* Public Methods ******************************************** */
    public getVehicle = async (): Promise<Array<VehicleVo>> => {
        try {
            const query = `SELECT * FROM ${TABLE.VEHICLE}`;
            const snapshot = await DbService.fetch(query);
            return snapshot.rows as Array<VehicleVo>;
        } catch (error) {
            throw error;
        }
    }

    public getVehicleById = async (vehicleId: string): Promise<VehicleVo | null> => {
        try {
            const query = `SELECT * FROM ${TABLE.VEHICLE} WHERE sfid = '${vehicleId}'`;
            const snapshot = await DbService.fetch(query);
            if (snapshot.rows?.length > 0) {
                return snapshot.rows[0] as VehicleVo;
            }
            return null;

        } catch (error) {
            throw error;
        }
    }

    /* ************************************* Private Methods ******************************************** */
}