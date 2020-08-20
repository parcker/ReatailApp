export enum urlType {
    view = 1,
    api=2,
    
}
export enum UserType {
    admin = 1,
    merchant=2,
    guest=3,
    merchantuser=4
    
}
export enum SystemGlobalRole {
    BuisnessAdmin = 1,
    SystemAdmin=2,
    TechnicalAdmin=3,
    Guest=4
    
}
export enum PackingType {
    Cartons = 1,
    Single=2,
    
}

export enum OrderStatus {
    Pending = 1,
    Approved=2,
    
}
export enum SalesLevel {
    SaleOrder = 1,
    SaleInvoice=2,
    
}
export enum SalesType {
    Wholesale = 1,
    retail=2,
     
}
export enum ActivityAction
{
    CanCreate = 1,
    CanEdit = 2,
    CanDelete = 3,
    CanView = 4,
    CanApprove = 5,
    CanVerify = 6
}
export enum ApplicationBundles
{
    SupperAdmin = 1,
    SupperAdminRep = 2,
    SupportAdmin = 3,
    SupportAdminRep = 4,
    HRManagement = 5,
    InventoryManagement = 6,
    CustomerManagement = 7


}
export enum TransactionStatusEnum
{
    Created = 1,
    OnHold = 2,
    Open = 3,
    Closed = 4,
    PartialInvoice = 5,
    Unpaid = 6,
    PartialPayment = 7,
    PartialTransferIn = 7

}
export enum DocType
{
    PurchaseOrder = 1,
    PurchaseInvoice = 2,
    SalesOrder = 3,
    CashSalesInvoice = 4,
    CreditSaleInvoice = 5,

}
export enum PurchaseSearchType
{
    
    InvoiceSearch = 1,
    SupplierSearch = 2,
    DateRangeSearch = 3,
    logedInUser=4
    

}