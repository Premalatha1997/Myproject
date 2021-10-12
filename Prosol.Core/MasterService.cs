using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Prosol.Core.Interface;
using Prosol.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Excel;
using System.Data;
using System.Web;

namespace Prosol.Core
{
    public partial class MasterService : IMaster
    {

        private readonly IRepository<Prosol_Master> _MasterRepository;
        private readonly IRepository<Prosol_Plants> _MasterplntRepository;
        private readonly IRepository<Prosol_Departments> _MasterdeptRepository;
        private readonly IRepository<ProsolBook> _BookRepository;
        private readonly IRepository<Bookdictonary> _BookdicRepository;
        public MasterService(IRepository<ProsolBook> BookRepository, IRepository<Bookdictonary> BookdicRepository, IRepository<Prosol_Master> MasterRepository, IRepository<Prosol_Plants> MasterplntRepository, IRepository<Prosol_Departments> MasterdeptRepository)
        {
            this._BookdicRepository = BookdicRepository;
            this._BookRepository = BookRepository;
            this._MasterRepository = MasterRepository;
            this._MasterplntRepository = MasterplntRepository;
            this._MasterdeptRepository = MasterdeptRepository;
        }
        public bool InsertData(Prosol_Master data)
        {
            bool res = false;
            data.Islive = true;
            var query = Query.And(Query.EQ("Label", data.Label), (Query.Or(Query.EQ("Code", data.Code), Query.EQ("Title", data.Title))));
            var vn = _MasterRepository.FindAll(query).ToList();
            if (vn.Count == 0 || (vn.Count == 1 && vn[0]._id == data._id))
            {
                res = _MasterRepository.Add(data);
            }
            return res;

        }
        //public IEnumerable<ProsolBook> GetAuthLists(string AuthorName)
        //{
        //    var query = Query.EQ("Authname", AuthorName);
        //    var lst = _BookRepository.FindAll(query);
        //    return lst;

        //}

        public IEnumerable<Prosol_Master> GetDataList(string Label)
        {
            var query = Query.And(Query.EQ("Label", Label));
            var lst = _MasterRepository.FindAll(query);
            return lst;

        }
        //bin
        public virtual IEnumerable<Prosol_Master> getbincode(string lable, string StorageLocation)
        {
            var query = Query.EQ("Storagelocationcode", StorageLocation);
            //   var query = Query.And(Query.EQ("Label", lable), Query.EQ("Storagelocationcode", StorageLocation));
            var grpList = _MasterRepository.FindAll(query).ToList();
            return grpList;
        }

        public bool DelData(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", false);
            var flg = UpdateFlags.Upsert;
            var res = _MasterRepository.Update(query, Updae, flg);
            return res;
        }

        public IEnumerable<Prosol_Master> GetMaster()
        {
            var lst = _MasterRepository.FindAll();
            return lst;

        }
        public bool DisableData(string id, bool sts)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", sts);
            var flg = UpdateFlags.Upsert;
            var res = _MasterRepository.Update(query, Updae, flg);
            return res;

        }





