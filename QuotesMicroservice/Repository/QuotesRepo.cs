using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuotesMicroservice.Models;
namespace QuotesMicroservice.Repository
{

    public class QuotesRepo : IQuotesRepo
    {
		private PolicyAdministrationSystemContext dbContext;
		public QuotesRepo()
		{
			dbContext = new PolicyAdministrationSystemContext();
		}
        public string QuotesForPolicy(int PropertyValue, int BusinessValue, string PropertyType)
        {
			var quotes = dbContext.QuotesMasters.Where(q => q.MinPropertyValue <= PropertyValue && q.MaxPropertyValue >= PropertyValue &&
						  q.MinBusinessValue <= BusinessValue && q.MaxBusinessValue >= BusinessValue &&
						  q.PropertyType.ToLower() == PropertyType.ToLower()).FirstOrDefault();

            if (quotes == null)
                return "No Quotes, Contact Insurance Provider";
            else
                return quotes.Quotes;

        }
    }
}
