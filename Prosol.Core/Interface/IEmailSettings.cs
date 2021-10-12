using Prosol.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Prosol.Core.Interface
{
   public interface IEmailSettings
    {
        bool insertemaildata(Prosol_EmailSettings data, int update);
        bool sendmail(string to_mail, string subjectt, string body);

        Prosol_EmailSettings ShowEmaildata();
        string[] AutoCompleteEmailId(string term);
        string getmailbody(DataTable tbl);
    }
}
