using Newtonsoft.Json;
using ProsolOnline.Models;
using Prosol.Core.Interface;
using Prosol.Core.Model;
using Prosol.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.IO;
using ClosedXML.Excel;

namespace ProsolOnline.Controllers
{
    public class BusinessPartnerController : Controller
    {

        private readonly IBusinessPartner _BusinessPartnerService;
        private readonly IMaster _MasterService;
        public BusinessPartnerController(IBusinessPartner BPservice, IMaster Masterservice)
        {
            _BusinessPartnerService = BPservice;
            _MasterService = Masterservice;

        }
        // GET: GeneralSettings
       
        public int CheckAccess(string pageName)
        {
            string pages = Convert.ToString(Session["access"]);
            if (!string.IsNullOrEmpty(pages))
            {
                String[] stringArray = pages.Split(',');
                if (Array.IndexOf(stringArray, pageName) > -1 || Array.IndexOf(stringArray, "SuperAdmin") > -1)
                    return 1;
                else return 0;

            }
            else return -1;

        }
        [Authorize]
        public ActionResult General()
        {
            if (CheckAccess("BP-General") == 1)
                return View();
            else if (CheckAccess("General") == 0)
                return View("Denied");
            else return View("Login");

        }
        [Authorize]
        public ActionResult Cust()
        {
            if (CheckAccess("BP-Customer") == 1)
                return View();
            else if (CheckAccess("BP-Customer") == 0)
                return View("Denied");
            else return View("Login");

        }
        [Authorize]
        public ActionResult Ven()
        {
            if (CheckAccess("BP-Vendor") == 1)
                return View();
            else if (CheckAccess("BP-Vendor") == 0)
                return View("Denied");
            else return View("Login");

        }
        [Authorize]
        public ActionResult creation()
        {

            if (CheckAccess("BP-Creation") == 1)
                return View();
            else if (CheckAccess("BP-Creation") == 0)
                return View("Denied");
            else return View("Login");

        }


