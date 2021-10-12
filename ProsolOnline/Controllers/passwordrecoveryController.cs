using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Mvc;
using Prosol.Core.Interface;
using Prosol.Core.Model;
using Prosol.Core;

namespace ProsolOnline.Controllers
{
    public class passwordrecoveryController : Controller
    {

        private readonly I_pwRecovery _pwrecovery;
        private readonly IEmailSettings _Emailservc;


        public passwordrecoveryController(I_pwRecovery pwrecovery, IEmailSettings Emailservc)
        {
            _pwrecovery = pwrecovery;
            _Emailservc = Emailservc;
        }
      
        // GET: passwordrecovery
        public ActionResult Index()
        {
            return View("sendemail");
        }
        public ActionResult updatepasswordpage()
        {
            return View("updatepassword");
        }
        public JsonResult sendemail_forPR(string email)
        {
            var Data = _pwrecovery.sendemail_forPR(email).ToList();
            if (Data.Count > 0)
            {
                string to_mail = Data[0].EmailId;
                string userid = Data[0].Userid;

                Random rnd = new Random();
                int rndm = rnd.Next(30000);

                bool value = _pwrecovery.saveRandom(userid, rndm);

                if (value != true)
                    return Json(new { result = false }, JsonRequestBehavior.AllowGet);
               

                // email email1 = new email();

               // email1.email_to = to_mail;  
               // email1.email_from = "codasol.madras@gmail.com";    
                string subject = "Password Recovery for Prosol";      
                string body = "Use the below link to reset your prosol password"+ "<html><body> <a href=http://"+ HttpContext.Request.Url.Host+"/passwordrecovery/updatepasswordpage#?num$123=" + userid + "&num$coda=" + rndm+" > Changepassword </a></body></html>";
             //   string body = "Use the below link to reset your prosol password" + "<html><body> <a href=http://localhost:15505//passwordrecovery/updatepasswordpage#?num$123=" + userid + "&num$coda=" + rndm + " > Changepassword </a></body></html>";
                //  email1.IsBodyHtml = true;    
                //  email1.host = "smtp.gmail.com";     
                // email1.enablessl = true;      
                //email1.UseDefaultCredentials = true;     
                // email1.Port = 587;    
                // email1.password = "codasolwestmambalam";

                // EmailSettingService ems = new EmailSettingService();
                bool val = _Emailservc.sendmail(to_mail, subject, body);
                return Json(new { result = true }, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(new { result = false }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult updatepassword(string pswd, string userid,int rndm)
        {
            bool value = _pwrecovery.updatepassword(pswd,userid,rndm);

            if (value == true)
            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
            else
                return Json(new { result = false }, JsonRequestBehavior.AllowGet);
        }



        }
}