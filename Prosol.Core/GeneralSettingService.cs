using Excel;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Prosol.Core.Interface;
using Prosol.Core.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace Prosol.Core
{
    public class GeneralSettingService : IGeneralSettings
    {
        private readonly IRepository<Prosol_UOM> _UOMRepository;
        private readonly IRepository<Prosol_Vendor> _VendorRepository;
        private readonly IRepository<Prosol_Abbrevate> _AbbrevateRepository;
        private readonly IRepository<Prosol_Attribute> _AttributesRepository;
        private readonly IRepository<Prosol_Charateristics> _CharacteristicRepository;
        private readonly IRepository<Prosol_Logics> _LogicsRepository;
        private readonly IRepository<Prosol_Vendortype> _VendortypeRepository;
        private readonly IRepository<Prosol_Reftype> _ReftypeRepository;
        private readonly IRepository<Prosol_UNSPSC> _unspscRepository;
        private readonly IRepository<Prosol_GroupCodes> _groupcodeRepository;
        private readonly IRepository<Prosol_SubGroupCodes> _subgroupcodeRepository;
        private readonly IRepository<Prosol_Datamaster> _datamasterRepository;
        private readonly IRepository<Prosol_ERPInfo> _erpRepository;
        private readonly IRepository<Prosol_HSNModel> _HSNMODELRepository;
        private readonly IRepository<Prosol_NounModifiers> _nounModifierRepository;
        private readonly IRepository<Prosol_Sequence> _SequenceRepository;
        private readonly IRepository<Prosol_UOMSettings> _UOMsettingRepository;
        private readonly IRepository<Prosol_UOMMODEL> _UOMMODELRepository;
        private readonly IRepository<Prosol_SubSubGroupCode> _SubSubGroupRepository;
        private readonly IRepository<Prosol_CodeLogic> _CodeLogicRepository;

        private readonly IRepository<Prosol_Users> _UsersRepository;
        public GeneralSettingService(IRepository<Prosol_UOM> uomRepository,
            IRepository<Prosol_Vendor> vendorRepository,
            IRepository<Prosol_Abbrevate> abbrevateRepository,
            IRepository<Prosol_Charateristics> attributesRepository,
            IRepository<Prosol_Logics> logicsRepository,
             IRepository<Prosol_HSNModel> HSNMODELRepository,
            IRepository<Prosol_Vendortype> VendortypeRepository,
            IRepository<Prosol_Reftype> ReftypeRepository,
            IRepository<Prosol_UNSPSC> unspscRepository,
            IRepository<Prosol_GroupCodes> groupcodeRepository,
            IRepository<Prosol_SubGroupCodes> subgroupcodeRepository,
             IRepository<Prosol_Datamaster> datamasterRepository,
             IRepository<Prosol_ERPInfo> erpRepository,

              IRepository<Prosol_Sequence> seqRepository,
            IRepository<Prosol_UOMSettings> UOMsettingRepository,
            IRepository<Prosol_NounModifiers> nounModifierRepository,
             IRepository<Prosol_UOMMODEL> UOMMODELRepository,
              IRepository<Prosol_SubSubGroupCode> SubSubGroupRepository,
              IRepository<Prosol_CodeLogic> codelogicRepository,
              IRepository<Prosol_Users> usersRepository,
               IRepository<Prosol_Attribute> AttributesRepository
              )
        {
            this._UOMRepository = uomRepository;
            this._VendorRepository = vendorRepository;
            this._AbbrevateRepository = abbrevateRepository;
            this._HSNMODELRepository = HSNMODELRepository;
            this._CharacteristicRepository = attributesRepository;
            this._LogicsRepository = logicsRepository;
            this._VendortypeRepository = VendortypeRepository;
            this._ReftypeRepository = ReftypeRepository;
            this._unspscRepository = unspscRepository;
            this._groupcodeRepository = groupcodeRepository;
            this._subgroupcodeRepository = subgroupcodeRepository;
            this._datamasterRepository = datamasterRepository;
            this._erpRepository = erpRepository;

            this._UOMsettingRepository = UOMsettingRepository;
            this._nounModifierRepository = nounModifierRepository;
            this._SequenceRepository = seqRepository;
            this._UOMMODELRepository = UOMMODELRepository;
            this._SubSubGroupRepository = SubSubGroupRepository;
            this._CodeLogicRepository = codelogicRepository;
            this._UsersRepository = usersRepository;
            this._AttributesRepository = AttributesRepository;
        }

        // Get Unit List
        public IEnumerable<Prosol_UOM> Getunit()
        {
            return _UOMRepository.FindAll();
        }

        //Group Codes
        public virtual bool CreateGroupcode(Prosol_GroupCodes grp)
        {
            var res = false;
            var query = Query.And(Query.EQ("code", grp.code), Query.EQ("title", grp.title));
            var um = _groupcodeRepository.FindAll(query).ToList();
            if (um.Count == 0 || (um.Count == 1 && um[0]._id == grp._id))
            {
                res = _groupcodeRepository.Add(grp);
            }
            return res;
        }
        public virtual IEnumerable<Prosol_GroupCodes> GetGroupcodeList()
        {

            var grpList = _groupcodeRepository.FindAll();
            return grpList;
        }
        public virtual IEnumerable<Prosol_GroupCodes> GetGroupcodeList(string srchtxt)
        {
            var query = Query.Or(Query.Matches("code", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("title", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var groupList = _groupcodeRepository.FindAll(query);
            return groupList;
        }
        public virtual bool DeleteGroupcode(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var res = _groupcodeRepository.Delete(query);
            return res;

        }


        //Sub Group Codes
        public virtual bool CreateSubGroupcode(Prosol_SubGroupCodes grp)
        {
            var res = false;
            var query = Query.And(Query.EQ("code", grp.code), Query.EQ("title", grp.title));
            var um = _subgroupcodeRepository.FindAll(query).ToList();
            if (um.Count == 0 || (um.Count == 1 && um[0]._id == grp._id))
            {
                res = _subgroupcodeRepository.Add(grp);
            }
            return res;
        }
        public virtual IEnumerable<Prosol_SubGroupCodes> GetSubGroupcodeList()
        {

            var grpList = _subgroupcodeRepository.FindAll();
            return grpList;
        }
        public virtual IEnumerable<Prosol_SubGroupCodes> GetSubGroupcodeList1(string srchtxt)
        {
            var query = Query.Or(Query.Matches("code", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("title", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("groupCode", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("groupTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var subgroupList = _subgroupcodeRepository.FindAll(query);
            return subgroupList;
        }
        public virtual bool DeleteSubGroupcode(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var res = _subgroupcodeRepository.Delete(query);
            return res;

        }

        // Sub Sub Group Codes

        public virtual IEnumerable<Prosol_SubGroupCodes> GetSubGroupcodeList(string maingroup)
        {
            var query = Query.EQ("groupCode", maingroup);
            var grpList = _subgroupcodeRepository.FindAll(query);
            return grpList;
        }
        public bool InsertSubSubgroup(Prosol_SubSubGroupCode data, int update)
        {
            bool res = false;
            if (update == 1)
            {
                res = _SubSubGroupRepository.Add(data);
                return res;
            }
            else
            {
                //bool res = false;
                // data.Islive = true;
                var query = Query.And(Query.EQ("MainGroupCode", data.MainGroupCode), Query.EQ("SubGroupCode", data.SubGroupCode), Query.EQ("SubSubGroupCode", data.SubSubGroupCode));
                var vn = _SubSubGroupRepository.FindAll(query).ToList();
                if (vn.Count == 0)
                {
                    var query1 = Query.And(Query.EQ("MainGroupCode", data.MainGroupCode), Query.EQ("SubGroupCode", data.SubGroupCode), Query.EQ("SubSubGroupTitle", data.SubSubGroupTitle));
                    var vn1 = _SubSubGroupRepository.FindAll(query).ToList();
                    if (vn1.Count == 0)
                        res = _SubSubGroupRepository.Add(data);
                }
                return res;
            }
        }
        public IEnumerable<Prosol_SubSubGroupCode> ListofSubSubUser()
        {

            var shwusr1 = _SubSubGroupRepository.FindAll().ToList();
            return shwusr1;
        }
        public bool DeleteSubsubGroupcode(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var res = _SubSubGroupRepository.Delete(query);
            return res;
        }
        public IEnumerable<Prosol_SubSubGroupCode> GetSubsubGroupcodeList(string SubGroupCode)
        {
            var query = Query.EQ("SubGroupCode", SubGroupCode);
            var grpList = _SubSubGroupRepository.FindAll(query);
            return grpList;
        }
        public virtual IEnumerable<Prosol_SubSubGroupCode> GetSubSubGroupListSearch(string srchtxt)
        {
            var query = Query.Or(Query.Matches("MainGroupCode", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("MainGroupTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("SubGroupCode", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("SubGroupTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("SubSubGroupCode", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("SubSubGroupTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var subsubgroupList = _SubSubGroupRepository.FindAll(query);
            return subsubgroupList;
        }

        //UOM
        public virtual bool CreateUOM(Prosol_UOM uom)
        {
            uom.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            var res = false;
            var query = Query.Or(Query.EQ("Unitname", uom.Unitname), Query.EQ("UOMname", uom.UOMname));
            var um = _UOMRepository.FindAll(query).ToList();
            if (um.Count == 0 || (um.Count == 1 && um[0]._id == uom._id))
            {
                res = _UOMRepository.Add(uom);
            }
            return res;



            //bool res = false;
            //if (update == 1)
            //{
            //    res = _UOMRepository.Add(uom);
            //    return res;
            //}
            //else
            //{
            //    // bool res = false;
            //    // uom.Islive = true;
            //    var query = Query.Or(Query.EQ("UOMname", uom.UOMname), Query.EQ("Unitname", uom.Unitname));
            //    var vn = _UOMRepository.FindAll(query).ToList();
            //    if (vn.Count == 0)
            //    {
            //        res = _UOMRepository.Add(uom);
            //    }
            //    return res;
            //}

        }
        public virtual IEnumerable<Prosol_UOM> GetUOMList()
        {
            //  var fields = Fields.Exclude("Attribute");
            var uomList = _UOMRepository.FindAll();
            return uomList;
        }
        public virtual IEnumerable<Prosol_UOM> GetUOMList(string srchtxt)
        {
            var query = Query.Or(Query.Matches("UOMname", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Unitname", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var UOMList = _UOMRepository.FindAll(query);
            return UOMList;
        }
        public virtual bool DeleteUOM(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var res = _UOMRepository.Delete(query);
            return res;

        }
        public string[] GetUOM(string label)
        {
            var fields = Fields.Include("Unitname").Exclude("_id");
            var res = _UOMRepository.FindAll(fields).ToList();
            string[] arr = null; int i = 0;
            foreach (Prosol_UOM md in res)
            {
                arr[i] = md.Unitname;
                i++;
            }
            return arr;
        }
        private static ImageFormat GetImageFormat(string imageType)
        {
            ImageFormat imageFormat;
            switch (imageType)
            {
                case "image/jpg":
                    imageFormat = ImageFormat.Jpeg;
                    break;
                case "image/jpeg":
                    imageFormat = ImageFormat.Jpeg;
                    break;
                case "image/pjpeg":
                    imageFormat = ImageFormat.Jpeg;
                    break;
                case "image/gif":
                    imageFormat = ImageFormat.Gif;
                    break;
                case "image/png":
                    imageFormat = ImageFormat.Png;
                    break;
                case "image/x-png":
                    imageFormat = ImageFormat.Png;
                    break;
                default:
                    throw new Exception("Unsupported image type !");
            }

            return imageFormat;
        }

        public virtual int BulkUOM(HttpPostedFileBase file)
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
            if (dt.Columns[0].ColumnName == "UOMname" && dt.Columns[1].ColumnName == "Unitname")
            {
                var LstNM = new List<Prosol_UOM>();
                foreach (DataRow dr in dt.Rows)
                {
                    if (dr[0].ToString() != "" && dr[1].ToString() != "")
                    {
                        var Mdl = new Prosol_UOM();
                        // Mdl.Attribute = dr[0].ToString();
                        Mdl.UOMname = dr[0].ToString();
                        Mdl.Unitname = dr[1].ToString();
                        Mdl.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                        LstNM.Add(Mdl);
                    }
                }
                if (LstNM.Count > 0)
                {
                    //IEnumerable<Prosol_NounModifiers> filteredList = LstNM.GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First())
                    //    .GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First());

                    List<Prosol_UOM> filteredList = LstNM.GroupBy(p => new { p.UOMname, p.Unitname }).Select(g => g.First()).ToList();
                    if (filteredList.Count > 0)
                    {
                        var fRes = new List<Prosol_UOM>();
                        foreach (Prosol_UOM nm in filteredList.ToList())
                        {
                            var query = Query.Or(Query.EQ("UOMname", nm.UOMname), Query.EQ("Unitname", nm.Unitname));
                            var ObjStr = _UOMRepository.FindOne(query);
                            if (ObjStr == null)
                            {
                                fRes.Add(nm);

                            }
                        }
                        cunt = _UOMRepository.Add(fRes);

                    }
                }
            }else
            {
                return -1;
            }
            return cunt;

        }

        // Item base UOM
        public bool InsertData(Prosol_UOMMODEL data, int update)
        {
            data.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            bool res = false;
            if (update == 1)
            {
                res = _UOMMODELRepository.Add(data);
                return res;
            }
            else
            {
                // bool res = false;
                // data.Islive = true;
                var query = Query.EQ("UOMNAME", data.UOMNAME);
                var vn = _UOMMODELRepository.FindAll(query).ToList();
                if (vn.Count == 0)
                {
                    res = _UOMMODELRepository.Add(data);
                }
                return res;
            }
        }
        public IEnumerable<Prosol_UOMMODEL> getlistuom()
        {
            //string[] Userfield = { "SeviceCategorycode", "SeviceCategoryname", "Islive", "_id" };
            //var fields = Fields.Include(Userfield);
            var shwusr1 = _UOMMODELRepository.FindAll().ToList();
            return shwusr1;
        }
        public virtual bool DeleteUOM1(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var res = _UOMMODELRepository.Delete(query);
            return res;

        }


        //Vendor
        public virtual bool CreateVendor(Prosol_Vendor vendor)
        {
            vendor.Name = vendor.Name.Replace(",", "");
            vendor.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            var res = false;
            var query = Query.EQ("Name", vendor.Name);
            var vn = _VendorRepository.FindAll(query).ToList();
            if (vn.Count == 0 || (vn.Count == 1 && vn[0]._id == vendor._id))
            {
                res = _VendorRepository.Add(vendor);
            }
            return res;
        }
        public virtual IEnumerable<Prosol_Vendor> GetVendorList()
        {
            var vendorList = _VendorRepository.FindAll();
            return vendorList;
        }
        public virtual IEnumerable<Prosol_Vendor> GetVendorList(string srchtxt)
        {
            var query =  Query.Or(Query.Matches("Name", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Address", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var vendorList = _VendorRepository.FindAll(query);
            return vendorList;
        }
        public virtual bool DeleteVendor(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var res = _VendorRepository.Delete(query);
            return res;

        }
        public string getNextCode()
        {
            var sort = SortBy.Ascending("_id");
            string[] strArr = { "Code" };
            // var fields = Fields.Include(strArr).Exclude("_id");
            var fields = Fields.Include(strArr);
            var temp = _VendorRepository.FindAll(fields, sort).ToList();
            if (temp.Count > 0)
            {
                var res = temp[temp.Count - 1].Code;
                return res;
            }
            else
            {
                return "0";
            }
        }
        private string generatCode(int cde)
        {
            string rollno = "";

            if (cde != 0)
            {

                cde++;
                switch (cde.ToString().Length)
                {
                    case 1:
                        rollno = "0000" + cde;
                        break;
                    case 2:
                        rollno = "000" + cde;
                        break;
                    case 3:
                        rollno = "00" + cde;
                        break;
                    case 4:
                        rollno = "0" + cde;
                        break;
                    case 5:
                        rollno = cde.ToString();
                        break;
                }

                return rollno;
            }
            else return rollno = "00001";
        }
        public bool DisableVendor(string id, bool sts)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Enabled", sts);
            var flg = UpdateFlags.Upsert;
            var res = _VendorRepository.Update(query, Updae, flg);
            return res;

        }
        public virtual int BulkVendor(HttpPostedFileBase file)
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
            if (dt.Columns[0].ColumnName == "ShortDesc Name" && dt.Columns[1].ColumnName == "Name" && dt.Columns[2].ColumnName == "Name2" 
                && dt.Columns[3].ColumnName == "Name3" && dt.Columns[4].ColumnName == "Name4"
                && dt.Columns[5].ColumnName == "Address" && dt.Columns[6].ColumnName == "Address2"
                && dt.Columns[7].ColumnName == "Address3" && dt.Columns[8].ColumnName == "Address4" && dt.Columns[9].ColumnName == "City"
                && dt.Columns[10].ColumnName == "Region" && dt.Columns[11].ColumnName == "Postal"
                && dt.Columns[12].ColumnName == "Country" && dt.Columns[13].ColumnName == "Phone" && dt.Columns[14].ColumnName == "Mobile" 
                && dt.Columns[15].ColumnName == "Fax" && dt.Columns[16].ColumnName == "Email" && dt.Columns[17].ColumnName == "Website")
            {
                string str = getNextCode();
                Int16 rl = Convert.ToInt16(str);
                var LstNM = new List<Prosol_Vendor>();

                foreach (DataRow dr in dt.Rows)
                {
                    if (dr[1].ToString() != "")
                    {
                        var Mdl = new Prosol_Vendor();
                        Mdl.Code = generatCode(rl++);
                        Mdl.ShortDescName = dr[0].ToString().Replace(",", "");
                        Mdl.Name = dr[1].ToString().Replace(",", "");
                        Mdl.Name2 = dr[2].ToString().Replace(",", "");
                        Mdl.Name3 = dr[3].ToString().Replace(",", "");
                        Mdl.Name4 = dr[4].ToString().Replace(",", "");
                        Mdl.Address = dr[5].ToString();
                        Mdl.Address2 = dr[6].ToString();
                        Mdl.Address3 = dr[7].ToString();
                        Mdl.Address4 = dr[8].ToString();
                        Mdl.City = dr[9].ToString();
                        Mdl.Region = dr[10].ToString();
                        Mdl.Postal = dr[11].ToString();
                        Mdl.Country = dr[12].ToString();
                        Mdl.Phone = dr[13].ToString();
                        Mdl.Mobile = dr[14].ToString();
                        Mdl.Fax = dr[15].ToString();
                        Mdl.Email = dr[16].ToString();
                        Mdl.Website = dr[17].ToString();

                        Mdl.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                        Mdl.Enabled = true;
                        LstNM.Add(Mdl);
                    }
                }
                if (LstNM.Count > 0)
                {
                    //IEnumerable<Prosol_NounModifiers> filteredList = LstNM.GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First())
                    //    .GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First());

                    List<Prosol_Vendor> filteredList = LstNM.GroupBy(p => new { p.Name, p.Address }).Select(g => g.First()).ToList();
                    if (filteredList.Count > 0)
                    {
                        var fRes = new List<Prosol_Vendor>();
                        foreach (Prosol_Vendor nm in filteredList.ToList())
                        {
                            var query = Query.And(Query.EQ("Name", nm.Name), Query.EQ("Address", nm.Address));
                            var ObjStr = _VendorRepository.FindOne(query);
                            if (ObjStr == null)
                            {
                                fRes.Add(nm);

                            }
                        }
                        cunt = _VendorRepository.Add(fRes);

                    }
                }
            }
            else
            {

                return -1;
            }
           
            return cunt;

        }
        public IEnumerable<Prosol_Vendor> GetVendorLst(string term)
        {
            var query =  Query.Matches("Name", BsonRegularExpression.Create(new Regex(term, RegexOptions.IgnoreCase)));
            var arrResult = _VendorRepository.FindAll(query);
            return arrResult;
        }

        //Abbrevate
        public virtual bool CreateAbbr(Prosol_Abbrevate abb)
        {

            var res = false;
            var query = Query.And(Query.EQ("Value", abb.Value), Query.EQ("Abbrevated", abb.Abbrevated));
            var um = _AbbrevateRepository.FindAll(query).ToList();
            if (um.Count == 0 || (um.Count == 1 && um[0]._id == abb._id))
            {
            
                res = _AbbrevateRepository.Add(abb);
              
            }
            return res;
        }
        public virtual IEnumerable<Prosol_Abbrevate> GetAbbrList()
        {

            var abbrList = _AbbrevateRepository.FindAll();
            return abbrList;
        }
        public virtual IEnumerable<Prosol_Abbrevate> GetAbbrList(string srchtxt)
        {
            var query = Query.Or(Query.Matches("Value", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Abbrevated", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Equivalent", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("LikelyWords", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Approved", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var AbbrList = _AbbrevateRepository.FindAll(query);
            return AbbrList;
        }
        public virtual bool DeleteAbbr(string id,string val)
        {
            var query = Query.And(Query.EQ("Abbrevated", id), Query.EQ("Value", val));
            var res = _AbbrevateRepository.Delete(query);
            return res;

        }
        public virtual bool unAbbrDel(string id)
        {
            string[] str = { id };
            var Qry=  Query.And(Query.In("Values",new BsonArray(str)));
            var checkValLst = _CharacteristicRepository.FindAll(Qry).ToList();
            if(checkValLst!=null && checkValLst.Count > 0)
            {
                foreach(Prosol_Charateristics chtic in checkValLst)
                {
                    List<string> list = new List<string>(chtic.Values);
                    list.Remove(id);
                    chtic.Values = list.ToArray();
                    _CharacteristicRepository.Add(chtic);
                }

            }
            var query = Query.And(Query.EQ("_id", new ObjectId(id)));
            var res = _AbbrevateRepository.Delete(query);
            return res;

        }
        public virtual int BulkAbbri(HttpPostedFileBase file,string User)
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

            var LstNM = new List<Prosol_Abbrevate>();
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[0].ToString() != "" && dr[1].ToString() != "")
                {
                    var Mdl = new Prosol_Abbrevate();
                    Mdl.Value = dr[0].ToString();
                    Mdl.Abbrevated = dr[1].ToString();
                    Mdl.vunit = dr[2].ToString();
                    Mdl.Equivalent = dr[3].ToString();
                    Mdl.eunit = dr[4].ToString();
                    Mdl.LikelyWords = dr[5].ToString();
                    Mdl.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                    Mdl.User = User;
                    Mdl.Approved = "Yes";
                    Mdl.ApprovedBy = User;
                    Mdl.ApprovedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);

                    LstNM.Add(Mdl);
                }
            }
            if (LstNM.Count > 0)
            {
                //IEnumerable<Prosol_NounModifiers> filteredList = LstNM.GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First())
                //    .GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First());

                List<Prosol_Abbrevate> filteredList = LstNM.GroupBy(p => new { p.Value, p.Abbrevated }).Select(g => g.First()).ToList();
                if (filteredList.Count > 0)
                {
                    var fRes = new List<Prosol_Abbrevate>();
                    foreach (Prosol_Abbrevate nm in filteredList.ToList())
                    {
                        var query = Query.EQ("Value", nm.Value);
                        var ObjStr = _AbbrevateRepository.FindOne(query);
                        if (ObjStr == null)
                        {
                            // fRes.Add(nm);
                            _AbbrevateRepository.Add(nm);
                            cunt++;
                        }
                        else
                        {
                           
                             var Updte = Update.Set("Abbrevated", nm.Abbrevated);                           
                             var flg = UpdateFlags.Upsert;
                            _AbbrevateRepository.Update(query, Updte, flg);
                            cunt++;
                        }
                    }
                    

                }
            }
            return cunt;

        }

        public virtual List<Prosol_Abbrevate> DownloadValuemaster(string FrmDte, string ToDte)
        {
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            if (FrmDte != "" && ToDte != "")
            {
                var dte = DateTime.SpecifyKind(Convert.ToDateTime(FrmDte), DateTimeKind.Utc);
                var dte1 = DateTime.SpecifyKind(Convert.ToDateTime(ToDte), DateTimeKind.Utc);

                string[] strArr = { "Value", "Abbrevated", "vunit", "Equivalent", "eunit", "LikelyWords", "User", "UpdatedOn", "Approved" };
                var fields = Fields.Include(strArr).Exclude("_id");
                var qry = Query.And(Query.GTE("UpdatedOn", BsonDateTime.Create(dte)), Query.LT("UpdatedOn", BsonDateTime.Create(dte1.AddDays(1))));
                var lstCha = _AbbrevateRepository.FindAll(fields, qry).ToList();
                return lstCha;
            }
            else
            {


                string[] strArr = { "Value", "Abbrevated", "vunit", "Equivalent", "eunit", "LikelyWords", "User", "UpdatedOn", "Approved" };
                var fields = Fields.Include(strArr).Exclude("_id");
                var lstCha = _AbbrevateRepository.FindAll(fields).ToList();
                return lstCha;
            }

        }
        public virtual IEnumerable<Prosol_Charateristics> getvaluelist()
        {

            var abbrList = _CharacteristicRepository.FindAll();
            return abbrList;
        }
        //Vendortype
        public virtual bool CreateVendortype(Prosol_Vendortype vendor)
        {
            var res = false;
            var query = Query.EQ("Type", vendor.Type);
            var um = _VendortypeRepository.FindAll(query).ToList();
            if (um.Count == 0 || (um.Count == 1 && um[0]._id == vendor._id))
            {
                res = _VendortypeRepository.Add(vendor);
            }
            return res;
        }
        public virtual IEnumerable<Prosol_Vendortype> GetVendortypeList()
        {
            var vendorList = _VendortypeRepository.FindAll();
            return vendorList;
        }
        public virtual bool DeleteVendortype(string id)
        {
            var query = Query.EQ("Type", id);
            var res = _VendortypeRepository.Delete(query);
            return res;

        }

        //Reftype
        public virtual bool CreateReftype(Prosol_Reftype refs)
        {
            var res = false;
            var query = Query.EQ("Type", refs.Type);
            var um = _ReftypeRepository.FindAll(query).ToList();
            if (um.Count == 0 || (um.Count == 1 && um[0]._id == refs._id))
            {
                res = _ReftypeRepository.Add(refs);
            }
            return res;
        }
        public virtual IEnumerable<Prosol_Reftype> GetReftypeList()
        {
            var refsList = _ReftypeRepository.FindAll();
            return refsList;
        }
        public virtual bool DeleteReftype(string id)
        {
            var query = Query.EQ("Type", id);
            var res = _ReftypeRepository.Delete(query);
            return res;

        }
        //Logics

        //public virtual IEnumerable<Prosol_Attributes> GetAttributesList()
        //{
        //    var sort = SortBy.Ascending("Order");
        //    var AttributesList = _AttributesRepository.FindAll(sort);
        //    return AttributesList;
        //}
        public virtual IEnumerable<Prosol_Charateristics> GetAttributesList()
        {
            var sort = SortBy.Ascending("Characteristic");
            var AttributesList = _CharacteristicRepository.FindAll(sort);
            return AttributesList;
        }
        public bool CreateLogics(Prosol_Logics logic)
        {
            var res = false;
            var query = Query.And(Query.EQ("Noun", logic.Noun), Query.EQ("Modifier", logic.Modifier));
            var um = _LogicsRepository.FindAll(query).ToList();

            if (um.Count == 0 || (um.Count == 1 && um[0]._id == logic._id))
            {
                _LogicsRepository.Add(logic);
            }
            return res;

        }
        public Prosol_Logics GetLogic(string Noun, string Modifier)
        {
            var query = Query.And(Query.EQ("Noun", Noun), Query.EQ("Modifier", Modifier));
            var lgic = _LogicsRepository.FindOne(query);
            return lgic;
        }
        //UNSPSC

        public virtual int BulkUNSPSC(HttpPostedFileBase file)
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

            var LstNM = new List<Prosol_UNSPSC>();
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[0].ToString() != "" && dr[1].ToString() != "" && dr[3].ToString() != "" && dr[4].ToString() != "" && dr[5].ToString() != "" && dr[6].ToString() != "" && dr[7].ToString() != "" && dr[11].ToString() != "")
                {
                    if (dr[9].ToString() != "")
                    {
                        //var query = Query.And(Query.EQ("Commodity", dr[9].ToString()), Query.EQ("Version", dr[11].ToString()));
                        //var lgic = _unspscRepository.FindAll(query).ToList();
                        //if (lgic.Count == 0)
                        //{

                            var Mdl = new Prosol_UNSPSC();
                            Mdl.Noun = dr[0].ToString();
                            Mdl.Modifier = dr[1].ToString();
                            Mdl.value = dr[2].ToString();
                            Mdl.Segment = dr[3].ToString();
                            Mdl.SegmentTitle = dr[4].ToString();
                            Mdl.Family = dr[5].ToString();
                            Mdl.FamilyTitle = dr[6].ToString();
                            Mdl.Class = dr[7].ToString();
                            Mdl.ClassTitle = dr[8].ToString();
                            Mdl.Commodity = dr[9].ToString();
                            Mdl.CommodityTitle = dr[10].ToString();
                            Mdl.Version = dr[11].ToString();
                            LstNM.Add(Mdl);
                       // }
                    }
                    else
                    {
                        //var query = Query.And(Query.EQ("Class", dr[7].ToString()), Query.EQ("Version", dr[11].ToString()), Query.EQ("Commodity", ""));
                        //var lgic = _unspscRepository.FindAll(query).ToList();
                        //if (lgic.Count == 0)
                        //{


                            var Mdl = new Prosol_UNSPSC();
                            Mdl.Noun = dr[0].ToString();
                            Mdl.Modifier = dr[1].ToString();
                            Mdl.value = dr[2].ToString();
                            Mdl.Segment = dr[3].ToString();
                            Mdl.SegmentTitle = dr[4].ToString();
                            Mdl.Family = dr[5].ToString();
                            Mdl.FamilyTitle = dr[6].ToString();
                            Mdl.Class = dr[7].ToString();
                            Mdl.ClassTitle = dr[8].ToString();
                            Mdl.Commodity = dr[9].ToString();
                            Mdl.CommodityTitle = dr[10].ToString();
                            Mdl.Version = dr[11].ToString();
                            LstNM.Add(Mdl);
                        //}
                    }
                }
            }
            if (LstNM.Count > 0)
            {
                cunt = _unspscRepository.Add(LstNM);

            }
            return cunt;

        }

        public IEnumerable<Prosol_UNSPSC> GetUnspsc(string Noun, string Modifier)
        {
            var unspscVersion = _CodeLogicRepository.FindOne();
            var query = Query.And(Query.EQ("Noun", Noun), Query.EQ("Modifier", Modifier),Query.EQ("Version", unspscVersion.unspsc_Version));
            var LstUnspsc = _unspscRepository.FindAll(query).ToList();
            return LstUnspsc;
        }
        public IEnumerable<Prosol_UNSPSC> GetUnspsc()
        {
            var unspscVersion = _CodeLogicRepository.FindOne();
            //  var query = Query.And(Query.EQ("Noun", Noun), Query.EQ("Modifier", Modifier), Query.EQ("Version", unspscVersion.unspsc_Version));
            var query = Query.EQ("Version", unspscVersion.unspsc_Version);
            var LstUnspsc = _unspscRepository.FindAll(query).ToList();
            return LstUnspsc;
        }
        public virtual bool Delunspsc(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var res = _unspscRepository.Delete(query);
            return res;

        }

        public IEnumerable<Prosol_UNSPSC> GetUnspscc()
        {
            var LstUnspsc = _unspscRepository.FindAll();
            return LstUnspsc;
        }

        public virtual IEnumerable<Prosol_UNSPSC> GetUNSPSCListSearch(string srchtxt)
        {
            var query = Query.Or(Query.Matches("Noun", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Modifier", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Segment", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("SegmentTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Family", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("FamilyTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Class", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("ClassTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Commodity", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("CommodityTitle", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))), Query.Matches("Version", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var unspscList = _unspscRepository.FindAll(query);
            return unspscList;
        }


        public string[] loadversion()
        {
            return _unspscRepository.AutoSearch1("Version");
            //  retu
        }

        public Prosol_Vendor getVendorAbbrForShortDesc(string mfr)
        {
            var queryyy = Query.EQ("Name", mfr);
            var res = _VendorRepository.FindOne(queryyy);
            return res;
        }
        //public Prosol_Abbrevate GetAbbr(string value, string abb)
        //{
        //    var query = Query.And(Query.EQ("Value", value), Query.EQ("Abbrevated", abb));
        //    var um = _AbbrevateRepository.FindOne(query);
        //    return um;
        //}
        //NEW CODE FOR VENDOR MASTER
        public Prosol_Vendor FINDVENDORMASTER(string mfr)
        {
            var queryyy = Query.EQ("Name", mfr);
            var res = _VendorRepository.FindOne(queryyy);
            return res;
        }



      
        public virtual int BulkData(HttpPostedFileBase file)
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
            //foreach (DataRow drw in dt.Rows)
            //{
            //    if (drw[0].ToString() != "")
            //    {
            //        var query =Query.EQ("Attribute", drw[0].ToString());
            //        var sobj = _AttributesRepository.FindOne(query);
            //        if (sobj != null)
            //        {
            //            var Qry = Query.EQ("Unitname", drw[1].ToString());
            //            var rObj = _UOMRepository.FindOne(Qry);
            //            if (sobj.UOMList != null && sobj.UOMList.Length > 0 && rObj!=null)
            //            {
            //                if (!sobj.UOMList.Contains(rObj._id.ToString()))
            //                {
            //                    var lstt = sobj.UOMList.ToList();
            //                    lstt.Add(rObj._id.ToString());
            //                    sobj.UOMList = lstt.ToArray();
            //                    _AttributesRepository.Add(sobj);
            //                    cunt++;
            //                }
            //            }
            //            else
            //            {
            //                if (rObj != null)
            //                {
            //                    var sa = new string[] { rObj._id.ToString() };
            //                    sobj.UOMList = sa;
            //                    _AttributesRepository.Add(sobj);
            //                    cunt++;
            //                }
            //            }
            //        }
                   
            //    }
            //}

            foreach (DataRow drw in dt.Rows)
            {
                if (drw[0].ToString() != "")
                {
                    var query = Query.EQ("Itemcode", drw[0].ToString());
                    var Updte = Update.Set("Materialcode", drw[1].ToString());
                    var flg = UpdateFlags.Upsert;
                    var theResult = _datamasterRepository.Update(query, Updte, flg);
                    //var query1 = Query.EQ("Materialcode", drw[1].ToString());
                    //var Updte1 = Update.Set("Duplicates", drw[1].ToString());
                    //var theResult1 = _datamasterRepository.Update(query1, Updte1, flg);
                    cunt++;

                }
            }

            //var query = Query.And(Query.NE("Noun", BsonNull.Value), Query.NE("Noun", ""), Query.NE("Modifier", BsonNull.Value), Query.NE("Modifier", ""), Query.NE("Shortdesc", BsonNull.Value), Query.NE("Shortdesc", ""));

            //var resList = _datamasterRepository.FindAll(query).ToList();
            //foreach (Prosol_Datamaster dms in resList)
            //{
            //    dms.Duplicates = null;
            //    dms.Materialcode = dms.Itemcode;
            //    dms.Shortdesc = null;
            //    dms.Longdesc = null;
            //    _datamasterRepository.Add(dms);
            //    cunt++;
            //}



            return cunt;

        }
        public List<Prosol_Datamaster> checkDuplicate(Prosol_Datamaster cat)
        {
           // cat.Shortdesc = ShortDesc(cat);
            // cat.Longdesc = LongDesc(cat);
            // cat.Partnodup = cat.Partno != null ? Regex.Replace(cat.Partno, @"[^\w\d]", "") : "";
            int flg = 0;
            var dupList = new List<Prosol_Datamaster>();
            if (cat.Vendorsuppliers != null)
            {
                foreach (Vendorsuppliers vsup in cat.Vendorsuppliers)
                {
                    if (vsup.Refflag != null && vsup.Refflag != ""  && vsup.Refflag != "DRAWING NUMBER" && vsup.Refflag != "POSITION NUMBER")
                    {

                        if (vsup.RefNo != null && vsup.RefNo != "" && vsup.Refflag != null && vsup.RefNoDup != null && vsup.Refflag != "")
                        {
                            flg = 1;
                            //  var query = Query.And(Query.EQ("Vendorsuppliers.Refflag", vsup.Refflag), Query.EQ("Vendorsuppliers.RefNo", vsup.RefNo));
                            // var query = Query.And(Query.ElemMatch("Vendorsuppliers", Query.And(Query.EQ("Refflag", vsup.Refflag), Query.EQ("RefNo", vsup.RefNo))));
                                                 

                           // var query = Query.Matches("Vendorsuppliers.RefNo", BsonRegularExpression.Create(new Regex(stringFormat("^{0}", temp), RegexOptions.IgnoreCase)));
                            var query = Query.EQ("Vendorsuppliers.RefNoDup", vsup.RefNoDup);
                            var vn = _datamasterRepository.FindAll(query).ToList();
                            if (vn != null && vn.Count > 1)
                            {
                                foreach (Prosol_Datamaster dm in vn)
                                {
                                    if (-1 == dupList.FindIndex(f => f.Itemcode.Equals(dm.Itemcode)))
                                    {
                                        dupList.Add(dm);
                                        dm.Referenceno = "PN DUP";
                                        dm.Duplicates = cat.Itemcode;
                                        _datamasterRepository.Add(dm);

                                    }


                                }

                            }
                        }
                    }
                }
            }
            if (flg == 0 && cat.Shortdesc != null && cat.Noun != null)
            { 
                var QryLst = new List<IMongoQuery>();
                // QryLst.Add(Query.And(Query.EQ("Shortdesc", cat.Shortdesc), Query.EQ("Noun", cat.Noun)));
                if (cat.Vendorsuppliers != null)
                {
                    foreach (Vendorsuppliers vsup in cat.Vendorsuppliers)
                    {
                        //  string temp = Regex.Replace(vsup.RefNo, @"[^\w\d]", "");

                        if (vsup.RefNo != null && vsup.RefNoDup != null && vsup.RefNo != "" && vsup.Refflag == "POSITION NUMBER")
                        {
                            if (cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "")
                            {
                            var Qry2 = Query.And(Query.EQ("Vendorsuppliers.Refflag", "POSITION NUMBER"), Query.EQ("Vendorsuppliers.RefNoDup", vsup.RefNoDup), Query.EQ("Equipment.Modelno", cat.Equipment.Modelno));
                            //  var Qry2 = Query.EQ("Vendorsuppliers.RefNo", vsup.RefNo);
                            QryLst.Add(Qry2);
                        }

                        }

                    }
                }
                if (QryLst.Count > 0)
                {
                    var ary = Query.And(QryLst);
                    var Lst = _datamasterRepository.FindAll(ary).ToList();
                    if (Lst != null && Lst.Count > 1)
                    {
                        foreach (Prosol_Datamaster dm in Lst)
                        {
                            //int indc = 0;

                            //if (dm.Equipment == null  || cat.Equipment == null)
                            //{
                            //    indc = 1;
                            //}
                            //if (dm.Equipment != null && dm.Equipment.Modelno != null && dm.Equipment.Modelno != "" && cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "" && dm.Equipment.Modelno != cat.Equipment.Modelno)
                            //{
                            //    indc = 1;
                            //}
                            //else if (cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "" && (dm.Equipment == null || dm.Equipment.Modelno == null || dm.Equipment.Modelno == ""))
                            //{
                            //    indc = 1;
                            //}
                            //else if (dm.Equipment != null && dm.Equipment.Modelno != null && dm.Equipment.Modelno != "" && (cat.Equipment == null || cat.Equipment.Modelno == null || cat.Equipment.Modelno == ""))
                            //{
                            //    indc = 1;
                            //}
                            //if (indc == 0)
                            //{
                                if (-1 == dupList.FindIndex(f => f.Itemcode.Equals(dm.Itemcode)))
                                {
                                    dupList.Add(dm);
                                    dm.Referenceno = "PS DUP";
                                    dm.Duplicates = cat.Itemcode;
                                    _datamasterRepository.Add(dm);
                                }
                           // }

                        }
                    }
                }
              
                var query=Query.And(Query.EQ("Shortdesc", cat.Shortdesc), Query.EQ("Noun", cat.Noun));
                var vn = _datamasterRepository.FindAll(query).ToList();
                if (vn != null && vn.Count > 1)
                {
                    int cunn = 0;
                    foreach (Prosol_Datamaster dm in vn)
                    {
                        if (dm.Characteristics != null && cat.Characteristics != null)
                        {
                            int ind = 0;

                            //character checking
                            foreach (Prosol_AttributeList mdol in dm.Characteristics)
                            {
                                foreach (Prosol_AttributeList mdl in cat.Characteristics)
                                {
                                    if (mdl.Characteristic == mdol.Characteristic && mdl.Value != null && mdl.Value != "" && mdol.Value != null && mdol.Value != "")
                                    {
                                        if (mdl.Value != mdol.Value)
                                        {
                                            ind = 1;
                                        }

                                    }

                                }
                            }

                            //vendor checking
                            if (cat.Vendorsuppliers != null)
                            {
                                foreach (Vendorsuppliers vsup in dm.Vendorsuppliers)
                                {
                                    foreach (Vendorsuppliers mdl in cat.Vendorsuppliers)
                                    {
                                        if (vsup.RefNoDup != null && vsup.RefNoDup != "" && mdl.RefNoDup != null && mdl.RefNoDup!=vsup.RefNoDup)
                                        {
                                           
                                                ind = 1;
                                           

                                        }
                                        if (vsup.RefNoDup == null  && (mdl.RefNoDup != null || mdl.RefNoDup != ""))
                                        {

                                            ind = 1;


                                        }
                                        if (vsup.RefNoDup != null && (mdl.RefNoDup == null || mdl.RefNoDup == ""))
                                        {

                                            ind = 1;


                                        }

                                    }
                                }                
                            }

                            //equipment checking

                            if (dm.Equipment != null && dm.Equipment.Modelno != null && dm.Equipment.Modelno != "" && cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "" && dm.Equipment.Modelno != cat.Equipment.Modelno)
                            {
                                ind = 1;
                            }
                            else if (cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "" && (dm.Equipment == null || dm.Equipment.Modelno == null || dm.Equipment.Modelno == ""))
                            {
                                ind = 1;
                            }
                            else if (dm.Equipment != null && dm.Equipment.Modelno != null && dm.Equipment.Modelno != "" && (cat.Equipment == null || cat.Equipment.Modelno == null || cat.Equipment.Modelno == ""))
                            {
                                ind = 1;
                            }
                            if (ind == 0)
                            {
                                cunn = cunn + 1;

                            }
                        }
                    }
                    if (cunn > 1)
                    {
                        foreach (Prosol_Datamaster dm in vn)
                        {
                            if (dm.Characteristics != null && cat.Characteristics != null)
                            {
                                int ind = 0;

                                //character checking
                                foreach (Prosol_AttributeList mdol in dm.Characteristics)
                                {
                                    foreach (Prosol_AttributeList mdl in cat.Characteristics)
                                    {
                                        if (mdl.Characteristic == mdol.Characteristic && mdl.Value != null && mdl.Value != "" && mdol.Value != null && mdol.Value != "")
                                        {
                                            if (mdl.Value != mdol.Value)
                                            {
                                                ind = 1;
                                            }

                                        }

                                    }
                                }

                                //vendor checking
                                if (cat.Vendorsuppliers != null)
                                {
                                    foreach (Vendorsuppliers vsup in dm.Vendorsuppliers)
                                    {
                                        foreach (Vendorsuppliers mdl in cat.Vendorsuppliers)
                                        {
                                            if (vsup.RefNoDup != null && vsup.RefNoDup != "" && mdl.RefNoDup != null && mdl.RefNoDup != vsup.RefNoDup)
                                            {

                                                ind = 1;


                                            }
                                            if (vsup.RefNoDup == null && (mdl.RefNoDup != null || mdl.RefNoDup != ""))
                                            {

                                                ind = 1;


                                            }
                                            if (vsup.RefNoDup != null && (mdl.RefNoDup == null || mdl.RefNoDup == ""))
                                            {

                                                ind = 1;


                                            }

                                        }
                                    }
                                }

                                //equipment checking

                                if (dm.Equipment != null && dm.Equipment.Modelno != null && dm.Equipment.Modelno != "" && cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "" && dm.Equipment.Modelno != cat.Equipment.Modelno)
                                {
                                    ind = 1;
                                }
                                else if (cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "" && (dm.Equipment == null || dm.Equipment.Modelno == null || dm.Equipment.Modelno == ""))
                                {
                                    ind = 1;
                                }
                                else if (dm.Equipment != null && dm.Equipment.Modelno != null && dm.Equipment.Modelno != "" && (cat.Equipment == null || cat.Equipment.Modelno == null || cat.Equipment.Modelno == ""))
                                {
                                    ind = 1;
                                }
                                if (ind == 0)
                                {
                                    if (-1 == dupList.FindIndex(f => f.Itemcode.Equals(dm.Itemcode)))
                                    {
                                        dupList.Add(dm);
                                        dm.Referenceno = "CH DUP";
                                        dm.Duplicates = cat.Itemcode;
                                        _datamasterRepository.Add(dm);
                                    }

                                }
                            }
                        }
                    }

                }              

            }
            if (dupList != null && dupList.Count > 0)
            {
                return dupList;
            }
            else return null;

            //var query = Query.And(Query.EQ("Shortdesc", cat.Shortdesc), Query.NE("Shortdesc", ""), Query.NE("Itemcode", cat.Itemcode));
            //var vn = _DatamasterRepository.FindAll(query).ToList();
            //if (vn != null)
            //{
            //    if (vn.Count > 0)
            //    {
            //        return vn;
            //    }
            //    else return null;
            //}
            //else return null;
        }
        public virtual int BulkAttribute(HttpPostedFileBase file)
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

            DataTable resTbl = dt.AsEnumerable().GroupBy(x => x.Field<string>("MATERIAL")).Select(x => x.First()).CopyToDataTable();

            //  var LstNM = new List<Prosol_Datamaster>();
            foreach (DataRow dr in resTbl.Rows)
            {
                if (dr[0].ToString() != "")
                {
                    // Horizontal

                    //var ListattMdl = new List<Prosol_AttributeList>();
                    //for (int i=1; i <= dr.ItemArray.Length - 5;)
                    //{
                    //    if (dr[i] != null)
                    //    {
                    //        var attMdl = new Prosol_AttributeList();
                    //        attMdl.Characteristic = dr[i++].ToString();
                    //        attMdl.Value = dr[i++].ToString(); 
                    //        attMdl.UOM = dr[i++].ToString();
                    //        attMdl.ShortSquence =Convert.ToInt16(dr[i++]);
                    //        attMdl.Squence = Convert.ToInt16(dr[i++]);
                    //        ListattMdl.Add(attMdl);
                    //    }
                    //    else break;
                    //}                

                    //Vertical


                    //var attrList = new List<Prosol_AttributeList>();
                    //attrList = (from DataRow drw in dt.Rows
                    //            where drw["MATERIAL"].ToString() == dr[0].ToString()
                    //            select new Prosol_AttributeList()
                    //            {
                    //                Characteristic = drw["Attributes"].ToString(),
                    //                Value = drw["Values"].ToString(),
                    //                UOM = drw["UOM"].ToString(),
                    //                   Squence = Convert.ToInt16(drw["SQUENCE"]),
                    //                   ShortSquence = Convert.ToInt16(drw["Weitage"])
                    //            }).ToList();



                    var attrList = new List<Vendorsuppliers>();
                    attrList = (from DataRow drw in dt.Rows
                                where drw["MATERIAL"].ToString() == dr[0].ToString()
                                select new Vendorsuppliers()
                                {
                                    Type = drw["Vendor Type"].ToString(),
                                    Name = drw["Name"].ToString(),
                                    Refflag = drw["Ref Flag"].ToString(),
                                    RefNo = drw["Ref No"].ToString(),
                                    s = Convert.ToInt16(drw["S"]),
                                    l = Convert.ToInt16(drw["L"])
                                }).ToList();

                    var query = Query.EQ("Materialcode", dr[0].ToString());
                    var mdl = _datamasterRepository.FindOne(query);
                    if (mdl != null)
                    {
                      
                        mdl.Vendorsuppliers = attrList;
                        //foreach(Vendorsuppliers ml in attrList)
                        //{
                        //    mdl.Vendorsuppliers.Add(ml);
                        //}
                        _datamasterRepository.Add(mdl);
                        cunt++;
                    }

                }
            }

            return cunt;

        }
        public virtual int BulkHSN(HttpPostedFileBase file)
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

            var LstNM = new List<Prosol_HSNModel>();
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[0].ToString() != "" && dr[1].ToString() != "")
                {
                    var Mdl = new Prosol_HSNModel();
                    Mdl.Noun = dr[0].ToString();
                    Mdl.Modifier = dr[1].ToString();
                    Mdl.HSNID = dr[2].ToString();
                    Mdl.Desc = dr[3].ToString();
                    Mdl.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                    LstNM.Add(Mdl);
                }
            }
            if (LstNM.Count > 0)
            {
                //IEnumerable<Prosol_NounModifiers> filteredList = LstNM.GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First())
                //    .GroupBy(Prosol_NounModifiers => Prosol_NounModifiers.Modifier).Select(group => group.First());

                List<Prosol_HSNModel> filteredList = LstNM.GroupBy(p => new { p.Noun, p.Modifier }).Select(g => g.First()).ToList();
                if (filteredList.Count > 0)
                {
                    var fRes = new List<Prosol_HSNModel>();
                    foreach (Prosol_HSNModel nm in filteredList.ToList())
                    {
                        var query = Query.And(Query.EQ("Noun", nm.Noun), Query.EQ("Modifier", nm.Modifier));
                        var ObjStr = _HSNMODELRepository.FindOne(query);
                        if (ObjStr == null)
                        {
                            fRes.Add(nm);

                        }
                    }
                    cunt = _HSNMODELRepository.Add(fRes);

                }
            }
            return cunt;

        }
        public virtual bool CreateHSN(Prosol_HSNModel hsn)
        {
            hsn.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            var res = false;
            var query = Query.And(Query.EQ("Noun", hsn.Noun), Query.EQ("Modifier", hsn.Modifier));
            var hn = _HSNMODELRepository.FindAll(query).ToList();
            if (hn.Count == 0 || (hn.Count == 1 && hn[0]._id == hsn._id))
            {
                res = _HSNMODELRepository.Add(hsn);
            }
            return res;

        }
        public virtual bool CreateHSN1(string Noun, string Modifier, string HSNID, string Desc)
        {

            var res = false;
            var query = Query.And(Query.EQ("Noun", Noun), Query.EQ("Modifier", Modifier));
            var hn = _HSNMODELRepository.FindAll(query).ToList();
            if (hn.Count == 0)
            {
                var Mdl = new Prosol_HSNModel();
                Mdl.Noun = Noun;
                Mdl.Modifier = Modifier;
                Mdl.HSNID = HSNID;
                Mdl.Desc = Desc;
                Mdl.UpdatedOn = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                res = _HSNMODELRepository.Add(Mdl);
            }
            return res;

        }
        public virtual IEnumerable<Prosol_HSNModel> GetHSNList(string srchtxt)
        {
            var query = Query.Or(Query.Matches("HSNID", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))),
                Query.Matches("Noun", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))),
                Query.Matches("Modifier", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))),
                Query.Matches("Desc", BsonRegularExpression.Create(new Regex(srchtxt, RegexOptions.IgnoreCase))));
            var HSNList = _HSNMODELRepository.FindAll(query);
            return HSNList;
        }
        public virtual IEnumerable<Prosol_HSNModel> GetHSNList()
        {
            var HSNList = _HSNMODELRepository.FindAll();
            return HSNList;
        }
        public virtual bool DeleteHSN(string HSNID)
        {
            var query = Query.EQ("HSNID", HSNID);
            var res = _HSNMODELRepository.Delete(query);
            return res;

        }
        public Prosol_HSNModel GetHsn(string Noun, string Modifier)
        {
            var query = Query.And(Query.EQ("Noun", BsonRegularExpression.Create(new Regex(Noun, RegexOptions.IgnoreCase))), Query.EQ("Modifier", BsonRegularExpression.Create(new Regex(Modifier, RegexOptions.IgnoreCase))));
            var HSN = _HSNMODELRepository.FindOne(query);
            return HSN;
        }

        private string ShortDesc(Prosol_Datamaster cat,List<Prosol_Sequence> seqList,Prosol_UOMSettings UOMSet,IEnumerable<Prosol_Abbrevate> AbbrList)
        {

            string mfrref = "";

            var FormattedQuery = Query.And(Query.EQ("Noun", cat.Noun), Query.EQ("Modifier", cat.Modifier));
            var NMList = _nounModifierRepository.FindAll(FormattedQuery).ToList();
            var chList = _CharacteristicRepository.FindAll(FormattedQuery).ToList();
            //foreach(Prosol_Charateristics dml in chList)
            //{
            //    foreach (Prosol_AttributeList mdl in cat.Characteristics)
            //    {
            //        if(dml.Characteristic==mdl.Characteristic)
            //        {
            //            mdl.ShortSquence = dml.ShortSquence;
            //            mdl.ShortSquence = dml.ShortSquence;
            //        }

            //    }

            //}
            string ShortStr = "", strNM = "";
         
            //Short_Generic
            List<shortFrame> lst = new List<shortFrame>();
            foreach (Prosol_Sequence sq in seqList)
            {
                if (sq.Required == "Yes")
                {
                    switch (sq.CatId)
                    {
                        case 101:

                            if (NMList[0].Formatted == 1)
                            {
                                //var abbObj = (from Abb in AbbrList where Abb.Value.Equals(cat.Noun, StringComparison.OrdinalIgnoreCase) select Abb).FirstOrDefault();
                                //if (abbObj != null && (abbObj.Abbrevated != null && abbObj.Abbrevated != ""))
                                //    ShortStr += abbObj.Abbrevated + sq.Separator;
                                //else ShortStr += cat.Noun + sq.Separator;


                                if (NMList[0].Nounabv != null && NMList[0].Nounabv != "")
                                    ShortStr += NMList[0].Nounabv + sq.Separator;
                                else ShortStr += cat.Noun + sq.Separator;
                            }
                            else
                            {
                                if (cat.Characteristics != null)
                                {
                                    var sObj = cat.Characteristics.OrderBy(x => x.Squence).FirstOrDefault();
                                    var abbObj = (from Abb in AbbrList where Abb.Value.Equals(sObj.Value, StringComparison.OrdinalIgnoreCase) select Abb).FirstOrDefault();
                                    if (abbObj != null && (abbObj.Abbrevated != null && abbObj.Abbrevated != ""))
                                        ShortStr += abbObj.Abbrevated + sq.Separator;
                                    else ShortStr += sObj.Value + sq.Separator;
                                }
                            }
                            strNM = ShortStr;
                            //var nounabbr = (from Abb in AbbrList where Abb.Value.Equals(cat.Noun, StringComparison.OrdinalIgnoreCase) select Abb).FirstOrDefault();
                            //if (nounabbr != null && (nounabbr.Abbrevated != null && nounabbr.Abbrevated != ""))
                            //{
                            //    ShortStr += nounabbr.Abbrevated + sq.Separator;
                            //}
                            //else ShortStr += cat.Noun + sq.Separator;

                            break;
                        case 102:
                            if (cat.Modifier != "NO DEFINER" && cat.Modifier != "NO MODIFIER")
                            {
                                if (NMList[0].Formatted == 1)
                                {

                                    if (NMList[0].Modifierabv != null && NMList[0].Modifierabv != "")
                                        ShortStr += NMList[0].Modifierabv + sq.Separator;
                                    else ShortStr += cat.Modifier + sq.Separator;



                                    strNM = ShortStr;
                                }
                            }
                            break;
                        case 103:
                            int flg = 0;


                            //  int[] arrPos= new int[cat.Characteristics.Count];
                            //  string[] arrVal = new string[cat.Characteristics.Count];
                            int i = 0;
                            if (cat.Characteristics != null)
                            {
                                foreach (Prosol_AttributeList chM in cat.Characteristics.OrderBy(x => x.ShortSquence))
                                {
                                    if (NMList[0].Formatted == 1 || flg == 1)
                                    {

                                        if (chM.Value != null && chM.Value != "")
                                        {
                                            string strValue = "";
                                            var frmMdl = new shortFrame();
                                            frmMdl.position = chM.Squence;


                                            if (chM.Value.Contains(','))
                                            {
                                                string tmpstr = "";
                                                var abbObj = (from Abb in AbbrList where Abb.Value.Equals(chM.Value, StringComparison.OrdinalIgnoreCase) select Abb).FirstOrDefault();
                                                if (abbObj != null && (abbObj.Abbrevated != null && abbObj.Abbrevated != ""))
                                                {
                                                    tmpstr += abbObj.Abbrevated.TrimStart().TrimEnd() + ',';
                                                }
                                                else
                                                {
                                                    string[] strsplt = chM.Value.Split(',');
                                                    foreach (string str in strsplt)
                                                    {
                                                        abbObj = (from Abb in AbbrList where Abb.Value.Equals(str, StringComparison.OrdinalIgnoreCase) select Abb).FirstOrDefault();
                                                        if (abbObj != null && (abbObj.Abbrevated != null && abbObj.Abbrevated != ""))
                                                            tmpstr += abbObj.Abbrevated.TrimStart().TrimEnd() + ',';
                                                        else tmpstr += str.TrimStart().TrimEnd() + ',';
                                                    }
                                                }
                                                tmpstr = tmpstr.TrimEnd(',');
                                                if (UOMSet.Short_space == "with space")
                                                {
                                                    if (chM.UOM != null && chM.UOM != "")
                                                        strValue += tmpstr + " " + chM.UOM + sq.Separator;
                                                    else strValue += tmpstr + sq.Separator;
                                                }
                                                else
                                                {
                                                    if (chM.UOM != null && chM.UOM != "")
                                                        strValue += tmpstr + chM.UOM + sq.Separator;
                                                    else strValue += tmpstr + sq.Separator;
                                                }
                                                frmMdl.values = strValue;
                                            }
                                            else
                                            {
                                                var abbObj = (from Abb in AbbrList where Abb.Value.Equals(chM.Value, StringComparison.OrdinalIgnoreCase) select Abb).FirstOrDefault();
                                                if (abbObj != null && (abbObj.Abbrevated != null && abbObj.Abbrevated != ""))
                                                {
                                                    // Abbreivated
                                                    if (UOMSet.Short_space == "with space")
                                                    {
                                                        if (chM.UOM != null && chM.UOM != "")
                                                            strValue += abbObj.Abbrevated.TrimStart().TrimEnd() + " " + chM.UOM + sq.Separator;
                                                        else strValue += abbObj.Abbrevated.TrimStart().TrimEnd() + sq.Separator;
                                                    }
                                                    else
                                                    {
                                                        if (chM.UOM != null && chM.UOM != "")
                                                            strValue += abbObj.Abbrevated.TrimStart().TrimEnd() + chM.UOM + sq.Separator;
                                                        else strValue += abbObj.Abbrevated.TrimStart().TrimEnd() + sq.Separator;
                                                    }
                                                    frmMdl.values = strValue;
                                                }
                                                else
                                                {
                                                    // Abbreivated not exist

                                                    if (UOMSet.Short_space == "with space")
                                                    {
                                                        if (chM.UOM != null && chM.UOM != "")
                                                            strValue += chM.Value.TrimStart().TrimEnd() + " " + chM.UOM + sq.Separator;
                                                        else strValue += chM.Value.TrimStart().TrimEnd() + sq.Separator;
                                                    }
                                                    else
                                                    {
                                                        if (chM.UOM != null && chM.UOM != "")
                                                            strValue += chM.Value.TrimStart().TrimEnd() + chM.UOM + sq.Separator;
                                                        else strValue += chM.Value.TrimStart().TrimEnd() + sq.Separator;
                                                    }
                                                    frmMdl.values = strValue;
                                                }
                                            }

                                            lst.Add(frmMdl);

                                            ShortStr = strNM;
                                            string pattern = " X ";
                                            foreach (shortFrame sMdl in lst)
                                            {
                                                foreach (Match match in Regex.Matches(sMdl.values, pattern))
                                                {
                                                    sMdl.values = Regex.Replace(sMdl.values, pattern, match.Value.TrimEnd().TrimStart());
                                                }
                                                // ShortStr += sMdl.values;
                                                string pattern1 = " x ";
                                                foreach (Match match in Regex.Matches(sMdl.values, pattern1))
                                                {
                                                    sMdl.values = Regex.Replace(sMdl.values, pattern1, match.Value.TrimEnd().TrimStart());
                                                }
                                                ShortStr += sMdl.values;
                                            }

                                            if (!checkLength(ShortStr, seqList[0].ShortLength))
                                            {
                                                ShortStr = ShortStr.Trim();
                                                char[] chr = sq.Separator.ToCharArray();
                                                ShortStr = ShortStr.TrimEnd(chr[0]);
                                                while (ShortStr.Length > seqList[0].ShortLength)
                                                {
                                                    int lstIndx = ShortStr.LastIndexOf(chr[0]);
                                                    if (lstIndx > -1)
                                                    {
                                                        if (lst.Count > 0)
                                                        {

                                                            if (ShortStr.Substring(lstIndx).Length > 1)
                                                            {
                                                                if (ShortStr.Substring(lstIndx).TrimStart(chr[0]) == lst[lst.Count - 1].values.TrimEnd(chr[0]))
                                                                {
                                                                    lst.RemoveAt(lst.Count - 1);
                                                                }
                                                                else
                                                                {
                                                                    int indx = lst[lst.Count - 1].values.TrimEnd(chr[0]).LastIndexOf(chr[0]);
                                                                    lst[lst.Count - 1].values = lst[lst.Count - 1].values.Remove(indx) + chr[0];
                                                                }
                                                            }
                                                        }
                                                        ShortStr = ShortStr.Remove(lstIndx);

                                                    }
                                                    else
                                                    {
                                                        lstIndx = ShortStr.LastIndexOf(' ');
                                                        ShortStr = ShortStr.Remove(lstIndx);
                                                        if (lst.Count > 0)
                                                        {
                                                            int indx = lst[lst.Count - 1].values.LastIndexOf(' ');
                                                            lst[lst.Count - 1].values = lst[lst.Count - 1].values.Remove(indx);
                                                        }
                                                    }

                                                }
                                                ShortStr = ShortStr + chr[0];
                                            }
                                            i++;
                                        }
                                    }
                                    else flg = 1;
                                }
                                ShortStr = strNM;
                                foreach (shortFrame sMdl in lst.OrderBy(x => x.position))
                                {
                                    ShortStr += sMdl.values;
                                }
                            }

                            break;

                        case 104:
                            if (cat.Vendorsuppliers != null)
                            {
                                foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                                {
                                    if (vs.s == 1)
                                    {
                                        if (vs.Name != null && vs.Name != "")
                                        {
                                            var querry = Query.EQ("Name", vs.Name);
                                            var shtmfr = _VendorRepository.FindOne(querry);
                                            if (shtmfr != null)
                                            {
                                                if (shtmfr.ShortDescName != null && shtmfr.ShortDescName != "")
                                                {
                                                    vs.shortmfr = shtmfr.ShortDescName;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            vs.shortmfr = vs.Name;
                                        }

                                        if (vs.shortmfr != null && vs.shortmfr != "" && vs.shortmfr != "undefined")
                                        {
                                            mfrref = vs.Name;
                                            var frmMdl = new shortFrame();
                                            frmMdl.position = 101;
                                            frmMdl.values = vs.shortmfr + sq.Separator;
                                            lst.Add(frmMdl);
                                            ShortStr += vs.shortmfr + sq.Separator;
                                            if (!checkLength(ShortStr, seqList[0].ShortLength))
                                            {
                                                ShortStr = ShortStr.Trim();
                                                char[] chr = sq.Separator.ToCharArray();
                                                ShortStr = ShortStr.TrimEnd(chr[0]);
                                                while (ShortStr.Length > seqList[0].ShortLength)
                                                {
                                                    int lstIndx = ShortStr.LastIndexOf(chr[0]);
                                                    if (lstIndx > -1)
                                                    {
                                                        if (lst.Count > 0)
                                                        {
                                                            if (ShortStr.Substring(lstIndx).Length > 1)
                                                                lst.RemoveAt(lst.Count - 1);
                                                        }
                                                        ShortStr = ShortStr.Remove(lstIndx);

                                                    }
                                                    else
                                                    {
                                                        lstIndx = ShortStr.LastIndexOf(' ');
                                                        ShortStr = ShortStr.Remove(lstIndx);
                                                        if (lst.Count > 0)
                                                        {
                                                            int indx = lst[lst.Count - 1].values.LastIndexOf(' ');
                                                            lst[lst.Count - 1].values = lst[lst.Count - 1].values.Remove(indx);
                                                        }
                                                    }
                                                }
                                                ShortStr = ShortStr + chr[0];
                                            }
                                            break;
                                        }

                                    }
                                }
                            }
                            break;
                        case 105:
                            if (cat.Vendorsuppliers != null)
                            {

                                foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                                {
                                    if (vs.s == 1 && vs.RefNo != "" && vs.RefNo != null && vs.RefNo != "undefined")
                                    {
                                        var frmMdl = new shortFrame();
                                        frmMdl.position = 100;
                                        frmMdl.values = vs.RefNo.Trim() + sq.Separator;
                                        lst.Add(frmMdl);
                                        // ShortStr = strNM;

                                        ShortStr += vs.RefNo.Trim() + sq.Separator;
                                        if (!checkLength(ShortStr, seqList[0].ShortLength))
                                        {
                                            ShortStr = ShortStr.Trim();
                                            char[] chr = sq.Separator.ToCharArray();
                                            ShortStr = ShortStr.TrimEnd(chr[0]);
                                            while (ShortStr.Length > seqList[0].ShortLength)
                                            {
                                                int lstIndx = ShortStr.LastIndexOf(chr[0]);
                                                if (lstIndx > -1)
                                                {
                                                    if (lst.Count > 0)
                                                    {
                                                        if (ShortStr.Substring(lstIndx).Length > 1)
                                                            lst.RemoveAt(lst.Count - 1);
                                                    }
                                                    ShortStr = ShortStr.Remove(lstIndx);

                                                }
                                                else
                                                {
                                                    lstIndx = ShortStr.LastIndexOf(' ');
                                                    ShortStr = ShortStr.Remove(lstIndx);
                                                    if (lst.Count > 0)
                                                    {
                                                        int indx = lst[lst.Count - 1].values.LastIndexOf(' ');
                                                        lst[lst.Count - 1].values = lst[lst.Count - 1].values.Remove(indx);
                                                    }
                                                }

                                            }
                                            ShortStr = ShortStr + chr[0];
                                        }
                                        break;
                                    }

                                }
                            }
                            break;
                        case 106:
                            if (cat.Application != null && cat.Application != "")
                                ShortStr += cat.Application + sq.Separator;
                            break;
                        case 107:
                            //if (cat.Drawingno != null && cat.Drawingno != "")
                            //    ShortStr += cat.Drawingno + sq.Separator;


                            foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                            {
                                if (vs.Refflag.ToUpper() == "DRAWING & POSITION NUMBER" && vs.RefNo != "" && vs.RefNo != null && vs.RefNo != "undefined" && vs.Name == mfrref && vs.Name != "" && vs.Name != null)
                                {
                                    ShortStr += vs.RefNo.Trim() + sq.Separator;
                                    break;
                                }
                            }
                            break;
                        case 108:
                            if (cat.Equipment != null && cat.Equipment.Name != null && cat.Equipment.Name != "")
                                ShortStr += cat.Equipment.Name + sq.Separator;
                            break;
                        case 109:
                            if (cat.Equipment != null && cat.Equipment.Manufacturer != null && cat.Equipment.Manufacturer != "")
                                ShortStr += cat.Equipment.Manufacturer + sq.Separator;
                            break;
                        case 110:
                            if (cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "")
                                ShortStr += cat.Equipment.Modelno + sq.Separator;
                            break;
                        case 111:
                            if (cat.Equipment != null && cat.Equipment.Tagno != null && cat.Equipment.Tagno != "")
                                ShortStr += cat.Equipment.Tagno + sq.Separator;
                            break;
                        case 112:
                            if (cat.Equipment != null && cat.Equipment.Serialno != null && cat.Equipment.Serialno != "")
                                ShortStr += cat.Equipment.Serialno + sq.Separator;
                            break;
                        case 113:
                            if (cat.Referenceno != null && cat.Referenceno != "")
                                ShortStr += cat.Referenceno + sq.Separator;
                            break;
                        case 114:
                            if (cat.Additionalinfo != null && cat.Additionalinfo != "")
                                ShortStr += cat.Additionalinfo + sq.Separator;
                            break;
                        case 115:
                            if (cat.Equipment != null && cat.Equipment.Additionalinfo != null && cat.Equipment.Additionalinfo != "")
                                ShortStr += cat.Equipment.Additionalinfo + sq.Separator;
                            break;


                    }
                    if (!checkLength(ShortStr, seqList[0].ShortLength))
                    {
                        ShortStr = ShortStr.Trim();
                        char[] chr = sq.Separator.ToCharArray();
                        ShortStr = ShortStr.TrimEnd(chr[0]);
                        while (ShortStr.Length > seqList[0].ShortLength)
                        {
                            int lstIndx = ShortStr.LastIndexOf(chr[0]);
                            ShortStr = ShortStr.Remove(lstIndx);
                        }
                        break;
                    }
                }
            }
            if (ShortStr.Length != seqList[0].ShortLength)
            {
                ShortStr = ShortStr.Trim();
                int lsIndx = ShortStr.Length;
                string str = ShortStr.Substring(lsIndx - 1, 1);
                if (str == seqList[0].Separator.Trim())
                {
                    ShortStr = ShortStr.Remove(lsIndx - 1);
                }
            }
            return ShortStr.ToUpper();
        }
      
        protected bool checkLength(string str, int len)
        {
            str = str.Trim();
            // int lstIndx = str.Length;
            //str = str.Remove(lstIndx - 1, 1);
            if (str.Length < len)
            {
                return true;
            }
            else return false;

        }
       
            
        private string LongDesc(Prosol_Datamaster cat, List<Prosol_Sequence> seqList, Prosol_UOMSettings UOMSet)
        {

            // var vendortype = _VendortypeRepository.FindAll().ToList();
            var FormattedQuery = Query.And(Query.EQ("Noun", cat.Noun), Query.EQ("Modifier", cat.Modifier));
            var NMList = _nounModifierRepository.FindAll(FormattedQuery).ToList();
          
            string LongStr = "";
         
            //Short_Generic
            foreach (Prosol_Sequence sq in seqList)
            {
                if (sq.Required == "Yes")
                {
                    switch (sq.CatId)
                    {
                        case 101:
                            if (NMList[0].Formatted == 1)
                                LongStr += cat.Noun + sq.Separator;
                            else LongStr += cat.Noun + " ";
                            break;
                        case 102:
                            if (cat.Modifier != "NO DEFINER" && cat.Modifier != "NO MODIFIER")
                                LongStr += cat.Modifier + sq.Separator;
                            break;
                        case 103:
                            if (cat.Characteristics != null)
                            {
                                foreach (Prosol_AttributeList chM in cat.Characteristics.OrderBy(x => x.Squence))
                                {
                                    if (chM.Value != null && chM.Value != "")
                                    {
                                        if (UOMSet.Long_space == "with space")
                                        {
                                            if (chM.UOM != null && chM.UOM != "")
                                                LongStr += chM.Characteristic + ":" + chM.Value + " " + chM.UOM + sq.Separator;
                                            else LongStr += chM.Characteristic + ":" + chM.Value + sq.Separator;
                                        }
                                        else
                                        {
                                            if (chM.UOM != null && chM.UOM != "")
                                                LongStr += chM.Characteristic + ":" + chM.Value + chM.UOM + sq.Separator;
                                            else LongStr += chM.Characteristic + ":" + chM.Value + sq.Separator;
                                        }

                                    }
                                }
                            }
                            break;

                        case 104:
                            //if (cat.Manufacturer != null && cat.Manufacturer != "")
                            //    LongStr += "Manufacturer:" + cat.Manufacturer + sq.Separator;
                            //break;
                            if (cat.Vendorsuppliers != null)
                            {

                                int g = 0;
                                foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                                {

                                    if (vs.l == 1 && vs.Name != null && vs.Name != "")
                                    {
                                        LongStr += vs.Type + ":" + vs.Name + sq.Separator;

                                    }
                                    if (vs.l == 1 && vs.RefNo != null && vs.RefNo != "")
                                    {
                                        LongStr += vs.Refflag + ":" + vs.RefNo + sq.Separator;
                                    }
                                    //else
                                    //{
                                    //    if (vs.l == 1 && vs.RefNo != null && vs.RefNo != "")
                                    //    {
                                    //        LongStr += vs.Refflag + ":" + vs.RefNo + sq.Separator;
                                    //    }
                                    //}
                                }


                                //string[] mfrnames = new string[cat.Vendorsuppliers.Count];
                                //int iii = 0;
                                //foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                                //{
                                //    if (!mfrnames.Contains(vs.Name))
                                //    {
                                //        mfrnames[iii] = vs.Name;
                                //        iii++;
                                //    }
                                //}
                                //foreach (string names in mfrnames)
                                //{
                                //    int g = 0;
                                //    foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                                //    {

                                //        if (vs.l == 1 && g == 0 && vs.Name == names && vs.Name != null && vs.Name != "")
                                //        {
                                //            LongStr += vs.Type + ":" + vs.Name + sq.Separator;
                                //            g = 1;
                                //        }
                                //        if (vs.l == 1 && vs.Name == names && vs.RefNo != null && vs.RefNo != "")
                                //        {
                                //            LongStr += vs.Refflag + ":" + vs.RefNo + sq.Separator;
                                //        }
                                //    }

                            }
                            break;

                        case 105:
                            //if (cat.Partno != null && cat.Partno != "")
                            //    LongStr += "Partno:" + cat.Partno + sq.Separator;
                            //break;


                            //foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                            //{




                            //    if (vs.l == '1' && vs.Refflag == "PART NUMBER")
                            //    {
                            //        LongStr += vs.Type.ToUpper()+" "+ "PART NUMBER" + ":" + vs.RefNo + sq.Separator;

                            //    }


                            //}
                            break;

                        case 106:
                            if (cat.Application != null && cat.Application != "")
                                LongStr += "Application:" + cat.Application + sq.Separator;
                            break;
                        case 107:
                            //if (cat.Drawingno != null && cat.Drawingno != "")
                            //    LongStr += "Drawing NO.:" + cat.Drawingno + sq.Separator;
                            //break;


                            //foreach (Vendorsuppliers vs in cat.Vendorsuppliers)
                            //{
                            //    if (vs.l == '1' && vs.Refflag == "DRAWING & POSITION NUMBER")
                            //    {
                            //        LongStr += vs.Type.ToUpper() + " DRAWING & POSITION NUMBER:" + vs.RefNo + sq.Separator;

                            //    }
                            //    if (vs.l == '1' && vs.Refflag == "MODEL NUMBER")
                            //    {
                            //        LongStr += vs.Type.ToUpper() + " MODEL NUMBER:" + vs.RefNo + sq.Separator;

                            //    }
                            //    if (vs.l == '1' && vs.Refflag == "REFERENCE NUMBER")
                            //    {
                            //        LongStr += vs.Type.ToUpper() + " REFERENCE NUMBER:" + vs.RefNo + sq.Separator;

                            //    }
                            //}

                            break;


                        case 108:
                            if (cat.Equipment != null && cat.Equipment.Name != null && cat.Equipment.Name != "")
                                LongStr += "Equipment Name:" + cat.Equipment.Name + sq.Separator;
                            break;
                        case 109:
                            if (cat.Equipment != null && cat.Equipment.Manufacturer != null && cat.Equipment.Manufacturer != "")
                                LongStr += "Equipment Manufacturer:" + cat.Equipment.Manufacturer + sq.Separator;
                            break;
                        case 110:
                            if (cat.Equipment != null && cat.Equipment.Modelno != null && cat.Equipment.Modelno != "")
                                LongStr += "Equipment Modelno:" + cat.Equipment.Modelno + sq.Separator;
                            break;
                        case 111:
                            if (cat.Equipment != null && cat.Equipment.Tagno != null && cat.Equipment.Tagno != "")
                                LongStr += "Equipment Tagno:" + cat.Equipment.Tagno + sq.Separator;
                            break;
                        case 112:
                            if (cat.Equipment != null && cat.Equipment.Serialno != null && cat.Equipment.Serialno != "")
                                LongStr += "Equipment Serialno:" + cat.Equipment.Serialno + sq.Separator;
                            break;
                        case 113:
                            if (cat.Referenceno != null && cat.Referenceno != "")
                                LongStr += "Position No.:" + cat.Referenceno + sq.Separator;
                            break;
                        case 114:
                            if (cat.Additionalinfo != null && cat.Additionalinfo != "")
                                LongStr += "Additional Information:" + cat.Additionalinfo + sq.Separator;
                            break;
                        case 115:
                            if (cat.Equipment != null && cat.Equipment.Additionalinfo != null && cat.Equipment.Additionalinfo != "")
                                LongStr += "Additional Information(Equipment):" + cat.Equipment.Additionalinfo + sq.Separator;
                            break;


                    }
                }
            }
            LongStr = LongStr.Trim();
            int lstIndx = LongStr.Length;
            LongStr = LongStr.Remove(lstIndx - 1, 1);
            return LongStr.ToUpper();
        }

        public bool Duplicatecheck(string id, bool sts)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", sts);
            var flg = UpdateFlags.Upsert;
            var res = _ReftypeRepository.Update(query, Updae, flg);
            return res;

        }
    }

    
    public class shortFrame
    {
        public int position { set; get; }
        public string values { set; get; }
    }
    public class shortFrame1
    {
        public int position { set; get; }
        public string values { set; get; }
        public string val { set; get; }
    }
}
