using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProsolOnline.Models
{
    public class EmailSettings
    {
        public string _id { get; set; }
        public string FromId { get; set; }
        public string Password { get; set; }
        public string ConformPassword { get; set; }
        public string SMTPServerName{get;set;}
        public int PortNo { get; set; }
        public bool EnableSSL { get; set; }

        public string CC { get; set; }
        public string BCC { get; set; }

        public string[] CCC { get; set; }
        public string[] BCCC { get; set; }
        public string Emailtest { get; set; }
    }
}