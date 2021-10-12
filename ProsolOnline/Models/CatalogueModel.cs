using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProsolOnline.Models
{
    public class CatalogueModel
    {
        public string _id { get; set; }
      //  [Required]
        public string Itemcode { get; set; }
        public string Materialcode { get; set; }
        [Required]
        public string Noun { get; set; }
        [Required]
        public string Modifier { get; set; }
        public string UOM { get; set; }
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
        public List<AttributeList> Characteristics { get; set; }
        public Equipment Equipment { get; set; }
        public UpdatedBy Catalogue {get; set;}
        public UpdatedBy Review { get; set; }
        public UpdatedBy Release { get; set; }
        public UpdatedBy RejectedBy { get; set; }

        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string Duplicates { get; set; }
        public List<Vendorsupplier> Vendorsuppliers { get; set; }
        public string HSNID { get; set; }
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
        public int Percentage { get; set; }
        public string width { get; set; }
        public string Unmap { get; set; }
        public string batch { get; set; }
        public string Type { get; set; }
        public string RepeatedValue { get; set; }

        public bool Exchk { get; set; }

        //public int bal { get; set; }
        //public int saved { get; set; }
        //  public string Type { get; set; }
        //bom
        public string Total_Equipment { get; set; }
        public int Total_PartQuantity { get; set; }
        public string status { get; set; }
        public string Logic { get; set; }


        //pvdata
        public string System_Balance { get; set; }
        public DateTime? Quantity_as_on_Date { get; set; }
        public string Stock_Quantity { get; set; }
        public string No_of_Item_Aginst_PV_Obs { get; set; }
        public string Physical_Observation { get; set; }
        public DateTime? Expired_Date { get; set; }
        public string StorageBin1 { get; set; }
        public string StorageLocation1 { get; set; }
        public DateTime? GR_Date { get; set; }
        public string No_of_Items_Expired { get; set; }
        public string Bin_Updation_Miss_Placed { get; set; }
        public string Shelf_Life { get; set; }
        public string PVstatus { get; set; }
        public UpdatedBy PVuser { get; set; }
        public string Specification { get; set; }
        public string Equipments { get; set; }
        public int PartQty { get; set; }
        public List<EquipList> EquipLists { get; set; }
        public string category { get; set; }
    }
    public class EquipList
    {
        public string Itemcode { get; set; }
        public int PartQty { get; set; }
    }
}
    
