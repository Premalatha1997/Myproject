using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Prosol.Core.Interface;
using Prosol.Core.Model;
using Prosol.Common;
using MongoDB.Driver.Builders;
using MongoDB.Bson;
using System.Web;
using System.Text.RegularExpressions;
using System.Data;
using MongoDB.Driver;
using System.Globalization;

namespace Prosol.Core
{

    public partial class ReportService : I_Report
    {
        private readonly IRepository<Prosol_Datamaster> _UserreportRepository;
        private readonly IRepository<Prosol_Request> _UserrequestRepository;

       // private readonly IRepository<Prosol_Plantinfo> _UserreportplntRepository
          private readonly IRepository<Prosol_ERPInfo> _ERPInfoRepository;

        private readonly IRepository<Prosol_Users> _UserlistRepository;
        private readonly IRepository<Prosol_Plants> _UserplntlistRepository;
        private readonly IRepository<Prosol_Departments> _UserdeplistRepository;
        private readonly IRepository<Prosol_Attachment> _attachlistRepository;
        private readonly IRepository<Prosol_NounModifiers> _NMRepository;
        private readonly IRepository<Prosol_Charateristics> _charRepository;
        private readonly IRepository<Prosol_Abbrevate> _AbbrevateRepository;
        public ReportService(IRepository<Prosol_Datamaster> Userreportservice,
            IRepository<Prosol_ERPInfo> ERPInfoRepository,
            IRepository<Prosol_Users> Userlistservice,
            IRepository<Prosol_Plants> Userplntlistservice,
            IRepository<Prosol_Departments> Userdeptlistservice,
            IRepository<Prosol_Request> Userreqlistservice,
            IRepository<Prosol_Attachment> attachlistRepository,
            IRepository<Prosol_NounModifiers> NMRepository,
             IRepository<Prosol_Abbrevate> abbRepository,
             IRepository<Prosol_Charateristics> charRepository)
        {
            this._UserreportRepository = Userreportservice;
            //  this._UserreportplntRepository = Userreportplntservice;
            this._ERPInfoRepository = ERPInfoRepository;
            this._UserlistRepository = Userlistservice;
            this._UserplntlistRepository = Userplntlistservice;
            this._UserdeplistRepository = Userdeptlistservice;
            this._UserrequestRepository = Userreqlistservice;
            this._attachlistRepository = attachlistRepository;
            this._NMRepository = NMRepository;
            this._charRepository = charRepository;
            this._AbbrevateRepository = abbRepository;
        }
        public List<Dictionary<string, object>> loaddata(string[] options, string where, string value, string fromdate, string todate, string role, string status)
        {

            IMongoQuery query, query1, querychr, queryplnt, query2, qry;
            var fields = Fields.Include(options).Exclude("_id");
            if (where == "UserName")
            {

                if (role == "Cataloguer")
                {
                    if (value != null && value != "null")
                        query = Query.EQ("Catalogue.Name", value);
                    else query = Query.NE("Catalogue", BsonNull.Value);
                }
                else if (role == "Reviewer")
                {
                    if (value != null && value != "null")
                        query = Query.EQ("Review.Name", value);
                    else query = Query.NE("Review", BsonNull.Value);
                }
                else
                {
                    if (value != null && value != "null")
                        query = Query.EQ("Release.Name", value);
                    else query = Query.NE("Release", BsonNull.Value);
                }
            }
            else
            {
                query = Query.EQ("Itemcode", value);
            }
            if (!string.IsNullOrEmpty(status))
            {
                if (status == "Completed")
                {
                    if (role == "Cataloguer")
                        query1 = Query.And(query, Query.GT("ItemStatus", 1), Query.NE("ItemStatus", 7));
                    else if (role == "Reviewer")
                        query1 = Query.And(query, Query.GT("ItemStatus", 3), Query.NE("ItemStatus", 7));
                    else if (role == "Releaser")
                        query1 = Query.And(query, Query.GT("ItemStatus", 5), Query.NE("ItemStatus", 7));
                    else
                        query1 = query;
                }
                else
                {
                    if (role == "Cataloguer")
                    {
                        qry = Query.And(Query.LT("ItemStatus", 2), Query.NE("ItemStatus", -1));
                        //qry = Query.LT("ItemStatus", 2);
                        query1 = Query.And(query, qry);
                    }
                    else if (role == "Reviewer")
                    {
                        qry = Query.And(Query.LT("ItemStatus", 4), Query.GT("ItemStatus", 1));
                        query1 = Query.And(query, qry);
                    }
                    else if (role == "Releaser")
                    {
                        qry = Query.And(Query.LT("ItemStatus", 6), Query.GT("ItemStatus", 3));
                        query1 = Query.And(query, qry);
                    }
                    else
                        query1 = query;

                }
            }
            else
            {

                if (role == "Cataloguer")
                    query1 = Query.And(query, Query.GTE("ItemStatus", 0), Query.NE("ItemStatus", 7));
                else if (role == "Reviewer")
                    query1 = Query.And(query, Query.GTE("ItemStatus", 2), Query.NE("ItemStatus", 7));
                else if (role == "Releaser")
                    query1 = Query.And(query, Query.GTE("ItemStatus", 4), Query.NE("ItemStatus", 7));
                else
                    query1 = query;
            }
            if (!string.IsNullOrEmpty(fromdate) && !string.IsNullOrEmpty(todate))
            {
                var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                var date1 = DateTime.Parse(todate, new CultureInfo("en-US", true));
                date1 = date1.AddDays(1);
                date1 = DateTime.SpecifyKind(date1, DateTimeKind.Utc);

                if (role == "Cataloguer")
                    query2 = Query.And(query1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                else if (role == "Reviewer")
                    query2 = Query.And(query1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                else
                    query2 = Query.And(query1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));

            }
            else if (!string.IsNullOrEmpty(fromdate) && string.IsNullOrEmpty(todate))
            {
                var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);

                if (role == "Cataloguer")
                    query2 = Query.And(query1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                else if (role == "Reviewer")
                    query2 = Query.And(query1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                else
                    query2 = Query.And(query1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));

                //  query2 = Query.And(query1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
            }
            else
            {
                if (role == "Cataloguer")
                    query2 = Query.And(query1);
                else if (role == "Reviewer")
                    query2 = Query.And(query1);
                else
                    query2 = Query.And(query1);
            }
          //  var NM_master = _NMRepository.FindAll();
            var datalist = _UserreportRepository.FindAll(fields, query2).ToList();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            List<Dictionary<string, object>> rowsheader = new List<Dictionary<string, object>>();
            Dictionary<string, object> rowh;
            bool goo;
            var mergelist = (dynamic)null;
            if (options.Contains("Plants"))
            {
                var plntlist = _ERPInfoRepository.FindAll().ToList();
                // mergelist = (from data in datalist join plant in plntlist on data.Itemcode equals plant.Itemcode join nm in NM_master on data.Noun equals nm.Noun where data.Modifier== nm.Modifier select new { Plant = plant.Plant != null ? plant.Plant : "", Itemcode = data.Itemcode, Formatted = nm.Formatted  , Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment= getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus  = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks , Soureurl = data.Soureurl }).ToList();
                mergelist = (from data in datalist join plant in plntlist on data.Itemcode equals plant.Itemcode select new { Plant = plant.Plant != null ? plant.Plant : "", Itemcode = data.Itemcode, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, UOM = data.UOM, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, Additionalinfo = data.Additionalinfo }).ToList();
                if (mergelist.Count == 0)
                {
                    mergelist = datalist;
                    goo = false;

                }
                else
                {
                    goo = true;
                }
            }
            else
            {
          
              //  mergelist = datalist;
                mergelist = (from data in datalist  select new { Itemcode = data.Itemcode, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, UOM = data.UOM, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, Additionalinfo =data.Additionalinfo }).ToList();
                // mergelist = (from data in datalist join nm in NM_master on data.Noun equals nm.Noun where data.Modifier == nm.Modifier select new { Itemcode = data.Itemcode, Formatted = nm.Formatted, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, Soureurl = data.Soureurl }).ToList();
                goo = false;
            }
            if (options.Contains("Characteristics"))
            {
                int flg = 0;
                foreach (var code in mergelist)
                {
                    row = new Dictionary<string, object>();
                    row.Add("Itemcode", code.Itemcode);
                    row.Add("Material code", code.Materialcode);

                    if (options.Contains("Noun"))
                        row.Add("Noun", code.Noun);
                    else row.Add("Noun", "");

                    if (options.Contains("Modifier"))
                        row.Add("Modifier", code.Modifier);
                    else row.Add("Modifier", "");

                    if (options.Contains("UOM"))
                        row.Add("UOM", code.UOM);
                    else row.Add("UOM", "");

                    if (options.Contains("Legacy"))
                        row.Add("Legacy", code.Legacy);
                    else row.Add("Legacy", "");

                    if (options.Contains("Legacy2"))
                        row.Add("PvData", code.Legacy2);
                    else row.Add("PvData", "");

                    if (options.Contains("Shortdesc"))
                        row.Add("Shortdesc", code.Shortdesc);
                    else row.Add("Shortdesc", "");

                    if (options.Contains("Longdesc"))
                        row.Add("Longdesc", code.Longdesc);
                    else row.Add("Longdesc", "");

                    if (options.Contains("Additionalinfo"))
                        row.Add("Additionalinfo", code.Additionalinfo);
                    else row.Add("Additionalinfo", "");                    

                    if (code.ItemStatus == 0 || code.ItemStatus == 1)
                        row.Add("ItemStatus", "Catalogue");
                    else if (code.ItemStatus == 2 || code.ItemStatus == 3)
                        row.Add("ItemStatus", "QC");
                    else if (code.ItemStatus == 4 || code.ItemStatus == 5)
                        row.Add("ItemStatus", "QA");
                    else if (code.ItemStatus == 6)
                        row.Add("ItemStatus", "Released");
                    else if (code.ItemStatus == -1)
                        row.Add("ItemStatus", "Clarification");
                    else row.Add("ItemStatus", "");

                    if (options.Contains("Vendorsuppliers"))                        
                          
                        row.Add("Vendor Details", code.Manufacturer);
                    else row.Add("Vendor Details", "");

                    if (options.Contains("Equipment"))
                        row.Add("Equipment Details", code.Equipment);
                    else row.Add("Equipment Details", "");

                    //if (options.Contains("Partno"))
                    //{
                    //    row.Add("Part No", code.Partno);
                    //}
                    //else row.Add("Part No", "");

                    if (code.Catalogue != null)
                    {
                        row.Add("Cataloguer", code.Catalogue.Name);
                        if (code.Catalogue.UpdatedOn != null)
                        {
                            row.Add("Cat-Createdon", code.Catalogue.UpdatedOn);
                        }
                        else
                            row.Add("Cat-Createdon", "");
                    }
                    else
                    {
                        row.Add("Cataloguer", "");
                        row.Add("Cat-Createdon", "");
                    }



                    if (code.Review != null)
                    {
                        row.Add("Reviewer", code.Review.Name);
                        if (code.Review.UpdatedOn != null)
                        {
                            row.Add("Rev-Createdon", code.Review.UpdatedOn);
                        }
                        else
                            row.Add("Rev-Createdon", "");

                    }
                    else
                    {
                        row.Add("Reviewer", "");
                        row.Add("Rev-Createdon", "");
                    }


                    if (code.Release != null)
                    {
                        row.Add("Releaser", code.Release.Name);
                        if (code.Release.UpdatedOn != null)
                        {
                            row.Add("Rel-Createdon", code.Release.UpdatedOn);
                        }
                        else
                            row.Add("Rel-Createdon", "");

                    }
                    else
                    {
                        row.Add("Releaser", "");
                        row.Add("Rel-Createdon", "");
                    }


                    if (code.RejectedBy != null)
                    {
                        row.Add("RejectedBy", code.RejectedBy.Name);
                        if (code.RejectedBy.UpdatedOn != null)
                        {
                            row.Add("RejectedOn", code.RejectedBy.UpdatedOn);
                        }
                        else
                            row.Add("RejectedOn", "");

                    }
                    else
                    {
                        row.Add("RejectedBy", "");
                        row.Add("RejectedOn", "");
                    }
                    //if (code.Remarks != null)
                    //{
                    //    row.Add("Remarks", code.Remarks);
                    //}
                    //else row.Add("Remarks", "");
                    if (code.Remarks != null)
                    {
                        row.Add("Cat.Remarks", code.Remarks);
                    }
                    else
                        row.Add("Cat.Remarks", "");

                    if (code.RevRemarks != null)
                    {
                        row.Add("Rev.Remarks", code.RevRemarks);
                    }
                    else
                        row.Add("Rev.Remarks", "");

                    if (code.RelRemarks != null)
                    {
                        row.Add("Rel.Remarks", code.RelRemarks);
                    }
                    else
                        row.Add("Rel.Remarks", "");

                    if (goo == true)
                    {
                        if (options.Contains("Plants"))
                            row.Add("Plant", code.Plant);
                        else row.Add("Plant", "");
                    }
                    if (options.Contains("Characteristics"))
                    {
                        if (code.Characteristics != null)
                        {
                            int i = 1;
                            foreach (var at in code.Characteristics)
                            {
                                row.Add("Attribute" + i, at.Characteristic);
                                row.Add("Value" + i, at.Value);
                                row.Add("UOM" + i, at.UOM);
                               // row.Add("Source" + i, at.Source);
                              //  row.Add("SourceUrl" + i, at.SourceUrl);
                                i++;
                            }
                        }
                    }
                    rows.Add(row);
                }
            }
            else
            {
                foreach (var code in mergelist)
                {
                    row = new Dictionary<string, object>();
                    row.Add("Itemcode", code.Itemcode);
                    row.Add("Matrial Code", code.Materialcode);
                    if (options.Contains("Noun"))
                        row.Add("Noun", code.Noun);
                    else row.Add("Noun", "");

                    if (options.Contains("Modifier"))
                        row.Add("Modifier", code.Modifier);
                    else row.Add("Modifier", "");

                    if (options.Contains("UOM"))
                        row.Add("UOM", code.UOM);
                    else row.Add("UOM", "");

                    if (options.Contains("Legacy"))
                        row.Add("Legacy", code.Legacy);
                    else row.Add("Legacy", "");

                    if (options.Contains("Legacy2"))
                        row.Add("PvData", code.Legacy2);
                    else row.Add("PvData", "");

                    if (options.Contains("Shortdesc"))
                        row.Add("Shortdesc", code.Shortdesc);
                    else row.Add("Shortdesc", "");
                    if (options.Contains("Longdesc"))
                        row.Add("Longdesc", code.Longdesc);
                    else row.Add("Longdesc", "");

                    if (options.Contains("Vendorsuppliers"))

                        row.Add("Vendor Details", code.Manufacturer);
                    else row.Add("Vendor Details", "");

                    if (code.Catalogue != null)
                    {
                        row.Add("Cataloguer", code.Catalogue.Name);
                        if (code.Catalogue.UpdatedOn != null)
                        {
                            row.Add("Cat-Createdon", code.Catalogue.UpdatedOn);
                        }
                        else
                            row.Add("Cat-Createdon", "");
                    }
                    else
                    {
                        row.Add("Cataloguer", "");
                        row.Add("Cat-Createdon", "");
                    }



                    if (code.Review != null)
                    {
                        row.Add("Reviewer", code.Review.Name);
                        if (code.Review.UpdatedOn != null)
                        {
                            row.Add("Rev-Createdon", code.Review.UpdatedOn);
                        }
                        else
                            row.Add("Rev-Createdon", "");

                    }
                    else
                    {
                        row.Add("Reviewer", "");
                        row.Add("Rev-Createdon", "");
                    }


                    if (code.Release != null)
                    {
                        row.Add("Releaser", code.Release.Name);
                        if (code.Release.UpdatedOn != null)
                        {
                            row.Add("Rel-Createdon", code.Release.UpdatedOn);
                        }
                        else
                            row.Add("Rel-Createdon", "");

                    }
                    else
                    {
                        row.Add("Releaser", "");
                        row.Add("Rel-Createdon", "");
                    }


                    if (code.RejectedBy != null)
                    {
                        row.Add("RejectedBy", code.RejectedBy.Name);
                        if (code.RejectedBy.UpdatedOn != null)
                        {
                            row.Add("RejectedOn", code.RejectedBy.UpdatedOn);
                        }
                        else
                            row.Add("RejectedOn", "");

                    }
                    else
                    {
                        row.Add("RejectedBy", "");
                        row.Add("RejectedOn", "");
                    }
                    //if (code.Remarks != null)
                    //{
                    //    row.Add("Remarks", code.Remarks);
                    //}
                    //else row.Add("Remarks", "");
                    if (code.Remarks != null)
                    {
                        row.Add("Cat.Remarks", code.Remarks);
                    }
                    else
                        row.Add("Cat.Remarks", "");

                    if (code.RevRemarks != null)
                    {
                        row.Add("Rev.Remarks", code.RevRemarks);
                    }
                    else
                        row.Add("Rev.Remarks", "");

                    if (code.RelRemarks != null)
                    {
                        row.Add("Rel.Remarks", code.RelRemarks);
                    }
                    else
                        row.Add("Rel.Remarks", "");
                    //if (options.Contains("Partno"))
                    //{
                    //    row.Add("Part No", code.Partno);

                    //}
                    //else row.Add("Part No", "");

                    if (options.Contains("Additionalinfo"))
                        row.Add("Additionalinfo", code.Additionalinfo);
                    else row.Add("Additionalinfo", "");

                    if (options.Contains("Equipment"))
                        row.Add("Equipment", code.Equipment);
                    else row.Add("Equipment", "");

                    if (goo == true)
                    {
                        if (options.Contains("Plants"))
                            row.Add("Plant", code.Plant);
                        else row.Add("Plant", "");
                    }
                    if (options.Contains("Characteristics"))
                    {
                        if (code.Characteristics != null)
                        {
                            int i = 1;
                            foreach (var at in code.Characteristics)
                            {
                                row.Add("Attribute" + i, at.Characteristic);
                                row.Add("Value" + i, at.Value);
                                row.Add("UOM" + i, at.UOM);
                                //row.Add("Source" + i, at.Source);
                               // row.Add("SourceUrl" + i, at.SourceUrl);
                                i++;
                            }
                        }
                    }
                    rows.Add(row);
                }
            }
            //foreach (var ct in rows.OrderByDescending(s => s.Keys.Count))
            //{
            //    rows.Add(ct);
            //    break;
            //}
            return rows;
        }
        public List<Dictionary<string, object>> loaddata1(string[] options, string where, string value, string fromdate, string todate, string role, string status)
        {

            IMongoQuery query2;
            var fields = Fields.Include(options).Exclude("_id");
        
            query2 = Query.EQ("ItemStatus", -1);
            var datalist = _UserreportRepository.FindAll(fields, query2).ToList();
          //  var NM_master = _NMRepository.FindAll();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            List<Dictionary<string, object>> rowsheader = new List<Dictionary<string, object>>();
            Dictionary<string, object> rowh;
            bool goo;
            var mergelist = (dynamic)null;
            if (options.Contains("Plants"))
            {
                var plntlist = _ERPInfoRepository.FindAll().ToList();
                 mergelist = (from data in datalist join plant in plntlist on data.Itemcode equals plant.Itemcode select new { Plant = plant.Plant != null ? plant.Plant : "", Itemcode = data.Itemcode, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, UOM = data.UOM, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks , Additionalinfo =data.Additionalinfo }).ToList();
               // mergelist = (from data in datalist join plant in plntlist on data.Itemcode equals plant.Itemcode join nm in NM_master on data.Noun equals nm.Noun where data.Modifier == nm.Modifier select new { Plant = plant.Plant != null ? plant.Plant : "", Itemcode = data.Itemcode, Formatted = nm.Formatted, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, Soureurl = data.Soureurl }).ToList();
                if (mergelist.Count == 0)
                {
                    mergelist = datalist;
                    goo = false;

                }
                else
                {
                    goo = true;
                }
            }
            else
            {
                mergelist = (from data in datalist select new { Itemcode = data.Itemcode, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, UOM = data.UOM, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, Additionalinfo = data.Additionalinfo }).ToList();
                //  mergelist = datalist;

                // mergelist = (from data in datalist join nm in NM_master on data.Noun equals nm.Noun where data.Modifier == nm.Modifier select new { Itemcode = data.Itemcode, Formatted = nm.Formatted, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, Soureurl = data.Soureurl }).ToList();
                goo = false;
            }
            if (options.Contains("Characteristics"))
            {
                int flg = 0;
                foreach (var code in mergelist)
                {
                    row = new Dictionary<string, object>();
                    row.Add("Itemcode", code.Itemcode);
                    row.Add("Material code", code.Materialcode);

                    if (options.Contains("Noun"))
                        row.Add("Noun", code.Noun);
                    else
                        row.Add("Noun", "");
                    if (options.Contains("Modifier"))
                        row.Add("Modifier", code.Modifier);
                    else
                        row.Add("Modifier", "");
                    if (options.Contains("UOM"))
                        row.Add("UOM", code.UOM);
                    else
                        row.Add("UOM", "");
                    if (options.Contains("Legacy"))
                        row.Add("Legacy", code.Legacy);
                    else
                        row.Add("Legacy", "");
                    if (options.Contains("Legacy2"))
                        row.Add("PvData", code.Legacy2);
                    else
                        row.Add("PvData", "");
                    if (options.Contains("Shortdesc"))
                        row.Add("Shortdesc", code.Shortdesc);
                    else
                        row.Add("Shortdesc", "");
                    if (options.Contains("Longdesc"))
                        row.Add("Longdesc", code.Longdesc);
                    else
                        row.Add("Longdesc", "");
                    if (options.Contains("Additionalinfo"))
                        row.Add("Additionalinfo", code.Additionalinfo);
                    else
                        row.Add("Additionalinfo", "");
                    //if (code.Formatted == 0)

                    //    row.Add("nmtype", "OEM");

                    //else if (code.Formatted == 1)

                    //    row.Add("nmtype", "Genric");

                    //else if (code.Formatted == 2)
                    //    row.Add("nmtype", "OPM");

                    if (options.Contains("Vendorsuppliers"))

                        row.Add("Vendor Details", code.Manufacturer);
                    else row.Add("Vendor Details", "");

                    if (options.Contains("Equipment"))
                        row.Add("Equipment", code.Equipment);
                    else row.Add("Equipment", "");

                    //if (options.Contains("Partno"))
                    //{
                    //    row.Add("Part No", code.Partno);
                    //}

                    if (code.Catalogue != null)
                    {
                        row.Add("Cataloguer", code.Catalogue.Name);
                        if (code.Catalogue.UpdatedOn != null)
                        {
                            row.Add("Cat-Createdon", code.Catalogue.UpdatedOn);
                        }
                        else
                            row.Add("Cat-Createdon", "");
                    }
                    else
                    {
                        row.Add("Cataloguer", "");
                        row.Add("Cat-Createdon", "");
                    }



                    if (code.Review != null)
                    {
                        row.Add("Reviewer", code.Review.Name);
                        if (code.Review.UpdatedOn != null)
                        {
                            row.Add("Rev-Createdon", code.Review.UpdatedOn);
                        }
                        else
                            row.Add("Rev-Createdon", "");

                    }
                    else
                    {
                        row.Add("Reviewer", "");
                        row.Add("Rev-Createdon", "");
                    }


                    if (code.Release != null)
                    {
                        row.Add("Releaser", code.Release.Name);
                        if (code.Release.UpdatedOn != null)
                        {
                            row.Add("Rel-Createdon", code.Release.UpdatedOn);
                        }
                        else
                            row.Add("Rel-Createdon", "");

                    }
                    else
                    {
                        row.Add("Releaser", "");
                        row.Add("Rel-Createdon", "");
                    }


                    if (code.RejectedBy != null)
                    {
                        row.Add("RejectedBy", code.RejectedBy.Name);
                        if (code.RejectedBy.UpdatedOn != null)
                        {
                            row.Add("RejectedOn", code.RejectedBy.UpdatedOn);
                        }
                        else
                            row.Add("RejectedOn", "");

                    }
                    else
                    {
                        row.Add("RejectedBy", "");
                        row.Add("RejectedOn", "");
                    }
                    //if (code.Remarks != null)
                    //{
                    //    row.Add("Remarks", code.Remarks);
                    //}
                    //else row.Add("Remarks", "");
                    if (code.Remarks != null)
                    {
                        row.Add("Cat.Remarks", code.Remarks);
                    }
                    else
                        row.Add("Cat.Remarks", "");

                    if (code.RevRemarks != null)
                    {
                        row.Add("Rev.Remarks", code.RevRemarks);
                    }
                    else
                        row.Add("Rev.Remarks", "");

                    if (code.RelRemarks != null)
                    {
                        row.Add("Rel.Remarks", code.RelRemarks);
                    }
                    else
                        row.Add("Rel.Remarks", "");
                    if (goo == true)
                    {
                        if (options.Contains("Plants"))
                            row.Add("Plant", code.Plant);
                    }
                    if (options.Contains("Characteristics"))
                    {
                        if (code.Characteristics != null)
                        {
                            int i = 1;
                            foreach (var at in code.Characteristics)
                            {
                                row.Add("Attribute" + i, at.Characteristic);
                                row.Add("Value" + i, at.Value);
                                row.Add("UOM" + i, at.UOM);
                               // row.Add("Source" + i, at.Source);
                               // row.Add("SourceUrl" + i, at.SourceUrl);
                                i++;
                            }
                        }
                    }
                    rows.Add(row);
                }
            }
            else
            {
                foreach (var code in mergelist)
                {
                    row = new Dictionary<string, object>();
                    row.Add("Itemcode", code.Itemcode);
                    row.Add("Matrial Code", code.Materialcode);
                    if (options.Contains("Noun"))
                        row.Add("Noun", code.Noun);
                    else
                        row.Add("Noun", "");
                    if (options.Contains("Modifier"))
                        row.Add("Modifier", code.Modifier);
                    else
                        row.Add("Modifier", "");
                    if (options.Contains("UOM"))
                        row.Add("UOM", code.UOM);
                    else
                        row.Add("UOM", "");
                    if (options.Contains("Legacy"))
                        row.Add("Legacy", code.Legacy);
                    else
                        row.Add("Legacy", "");
                    if (options.Contains("Legacy2"))
                        row.Add("PvData", code.Legacy2);
                    else
                        row.Add("PvData", "");
                    if (options.Contains("Shortdesc"))
                        row.Add("Shortdesc", code.Shortdesc);
                    else
                        row.Add("Shortdesc", "");
                    if (options.Contains("Longdesc"))
                        row.Add("Longdesc", code.Longdesc);
                    else
                        row.Add("Longdesc", "");
                    if (options.Contains("Additionalinfo"))
                        row.Add("Additionalinfo", code.Additionalinfo);
                    else
                        row.Add("Additionalinfo", "");

                    if (options.Contains("Vendorsuppliers"))

                        row.Add("Vendor Details", code.Manufacturer);
                    else row.Add("Vendor Details", "");

                    if (options.Contains("Equipment"))
                        row.Add("Equipment", code.Equipment);
                    else row.Add("Equipment", "");

                    if (code.Catalogue != null)
                    {
                        row.Add("Cataloguer", code.Catalogue.Name);
                        if (code.Catalogue.UpdatedOn != null)
                        {
                            row.Add("Cat-Createdon", code.Catalogue.UpdatedOn);
                        }
                        else
                            row.Add("Cat-Createdon", "");
                    }
                    else
                    {
                        row.Add("Cataloguer", "");
                        row.Add("Cat-Createdon", "");
                    }



                    if (code.Review != null)
                    {
                        row.Add("Reviewer", code.Review.Name);
                        if (code.Review.UpdatedOn != null)
                        {
                            row.Add("Rev-Createdon", code.Review.UpdatedOn);
                        }
                        else
                            row.Add("Rev-Createdon", "");

                    }
                    else
                    {
                        row.Add("Reviewer", "");
                        row.Add("Rev-Createdon", "");
                    }


                    if (code.Release != null)
                    {
                        row.Add("Releaser", code.Release.Name);
                        if (code.Release.UpdatedOn != null)
                        {
                            row.Add("Rel-Createdon", code.Release.UpdatedOn);
                        }
                        else
                            row.Add("Rel-Createdon", "");

                    }
                    else
                    { 
                        row.Add("Releaser", "");
                        row.Add("Rel-Createdon", "");
                    }


                    if (code.RejectedBy != null)
                    {
                        row.Add("RejectedBy", code.RejectedBy.Name);
                        if (code.RejectedBy.UpdatedOn != null)
                        {
                            row.Add("RejectedOn", code.RejectedBy.UpdatedOn);
                        }
                        else
                            row.Add("RejectedOn", "");

                    }
                    else
                    { 
                        row.Add("RejectedBy", "");
                        row.Add("RejectedOn", "");
                    }
                    //if (code.Remarks != null)
                    //{
                    //    row.Add("Remarks", code.Remarks);
                    //}
                    //else row.Add("Remarks", "");
                    if (code.Remarks != null)
                    {
                        row.Add("Cat.Remarks", code.Remarks);
                    }
                    else
                        row.Add("Cat.Remarks", "");

                    if (code.RevRemarks != null)
                    {
                        row.Add("Rev.Remarks", code.RevRemarks);
                    }
                    else
                        row.Add("Rev.Remarks", "");

                    if (code.RelRemarks != null)
                    {
                        row.Add("Rel.Remarks", code.RelRemarks);
                    }
                    else
                        row.Add("Rel.Remarks", "");

                    //if (options.Contains("Partno"))
                    //{
                    //    row.Add("Part No", code.Partno);

                    //}
                                  

                    if (options.Contains("Plants"))
                        if (goo == true)
                        {
                            row.Add("Plant", code.Plant);
                        }
                    if (options.Contains("Characteristics"))
                        if (code.Characteristics != null)
                        {
                            int i = 1;
                            foreach (var at in code.Characteristics)
                            {
                                row.Add("Attribute" + i, at.Characteristic);
                                row.Add("Value" + i, at.Value);
                                row.Add("UOM" + i, at.UOM);
                                i++;
                            }
                        }
                    rows.Add(row);
                }
            }
            //foreach (var ct in rows.OrderByDescending(s => s.Keys.Count))
            //{
            //    rows.Add(ct);
            //    break;
            //}
            return rows;
        }

        public List<Dictionary<string, object>> loaddata2(string[] options, string fromdate, string todate)
        {

            IMongoQuery query2;
            var datalist = new List<Prosol_Datamaster>();
            var fields = Fields.Include(options).Exclude("_id");
           
            if (!string.IsNullOrEmpty(fromdate) && !string.IsNullOrEmpty(todate))
            {
                var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                var date1 = DateTime.Parse(todate, new CultureInfo("en-US", true));
                date1 = date1.AddDays(1);
                date1 = DateTime.SpecifyKind(date1, DateTimeKind.Utc);
                query2 = Query.And(Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                datalist = _UserreportRepository.FindAll(fields, query2).ToList();
            }
            else if (!string.IsNullOrEmpty(fromdate) && string.IsNullOrEmpty(todate))
            {
                var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                query2 = Query.And(Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                datalist = _UserreportRepository.FindAll(fields, query2).ToList();
            }
           
         


            //var fields = Fields.Include(options).Exclude("_id");
            //var datalist = _UserreportRepository.FindAll(fields).ToList();

           // var NM_master = _NMRepository.FindAll();

            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            List<Dictionary<string, object>> rowsheader = new List<Dictionary<string, object>>();
            Dictionary<string, object> rowh;
            bool goo;
            var mergelist = (dynamic)null;
            var plntlist = _ERPInfoRepository.FindAll().ToList();
            // mergelist = (from data in datalist join plant in plntlist on data.Itemcode equals plant.Itemcode join nm in NM_master on data.Noun equals nm.Noun where data.Modifier == nm.Modifier select new { Plant = plant.Plant != null ? plant.Plant : "", Itemcode = data.Itemcode, Materialcode = data.Materialcode, Formatted = nm.Formatted, Noun = data.Noun, Modifier = data.Modifier, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, Soureurl = data.Soureurl }).ToList();
            mergelist = (from data in datalist select new { Itemcode = data.Itemcode, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, UOM = data.UOM, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, Soureurl = data.Soureurl, Additionalinfo = data.Additionalinfo }).ToList();
          //  mergelist = (from data in datalist join plant in plntlist on data.Itemcode equals plant.Itemcode select new { Plant = plant.Plant != null ? plant.Plant : "", Itemcode = data.Itemcode, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, UOM = data.UOM, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks , RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, Soureurl = data.Soureurl, Additionalinfo =data.Additionalinfo }).ToList();
            if (mergelist.Count == 0)
                {
                    mergelist = datalist;
                    goo = false;

                }
                else
                {
                    goo = true;
                }
           
                 int flg = 0;
                foreach (var code in mergelist)
                {
                    row = new Dictionary<string, object>();
               
                    row.Add("Itemcode", code.Itemcode);

                    row.Add("Material code", code.Materialcode);

                if (options.Contains("Noun"))
                    row.Add("Noun", code.Noun);
                else
                    row.Add("Noun", "");
                if (options.Contains("Modifier"))
                    row.Add("Modifier", code.Modifier);
                else
                    row.Add("Modifier", "");
                if (options.Contains("UOM"))
                    row.Add("UOM", code.UOM);
                else
                    row.Add("UOM", "");
                if (options.Contains("Legacy"))
                    row.Add("Legacy", code.Legacy);
                else
                    row.Add("Legacy", "");
                if (options.Contains("Legacy2"))
                    row.Add("PvData", code.Legacy2);
                else
                    row.Add("PvData", "");
                if (options.Contains("Shortdesc"))
                    row.Add("Shortdesc", code.Shortdesc);
                else
                    row.Add("Shortdesc", "");
                if (options.Contains("Longdesc"))
                    row.Add("Longdesc", code.Longdesc);
                else
                    row.Add("Longdesc", "");
                if (options.Contains("Additionalinfo"))
                    row.Add("Additionalinfo", code.Additionalinfo);
                else
                    row.Add("Additionalinfo", "");

                if (options.Contains("Vendorsuppliers"))

                    row.Add("Vendor Details", code.Manufacturer);
                else row.Add("Vendor Details", "");

                if (options.Contains("Equipment"))
                    row.Add("Equipment", code.Equipment);
                else row.Add("Equipment", "");
                //if (options.Contains("Partno"))
                //    {
                //        row.Add("Part No", code.Partno);
                //    }
                //if (options.Contains("Additionalinfo"))
                //    row.Add("Additionalinfo", code.Additionalinfo);
                //else
                //    row.Add("Additionalinfo", "");
                //if (code.Formatted == 0)

                //    row.Add("nmtype", "OEM");

                //else if (code.Formatted == 1)

                //    row.Add("nmtype", "Genric");

                //else if (code.Formatted == 2)
                //    row.Add("nmtype", "OPM");

                if (code.Catalogue != null)
                {
                    row.Add("Cataloguer", code.Catalogue.Name);
                    if (code.Catalogue.UpdatedOn != null)
                    {
                        row.Add("Cat-Createdon", code.Catalogue.UpdatedOn);
                    }
                    else
                        row.Add("Cat-Createdon", "");
                }
                else
                {
                    row.Add("Cataloguer", "");
                    row.Add("Cat-Createdon", "");
                }



                if (code.Review != null)
                {
                    row.Add("Reviewer", code.Review.Name);
                    if (code.Review.UpdatedOn != null)
                    {
                        row.Add("Rev-Createdon", code.Review.UpdatedOn);
                    }
                    else
                        row.Add("Rev-Createdon", "");

                }
                else
                {
                    row.Add("Reviewer", "");
                    row.Add("Rev-Createdon", "");
                }


                if (code.Release != null)
                {
                    row.Add("Releaser", code.Release.Name);
                    if (code.Release.UpdatedOn != null)
                    {
                        row.Add("Rel-Createdon", code.Release.UpdatedOn);
                    }
                    else
                        row.Add("Rel-Createdon", "");

                }
                else
                {
                    row.Add("Releaser", "");
                    row.Add("Rel-Createdon", "");
                }


                if (code.RejectedBy != null)
                {
                    row.Add("RejectedBy", code.RejectedBy.Name);
                    if (code.RejectedBy.UpdatedOn != null)
                    {
                        row.Add("RejectedOn", code.RejectedBy.UpdatedOn);
                    }
                    else
                        row.Add("RejectedOn", "");

                }
                else
                {
                    row.Add("RejectedBy", "");
                    row.Add("RejectedOn", "");
                }


                if (code.ItemStatus == 0 || code.ItemStatus == 1)
                    row.Add("ItemStatus", "Catalogue");
                else if (code.ItemStatus == 2 || code.ItemStatus == 3)
                    row.Add("ItemStatus", "QC");
                else if (code.ItemStatus == 4 || code.ItemStatus == 5)
                    row.Add("ItemStatus", "QA");
                else if (code.ItemStatus == 6)
                    row.Add("ItemStatus", "Released");
                else row.Add("ItemStatus", "Clarification");

                //row.Add("Cat.Remarks", code.Remarks);
                //row.Add("Rev.Remarks", code.RevRemarks);
                //row.Add("Rel.Remarks", code.RelRemarks);
                if (code.Remarks != null)
                {
                    row.Add("Cat.Remarks", code.Remarks);
                }
                else
                    row.Add("Cat.Remarks", "");

                if (code.RevRemarks != null)
                {
                    row.Add("Rev.Remarks", code.RevRemarks);
                }
                else
                    row.Add("Rev.Remarks", "");

                if (code.RelRemarks != null)
                {
                    row.Add("Rel.Remarks", code.RelRemarks);
                }
                else
                    row.Add("Rel.Remarks", "");
                if (goo == true)
                    {
                        if (options.Contains("Plants"))
                            row.Add("Plant", code.Plant);
                    }
                    if (options.Contains("Characteristics"))
                        if (code.Characteristics != null)
                        {
                            int i = 1;
                            foreach (var at in code.Characteristics)
                        {
                               if (at.Characteristic !=null)
                                row.Add("Attribute" + i, at.Characteristic);                              
                                row.Add("Value" + i, at.Value);
                                row.Add("UOM" + i, at.UOM);
                               /// row.Add("Source" + i, at.Source);
                               // row.Add("SourceUrl" + i, at.SourceUrl);
                                i++;
                            }
                        }

                if (code.Soureurl != null)
                {
                    row.Add("Soureurl", code.Soureurl);
                }
                rows.Add(row);
                }
            
           
            return rows;
        }


        public string getequip(Prosol_Datamaster data)
        {
            string mfrr = "";
            string mfrr1 = "";
            if (data.Equipment != null)
          
            {
                if (data.Equipment.Name != null && data.Equipment.Name != "")
                {
                    mfrr += "Name" + ":" + data.Equipment.Name + ",";

                }


                if (data.Equipment.Manufacturer != null && data.Equipment.Manufacturer != "")
                {
                    mfrr += "Manufacturer" + ":" + data.Equipment.Manufacturer + ",";

                }
                if (data.Equipment.Modelno != null && data.Equipment.Modelno != "")
                {
                    mfrr += "Modelno" + ":" + data.Equipment.Modelno + ",";

                }


                if (data.Equipment.Tagno != null && data.Equipment.Tagno != "")
                {
                    mfrr += "Tagno" + ":" + data.Equipment.Tagno + ",";

                }
                if (data.Equipment.Serialno != null && data.Equipment.Serialno != "")
                {
                    mfrr += "Serialno" + ":" + data.Equipment.Serialno + ",";

                }


                if (data.Equipment.Additionalinfo != null && data.Equipment.Additionalinfo != "")
                {
                    mfrr += "Additionalinfo" + ":" + data.Equipment.Additionalinfo + ",";

                }
                if(mfrr.Length != 0)
                {
                    mfrr1 = mfrr.Remove(mfrr.Length - 1);
                }
               

            }
          
            return mfrr1;
        }

        public string getmfr(Prosol_Datamaster data)
        {
            string mfrr = "";
            string mfrr1 = "";
            if (data.Vendorsuppliers != null)
                foreach (Vendorsuppliers vs in data.Vendorsuppliers)
                {
                    //if (vs.s == 1)
                    //{ v
                    //    return vs.Name;
                    //}
                    //if(vs.Name != null && vs.Name != "")
                    //{
                    //    if(!mfrr.Contains(vs.Name))
                    //    mfrr = mfrr == "" ? vs.Name : mfrr +"/"+ vs.Name;
                    //}
                    //  int g = 0;
                    // if (vs.l == 1 && g == 0 && vs.s == 1 && vs.Name != null && vs.Name != "")


                    //if ( vs.Name != null && vs.Name != "" && vs.RefNo != null && vs.RefNo != "")
                    //{
                    //    mfrr += vs.Type + ":" + vs.Name + "," + vs.Refflag + ":" + vs.RefNo + ",";

                    //}
                    if (vs.Name != null && vs.Name != "")
                    {
                        mfrr += vs.Type + ":" + vs.Name + ",";

                    }


                    if (vs.RefNo != null && vs.RefNo != "")
                    {
                        mfrr += vs.Refflag + ":" + vs.RefNo + "/";
                        mfrr1 = mfrr.Remove(mfrr.Length - 1);
                    }


                }
            return mfrr1; ;
        }

        //public IEnumerable<Vendorsuppliers> getmfr(Prosol_Datamaster data)
        //{
        //    var lst = new List<Vendorsuppliers>();
        //    if (data.Vendorsuppliers.Count > 0)
        //    {

        //        foreach (Vendorsuppliers vs in data.Vendorsuppliers)
        //        {
        //            var obj = new Vendorsuppliers();
        //            obj.Name =vs.Name;
        //            obj.RefNo=vs.RefNo;
        //            obj.Refflag = vs.Refflag;
        //            obj.Type = vs.Type;
        //            lst.Add(obj);
        //        }


        //    }
        //    return lst;
        //}


        public IEnumerable<Prosol_Plants> getplant()
        {
            var query =  Query.EQ("Islive", true);
            var mxplnt = _UserplntlistRepository.FindAll(query).ToList();
            return mxplnt;
        }

        public IEnumerable<Prosol_Users> getuser(string role, string[] plants)
        {


            string[] userflds = { "UserName", "Userid" };
            var fields = Fields.Include(userflds).Exclude("_id");
            var query = Query.And(Query.EQ("Roles.Name", role), Query.In("Plantcode", new BsonArray(plants)), Query.EQ("Islive", "Active"));
            var mxplnt = _UserlistRepository.FindAll(fields, query).ToList();
            return mxplnt;
        }

        public IEnumerable<Prosol_Users> getuseronly(string username)
        {
            string[] userflds = { "UserName", "Userid" };
            var fields = Fields.Include(userflds).Exclude("_id");
            var query = Query.And(Query.EQ("UserName", username), Query.EQ("Islive", "Active"));
            var mxplnt = _UserlistRepository.FindAll(fields, query).ToList();
            return mxplnt;
        }

        public IEnumerable<Prosol_Datamaster> getcode(string role)
        {
            string[] itemfld = { "Itemcode" };
            var fields = Fields.Include(itemfld).Exclude("_id");
            var query = Query.EQ("ItemStatus",Convert.ToInt16(role));
            var codelist = _UserreportRepository.FindAll(fields, query).ToList();
            return codelist;
        }

        public IEnumerable<Prosol_Departments> getdepartment()
        {
            var sort = SortBy.Ascending("Departmentname");
            string[] depfield = { "Departmentname" };
            var fields = Fields.Include(depfield).Exclude("_id");
            var gtdepartment = _UserdeplistRepository.FindAll(fields).ToList();
            return gtdepartment;
        }

     
        public IEnumerable<Prosol_Datamaster> trackmulticodelist(string codestr)
        {
          //  string[] search_field = { "Itemcode", "Legacy", "Noun", "Modifier", "Legacy2" };
           // var fields = Fields.Include(search_field).Exclude("_id");
            var query = Query.Or(Query.EQ("Itemcode", codestr), (Query.EQ("Materialcode", codestr)));
            var getdata = _UserreportRepository.FindAll(query).ToList();
            return getdata;
        }

        public IEnumerable<Prosol_ERPInfo> getplant(string Itemcode)
        {
            var query = Query.EQ("Itemcode", Itemcode);
            var getplant = _ERPInfoRepository.FindAll(query).ToList();
            return getplant;

        }
        public IEnumerable<Prosol_Datamaster> bulkv()
        {
            var get = _UserreportRepository.FindAll().ToList();

            return get;

        }
        
        public IEnumerable<Prosol_Charateristics> bulkchar()
        {

            var sort = SortBy.Ascending("Noun");

            //  string[] depfield = { "Noun", "Modifier", "Characteristic", "Values", "_id" };
            // var fields = Fields.Include(depfield);

            var get = _charRepository.FindAll(sort).ToList();
            return get;

        }
        public IEnumerable<Prosol_Charateristics> bulkchar1(string cat,string cat1)
        {


           string[] str1 = { "Noun", "Modifier" ,"Characteristic", "Values", "_id" };
            var fields = Fields.Include(str1);
            var query = Query.And(Query.EQ("Noun", cat), Query.EQ("Modifier", cat1));

            var val = _charRepository.FindAll(fields,query).ToList();
            return val;
        }



        public Prosol_Abbrevate getvalue(string id)
        {
        var q = Query.EQ("_id", new ObjectId(id));
        var q1 = _AbbrevateRepository.FindOne(q);
            return q1;

    }

        public IEnumerable<Prosol_Datamaster> bulkvv(string term)
        {
            string[] str1 = { "Itemcode", "Vendorsuppliers" };
            var fields = Fields.Include(str1);

            if (term.Contains('*'))
            {


                var QryLst = new List<IMongoQuery>();

                string[] sepArr = term.Split('*');
                if (sepArr.Length > 2)
                {
                    foreach (string str in sepArr)
                    {
                        if (str != "")
                        {
                            var Qry1 = Query.Matches("Itemcode", BsonRegularExpression.Create(new Regex(str.TrimStart().TrimEnd(), RegexOptions.IgnoreCase)));



                            QryLst.Add(Qry1);

                        }
                    }
                }
                else
                {
                    foreach (string str in sepArr)
                    {
                        if (str != "")
                        {
                            if (term.IndexOf('*') > 0)
                            {
                                //Start with
                                var Qry1 = Query.Matches("Itemcode", BsonRegularExpression.Create(new Regex(string.Format("^{0}", str.TrimStart().TrimEnd()), RegexOptions.IgnoreCase)));



                                QryLst.Add(Qry1);

                            }
                            else
                            {
                                //End with

                                var Qry1 = Query.Matches("Itemcode", BsonRegularExpression.Create(new Regex(str.TrimStart().TrimEnd() + "$", RegexOptions.IgnoreCase)));




                                QryLst.Add(Qry1);


                            }

                        }
                    }


                }
                var query = Query.Or(QryLst);
                var arrResult = _UserreportRepository.FindAll(fields, query).ToList();
                return arrResult;


            }
            else
            {


                    var qry1 = Query.EQ("Itemcode", term);

                var Result = _UserreportRepository.FindAll(qry1).ToList();
                return Result;
            }

        }

        public  List<Dictionary<string, object>> Trackload(string plant, string fromdate, string todate, string option)
        {
            IMongoQuery qury1, qury2, qury3, qury4, quryplnt;
            if (option == "Created")
            {
                qury1 = Query.EQ("ItemStatus", 6);
            }
            else if(option == "Duplicate")
            {
                qury1 = Query.And(Query.NE("Duplicates", BsonNull.Value), Query.NE("Duplicates", ""));
            }
            else if (option == "Request")
            {
                qury1 = Query.EQ("ItemStatus", 6);
            }
            
            else
            {
                qury1 = Query.EQ("ItemStatus", -1);


            }

            if (!string.IsNullOrEmpty(fromdate) && !string.IsNullOrEmpty(todate))
            {
              
                 var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                var date1 = DateTime.Parse(todate, new CultureInfo("en-US", true));
                 date1 = date1.AddDays(1);
                date1 = DateTime.SpecifyKind(date1, DateTimeKind.Utc);

                if (option == "Created")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }
                else if (option == "Duplicate")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }
                else if (option == "Request")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }
                else
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }



            }
            else if (!string.IsNullOrEmpty(fromdate) && string.IsNullOrEmpty(todate))
            {
                var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                if (option == "Created")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }
                else if (option == "Duplicate")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }
                else if (option == "Request")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }
                else
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }


            }
            else
            {
                qury2 = qury1;

            }
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            List<Dictionary<string, object>> rowsheader = new List<Dictionary<string, object>>();
            Dictionary<string, object> rowh;
            bool goo1;
            var mergelist1 = (dynamic)null;
            if (option == "Created")
            {
               // string[] flds = { "Itemcode", "CreatedOn", "Legacy", "Shortdesc", "Catalogue.Name", "Review.Name", "Release.Name", "Remarks" };
               // var fields = Fields.Include(flds).Exclude("_id");
                var datalist1 = _UserreportRepository.FindAll(qury2).ToList();
               // quryplnt = Query.EQ("Plant", plant);
               // var plntlist = _ERPInfoRepository.FindAll(quryplnt).ToList();
                //mergelist1 = (from data in datalist1 join plnt in plntlist on data.Itemcode equals plnt.Itemcode select new { Plant = plnt.Plant, Itemcode = data.Itemcode, Materialcode = data.Materialcode, CreatedOn = data.UpdatedOn, Legacy = data.Legacy, Shortdesc = data.Shortdesc, Longdesc = data.Longdesc, Catalogue = data.Catalogue != null ? data.Catalogue.Name : "", Review = data.Review != null ? data.Review.Name : "", Release = data.Release != null ? data.Release.Name : "", Remarks = data.Remarks }).ToList();
                //if (mergelist1.Count == 0)
                //{
                //    goo1 = false;
                //}
                //else
                //{
                //    goo1 = true;
                //}
                foreach (var cde in datalist1)
                {

                    row = new Dictionary<string, object>();
                  
                    row.Add("Item Code", cde.Itemcode);
                    row.Add("Material Code", cde.Materialcode);
                    if (cde.CreatedOn != null)
                    {
                        DateTime date = DateTime.Parse(Convert.ToString(cde.CreatedOn));
                        row.Add("CreatedOn", date.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("CreatedOn", "");
                    if (cde.UpdatedOn != null)
                    {
                        DateTime date = DateTime.Parse(Convert.ToString(cde.UpdatedOn));
                        row.Add("UpdatedOn", date.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("UpdatedOn", "");
                    row.Add("Legacy", cde.Legacy);
                    row.Add("Shortdesc", cde.Shortdesc);
                    row.Add("Longdesc", cde.Longdesc);
                    if(cde.Catalogue!=null)
                    row.Add("Cataloguer", cde.Catalogue.Name);
                    else row.Add("Cataloguer", "");

                    if (cde.Review != null)
                        row.Add("QC", cde.Review.Name);
                    else row.Add("QC", "");

                    if (cde.Release != null)
                        row.Add("QA", cde.Release.Name);
                    else row.Add("QA", "");

                  
                    row.Add("Remarks", cde.Remarks);                
                    rows.Add(row);
                }
            }else if (option == "Duplicate")
            {
                // string[] flds = { "Itemcode", "CreatedOn", "Legacy", "Shortdesc", "Catalogue.Name", "Review.Name", "Release.Name", "Remarks" };
                // var fields = Fields.Include(flds).Exclude("_id");
                var datalist1 = _UserreportRepository.FindAll(qury2).ToList();
                //quryplnt = Query.EQ("Plant", plant);
                //var plntlist = _ERPInfoRepository.FindAll(quryplnt).ToList();
                //mergelist1 = (from data in datalist1 join plnt in plntlist on data.Itemcode equals plnt.Itemcode orderby data.Itemcode select new { Plant = plnt.Plant, Itemcode = data.Itemcode, Materialcode=data.Materialcode, CreatedOn = data.UpdatedOn, Legacy = data.Legacy, Shortdesc = data.Shortdesc, Longdesc = data.Longdesc, Catalogue = data.Catalogue != null ? data.Catalogue.Name : "", Review = data.Review != null ? data.Review.Name : "", Release = data.Release != null ? data.Release.Name : "", Remarks = data.Remarks,Duplicate=data.Duplicates }).ToList();
                //if (mergelist1.Count == 0)
                //{
                //    goo1 = false;
                //}
                //else
                //{
                //    goo1 = true;
                //}
                foreach (var cde in datalist1)
                {

                    row = new Dictionary<string, object>();
                    row.Add("Item Code", cde.Itemcode);
                    row.Add("Material Code", cde.Materialcode);
                    if (cde.CreatedOn != null)
                    {
                        DateTime date = DateTime.Parse(Convert.ToString(cde.CreatedOn));
                        row.Add("CreatedOn", date.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("CreatedOn", "");
                    row.Add("Legacy", cde.Legacy);
                    row.Add("Shortdesc", cde.Shortdesc);
                    row.Add("Longdesc", cde.Longdesc);
                    if (cde.Catalogue != null)
                        row.Add("Cataloguer", cde.Catalogue.Name);
                    else row.Add("Cataloguer", "");

                    if (cde.Review != null)
                        row.Add("QC", cde.Review.Name);
                    else row.Add("QC", "");

                    if (cde.Release != null)
                        row.Add("QA", cde.Release.Name);
                    else row.Add("QA", "");
                    row.Add("Remarks", cde.Remarks);
                    row.Add("Duplicates", cde.Duplicates);
                    
                    //if (goo1 == true)
                    //{
                    //    row.Add("Plant", cde.Plant);
                    //}
                    rows.Add(row);
                }

            }
            else if (option == "Request")
            {
                var datalist1 = _UserreportRepository.FindAll(qury2).ToList();
                quryplnt = Query.EQ("Plant", plant);
                var plntlist = _ERPInfoRepository.FindAll(quryplnt).ToList();
                mergelist1 = (from data in datalist1 join plnt in plntlist on data.Itemcode equals plnt.Itemcode where (data.Maincode=="R" || data.Maincode == "D") orderby data.Itemcode select new { Plant = plnt.Plant, Itemcode = data.Itemcode, Materialcode = data.Materialcode, CreatedOn = data.UpdatedOn, Legacy = data.Legacy, Shortdesc = data.Shortdesc, Longdesc = data.Longdesc, Catalogue = data.Catalogue != null ? data.Catalogue.Name : "", Review = data.Review != null ? data.Review.Name : "", Release = data.Release != null ? data.Release.Name : "", Remarks = data.Remarks, Duplicate = data.Duplicates }).ToList();
                if (mergelist1.Count == 0)
                {
                    goo1 = false;
                }
                else
                {
                    goo1 = true;
                }
                foreach (var cde in mergelist1)
                {

                    row = new Dictionary<string, object>();
                    //  row.Add("Item Code", cde.Itemcode);
                    row.Add("Material Code", cde.Materialcode);
                    if (cde.CreatedOn != null)
                    {
                        DateTime date = DateTime.Parse(Convert.ToString(cde.CreatedOn));
                        row.Add("CreatedOn", date.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("CreatedOn", "");
                    row.Add("Legacy", cde.Legacy);
                    row.Add("Shortdesc", cde.Shortdesc);
                    row.Add("Longdesc", cde.Longdesc);
                    row.Add("Cataloguer", cde.Catalogue.Name);
                    row.Add("QC", cde.Review.Name);
                    row.Add("QA", cde.Release.Name);
                    row.Add("Remarks", cde.Remarks);
                   // row.Add("Duplicates", cde.Duplicate);

                    if (goo1 == true)
                    {
                        row.Add("Plant", cde.Plant);
                    }
                    rows.Add(row);
                }
            }
            else
            {
                //  string[] flds = { "requestId", "itemId", "source", "plant", "requester", "requestedOn", "approver", "itemStatus", "approvedOn", "rejectedOn" };

                var datalist1 = _UserreportRepository.FindAll(qury2).ToList();
                quryplnt = Query.EQ("Plant", plant);
                var plntlist = _ERPInfoRepository.FindAll(quryplnt).ToList();
                mergelist1 = (from data in datalist1 join plnt in plntlist on data.Itemcode equals plnt.Itemcode orderby data.Itemcode select new { Plant = plnt.Plant, Itemcode = data.Itemcode,Materialcode=data.Materialcode, CreatedOn = data.UpdatedOn, Legacy = data.Legacy, Shortdesc = data.Shortdesc, Longdesc = data.Longdesc, Catalogue = data.Catalogue != null ? data.Catalogue.Name : "", Review = data.Review != null ? data.Review.Name : "", Release = data.Release != null ? data.Release.Name : "", Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, RejectedBy = data.RejectedBy != null ? data.RejectedBy.Name : "", RejectedOn = data.RejectedBy!=null?data.RejectedBy.UpdatedOn:null }).ToList();
                if (mergelist1.Count == 0)
                {
                    goo1 = false;
                }
                else
                {
                    goo1 = true;
                }

                foreach (var cde in mergelist1)
                {

                    row = new Dictionary<string, object>();
                   // row.Add("Item Code", cde.Itemcode);
                    row.Add("Material Code", cde.Materialcode);
                    if (cde.CreatedOn != null)
                    {
                        DateTime date = DateTime.Parse(Convert.ToString(cde.CreatedOn));
                        row.Add("CreatedOn", date.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("CreatedOn", "");
                    row.Add("Legacy", cde.Legacy);
                    row.Add("Shortdesc", cde.Shortdesc);
                    row.Add("Longdesc", cde.Longdesc);
                    row.Add("Cataloguer", cde.Catalogue.Name);
                    row.Add("QC", cde.Review.Name);
                    row.Add("QA", cde.Release.Name);

                    row.Add("Remarks", cde.Remarks);
                    row.Add("RevRemarks", cde.RevRemarks);
                    row.Add("RelRemarks", cde.RelRemarks);
                    row.Add("RejectedBy", cde.RejectedBy);
                    if(cde.RejectedOn != null)
                    {
                        DateTime date11 = DateTime.Parse(Convert.ToString(cde.RejectedOn));
                        row.Add("RejectedOn", date11.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("RejectedOn", "");

                    //row.Add("RejectedOn", cde.RejectedOn);

                    // row.Add("Duplicates", cde.Duplicate);

                    if (goo1 == true)
                    {
                        row.Add("Plant", cde.Plant);
                    }
                    rows.Add(row);
                }



            }
            return rows;
        }
        public List<Dictionary<string, object>> Delivery(string plant, string fromdate, string todate, string option)
        {
            IMongoQuery qury1, qury2, quryplnt;
            IMongoSortBy sortField = SortBy.Ascending("Noun");
            if (option == "Duplicate")
            {
                qury1 = Query.And(Query.EQ("ItemStatus", 6),Query.NE("Duplicates", BsonNull.Value), Query.NE("Materialcode", BsonNull.Value),
                    Query.NE("Materialcode", ""), Query.NE("Duplicates", ""),Query.NE("Shortdesc", ""), Query.NE("Shortdesc", BsonNull.Value));
            }
            else if (option == "Clarification")
            {
                qury1 = Query.EQ("ItemStatus", -1);
            }
            else if (option == "Unique")
            {
                qury1 = Query.And(Query.NE("Materialcode", BsonNull.Value),
                    Query.NE("Materialcode", ""), Query.EQ("ItemStatus", 6));
            }
            else if (option == "Critical")
            {
                qury1 = Query.And(Query.NE("Materialcode", BsonNull.Value),Query.NE("Materialcode", ""), Query.EQ("ItemStatus", 6), Query.NE("Shortdesc", ""), Query.NE("Shortdesc", BsonNull.Value));
            }
            else
            {
                qury1 = Query.EQ("ItemStatus", 6);
            }
            if (!string.IsNullOrEmpty(fromdate) && !string.IsNullOrEmpty(todate))
            {

                var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                var date1 = DateTime.Parse(todate, new CultureInfo("en-US", true));
                date1 = date1.AddDays(1);
                date1 = DateTime.SpecifyKind(date1, DateTimeKind.Utc);

                if (option == "Duplicate")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }
                else if (option == "Clarification")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }
                else if (option == "Unique")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }
                else if (option == "Critical")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }
                else
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                }



            }
            else if (!string.IsNullOrEmpty(fromdate) && string.IsNullOrEmpty(todate))
            {
                var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                if (option == "Duplicate")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }
                else if (option == "Clarification")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }
                else if (option == "Unique")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }
                else if (option == "Critical")
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }
                else
                {
                    qury2 = Query.And(qury1, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))));
                }


            }
            else
            {
                qury2 = qury1;

            }
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            List<Dictionary<string, object>> rowsheader = new List<Dictionary<string, object>>();
            Dictionary<string, object> rowh;
            bool goo1;
            var mergelist1 = (dynamic)null;
            if (option == "Duplicate")
            {
                var datalist1 = _UserreportRepository.FindAll(qury2,sortField).ToList();
                var filterlist = datalist1.Where(x => x.Itemcode != x.Materialcode &&  x.Materialcode == x.Duplicates && x.Duplicates != null &&
               x.Duplicates != "").ToList();
                List<Prosol_Datamaster> SortedList = filterlist.OrderBy(o => o.Materialcode).ToList();
                foreach (var cde in SortedList)
                {
                    row = new Dictionary<string, object>();
                    row.Add("MATERIALCODE", cde.Materialcode);
                    row.Add("ITEMCODE", cde.Itemcode);
                    row.Add("LEGACY", cde.Legacy);
                    var query = Query.And(Query.EQ("Noun", cde.Noun), Query.EQ("Modifier", cde.Modifier));
                    var x = _NMRepository.FindOne(query);
                    if (x != null)
                    {
                        if (x.Formatted == 0)
                        {
                            row.Add("CATEGORY", "OEM");
                        }
                        else if (x.Formatted == 1)
                        {
                            row.Add("CATEGORY", "GENERIC");
                        }
                        else if (x.Formatted == 2)
                        {
                            row.Add("CATEGORY", "OPM");

                        }
                    }
                    else
                    {
                        row.Add("CATEGORY", "");
                    }
                    row.Add("NOUN", cde.Noun);
                    row.Add("MODIFIER", cde.Modifier);
                    row.Add("SHORT DESCRIPTION", cde.Shortdesc);
                    row.Add("UOM", cde.UOM);
                    row.Add("LONG DESCRIPTION", cde.Longdesc);
                    if (cde.RevRemarks != null)
                    {
                        row.Add("REMARKS", cde.Remarks +"REV-REMARKS: " +cde.RevRemarks);
                    }
                    else

                    {
                        row.Add("REMARKS", cde.Remarks);
                    }
                       

                    rows.Add(row);
                }
            }
            else if (option == "Clarification")
            {

                var datalist1 = _UserreportRepository.FindAll(qury2,sortField).ToList();
                foreach (var cde in datalist1)
                {

                    row = new Dictionary<string, object>();
                    row.Add("ITEMCODE", cde.Itemcode);
                    row.Add("LEGACY", cde.Legacy);
                    if (cde.RevRemarks != null)
                    {
                        row.Add("REMARKS", cde.Remarks + "REV-REMARKS: " + cde.RevRemarks);
                    }
                    else

                    {
                        row.Add("REMARKS", cde.Remarks);
                    }
                    rows.Add(row);
                }

            }
            else if (option == "Unique")
            {
                var datalist1 = _UserreportRepository.FindAll(qury2).ToList();
                var filterlist = datalist1.Where(x => x.Materialcode == x.Itemcode).ToList();
                var fList = new List<Prosol_Datamaster>();
                var CriticalList = new List<Prosol_Datamaster>();
                foreach (Prosol_Datamaster pdm in filterlist)
                {
                    if(filterlist.Count(x => x.Shortdesc == pdm.Shortdesc) == 1)
                    {
                        fList.Add(pdm);
                    }                    

                }
                List<Prosol_Datamaster> SortedList = fList.OrderBy(o => o.Noun).ToList();
                foreach (var cde in SortedList)
                {

                    row = new Dictionary<string, object>();
                    row.Add("ITEMCODE", cde.Itemcode);
                    row.Add("MATERIALCODE", cde.Materialcode);
                    row.Add("LEGACY", cde.Legacy);
                    var query = Query.And(Query.EQ("Noun", cde.Noun), Query.EQ("Modifier", cde.Modifier));
                    var x = _NMRepository.FindOne(query);
                    if (x != null)
                    {
                        if (x.Formatted == 0)
                        {
                            row.Add("CATEGORY", "OEM");
                        }
                        else if (x.Formatted == 1)
                        {
                            row.Add("CATEGORY", "GENERIC");
                        }
                        else if (x.Formatted == 2)
                        {
                            row.Add("CATEGORY", "OPM");

                        }
                    }
                    else
                    {
                        row.Add("CATEGORY", "");
                    }
                    row.Add("NOUN", cde.Noun);
                    row.Add("MODIFIER", cde.Modifier);
                    row.Add("SHORT DESCRIPTION", cde.Shortdesc);
                    row.Add("UOM", cde.UOM);
                    row.Add("LONG DESCRIPTION", cde.Longdesc);
                    if (cde.RevRemarks != null)
                    {
                        row.Add("REMARKS", cde.Remarks + "REV-REMARKS: " + cde.RevRemarks);
                    }
                    else

                    {
                        row.Add("REMARKS", cde.Remarks);
                    }
                    rows.Add(row);
                }
            }
            else if (option == "Critical")
            {
                var datalist1 = _UserreportRepository.FindAll(qury2).ToList();
                var filterlist = datalist1.Where(x => x.Materialcode == x.Itemcode).ToList();
                var fList = new List<Prosol_Datamaster>();
                var CriticalList = new List<Prosol_Datamaster>();
                foreach (Prosol_Datamaster pdm in filterlist)
                {
                    if (filterlist.Count(x => x.Shortdesc == pdm.Shortdesc) > 1)
                    {
                        fList.Add(pdm);
                    }
                    

                }
                List<Prosol_Datamaster> SortedList = fList.OrderBy(o => o.Noun).ToList();
                foreach (var cde in SortedList)
                {

                    row = new Dictionary<string, object>();
                    row.Add("ITEMCODE", cde.Itemcode);
                    row.Add("MATERIALCODE", cde.Materialcode);
                    row.Add("LEGACY", cde.Legacy);
                    var query = Query.And(Query.EQ("Noun", cde.Noun), Query.EQ("Modifier", cde.Modifier));
                    var x = _NMRepository.FindOne(query);
                    if (x != null)
                    {
                        if (x.Formatted == 0)
                        {
                            row.Add("CATEGORY", "OEM");
                        }
                        else if (x.Formatted == 1)
                        {
                            row.Add("CATEGORY", "GENERIC");
                        }
                        else if (x.Formatted == 2)
                        {
                            row.Add("CATEGORY", "OPM");

                        }
                    }
                    else
                    {
                        row.Add("CATEGORY", "");
                    }
                    row.Add("NOUN", cde.Noun);
                    row.Add("MODIFIER", cde.Modifier);
                    row.Add("SHORT DESCRIPTION", cde.Shortdesc);
                    row.Add("UOM", cde.UOM);
                    row.Add("LONG DESCRIPTION", cde.Longdesc);
                    if (cde.RevRemarks != null)
                    {
                        row.Add("REMARKS", cde.Remarks + "REV-REMARKS: " + cde.RevRemarks);
                    }
                    else

                    {
                        row.Add("REMARKS", cde.Remarks);
                    }
                    rows.Add(row);
                }
            }
            else
            {
                //  string[] flds = { "requestId", "itemId", "source", "plant", "requester", "requestedOn", "approver", "itemStatus", "approvedOn", "rejectedOn" };

                var datalist1 = _UserreportRepository.FindAll(qury2).ToList();
                quryplnt = Query.EQ("Plant", plant);
                var plntlist = _ERPInfoRepository.FindAll(quryplnt).ToList();
                mergelist1 = (from data in datalist1 join plnt in plntlist on data.Itemcode equals plnt.Itemcode orderby data.Itemcode select new { Plant = plnt.Plant, Itemcode = data.Itemcode, Materialcode = data.Materialcode, CreatedOn = data.UpdatedOn, Legacy = data.Legacy, Shortdesc = data.Shortdesc, Longdesc = data.Longdesc, Catalogue = data.Catalogue != null ? data.Catalogue.Name : "", Review = data.Review != null ? data.Review.Name : "", Release = data.Release != null ? data.Release.Name : "", Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, RejectedBy = data.RejectedBy != null ? data.RejectedBy.Name : "", RejectedOn = data.RejectedBy != null ? data.RejectedBy.UpdatedOn : null }).ToList();
                if (mergelist1.Count == 0)
                {
                    goo1 = false;
                }
                else
                {
                    goo1 = true;
                }

                foreach (var cde in mergelist1)
                {

                    row = new Dictionary<string, object>();
                    // row.Add("Item Code", cde.Itemcode);
                    row.Add("Material Code", cde.Materialcode);
                    if (cde.CreatedOn != null)
                    {
                        DateTime date = DateTime.Parse(Convert.ToString(cde.CreatedOn));
                        row.Add("CreatedOn", date.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("CreatedOn", "");
                    row.Add("Legacy", cde.Legacy);
                    row.Add("Shortdesc", cde.Shortdesc);
                    row.Add("Longdesc", cde.Longdesc);
                    row.Add("Cataloguer", cde.Catalogue.Name);
                    row.Add("QC", cde.Review.Name);
                    row.Add("QA", cde.Release.Name);

                    row.Add("Remarks", cde.Remarks);
                    row.Add("RevRemarks", cde.RevRemarks);
                    row.Add("RelRemarks", cde.RelRemarks);
                    row.Add("RejectedBy", cde.RejectedBy);
                    if (cde.RejectedOn != null)
                    {
                        DateTime date11 = DateTime.Parse(Convert.ToString(cde.RejectedOn));
                        row.Add("RejectedOn", date11.ToString("dd/MM/yyyy"));
                    }
                    else row.Add("RejectedOn", "");

                    //row.Add("RejectedOn", cde.RejectedOn);

                    // row.Add("Duplicates", cde.Duplicate);

                    if (goo1 == true)
                    {
                        row.Add("Plant", cde.Plant);
                    }
                    rows.Add(row);
                }



            }

            return rows;
        }

        public IEnumerable<Prosol_ERPInfo> Getmaterialtypedata(string Materialtype)
        {

            var query = Query.EQ("Materialtype", Materialtype);
            var get = _ERPInfoRepository.FindAll(query).ToList();
            return get;

        }
        public IEnumerable<Prosol_Datamaster> getalldata(string plant, string fromdate, string todate)
        {
            var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
            date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
            var date1 = DateTime.Parse(todate, new CultureInfo("en-US", true));
            date1 = date1.AddDays(1);
            date1 = DateTime.SpecifyKind(date1, DateTimeKind.Utc);
            var query = Query.And(Query.EQ("ItemStatus", 6), Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
           
            var get = _UserreportRepository.FindAll(query).ToList();
            return get;

        }
        public List<Dictionary<string, object>> loadstatusdata(string[] options, string fromdate, string todate)
        {
            //  var QryLst = new List<IMongoQuery>();
          //  int[] gtoption1 = { };
            List<BsonValue> tets1 = new List<BsonValue>();
          
           
            var requestdata = new List<Prosol_Request>();
            var fields = Fields.Exclude("_id");
            var date = DateTime.Parse(fromdate, new CultureInfo("en-US", true));
            date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
            var date1 = DateTime.Parse(todate, new CultureInfo("en-US", true));
            date1 = date1.AddDays(1);
            date1 = DateTime.SpecifyKind(date1, DateTimeKind.Utc);
            foreach (string x in options)
            {

                if (x == "Request")
                {
                    var query1 = Query.And(Query.EQ("itemStatus", "pending"), Query.GTE("requestedOn", BsonDateTime.Create(date)), Query.LTE("requestedOn", BsonDateTime.Create(date1)));
                    requestdata = _UserrequestRepository.FindAll(query1).ToList();
                }
                else if (x == "Approve")
                {
                    tets1.Add(0);
                   // var query = Query.EQ("ItemStatus", 0);
                   //  QryLst.Add(query);
                }
                else if (x == "Catalogue")
                {
                    //var query = Query.EQ("ItemStatus", 1);
                    //QryLst.Add(query);
                    tets1.Add(1);
                }
                else if (x == "QA")
                {
                    //var query = Query.A nd(Query.EQ("ItemStatus", 2), Query.EQ("ItemStatus", 3));
                    // QryLst.Add(query);
                    tets1.Add(2);
                    tets1.Add(3);
                }
                else if (x == "QC")
                {
                    //var query = Query.And(Query.EQ("ItemStatus", 4), Query.EQ("ItemStatus", 5));
                    //QryLst.Add(query);
                    tets1.Add(4);
                    tets1.Add(5);
                }
                else if (x == "Released")
                {
                    //var query = Query.EQ("ItemStatus", 6);
                    //QryLst.Add(query);
                    tets1.Add(6);
                }
            }
            
            var users = _UserlistRepository.FindAll().ToList();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            List<Dictionary<string, object>> rowsheader = new List<Dictionary<string, object>>();
            Dictionary<string, object> rowh;
            if (requestdata.Count > 0)
            {
                foreach (var code in requestdata)
                {
                    var user = users.Where(x => x.Userid == code.requester).ToList();
                    row = new Dictionary<string, object>();
                    row.Add("Itemcode", code.itemId);
                    row.Add("Material code", "");
                    row.Add("Noun", "");
                    row.Add("Modifier", "");
                    row.Add("UOM", "");
                    row.Add("Legacy", code.source);
                    row.Add("PvData", "");
                    row.Add("Shortdesc", "");
                    row.Add("Longdesc", "");
                    row.Add("Additionalinfo", "");
                    row.Add("ItemStatus", "Request");
                    row.Add("Vendor Details", "");
                    row.Add("Equipment Details", "");
                    row.Add("Requester", user[0].UserName);
                    row.Add("Req-Createdon", code.requestedOn);
                    row.Add("Cataloguer", "");
                    row.Add("Cat-Createdon", "");
                    row.Add("Reviewer", "");
                    row.Add("Rev-Createdon", "");
                    row.Add("Releaser", "");
                    row.Add("Rel-Createdon", "");
                    row.Add("RejectedBy", "");
                    row.Add("RejectedOn", "");

                    row.Add("Cat.Remarks", "");
                    row.Add("Rev.Remarks", "");
                    row.Add("Rel.Remarks", "");
                    row.Add("Plant", "");
                    rows.Add(row);
                }
            }
            bool goo;
            var mergelist = (dynamic)null;


            if (tets1.Count() > 0)
            {
                var query2 = Query.In("ItemStatus", tets1.ToArray());
                var query3 = Query.And(query2, Query.GTE("UpdatedOn", BsonDateTime.Create(date)), Query.LTE("UpdatedOn", BsonDateTime.Create(date1)));
                var datalist = _UserreportRepository.FindAll(fields, query3).ToList();

                //  mergelist = datalist;
                mergelist = (from data in datalist select new { Itemcode = data.Itemcode, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, UOM = data.UOM, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, RevRemarks = data.RevRemarks, RelRemarks = data.RelRemarks, Additionalinfo = data.Additionalinfo }).ToList();
                // mergelist = (from data in datalist join nm in NM_master on data.Noun equals nm.Noun where data.Modifier == nm.Modifier select new { Itemcode = data.Itemcode, Formatted = nm.Formatted, Materialcode = data.Materialcode, Noun = data.Noun, Modifier = data.Modifier, Legacy = data.Legacy, Longdesc = data.Longdesc, Legacy2 = data.Legacy2, Manufacturer = getmfr(data), Equipment = getequip(data), /*Partno = getpartno(data),*/ Shortdesc = data.Shortdesc, Characteristics = data.Characteristics, Catalogue = data.Catalogue, Review = data.Review, Release = data.Release, ItemStatus = data.ItemStatus, RejectedBy = data.RejectedBy, Remarks = data.Remarks, Soureurl = data.Soureurl }).ToList();
                goo = false;

                int flg = 0;
                foreach (var code in mergelist)
                {
                    row = new Dictionary<string, object>();
                    row.Add("Itemcode", code.Itemcode);
                    row.Add("Material code", code.Materialcode);

                    if (code.Noun != null && code.Noun != "")
                        row.Add("Noun", code.Noun);
                    else row.Add("Noun", "");

                    if (code.Modifier != null && code.Modifier != "")
                        row.Add("Modifier", code.Modifier);
                    else row.Add("Modifier", "");

                    if (code.UOM != null && code.UOM != "")
                        row.Add("UOM", code.UOM);
                    else row.Add("UOM", "");

                    if (code.Legacy != null && code.Legacy != "")
                        row.Add("Legacy", code.Legacy);
                    else row.Add("Legacy", "");

                    if (code.Legacy2 != null && code.Legacy2 != "")
                        row.Add("PvData", code.Legacy2);
                    else row.Add("PvData", "");

                    if (code.Shortdesc != null && code.Shortdesc != "")
                        row.Add("Shortdesc", code.Shortdesc);
                    else row.Add("Shortdesc", "");

                    if (code.Longdesc != null && code.Longdesc != "")
                        row.Add("Longdesc", code.Longdesc);
                    else row.Add("Longdesc", "");

                    if (code.Additionalinfo != null && code.Additionalinfo != "")
                        row.Add("Additionalinfo", code.Additionalinfo);
                    else row.Add("Additionalinfo", "");

                    if (code.ItemStatus == 0 || code.ItemStatus == 1)
                        row.Add("ItemStatus", "Catalogue");
                    else if (code.ItemStatus == 2 || code.ItemStatus == 3)
                        row.Add("ItemStatus", "QC");
                    else if (code.ItemStatus == 4 || code.ItemStatus == 5)
                        row.Add("ItemStatus", "QA");
                    else if (code.ItemStatus == 6)
                        row.Add("ItemStatus", "Released");
                    else if (code.ItemStatus == -1)
                        row.Add("ItemStatus", "Clarification");
                    else row.Add("ItemStatus", "");

                    if (code.Manufacturer != null && code.Manufacturer != "")

                        row.Add("Vendor Details", code.Manufacturer);
                    else row.Add("Vendor Details", "");

                    if (code.Equipment != null && code.Equipment != "")
                        row.Add("Equipment Details", code.Equipment);
                    else row.Add("Equipment Details", "");
                    if (code.Catalogue != null)
                    {
                        row.Add("Cataloguer", code.Catalogue.Name);
                        if (code.Catalogue.UpdatedOn != null)
                        {
                            row.Add("Cat-Createdon", code.Catalogue.UpdatedOn);
                        }
                        else
                            row.Add("Cat-Createdon", "");
                    }
                    else
                    {
                        row.Add("Cataloguer", "");
                        row.Add("Cat-Createdon", "");
                    }



                    if (code.Review != null)
                    {
                        row.Add("Reviewer", code.Review.Name);
                        if (code.Review.UpdatedOn != null)
                        {
                            row.Add("Rev-Createdon", code.Review.UpdatedOn);
                        }
                        else
                            row.Add("Rev-Createdon", "");

                    }
                    else
                    {
                        row.Add("Reviewer", "");
                        row.Add("Rev-Createdon", "");
                    }


                    if (code.Release != null)
                    {
                        row.Add("Releaser", code.Release.Name);
                        if (code.Release.UpdatedOn != null)
                        {
                            row.Add("Rel-Createdon", code.Release.UpdatedOn);
                        }
                        else
                            row.Add("Rel-Createdon", "");

                    }
                    else
                    {
                        row.Add("Releaser", "");
                        row.Add("Rel-Createdon", "");
                    }


                    if (code.RejectedBy != null)
                    {
                        row.Add("RejectedBy", code.RejectedBy.Name);
                        if (code.RejectedBy.UpdatedOn != null)
                        {
                            row.Add("RejectedOn", code.RejectedBy.UpdatedOn);
                        }
                        else
                            row.Add("RejectedOn", "");

                    }
                    else
                    {
                        row.Add("RejectedBy", "");
                        row.Add("RejectedOn", "");
                    }
                    if (code.Remarks != null)
                    {
                        row.Add("Cat.Remarks", code.Remarks);
                    }
                    else
                        row.Add("Cat.Remarks", "");

                    if (code.RevRemarks != null)
                    {
                        row.Add("Rev.Remarks", code.RevRemarks);
                    }
                    else
                        row.Add("Rev.Remarks", "");

                    if (code.RelRemarks != null)
                    {
                        row.Add("Rel.Remarks", code.RelRemarks);
                    }
                    else
                        row.Add("Rel.Remarks", "");

                    if (goo == true)
                    {
                        if (code.Plant != null)
                            row.Add("Plant", code.Plant);
                        else row.Add("Plant", "");
                    }

                    if (code.Characteristics != null)
                    {
                        int i = 1;
                        foreach (var at in code.Characteristics)
                        {
                            row.Add("Attribute" + i, at.Characteristic);
                            row.Add("Value" + i, at.Value);
                            row.Add("UOM" + i, at.UOM);
                            // row.Add("Source" + i, at.Source);
                            //  row.Add("SourceUrl" + i, at.SourceUrl);
                            i++;
                        }
                    }
                    rows.Add(row);
                }
            }
            return rows;
        }

    }
}
