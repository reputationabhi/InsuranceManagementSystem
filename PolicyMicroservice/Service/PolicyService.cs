using System;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PolicyMicroservice.Models;
using PolicyMicroservice.Repository;

namespace PolicyMicroservice.Service
{
	public class PolicyService : IPolicyService
    {
        private readonly IConsumerPolicyRepository _policyRepository;
        private IConfiguration _configuration;
        public PolicyService(IConfiguration configuration, IConsumerPolicyRepository PolicyRepository)
        {
            _configuration = configuration;
            _policyRepository = PolicyRepository;
        }
        
        public bool CreatePolicy(CreatePolicyRequest createPolicy)
        {
            return _policyRepository.CreatePolicy(createPolicy);
        }

        public bool IssuePolicy(IssuePolicyRequest issuePolicy)
        {
            return _policyRepository.IssuePolicy(issuePolicy);
        }

        public PolicyDetails ViewPolicy(string ConsumerId, string BusinessId, string PolicyId, string token)
        {
            ConsumerPolicy consumerPolicy =  _policyRepository.GetPolicy(ConsumerId, PolicyId);
            ConsumerBusiness consumerData = ConsumerDetail(ConsumerId, BusinessId, token);

            PolicyDetails policyDetails = new PolicyDetails()
            {
                ConsumerId = ConsumerId,
                PolicyId = PolicyId,
                BusinessId = BusinessId,
                ConsumerName = consumerData.ConsumerName,
                AgentId = consumerData.AgentId,
                AgentName = consumerData.AgentName,
                AcceptedQuotes = consumerPolicy.AcceptedQuotes,
                PolicyStatus = consumerPolicy.PolicyStatus,
                PaymentDetails = consumerPolicy.PaymentDetails,
                AcceptanceStatus = consumerPolicy.AcceptanceStatus,
                EffectiveDate = (DateTime)consumerPolicy.EffectiveDate
            };
            return policyDetails;
        }

        public ReturnData GetQuotes(int PropertyValue, int BusinessValue, string PropertyType, string token)
        {

			string uriConn = _configuration.GetValue<string>("ServiceURIs:Quotes");
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(uriConn);
                    client.DefaultRequestHeaders.Clear();
                    client.DefaultRequestHeaders.Add("Accept", "application/json");
                    client.DefaultRequestHeaders.Add("ContentType", "application/json");
					if(token != null)
					{
						client.DefaultRequestHeaders.Add("Authorization", token);
					}
					

                    var httpResponse = client.GetAsync($"/api/Quotes/getQuotesForPolicy/{PropertyValue}/{BusinessValue}/{PropertyType}").Result;
                    var responseString = httpResponse.Content.ReadAsStringAsync().Result;

                    if (!httpResponse.IsSuccessStatusCode)
                    {
                        throw new Exception("Unable to reach [Consumer] microservice.");
                    }

                    ReturnData response = JsonConvert.DeserializeObject<ReturnData>(responseString);
                    return response;
                }
            }
            catch(Exception e)
            {
				ReturnData obj = new ReturnData();
				obj.value = e.Message;
				return obj;
            }   
        }

        public ConsumerBusiness ConsumerDetail(string ConsumerId, string BusinessId, string token)
        {
            string uriConn = _configuration.GetValue<string>("ServiceURIs:Consumer");

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(uriConn);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Add("ContentType", "application/json");
                client.DefaultRequestHeaders.Add("ContentType", "application/json");
				if (token != null)
				{
					client.DefaultRequestHeaders.Add("Authorization", token);
				}

				var httpResponse = client.GetAsync($"/api/Consumer/viewConsumerBusiness/{ConsumerId}/{BusinessId}").Result;
                var responseString = httpResponse.Content.ReadAsStringAsync().Result;

                if (!httpResponse.IsSuccessStatusCode)
                {
                    throw new Exception("Unable to reach [Consumer] microservice.");
                }

                ConsumerBusiness response = JsonConvert.DeserializeObject<ConsumerBusiness>(responseString);
                return response;
            }    
            
        }
    }
}
