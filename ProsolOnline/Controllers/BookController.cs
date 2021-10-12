using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

using Prosol.Core.Interface;
using Prosol.Core.Model;
using ProsolOnline.Models;
using Newtonsoft.Json;

namespace ProsolOnline.Controllers
{
    public class BookController : Controller
    {
        private readonly IMaster _masterService;
        private readonly IUserCreate _UserCreateService;
        private readonly IEmailSettings _EmailRepository;
        public BookController(IMaster masterService, IUserCreate UserCreateService, IEmailSettings EmailRepository)
        {
            _masterService = masterService;
            _UserCreateService = UserCreateService;
            _EmailRepository = EmailRepository;
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
        // GET: Book
        public ActionResult BookCreation()
        {
            if (CheckAccess("BookCreation") == 1)
                return View();
            else if (CheckAccess("BookCreation") == 0)
                return View("Denied");
            else return View("Login");

        }
        [Authorize]
        // GET: Book/Details/5
        public ActionResult Bookdictonary()
        {

            if (CheckAccess("Bookdictonary") == 1)
                return View();
            else if (CheckAccess("Bookdictonary") == 0)
                return View("Denied");
            else return View("Login");

        }

        [HttpPost]
        public JsonResult InsertDataplnt1()
        {
            var obj1 = Request.Form["obj"];

            var BookName1 = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ProsolBook>>(obj1);
            var Book = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ViewBook>>(obj1);
            var usrInfo = _UserCreateService.getimage(Convert.ToString(Session["UserId"]));
            var targetinfo = _UserCreateService.gettarinfo(usrInfo.Roles[0].TargetId);
            var mdl = new ProsolBook();


            bool res = true;
            res = _masterService.InsertDataplnt1(BookName1, mdl);
            string to_mail = targetinfo.EmailId;

            string subject = "Book info Created";


            string body = "Test Mail";

            bool val = _EmailRepository.sendmail(to_mail, subject, body);
          //  return val;
            return this.Json(res, JsonRequestBehavior.AllowGet);

        }
        [Authorize]
        public JsonResult Bookdata_Upload()
        {
            int res = 0;
            var file = Request.Files.Count > 0 ? Request.Files[0] : null;
            if (file != null && file.ContentLength > 0)
            {
                if (file.FileName.EndsWith(".xls") || file.FileName.EndsWith(".xlsx"))
                {
                    res = _masterService.BulkBook(file);
                }
            }
            return this.Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult updatedata()
        {
            var obj1 = Request.Form["obj"];


            var BookName1 = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ProsolBook>>(obj1);
            var BookName = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ViewBook>>(obj1);

            bool res = false;

            //UOM DB write
            var mdl = new ProsolBook();

            //mdl._id = Model._id == null ? new MongoDB.Bson.ObjectId() : new MongoDB.Bson.ObjectId(Model._id);
            //mdl.BookName = BookName1.BookName;
            //mdl.AuthorName = BookName1.AuthorName;
            //mdl.Book_Price = BookName1.Book_Price;
            //mdl.Book_Pages = BookName1.Book_Price;


            res = _masterService.updatedata(BookName1, mdl);



            return this.Json(res, JsonRequestBehavior.AllowGet);



        }
        [Authorize]


        // GET: Book/Create
        public ActionResult Create()
        {
            return View();
        }
        public JsonResult GetDataLists()
        {

            var objList = _masterService.GetDataLists();
            var lst = new List<ViewBook>();


            foreach (ProsolBook mdl in objList)
            {
                if (mdl.Book != null)
                {
                    var obj = new ViewBook();
                    obj._id = mdl._id;
                    obj.Book_id = mdl.Book_id;
                    obj.Book = mdl.Book;
                    obj.Authname = mdl.Authname;
                    obj.Price = mdl.Price;
                    lst.Add(obj);
                }

            }
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }
        [Authorize]
        public JsonResult deletedata(string id)
        {

            var res = _masterService.deletedata(id);
            return this.Json(res, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDataLists11()
        {

            var objList = _masterService.GetDataLists11();
            var lst = new List<ViewBook>();


            foreach (ProsolBook mdl in objList)
            {
                if (mdl.Version != null)
                {
                    var obj = new ViewBook();
                    obj._id = mdl._id;
                    obj.Book_id = mdl.Book_id;
                    obj.Book = mdl.Book;
                    obj.Authname = mdl.Authname;
                    obj.Price = mdl.Price;
                    obj.Version = mdl.Version;
                    lst.Add(obj);
                }

            }
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDataLists3()
        {

            var objList = _masterService.GetDataLists3();
            var lst = new List<ViewBook>();


            foreach (ProsolBook mdl in objList)
            {
                if (mdl.Version != null)
                {
                    var obj = new ViewBook();
                    obj._id = mdl._id;
                    obj.Book_id = mdl.Book_id;
                    obj.Book = mdl.Book;
                    obj.Authname = mdl.Authname;
                    obj.Price = mdl.Price;
                    obj.Version = mdl.Version;
                    lst.Add(obj);
                }

            }
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetDataList1()
        {

            var objList = _masterService.GetDataLists();

            var DistinctItems = objList.GroupBy(x => x.Authname).Select(y => y.First());
            //  var Authname = objList.Select(i => new { i.Authname }).Distinct();
            var lst = new List<ViewBook>();

            foreach (ProsolBook mdl in DistinctItems)
            {

                var obj = new ViewBook();
                obj._id = mdl._id;
                obj.Book_id = mdl.Book_id;
                obj.Book = mdl.Book;
                obj.Authname = mdl.Authname;
                obj.Price = mdl.Price;
                obj.Islive = true;
                lst.Add(obj);
            }


            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDatadicList()
        {

            var objList = _masterService.GetDatadicList().ToList();
            var lst = new List<Bookdic>();


            foreach (Bookdictonary mdl in objList)
            {

                var obj = new Bookdic();

                obj.BookName = mdl.BookName;
                obj.AuthorName = mdl.AuthorName;
                obj.Book_id = mdl.Book_id;
                lst.Add(obj);
            }            
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetBook(string Authname)
        {

            var objList = _masterService.GetAuthLists(Authname);
            var lst = new List<ViewBook>();


            foreach (ProsolBook mdl in objList)
            {
                if (mdl.Authname != null)
                {
                    var obj = new ViewBook();

                    obj.Book = mdl.Book;
                    obj.Authname = mdl.Authname;
                    obj.Islive = mdl.Islive;
                    lst.Add(obj);
                }

            }
            return this.Json(lst, JsonRequestBehavior.AllowGet);

        }



        // POST: Book/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Book/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Book/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Book/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Book/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        [Authorize]
        public JsonResult getoldbookdetails(string oldbook)
        {
            var singlerecord = _masterService.getoldbookdetails(oldbook);

            return this.Json(singlerecord, JsonRequestBehavior.AllowGet);

        }
        [Authorize]
        public JsonResult getbookdetails(string bookdet)
        {
            var singlerecord = _masterService.getbookdetails(bookdet);

            return this.Json(singlerecord, JsonRequestBehavior.AllowGet);

        }
        [Authorize]
        public JsonResult Getbookresult(string bname, string by)
        {
            var lstCatalogue = new List<ViewBook>();

           // var bookname = bname.ToUpper();
            if (by == "Book_id")
            {
                 var srchbook = _masterService.getbookdet(bname.ToUpper());
                foreach (ProsolBook cat in srchbook)
                {
                    var mdl = new ViewBook();


                    mdl.Book_id = cat.Book_id;
                    mdl.Book = cat.Book;
                    mdl.Authname = cat.Authname;
                    mdl.Price = cat.Price;


                    lstCatalogue.Add(mdl);
                }
            }
            else
            {
               var  srchbook1 = _masterService.getbook(bname.ToUpper());
                foreach (ProsolBook cat in srchbook1)
                {
                    var mdl = new ViewBook();


                    mdl.Book_id = cat.Book_id;
                    mdl.Book = cat.Book;
                    mdl.Authname = cat.Authname;
                    mdl.Price = cat.Price;


                    lstCatalogue.Add(mdl);
                }
            }

           
            var jsonResult = Json(lstCatalogue, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            // }
            // return this.Json(lstCatalogue, JsonRequestBehavior.AllowGet);


        }
        public JsonResult save()
        {

            var obj = Request.Form["obj"];
            string obj1 = Request.Form["id"];
            // Bookdic bk = JsonConvert.DeserializeObject<Bookdic>(obj);
            // var bk1 = JsonConvert.DeserializeObject <List<Bookdictonary>>(obj);
            var selection1 = Request.Form["books"];
            List<string> ListPlant = new List<string>();
            string[] books = null;
            if (selection1 != null)
            {
                ListPlant = JsonConvert.DeserializeObject<List<string>>(selection1);
                books = ListPlant.ToArray();
            }
         
            var lst = new List<Bookdictonary>();
          //  bk.BookName = books;
            Bookdictonary m = new Bookdictonary();
                m.BookName = books;
                m.AuthorName = obj;
            m.Book_id = obj1;
                lst.Add(m);
           
            
         
         
          
            bool objList = false;
             objList = _masterService.submit(lst);
            return this.Json(objList, JsonRequestBehavior.AllowGet);

        }
    }
}
