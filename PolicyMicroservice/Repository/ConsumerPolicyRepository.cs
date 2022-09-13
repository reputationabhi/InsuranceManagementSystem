using PolicyMicroservice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Text;

namespace PolicyMicroservice.Repository
{
    public class ConsumerPolicyRepository : IConsumerPolicyRepository
    {
		private PolicyAdministrationSystemContext dbContext;

		public ConsumerPolicyRepository()
		{
			dbContext = new PolicyAdministrationSystemContext();
		}
        public bool CreatePolicy(CreatePolicyRequest createPolicy)
        {
            var id = dbContext.ConsumerPolicies.Count();
            ConsumerPolicy consumerPolicy = new ConsumerPolicy()
            {
                Id = id+1,
                ConsumerId = createPolicy.ConsumerId,
                BusinessId = createPolicy.BusinessId,
                AcceptedQuotes = createPolicy.AcceptedQuotes,
                PolicyStatus = "Initiated",
            };

            dbContext.ConsumerPolicies.Add(consumerPolicy);
			if(dbContext.SaveChanges() > 0)
			{
				return true;
			}
            return false;
        }

        public bool IssuePolicy(IssuePolicyRequest issuePolicy)
        {
            ConsumerPolicy consumerPolicy = dbContext.ConsumerPolicies.FirstOrDefault(p => p.ConsumerId.Equals(issuePolicy.ConsumerId) && p.BusinessId.Equals(issuePolicy.BusinessId));
            int id = consumerPolicy.Id;
            string accquote = consumerPolicy.AcceptedQuotes;
            dbContext.ConsumerPolicies.Remove(consumerPolicy);
            DateTime date = DateTime.Now;
            ConsumerPolicy addPolicy = new ConsumerPolicy()
            {
                Id = id,
                ConsumerId = issuePolicy.ConsumerId,
                BusinessId = issuePolicy.BusinessId,
                PolicyId = issuePolicy.PolicyId,
                AcceptedQuotes = accquote,
                PolicyStatus = "Issued",
                PaymentDetails = issuePolicy.PaymentDetails,
                AcceptanceStatus = issuePolicy.AcceptanceStatus,
                EffectiveDate = date
            };

            dbContext.ConsumerPolicies.Add(addPolicy);
			if (dbContext.SaveChanges() > 0)
			{
				return true;
			}
			return false;
		}

        public ConsumerPolicy GetPolicy(string ConsumerId, string PolicyId)
        {
            ConsumerPolicy consumer = dbContext.ConsumerPolicies.FirstOrDefault(p => p.ConsumerId.Equals(ConsumerId) && p.PolicyId.Equals(PolicyId));
            return consumer;
        }
    }
    
}
