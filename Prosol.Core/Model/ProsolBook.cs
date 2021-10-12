using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Prosol.Core.Model
{
    public class ProsolBook
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
