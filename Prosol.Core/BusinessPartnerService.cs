using Excel;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Prosol.Core.Interface;
using Prosol.Core.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace Prosol.Core
{
    public class BusinessPartnerService : IBusinessPartner
    {
        private readonly IRepository<Prosol_BPMaster> _BPMasterRepository;
        private readonly IRepository<Prosol_BPCustomerModel> _BPCustomerRepository;
        private readonly IRepository<Prosol_BPGenralModel> _BPGenralRepository;
        private readonly IRepository<Prosol_BPVendorModel> _BPVendorModelRepository;
        public BusinessPartnerService(IRepository<Prosol_BPMaster> BPMasterRepository, IRepository<Prosol_BPCustomerModel> BPCustomerRepository, 
            IRepository<Prosol_BPGenralModel> BPGenralRepository, IRepository<Prosol_BPVendorModel> BPVendorModelRepository)
        {
            this._BPMasterRepository = BPMasterRepository;
            this._BPCustomerRepository = BPCustomerRepository;
            this._BPGenralRepository = BPGenralRepository;
            this._BPVendorModelRepository = BPVendorModelRepository;

        }

        public bool InsertData(Prosol_BPMaster data)
        {
            bool res = false;
            data.Islive = true;
            var query = Query.And(Query.EQ("Label", data.Label), (Query.Or(Query.EQ("Code", data.Code), Query.EQ("Title", data.Title))));
            var vn = _BPMasterRepository.FindAll(query).ToList();
            if (vn.Count == 0 || (vn.Count == 1 && vn[0]._id == data._id))
            {
                res = _BPMasterRepository.Add(data);
            }
            return res;

        }
        public IEnumerable<Prosol_BPMaster> GetDataList(string Label)
        {
            var query = Query.And(Query.EQ("Label", Label));
            var lst = _BPMasterRepository.FindAll(query);
            return lst;

        }
        public bool DelData(string id)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", false);
            var flg = UpdateFlags.Upsert;
            var res = _BPMasterRepository.Update(query, Updae, flg);
            return res;
        }
        public IEnumerable<Prosol_BPMaster> GetMaster()
        {
            var lst = _BPMasterRepository.FindAll();
            return lst;

        }
        public IEnumerable<Prosol_BPGenralModel> GenList()
        {
            var lst = _BPGenralRepository.FindAll();
            return lst;

        }
        public IEnumerable<Prosol_BPCustomerModel> CustList()
        {
            var lst = _BPCustomerRepository.FindAll();
            return lst;

        }
        public IEnumerable<Prosol_BPVendorModel> VenList()
        {
            var lst = _BPVendorModelRepository.FindAll();
            return lst;

        }
        public bool DisableData(string id, bool sts)
        {
            var query = Query.EQ("_id", new ObjectId(id));
            var Updae = Update.Set("Islive", sts);
            var flg = UpdateFlags.Upsert;
            var res = _BPMasterRepository.Update(query, Updae, flg);
            return res;

        }

        public bool CreateGen(Prosol_BPGenralModel data)
        {
            bool res = false;
          
            res = _BPGenralRepository.Add(data);
           
            return res;

        }
        public bool CreateCust(Prosol_BPCustomerModel data)
        {
            bool res = false;

            res = _BPCustomerRepository.Add(data);

            return res;
        }
        public bool CreateVen(Prosol_BPVendorModel data)
        {
            bool res = false;

            res = _BPVendorModelRepository.Add(data);

            return res;

        }
    }

    
 
}
