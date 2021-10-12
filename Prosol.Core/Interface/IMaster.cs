using Prosol.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Prosol.Core.Interface
{
    public partial interface IMaster
    {
        bool InsertData(Prosol_Master data);      
        IEnumerable<Prosol_Master> GetDataList(string Label);
        bool DelData(string id);

        IEnumerable<Prosol_Master> GetMaster();
        bool DisableData(string id, bool sts);
        //bin
        IEnumerable<Prosol_Master> getbincode(string lable, string StorageLocation);

        //plant
        bool InsertDataplnt(Prosol_Plants data);
        IEnumerable<Prosol_Plants> GetDataListplnt();
        bool DelDataplnt(string id);
        IEnumerable<Prosol_Plants> GetMasterplnt();
        bool DisablePlant(string id, bool sts);

        //department
        bool InsertDatawithdept(Prosol_Departments data);
        IEnumerable<Prosol_Departments> GetDataListdept();
        bool DelDatadept(string id);
        IEnumerable<Prosol_Departments> GetMasterdept();
        bool DisableDept(string id, bool sts);

        bool InsertDatawithplant(Prosol_Master data);
        IEnumerable<Prosol_Master> getstoragelocation(string plant);
        bool InsertDatawithstorage(Prosol_Master data);
         IEnumerable<Prosol_Master> GetDataListstorage(string Label);
        bool DelDatastorage(string id);
         IEnumerable<Prosol_Master> GetMasterstorage();
        // object Getbookinfo(string book);
        bool InsertDataplnt1(List<ProsolBook> request, ProsolBook mdl);
        IEnumerable<ProsolBook> GetDataLists();
        bool updatedata(List<ProsolBook> request, ProsolBook mdl);
        ProsolBook Getbookinfo(string md);
        bool deletedata(string id);
        IEnumerable<ProsolBook> GetAuthLists(string Authname);
        bool submit(List<Bookdictonary> request);
         ProsolBook getbookdetails(string bookdet);
        IEnumerable<ProsolBook> getbookdet(string bid);
        IEnumerable<ProsolBook> getbook(string bname);
        IEnumerable<ProsolBook> GetDataLists11();
        ProsolBook getoldbookdetails(string oldbook);
        IEnumerable<ProsolBook> GetDataLists3();
        IEnumerable<Bookdictonary> GetDatadicList();
        int BulkBook(HttpPostedFileBase file);
    }

    
}
