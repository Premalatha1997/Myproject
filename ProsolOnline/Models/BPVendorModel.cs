using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProsolOnline.Models
{
    public class BPVendorModel
    {

        public string _id { get; set; }
        public string BPNumber { get; set; }
        public string VendorNo { get; set; }
        public string AuthGrp { get; set; }
        public string AccGrp { get; set; }
        public string Plant { get; set; }
        public string CustNo { get; set; }
        public string PlntRelvnt { get; set; }
        public string FactoryCal { get; set; }
        public string CompanyCode { get; set; }
        public string RecACs { get; set; }
        public string Payterms { get; set; }
        public string AltPayee { get; set; }
        public string TaxType { get; set; }
        public string TaxBase { get; set; }
        public string TaxNo { get; set; }
        public string VatNo { get; set; }
        public string TOB { get; set; }
        public string TOI { get; set; }
        public string PurchOrg { get; set; }
        public string POCur { get; set; }
        public string Incoterms1 { get; set; }
        public string Incoterms2 { get; set; }
        public string GRBsdIV { get; set; }
        public string OAReq { get; set; }
        public string PurchaseGrp { get; set; }
        public string PDT { get; set; }
        public string PricingSchema { get; set; }
        public string ERS { get; set; }
        public List<PartnerFun> PartnerFuncs { get; set; }
      

    }
    public class PartnerFun
    {
        public string PartnerFunc { get; set; }
        public string PartnerNo { get; set; }
        public string PartnerDesc { get; set; }
        
    }
}



   
                 
                                                                    
                                                                       
                                                                    
                                                             
                                                         

                                                     
                                                 

                                             
                                         