        [HttpPost]
        public JsonResult InsertData()
        {
            var obj = Request.Form["data"];
            var Model = Newtonsoft.Json.JsonConvert.DeserializeObject<BPMasterModel>(obj);
            bool res = false;
            try
            {
                if (Model == null)
                    Model = new BPMasterModel();
                TryUpdateModel(Model);
                if (ModelState.IsValid)
                {  //UOM DB write
                    var mdl = new Prosol_BPMaster();
                    mdl._id = Model._id == null ? new MongoDB.Bson.ObjectId() : new MongoDB.Bson.ObjectId(Model._id);
                    mdl.Label = Model.Label;
                    mdl.Code = Model.Code;
                    mdl.Title = Model.Title;
                    res = _BusinessPartnerService.InsertData(mdl);
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        errors = ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                                 .Select(m => m.ErrorMessage).ToArray()
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                var log = new LogManager();
                log.LogError(log.GetType(), e);
                res = false;
            }
            return this.Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDataList(string label)
        {
            var objList = _BusinessPartnerService.GetDataList(label);
            var lst = new List<BPMasterModel>();
            foreach (Prosol_BPMaster mdl in objList)
            {
                var obj = new BPMasterModel();
                obj._id = mdl._id.ToString();
                obj.Label = mdl.Label;
                obj.Code = mdl.Code;
                obj.Title = mdl.Title;
                obj.Islive = mdl.Islive;
                lst.Add(obj);
            }
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetBPMaster()
        {
            var objList = _BusinessPartnerService.GetMaster();
            var lst = new List<BPMasterModel>();
            foreach (Prosol_BPMaster mdl in objList)
            {
                var obj = new BPMasterModel();
                obj._id = mdl._id.ToString();
                obj.Label = mdl.Label;
                obj.Code = mdl.Code;
                obj.Title = mdl.Title;
                obj.Islive = mdl.Islive;
                lst.Add(obj);
            }
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetMaterialMaster()
        {
            var objList = _MasterService.GetMaster();
            var lst = new List<MasterModel>();
            foreach (Prosol_Master mdl in objList)
            {
                var obj = new MasterModel();
                obj._id = mdl._id.ToString();
                obj.Label = mdl.Label;
                obj.Code = mdl.Code;
                obj.Title = mdl.Title;
                obj.Islive = mdl.Islive;
                lst.Add(obj);
            }
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }
        
        public JsonResult DelData(string id)
        {

            var res = _BusinessPartnerService.DelData(id);
            return this.Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult DisableData(string id, bool Islive)
        {

            var res = _BusinessPartnerService.DisableData(id, Islive);
            return this.Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult CreateBP(string sKey)
        {
            var res = false;
            if (sKey == "GEN")
            {
                var Gen = Request.Form["Genral"];
                var Genral = Newtonsoft.Json.JsonConvert.DeserializeObject<Prosol_BPGenralModel>(Gen);
                res = _BusinessPartnerService.CreateGen(Genral);
            }
            else if (sKey == "CUST")
            {
                var Cust = Request.Form["Cust"];
                var Customer = Newtonsoft.Json.JsonConvert.DeserializeObject<Prosol_BPCustomerModel>(Cust);
                var CustPF = Request.Form["CustPF"];
                var CustomerPF = JsonConvert.DeserializeObject<List<PartnerFun>>(CustPF);
                var PartnerFuns = new List<PartnerFunn>();
                foreach (PartnerFun ext in CustomerPF)
                {
                    var x = new PartnerFunn();
                    x.PartnerFunc = ext.PartnerFunc;
                    x.PartnerNo = ext.PartnerNo;
                    x.PartnerDesc = ext.PartnerDesc;
                    PartnerFuns.Add(x);
                }
                Customer.PartnerFuncs = PartnerFuns;
                res = _BusinessPartnerService.CreateCust(Customer);
            }
            else if (sKey == "VEN")
            {
                var Ven = Request.Form["Ven"];
                var Vendor = Newtonsoft.Json.JsonConvert.DeserializeObject<Prosol_BPVendorModel>(Ven);
               
                var VenPF = Request.Form["VenPF"];
                var VendorPF = JsonConvert.DeserializeObject<List<PartnerFun>>(VenPF);
                var PartnerFuns = new List<PartnerFunn>();
                foreach (PartnerFun ext in VendorPF)
                {
                    var x = new PartnerFunn();
                    x.PartnerFunc = ext.PartnerFunc;
                    x.PartnerNo = ext.PartnerNo;
                    x.PartnerDesc = ext.PartnerDesc;
                    PartnerFuns.Add(x);
                }
                Vendor.PartnerFuncs = PartnerFuns;
                res = _BusinessPartnerService.CreateVen(Vendor);
            }
            else if (sKey == "ALL")
            {
                var Gen = Request.Form["Genral"];
                var Genral = Newtonsoft.Json.JsonConvert.DeserializeObject<Prosol_BPGenralModel>(Gen);
                res = _BusinessPartnerService.CreateGen(Genral);
                var Cust = Request.Form["Cust"];
                var Customer = Newtonsoft.Json.JsonConvert.DeserializeObject<Prosol_BPCustomerModel>(Cust);
                var CustPF = Request.Form["CustPF"];
                var CustomerPF = JsonConvert.DeserializeObject<List<PartnerFun>>(CustPF);
                var PartnerFuns1 = new List<PartnerFunn>();
                foreach (PartnerFun ext in CustomerPF)
                {
                    var x = new PartnerFunn();
                    x.PartnerFunc = ext.PartnerFunc;
                    x.PartnerNo = ext.PartnerNo;
                    x.PartnerDesc = ext.PartnerDesc;
                    PartnerFuns1.Add(x);
                }
                Customer.PartnerFuncs = PartnerFuns1;
                var Ven = Request.Form["Ven"];
                var Vendor = Newtonsoft.Json.JsonConvert.DeserializeObject<Prosol_BPVendorModel>(Ven);
                var VenPF = Request.Form["VenPF"];
                var VendorPF = JsonConvert.DeserializeObject<List<PartnerFun>>(VenPF);
                var PartnerFuns2 = new List<PartnerFunn>();
                foreach (PartnerFun ext in VendorPF)
                {
                    var x = new PartnerFunn();
                    x.PartnerFunc = ext.PartnerFunc;
                    x.PartnerNo = ext.PartnerNo;
                    x.PartnerDesc = ext.PartnerDesc;
                    PartnerFuns2.Add(x);
                }
                Vendor.PartnerFuncs = PartnerFuns2;
                res = _BusinessPartnerService.CreateGen(Genral);
                res = _BusinessPartnerService.CreateCust(Customer);
                res = _BusinessPartnerService.CreateVen(Vendor);
            }
            return this.Json(res, JsonRequestBehavior.AllowGet);
            
        }
        public class total
        {
            public List<Prosol_BPGenralModel> GenList { set; get; }
            public List<Prosol_BPCustomerModel> CustList { set; get; }
            public List<Prosol_BPVendorModel> VenList { set; get; }

        }
        public JsonResult GetBPList()
        {
            var Gen = _BusinessPartnerService.GenList().ToList();
            var Ven = _BusinessPartnerService.VenList().ToList();
            var Cust = _BusinessPartnerService.CustList().ToList();
            var list = new total();
            list.GenList = Gen;
            list.CustList = Cust;
            list.VenList = Ven;
            return this.Json(list, JsonRequestBehavior.AllowGet);

        }
    }
}

    