        //Plant
        public bool InsertDataplnt(Prosol_Plants data)
        {
            bool res = false;
            data.Islive = true;
            var query = Query.Or(Query.EQ("Plantcode", data.Plantcode), Query.EQ("Plantname", data.Plantname));
            var vn = _MasterplntRepository.FindAll(query).ToList();
            if (vn.Count == 0 || (vn.Count == 1 && vn[0]._id == data._id))
            {
                res = _MasterplntRepository.Add(data);
            }
            return res;
        }
        public IEnumerable<Prosol_Plants> GetDataListplnt()
        {
            // var query = Query.EQ("Islive", true);
            var mxplnt = _MasterplntRepository.FindAll().ToList();
            return mxplnt;

        }
        public bool DelDataplnt(string id)
        {
            var query = Query.EQ("Plantcode", id);
            var res = _MasterplntRepository.Delete(query);
            return res;
        }
        public IEnumerable<Prosol_Plants> GetMasterplnt()
        {
            var lst = _MasterplntRepository.FindAll();
            return lst;
        }
        public bool DisablePlant(string id, bool sts)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", sts);
            var flg = UpdateFlags.Upsert;
            var res = _MasterplntRepository.Update(query, Updae, flg);
            return res;

        }

        //Department
        public bool InsertDatawithdept(Prosol_Departments data)
        {
            bool res = false;
            data.Islive = true;
            var query = Query.EQ("Departmentname", data.Departmentname);
            var vn = _MasterdeptRepository.FindAll(query).ToList();
            if (vn.Count == 0 || (vn.Count == 1 && vn[0]._id == data._id))
            {
                res = _MasterdeptRepository.Add(data);
            }
            return res;
        }
        public IEnumerable<Prosol_Departments> GetDataListdept()
        {
            var lst = _MasterdeptRepository.FindAll();
            return lst;
        }
        public bool DelDatadept(string id)
        {
            var query = Query.EQ("Departmentname", id);
            var res = _MasterdeptRepository.Delete(query);
            return res;
        }
        public IEnumerable<Prosol_Departments> GetMasterdept()
        {
            var lst = _MasterdeptRepository.FindAll();
            return lst;
        }
        public bool DisableDept(string id, bool sts)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", sts);
            var flg = UpdateFlags.Upsert;
            var res = _MasterdeptRepository.Update(query, Updae, flg);
            return res;

        }

        //userless
        public bool InsertDatawithplant(Prosol_Master data)
        {
            bool res = false;
            var query = Query.And(Query.EQ("Label", data.Label), Query.EQ("Islive", true), Query.EQ("Code", data.Code), Query.EQ("Plantcode", data.Plantcode));
            var vn = _MasterRepository.FindAll(query).ToList();
            if (vn.Count == 0 || (vn.Count == 1 && vn[0]._id == data._id))
            {
                res = _MasterRepository.Add(data);
            }
            return res;
        }

        public bool InsertDatawithstorage(Prosol_Master data)
        {
            bool res = false;
            var query = Query.And(Query.EQ("Label", "Storage bin"), Query.EQ("Islive", true), Query.EQ("Code", data.Code), Query.EQ("Plantcode", data.Plantcode), Query.EQ("Storagelocationcode", data.Storagelocationcode));
            var vn = _MasterRepository.FindAll(query).ToList();
            if (vn.Count == 0 || (vn.Count == 1 && vn[0]._id == data._id))
            {
                res = _MasterRepository.Add(data);
            }
            return res;
        }
        public IEnumerable<Prosol_Master> getstoragelocation(string plant)
        {
            string[] strfield = { "Code", "Title" };
            var fields = Fields.Include(strfield).Exclude("_id");
            var query = Query.And(Query.EQ("Label", "Storage location"), Query.EQ("Islive", true), Query.EQ("Plantcode", plant));
            var vn = _MasterRepository.FindAll(fields, query).ToList();
            return vn;
        }
        public IEnumerable<Prosol_Master> GetDataListstorage(string Label)
        {
            var query = Query.And(Query.EQ("Label", Label), Query.EQ("Islive", true));
            var lst = _MasterRepository.FindAll(query);
            return lst;
        }
        public bool DelDatastorage(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", "InActive");
            var flg = UpdateFlags.Upsert;
            var res = _MasterRepository.Update(query, Updae, flg);
            return res;
        }
        public virtual bool deletedata(string id)
        {
            var query = Query.And(Query.EQ("Book_id", id));
            var res = _BookRepository.Delete(query);
            return res;

        }

        public IEnumerable<Prosol_Master> GetMasterstorage()
        {
            var lst = _MasterRepository.FindAll();
            return lst;
        }
        public bool InsertDataplnt1(List<ProsolBook> request, ProsolBook mdl)
        {
            request[0].Islive = true;

            var query = Query.Or(Query.EQ("Book_id", request[0].Book_id), (Query.EQ("Book", request[0].Book)));
            var vn = _BookRepository.FindAll(query).ToList();
            if (vn.Count > 0)
            {
                return false;
            }
            else
            {
                int res1 = _BookRepository.Add(request);

                return true;
            }

        }
        public bool updatedata(List<ProsolBook> request, ProsolBook mdl)
        {
            var query = Query.EQ("Book_id", request[0].Book_id);
            var vn = _BookRepository.FindOne(query);

            var Updae = Update.Set("Book_id", request[0].Book_id).Set("Book", request[0].Book).Set("Authname", request[0].Authname).Set("Price", request[0].Price);
            var flg = UpdateFlags.Upsert;
            var mx = _BookRepository.Update(query, Updae, flg);
            return mx;

            //else
            //{
            //    return false;

            //}


        }
        public IEnumerable<ProsolBook> GetDataLists11()
        {
            var query = Query.EQ("Version", "old");
            var lst = _BookRepository.FindAll(query);
            return lst;

        }
        public IEnumerable<ProsolBook> GetDataLists3()
        {
            var query = Query.EQ("Version", "new");
            var lst = _BookRepository.FindAll(query);
            return lst;

        }
        public IEnumerable<ProsolBook> GetDataLists()
        {

            var lst = _BookRepository.FindAll();
            return lst;

        }
        public virtual int BulkBook(HttpPostedFileBase file)
        {
            int cunt = 0;
            Stream stream = file.InputStream;
            IExcelDataReader reader = null;
            if (file.FileName.EndsWith(".xls"))
            {
                reader = ExcelReaderFactory.CreateBinaryReader(stream);
            }
            else if (file.FileName.EndsWith(".xlsx"))
            {
                reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
            }
            reader.IsFirstRowAsColumnNames = true;
            var res = reader.AsDataSet();
            reader.Close();
            DataTable dt = res.Tables[0];
            string[] result = new string[dt.Rows.Count];
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[0].ToString() != "")
                {
                    var mdl = new Bookdictonary();

                    int i = 0;
                    result[i++] = dr[0].ToString();
                    mdl.BookName = result;
                    mdl.AuthorName = dr[1].ToString();
                    mdl.Book_id = dr[2].ToString();


                    _BookdicRepository.Add(mdl);
                    cunt++;
                }

            }


            return cunt;

        }
        public IEnumerable<Bookdictonary> GetDatadicList()
        {

            string[] Userfield = { "BookName", "AuthorName", "Book_id" };
            var fields = Fields.Include(Userfield).Exclude("_id");
            var shwusr = _BookdicRepository.FindAll(fields).ToList();
            return shwusr;
        }
        public virtual ProsolBook getoldbookdetails(string oldbook)
        {
            var query = Query.EQ("Version", oldbook);
            var lst = _BookRepository.FindOne(query);
            return lst;

        }
        public virtual ProsolBook getbookdetails(string bookdet)
        {
            var query = Query.EQ("Book_id", bookdet);
            var lst = _BookRepository.FindOne(query);
            return lst;

        }
        public IEnumerable<ProsolBook> GetAuthLists(string Authname)
        {
            var query = Query.EQ("Authname", Authname);
            var lst = _BookRepository.FindAll(query).ToList();
            return lst;

        }

        public IEnumerable<ProsolBook> getbookdet(string bid)
        {
            var query = Query.EQ("Book_id", bid);
            var lst = _BookRepository.FindAll(query).ToList();
            return lst;

        }
        public IEnumerable<ProsolBook> getbook(string bname)
        {
            var query = Query.EQ("Book", bname);
            var lst = _BookRepository.FindAll(query).ToList();
            return lst;

        }
        public virtual ProsolBook Getbookinfo(string md)
        {
            var query = Query.And(Query.EQ("Book_id", md));
            var Nm = _BookRepository.FindOne(query);

            return Nm;
        }
        public bool submit(List<Bookdictonary> request)
        {
            var query = Query.Or(Query.EQ("Book_id", request[0].Book_id));
            var vn = _BookdicRepository.FindAll(query).ToList();
            if (vn.Count > 0)
            {
                return false;
            }
            else
            {
                int res1 = _BookdicRepository.Add(request);

                return true;
            }


        }
    }
}
