import { ContactVo } from "@app/vo/contact.vo";
import { ReservationVo } from "@app/vo/reservation.vo";
import { TxVo } from "@app/vo/tx.vo";
import { VehicleVo } from "@app/vo/vehicle.vo";

export interface ReservationTxDto extends ReservationVo {
    txList: Array<TxVo>;
    vehicle: VehicleVo | null;  
    contact: ContactVo | null;
    dateReservation: string;
}