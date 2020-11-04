export class Payment {
  constructor(
    public compayName?: string,        //DscRede
    public contract?: string,          //Contrato
    public contractDate?: Date,        //DatContrato
    public aprovalDate?: Date,         //DatAprovacao
    public tableCode?: string,         //CodTabela
    public contractStatus?: string,    //SituacaoContrato
    public clientName?: string,        //Cliente
    public clientDocument?: string,    //CPF
    public fundingAmount?: number,     //VlrFinanciado
    public insurancePrice?: number,    //VlrSeguro
    public plan?: number,              //Plano
    public installment?: number,       //ParReferencia
    public dueDate?: Date,             //DataVencimento
    public paymentDate?: Date,         //DataPagamento
    public installmentStatus?: string, //StaParcela
    public writeoffType?: string,      //NatBaixa
    public daysOfDelay?: number,       //DiasAtraso
    public installmentAmount?: number, //VlrParcela
    public gracePeriod?: number,       //Carencia
    public operatingRate?: number,     //TaxaOperacao
    public fundingRate?: number,       //TaxaFunding
    public pmtFundingRate?: number,    //PmtTaxaFunding
    public amountPaid?: number,        //VlrPago
    public equalization?: number,      //Equalizacao
  ) { }
}