export interface TxVo {
    sfid: string;
    id: number;
    balance_before__c: string;
    transaction_id__c: number;
    posted_datetime__c: string;
    transaction_exit_datetime__c: string;
    tolltag_id__c: string;
    transaction_type__c: string;
    transaction_description__c: string;
    transaction_amount__c: string;
    balance_after__c: string;
    name: string;
    plate__c: string;
    location__c: string;
    createddate: Date;
    dfw_unit_id__c: string;
    transaction_entry_datetime__c: string;
    dal_unit_id__c: string;
}