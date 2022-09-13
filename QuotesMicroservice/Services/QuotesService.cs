using QuotesMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuotesMicroservice.Service
{
    public class QuotesService : IQuotesService
    {

        private readonly IQuotesRepo _QuotesRepository;
        public QuotesService(IQuotesRepo QuotesRepository)
        {
            _QuotesRepository = QuotesRepository;

        }
        public string QuotesForPolicyService(int PropertyValue, int BusinessValue, string PropertyType)
        {
            return _QuotesRepository.QuotesForPolicy(PropertyValue, BusinessValue, PropertyType);
        }
    }
}
