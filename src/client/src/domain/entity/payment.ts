export interface Payment {
    compayName?: string;
    contract?: string;
    contractDate?: Date;
    aprovalDate?: Date;
    tableCode?: string;
    contractStatus?: string;
    clientName?: string;
    clientDocument?: string;
    fundingAmount?: number;
    insurancePrice?: number;
    plan?: number;
    installment?: number;
    dueDate?: Date;
    paymentDate?: Date;
    installmentStatus?: string;
    writeoffType?: string;
    daysOfDelay?: number;
    installmentAmount?: number;
    gracePeriod?: number;
    operatingRate?: number;
    fundingRate?: number;
    pmtFundingRate?: number;
    amountPaid?: number;
    equalization?: number;
}
