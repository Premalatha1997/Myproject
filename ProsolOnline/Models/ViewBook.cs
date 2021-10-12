using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;

namespace ProsolOnline.Models
{
    public class ViewBook
    {
        public ObjectId _id { get; set; }
        public string Book_id { get; set; }
        public string Book { get; set; }
        public string Authname { get; set; }
        public string Price { get; set; }
        public string Version { get; set; }
      
        public bool Islive { get; set; }

    }
}