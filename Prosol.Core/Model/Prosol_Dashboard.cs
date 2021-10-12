using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prosol.Core.Model
{
    public class Prosol_Dashboard
    {
        public string PlantName { get; set; }
        public string PlantCode { get; set; }

        public int TotCreated { get; set; }
        public int TotRelease { get; set; }
        public int TotReview { get; set; }
        public int TotCatalogue { get; set; }
        public int TotRework { get; set; }

        public int TotRequest { get; set; }
        public int TotApprove { get; set; }
        public int TotReject { get; set; }

        public int TotDuplicate { get; set; }
        public int TotVendors { get; set; }
        public int TotNounModifiers { get; set; }
        public int TotUsers { get; set; }

        public List<Prosol_Datamaster> DataList { get; set; }
        public List<Prosol_Vendor> VendorDataList { get; set; }
        public List<Prosol_NounModifiers> NMDataList { get; set; }
        public List<Prosol_showDetail> showdetail { get; set; }
    }
    public class Prosol_showDetail
    {
      
        public string Username { get; set; }
        public int Pending { get; set; }
        public int Completed { get; set; }
        public int Rework { get; set; }


      
    }
}
