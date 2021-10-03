import { VehicleVo } from "../vo/vehicle.vo";
import { TABLE } from "../../@shared/const/table.name";
import { ReservationVo } from "../../@app/vo/reservation.vo";
import { TxVo } from "../../@app/vo/tx.vo";
import { FetchOrderCriteriaDto } from "../../@app/dto/fetch-order-criteria.dto";
import { ReservationTxDto } from "../../@app/dto/reservation-tx.dto";
import { VehicleService } from "./vehicle.service";
import { ContactService } from "./contact.service";
import moment from 'moment-timezone';
import { DbService } from "../../@shared/service/db.service";

export class TxService {

    /* ************************************* Public Methods ******************************************** */
    public getReservationTxDtoList = async (criteria: FetchOrderCriteriaDto): Promise<Array<ReservationTxDto> | null> => {
        try {
            const vehicle: VehicleVo | null = await new VehicleService().getVehicleById(criteria.vehicleId);
            const orderList = await this._getReservationVehicle(criteria.vehicleId);
            const txList = await this._getTxVehicle(criteria.plate, criteria.excludeParking);
            return await this._getReservationTxDtoList(orderList, txList, vehicle);
        } catch (error) {
            throw error;
        }
    }

    public getReservationTxDtoListByName = async (criteria: FetchOrderCriteriaDto): Promise<Array<ReservationTxDto> | null> => {
        try {
            const orderList = await this._getReservationByName(criteria.name);
            if (!orderList) {
                return null;
            }
            const vehicle: VehicleVo | null = await new VehicleService().getVehicleById(orderList[0].vehicle__c);
            if (!vehicle) {
                return null;
            }
            const txList = await this._getTxVehicle(vehicle.license_plate__c, criteria.excludeParking);
            return await this._getReservationTxDtoList(orderList, txList, vehicle);

        } catch (error) {
            throw error;
        }
    }


    /* ************************************* Private Methods ******************************************** */
    private _getReservationVehicle = async (vehicleId: string): Promise<Array<ReservationVo> | null> => {
        try {
            const query = `SELECT * FROM ${TABLE.RESERVATION} WHERE vehicle__c = '${vehicleId}' ORDER BY trip_start_date_time__c DESC`;
            const snapshot = await DbService.fetch(query);
            if (snapshot.rows?.length > 0) {
                return snapshot.rows as Array<ReservationVo>;
            }
            return null;

        } catch (error) {
            throw error;
        }
    };

    private _getReservationByName = async (name: string): Promise<Array<ReservationVo> | null> => {
        try {
            const query = `SELECT * FROM ${TABLE.RESERVATION} WHERE name = '${name}'`;
            const snapshot = await DbService.fetch(query);
            if (snapshot.rows?.length > 0) {
                return snapshot.rows as Array<ReservationVo>;
            }
            return null;

        } catch (error) {
            throw error;
        }
    };

    private _getTxVehicle = async (plate: string, excludeParking: boolean): Promise<Array<TxVo> | null> => {
        try {
            let query = `SELECT * FROM ${TABLE.TX} WHERE plate__c = '${plate}' ORDER BY transaction_entry_datetime__c DESC`;
            if (excludeParking === true) {
                query = `SELECT * FROM ${TABLE.TX} WHERE plate__c = '${plate}' AND transaction_type__c != 'PARKING' ORDER BY transaction_entry_datetime__c DESC`;
            }
            const snapshot = await DbService.fetch(query);
            if (snapshot.rows?.length > 0) {
                return snapshot.rows as Array<TxVo>;
            }
            return null;

        } catch (error) {
            throw error;
        }
    };

    private _getReservationTxDtoList = async (orderList: ReservationVo[] | null, txList: TxVo[] | null, v: VehicleVo | null): Promise<ReservationTxDto[] | null> => {
        const ret = [] as Array<ReservationTxDto>;
        const contactList = await new ContactService().getContact();
        if (orderList && orderList.length > 0) {
            orderList.forEach((it, i) => {
                let dto = {} as ReservationTxDto;
                dto = JSON.parse(JSON.stringify(it));
                dto.vehicle = v;
                dto.contact = contactList?.find(c => c.sfid === it.contact__c) ?? null;
                const start = moment.tz(it.trip_start_date_time__c, 'America/Los_Angeles').format('MM/DD/YY hh:mm A');
                const end = moment.tz(it.trip_end_date_time__c, 'America/Los_Angeles').format('MM/DD/YY hh:mm A');

                dto.dateReservation = `${start} - ${end}`;

                if (txList && txList.length > 0) {
                    dto.txList = [];
                    txList.filter(tx => {
                        let d = tx.transaction_entry_datetime__c;
                        var compareDate = moment(moment(d).format("MM/DD/YYYY"), "MM/DD/YYYY");
                        var startDate = moment(moment(it.trip_start_date_time__c).format("MM/DD/YYYY"), "MM/DD/YYYY");
                        var endDate = moment(moment(it.trip_end_date_time__c).format("MM/DD/YYYY"), "MM/DD/YYYY");
                        if (compareDate.isBetween(startDate, endDate, 'milliseconds', '[]')) {
                            dto.txList.push(tx);
                        }
                    });

                }
                ret.push(dto);
            });
        }
        return ret;
    }
}