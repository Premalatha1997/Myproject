﻿using Prosol.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Prosol.Core.Interface
{
    public partial interface ICharateristics
    {

       // void DeleteNounModifier(Prosol_Charateristics chara);

        bool Create(List<Prosol_Charateristics> chara);
        int BulkCharateristic(HttpPostedFileBase file);
        int BulkValue(HttpPostedFileBase file);
        int BulkUom(HttpPostedFileBase file);
        IEnumerable<Prosol_Charateristics> GetCharateristic(string Noun, string Modifier);
        // bool Remove(IQueryable query);
        List<Prosol_Charateristics> DownloadNM();
       



        bool AddAttribute(Prosol_Attribute Attribute);
        IEnumerable<Prosol_Attribute> GetAttributes();
        Prosol_Attribute GetAttributeDetail(string Name);
        List<Prosol_Attribute> DownloadAttributeMaster();

        Prosol_Charateristics GetCharacteristicvalues(string Name, string Noun, string Modifier);
    }
}
