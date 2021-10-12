using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Prosol.Core.Model
{
    public class Bookdictonary
    {
        public ObjectId _id { get; set; }
       
        public string[] BookName{ get; set; }
        public string AuthorName { get; set; }
        public string Book_id { get; set; }
    }
}
