﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prosol.Core.Model
{
    public class Prosol_Vendortype
    {
        public ObjectId _id { get; set; }
        public string Code { get; set; }
        public string Type { get; set; }
    }
}
