using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using System.Threading.Tasks;
using System.Web.Mvc;
using Prosol.Core;
using ProsolOnline.Models;
using Prosol.Common;
using Prosol.Core.Interface;
using Prosol.Core.Model;
using ProsolOnline.ViewModel;
using System.ComponentModel.DataAnnotations;

using Newtonsoft.Json;

namespace ProsolOnline.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        private readonly IUserCreate _Usercreateservice;
        private readonly IUserAccess _Useraccessservice;       
        private readonly I_pwRecovery _Userpswrdrcvyservice;
        private readonly IEmailSettings _Emailservc;

        public UserController(IUserCreate usrservice,
            IUserAccess usracservice,           
            I_pwRecovery usrprcvyservice, IEmailSettings Emailservc)
        {
            _Usercreateservice = usrservice;         
            _Useraccessservice = usracservice;
            _Userpswrdrcvyservice = usrprcvyservice;

            _Emailservc = Emailservc;

        }

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
        public ActionResult Index()
        {
            if (CheckAccess("User") == 1)
                return View("Update");
            else if (CheckAccess("User") == 0)
                return View("Denied");
            else return View("Login");           
        }

        [Authorize]
        public ActionResult Changepassword()
        {
            string pages = Convert.ToString(Session["access"]);
            if (!string.IsNullOrEmpty(pages))
            {
                return View("Changepassword");
            }               
            else return View("Login");
           
        }

        [Authorize]
        public ActionResult MyProfile()
        {
                        string pages = Convert.ToString(Session["access"]);
            if (!string.IsNullOrEmpty(pages))
            {
                return View();
            }
            else return View("Login");  
        }

        [Authorize]
        /*Changepassword submit*/
        [HttpPost]
        public bool Changepasswordsubmit()
        {
            var Password = Request.Form["ConfirmPassword"];
            string id = Convert.ToString(Session["userid"]);
            var getresult = _Usercreateservice.Changepasswordsubmit(id, Password);
            return true;
        }

        /*profile submit*/
        [Authorize]
        [HttpPost]
        public bool Profilesubmit()
        {
            var FirstName = Request.Form["FirstName"];
            var LastName = Request.Form["LastName"];
            var Mobile = Request.Form["Mobile"];
            var file = Request.Files.Count > 0 ? Request.Files[0] : null;
            Prosol_Users prf = new Prosol_Users();
            string id = Convert.ToString(Session["userid"]);
            prf.FirstName = FirstName;
            prf.LastName = LastName;
            prf.Mobile = Mobile;
            var getresult = _Usercreateservice.Profilesubmit(id, prf,file);
            return true;
        }


        /*submit of user*/
        [Authorize]
        [HttpPost]
        public bool save()
        {
            var userlist = _Usercreateservice.showall_user().ToList();
            if (userlist != null && userlist.Count < 110)
            {
                var obj = Request.Form["obj"];
                UserCreateModel user = JsonConvert.DeserializeObject<UserCreateModel>(obj);
                var selection = Request.Form["selection"];
                var LstRole = JsonConvert.DeserializeObject<List<TargetExtn>>(selection);
                //  String[] gtUsertype = { };
                //   gtUsertype = tets.ToArray();
                //  user.Usertype = gtUsertype;
                var _dbLstRole = new List<TargetExn>();
                foreach (TargetExtn ext in LstRole)
                {
                    var _dbMdlRole = new TargetExn();
                    _dbMdlRole.Name = ext.Name;
                    _dbMdlRole.TargetId = ext.TargetId;
                    _dbLstRole.Add(_dbMdlRole);
                }
                var Modules = Request.Form["Modules"];
                List<string> Listmodules = new List<string>();
                string[] moduleArr = null;
                if (Modules != "null")
                {
                    Listmodules = JsonConvert.DeserializeObject<List<string>>(Modules);
                    moduleArr = Listmodules.ToArray();
                }


                var selection1 = Request.Form["selection1"];
                List<string> ListPlant = new List<string>();
                string[] plantArr = null;
                if (selection1 != "null")
                {
                    ListPlant = JsonConvert.DeserializeObject<List<string>>(selection1);
                    plantArr = ListPlant.ToArray();
                }

                // user.Plantcode = string.Join(",", plantArr);
                user.Plantcode = plantArr;
                user.Modules = moduleArr;
                int j;
                bool res;
                string getid = "";
                string[] str = { "Userid" };
                int max = _Usercreateservice.getmaxid();
                if (max > 0)
                    getid = Convert.ToString(max);
                else
                    getid = String.Empty;
                if (!string.IsNullOrEmpty(getid.ToString()))
                {
                    j = Convert.ToInt16(getid.ToString());
                    j = j + 1;
                    getid = Convert.ToString(j);
                }
                else
                {
                    int i = 0;
                    i = i + 1;
                    getid = Convert.ToString(i);
                }
                user.Userid = getid.ToString();
                user.Createdon = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                Prosol_Users usrcm = new Prosol_Users();
                usrcm.Userid = user.Userid;

                usrcm.Createdon = user.Createdon;
                // usrcm.Usertype = user.Usertype;
                usrcm.Roles = _dbLstRole;

                usrcm.Modules = user.Modules;
                usrcm.Islive = user.Islive;
                usrcm.Plantcode = user.Plantcode;
                usrcm.Departmentname = user.Departmentname;
                usrcm.FirstName = user.FirstName;
                usrcm.LastName = user.LastName;
                usrcm.EmailId = user.EmailId;
                usrcm.UserName = user.UserName;
                usrcm.Mobile = user.Mobile;
                usrcm.Password = user.Password;
                usrcm.Departmentname = user.Departmentname;
                if (moduleArr != null)
                {
                    foreach(string Module in moduleArr)
                    {
                        List<String> ttlpage = new List<String>();
                        for (int i = 0; i < LstRole.Count; i++)
                        {
                            string Role = LstRole[i].Name;
                            var mx = _Usercreateservice.getrolepage(Role, Module).ToList();
                            for (int t = 0; t < mx.Count; t++)
                            {
                                ttlpage.Add(mx[t].Pages);
                            }
                        }
                        var mxrp = _Useraccessservice.getpages().ToList();
                        for (int p = 0; p < mxrp.Count; p++)
                        {
                            for (int t = 0; t < ttlpage.Count; t++)
                            {
                                if (mxrp[p].Pages.ToString() == ttlpage[t].ToString())
                                {
                                    mxrp[p].Status = "1";
                                    break;
                                }
                            }
                        }
                        for (int f = 0; f < mxrp.Count; f++)
                        {
                            Prosol_Access acs = new Prosol_Access();
                            acs.Pages = mxrp[f].Pages;
                            acs.Status = mxrp[f].Status;
                            acs.Userid = user.Userid;
                            acs.Createdon = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                            var theResult1 = _Useraccessservice.submit(acs);
                        }
                    }

                    
                }
                bool theResult = Convert.ToBoolean(_Usercreateservice.save(usrcm));

                //  var data = _Userpswrdrcvyservice.sendemail_forPR(usrcm.EmailId).ToList(); 
                //  if (data.Count > 0)
                // {
                // string to_mail = data[0].EmailId; 
                //   string userid = data[0].Userid;
                // email email1 = new email();
                //  email1.email_to = to_mail;
                // email1.email_from = "codasol.madras@gmail.com";
                //   string subject = "Password Recovery for Prosol";
                //  string body = "Use the below link to reset your prosol password" + "<html><body> <a href=http://localhost:15505/passwordrecovery/updatepasswordpage#?userid=" + userid + " > Changepassword </a></body></html>";
                // email1.IsBodyHtml = true;
                //  email1.host = "smtp.gmail.com";
                // email1.enablessl = true;
                //  email1.UseDefaultCredentials = true;
                // email1.Port = 587;
                // email1.password = "codasolwestmambalam";
                //  EmailSettingService ems = new EmailSettingService();

                //  bool val = _Emailservc.sendmail(to_mail, subject, body);
                // }
                if (theResult == true && theResult == true)
                {
                    string to_mail = user.EmailId;
                    string subject = "Greetings From Prosol";
                    string body = "Use the below link to prosol" + "<html><body> <a href=http://" + HttpContext.Request.Url.Host + ">ProsolOnline Link</a><table><tr><td style='padding-left: 50px;padding-top: 10px;'>Username</td><td style='padding-left: 50px;padding-top: 10px;'>" + user.UserName + "</td></tr><tr><td style='padding-left: 50px;padding-top: 10px;'>Password</td><td style='padding-left: 50px;padding-top: 10px;'>" + user.Password + "</td></tr></table></body></html>";
                    bool val = _Emailservc.sendmail(to_mail, subject, body);

                    res = true;
                }
                else
                {
                    res = false;
                }

                return res;
            }
            else return false;
        }

        [Authorize]
        public ActionResult Update()
        {
            if (CheckAccess("User") == 1)
                return View("Update");
            else if (CheckAccess("User") == 0)
                return View("Denied");
            else return View("Login");
          
        }

        [Authorize]
        public ActionResult Access()
        {
            if (CheckAccess("Access permissions") == 1)
                return View("Access");
            else if (CheckAccess("Access permissions") == 0)
                return View("Denied");
            else return View("Login");
           
        }

        [Authorize]
        /*Checkusername avalibility of user*/
        [HttpGet]
        public JsonResult Checkusernameavalibility(string UserName)
        { 
            var gtusername = _Usercreateservice.checkusername_avalibility(UserName);
            return Json(gtusername, JsonRequestBehavior.AllowGet);
        }

        /*Checkmailid avalibility of user*/
        [Authorize]
        [HttpGet]
        public JsonResult Checkemailidavalibility(string EmailId)
        {
            var gtemailid = _Usercreateservice.checkemailid_avalibility(EmailId);
            return Json(gtemailid, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public JsonResult AutoCompleteUSN(string term)
        {
            var arrStr = _Useraccessservice.AutoSearchUserName(term);
            var result = arrStr.Select(i => new { i.UserName, i.Userid }).Distinct();
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult roles()
        {

            string var = Session["rolecat"].ToString();
            return this.Json(var == "cataloguer" ? true : false, JsonRequestBehavior.AllowGet);
        }
        /*Edit of user*/
        [Authorize]
        [HttpGet]
        public JsonResult drop(string id)
        {
            var mx = _Usercreateservice.getforupdate(id).ToList();
            UserCreateModel obj = new UserCreateModel();
            obj._id = mx[0]._id.ToString();
            obj.FirstName = mx[0].FirstName;
            obj.LastName = mx[0].LastName;
            obj.EmailId = mx[0].EmailId;
            obj.Mobile = mx[0].Mobile;
            obj.UserName = mx[0].UserName;
            obj.Password = mx[0].Password;
            obj.Userid = mx[0].Userid;
            obj.Islive = mx[0].Islive;
            obj.Departmentname = mx[0].Departmentname;
            //  obj.Usertype = mx[0].Usertype;
            obj.Modules = mx[0].Modules;
            obj.Plantcode = mx[0].Plantcode;
            var _dbLstRole = new List<TargetExtn>();
            foreach (TargetExn ext in mx[0].Roles)
            {
                var _dbMdlRole = new TargetExtn();
                _dbMdlRole.Name = ext.Name;
                _dbMdlRole.TargetId = ext.TargetId;
                _dbLstRole.Add(_dbMdlRole);
            }
            obj.Roles = _dbLstRole;
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        /*Update of user*/
        [Authorize]
        [HttpPost]
        public bool edit(string id)
        {
            bool res;
            bool theResult1;
            var obj1 = Request.Form["obj"];
            UserCreateModel useredt = JsonConvert.DeserializeObject<UserCreateModel>(obj1);

            var selection = Request.Form["selection"];
            //String[] gtUsertype = { };
            //List<string> tets = new List<string>();
            //tets = JsonConvert.DeserializeObject<List<string>>(selection);
            //gtUsertype = tets.ToArray();
            //useredt.Usertype = gtUsertype;
            var Modules = Request.Form["Modules"];
            List<string> Listmodules = new List<string>();
            string[] moduleArr = null;
            if (Modules != "null")
            {
                Listmodules = JsonConvert.DeserializeObject<List<string>>(Modules);
                moduleArr = Listmodules.ToArray();
            }
            var LstRole = JsonConvert.DeserializeObject<List<TargetExtn>>(selection);          
            var _dbLstRole = new List<TargetExn>();
            foreach (TargetExtn ext in LstRole)
            {
                var _dbMdlRole = new TargetExn();
                _dbMdlRole.Name = ext.Name;
                _dbMdlRole.TargetId = ext.TargetId;
                _dbLstRole.Add(_dbMdlRole);
            }


            var selection1 = Request.Form["selection1"];
            List<string> ListPlant = new List<string>();
            string[] plantArr=null;
            if (selection1 !=null)
            {
                ListPlant = JsonConvert.DeserializeObject<List<string>>(selection1);
                plantArr = ListPlant.ToArray();
            }
            Prosol_Users userup = new Prosol_Users();
            userup.Modules = moduleArr;
            userup.Createdon = useredt.Createdon;
            userup.Userid = id;
            userup._id = new ObjectId(useredt._id);
            // userup.Usertype = useredt.Usertype;
            userup.Roles = _dbLstRole;
            userup.Islive = useredt.Islive;
            userup.Plantcode = plantArr;
           // userup.Plantcode = string.Join(",", plantArr);
            // userup.Plantcode = useredt.Plantcode;
            
            userup.FirstName = useredt.FirstName;
            userup.LastName = useredt.LastName;
            userup.EmailId = useredt.EmailId;
            userup.UserName = useredt.UserName;
            userup.Mobile = useredt.Mobile;
            userup.Password = useredt.Password;
            userup.Departmentname = useredt.Departmentname;
            userup.Createdon = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            var getresult = _Usercreateservice.setforupdate(id, userup);
            var mx1 = _Useraccessservice.search(id).ToList();
            if (mx1.Count > 0)
            {
                _Useraccessservice.delete(id);
            }
            if (moduleArr != null)
            {
                foreach (string Module in moduleArr)
                {
                    List<String> ttlpage = new List<String>();
                    for (int i = 0; i < LstRole.Count; i++)
                    {
                        string Role = LstRole[i].Name;
                        var mx = _Usercreateservice.getrolepage(Role, Module).ToList();
                        for (int t = 0; t < mx.Count; t++)
                        {
                            ttlpage.Add(mx[t].Pages);
                        }
                    }
                    var mxrp = _Useraccessservice.getpages().ToList();
                    for (int p = 0; p < mxrp.Count; p++)
                    {
                        for (int t = 0; t < ttlpage.Count; t++)
                        {
                            if (mxrp[p].Pages.ToString() == ttlpage[t].ToString())
                            {
                                mxrp[p].Status = "1";
                                break;
                            }
                        }
                    }
                    for (int f = 0; f < mxrp.Count; f++)
                    {
                        Prosol_Access acs = new Prosol_Access();
                        acs.Pages = mxrp[f].Pages;
                        acs.Status = mxrp[f].Status;
                        acs.Userid = userup.Userid;
                        acs.Createdon = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                         theResult1 = _Useraccessservice.submit(acs);
                    }
                }
            }
                if (getresult == true)
                return res = true;
            else
                return res = false;
        }




        /*get pages of useraccess*/
        [Authorize]
        public JsonResult Getpages()
        {
            var mx = _Useraccessservice.getpages().ToList();
            return Json(mx, JsonRequestBehavior.AllowGet);
        }

        /*submit  of useraccess*/
        [Authorize]
        [HttpPost]
        public string submit(List<AccessModel> data,Prosol_Access acs,string term)
        {
            string res="";
            var userid = _Useraccessservice.AutoSearchUserName(term).ToList();
            string id = userid[0].Userid;
            var mx = _Useraccessservice.search(id).ToList();
            if(mx.Count > 0)
            {
                _Useraccessservice.delete(id);
            }
            for (int i = 0; i < data.Count; i++)
            {
                acs.Pages = data[i].Pages;
                acs.Status = data[i].Status;
                acs.Userid = id;
                acs._id = new ObjectId();
                var theResult1 = _Useraccessservice.submit(acs);
                res = "success";
            }
            return res;
        }

        /*get access of useraccess*/
        [Authorize]
        public JsonResult search(string term)
        {
            var userid = _Useraccessservice.AutoSearchUserName(term).ToList();
            string id = userid[0].Userid;
            var mx = _Useraccessservice.search(id).ToList();
            var mxgtall = _Useraccessservice.getpages().ToList();
            foreach (var hwId in mxgtall)
            {
                var res = (from slct in mx where (slct.Pages == hwId.Pages && slct.Status=="1") select slct).ToList();
                if (res.Count > 0) hwId.Status = "1";
            }
            return Json(mxgtall, JsonRequestBehavior.AllowGet);
        }

        /*get usersinformation of user*/
        [Authorize]
        public JsonResult showall_user()
        {
            var usrInfo = _Usercreateservice.getimage(Convert.ToString(Session["UserId"]));

            if (usrInfo.Plantcode != null)
            {
                var userlist = _Usercreateservice.showall_user(usrInfo.Plantcode).ToList();
                return Json(userlist, JsonRequestBehavior.AllowGet);

            }
            else
            {
                var userlist = _Usercreateservice.showall_user().ToList();
                return Json(userlist, JsonRequestBehavior.AllowGet);
            }           
        }

        /*get profilepicture of profile*/
        [Authorize]
        public JsonResult getprofilepicture()
        {
            string id = Convert.ToString(Session["userid"]);
            var getimage = _Usercreateservice.getimage(id);
            //return Json(getimage, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(getimage, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [Authorize]
        /*get userinformation of profile*/
        public JsonResult AccountUser()
        {
            string id = Convert.ToString(Session["userid"]);
            var getimage = _Usercreateservice.getimage(id);
            var actusr = _Usercreateservice.AccountUser(id).ToList();
            return Json(actusr, JsonRequestBehavior.AllowGet);
        }

        /*get userlist of user*/
        [Authorize]
        public JsonResult getuser(string plants)
        {

            List<string> ListPlant = new List<string>();
            ListPlant = JsonConvert.DeserializeObject<List<string>>(plants);
            var plantArr = ListPlant.ToArray();
           // string[] plantArr = { plants };

            var gtuser = _Usercreateservice.getuser(plantArr).ToList();
            return Json(gtuser, JsonRequestBehavior.AllowGet);
        }

        /*get plantlist of user*/
        [Authorize]
        public JsonResult getplant()
        {
            var gtplant = _Usercreateservice.getplant().ToList();
            var usrInfo = _Usercreateservice.getimage(Convert.ToString(Session["UserId"]));

            List<Prosol_Plants> lst = new List<Prosol_Plants>();
            foreach (Prosol_Plants mdl in gtplant)
            {
                if (usrInfo.Plantcode == null)
                {
                    lst.Add(mdl);
                }
                else
                {
                    foreach (string cd in usrInfo.Plantcode)
                    {
                        if (cd == mdl.Plantcode)
                        {
                            lst.Add(mdl);
                        }
                    }

                }
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        /*get department of user*/
        [Authorize]
        public JsonResult getdepartment()
        {
            var gtdepartment = _Usercreateservice.getdepartment().ToList();
            return Json(gtdepartment, JsonRequestBehavior.AllowGet);
        }

        /*get access pages of user of user*/
        [Authorize]
        [HttpGet]
        public JsonResult getuseraccesspages()
        {
            string id = Convert.ToString(Session["userid"]);
            var mx = _Useraccessservice.search(id).ToList();
            return Json(mx, JsonRequestBehavior.AllowGet);
        }

        /*get userinformation of user*/
        [Authorize]
        public JsonResult getUserinfo()
        {
            string id = Convert.ToString(Session["userid"]);
            var mx = _Usercreateservice.getforupdate(id).ToList();
            UserCreateModel obj = new UserCreateModel();
            if (mx.Count > 0)
            {
                obj.FirstName = mx[0].FirstName;
                obj.LastName = mx[0].LastName;
            }     
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getItemstatusMap(string itmcde)
        {
            var resList = _Usercreateservice.getItemstatusmap(itmcde);
            return Json(resList, JsonRequestBehavior.AllowGet);
        }

    }
}