using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prosol.Core.Model
{
    public class Prosol_Datamaster
    {
        public ObjectId _id { get; set; }
        public string Itemcode { get; set; }
        public string Materialcode { get; set; }
        public string UOM { get; set; }
        public string Noun { get; set; }
      
        public string Modifier { get; set; }
        public string HSNID { get; set; }
        
        public string Legacy { get; set; }
        public string Legacy2 { get; set; }
        public string Shortdesc { get; set; }
        public string Longdesc { get; set; }
        public string Additionalinfo { get; set; }
        public string Soureurl { get; set; }
    
        public string Junk { get; set; }
        public string Plant { get; set; }
        public string Manufacturercode { get; set; }
        public string Manufacturer { get; set; }
        public string Partno { get; set; }
        public string Partnodup { get; set; }
        public string Application { get; set; }
        public string Drawingno { get; set; }
        public string Referenceno { get; set; }
        public int ItemStatus { get; set; }
        public string Remarks { get; set; }
        public string RevRemarks { get; set; }
        public string RelRemarks { get; set; }
        public List<Prosol_AttributeList> Characteristics { get; set; }
        public Equipments Equipment { get; set; }
        public Prosol_UpdatedBy Catalogue { get; set; }
        public Prosol_UpdatedBy Review { get; set; }
        public Prosol_UpdatedBy Release { get; set; }
        public Prosol_UpdatedBy RejectedBy { get; set; }

        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string Duplicates { get; set; }

        public List<Vendorsuppliers> Vendorsuppliers { get; set; }

        public string Unspsc { get; set; }
        public string Attachment { get; set; }

        public string Rework { get; set; }
        public string Reworkcat { get; set; }
        //public string Isgeneric { get; set; }

        public string Maincode { get; set; }
        public string Subcode { get; set; }
        public string Subsubcode { get; set; }

        public string MissingValue { get; set; }

        public string EnrichedValue { get; set; }
        public string Unmap { get; set; }
        public string batch { get; set; }
        public string Type { get; set; }

        //pvdata
        public string System_Balance { get; set; }
        public DateTime? Quantity_as_on_Date { get; set; }
        public string Stock_Quantity { get; set; }
        public string No_of_Item_Aginst_PV_Obs { get; set; }
        public string Physical_Observation { get; set; }
        public DateTime? Expired_Date { get; set; }
        public string Storage_Bin1 { get; set; }
        public string Storage_Location1 { get; set; }
        public DateTime? GR_Date { get; set; }
        public string No_of_Items_Expired { get; set; }
        public string Bin_Updation_Miss_Placed { get; set; }
        public string Shelf_Life { get; set; }
        public string PVstatus { get; set; }
        public Prosol_UpdatedBy PVuser { get; set; }
        public string Specification { get; set; }

        public string Appimage1 { set; get; }
        public string Appimage2 { set; get; }
      
        public List<EquList> Equipments { get; set; }
        public string category { get; set; }

    }
    public class EquList
    {
        public string Itemcode { get; set; }
        public int PartQty { get; set; }
    }
}
    

