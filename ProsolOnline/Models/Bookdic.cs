using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;

namespace ProsolOnline.Models
{
    public class Bookdic
    {
        public ObjectId _id { get; set; }
       
        public string[] BookName { get; set; }
        public string AuthorName { get; set; }
        public string Book_id { get; set; }
    }
}