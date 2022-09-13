using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PolicyMicroservice.Models;
using PolicyMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace PolicyMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
	[EnableCors]    //Cross Origin Resource Sharing
	[Authorize]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyService _policyService;
        public PolicyController(IPolicyService PolicyService)
        {
            _policyService = PolicyService;
        }
        
        [HttpPost]
        [Route("createPolicy")]
        public IActionResult CreatePolicy(CreatePolicyRequest createPolicy)
        {

            try
            {
                var result = _policyService.CreatePolicy(createPolicy);
                return Ok(result); 
            }
            catch (Exception e)
            {
                return new NoContentResult();
            }
        }
    
        [HttpPost]
        [Route("issuePolicy")]
        public IActionResult IssuePolicy(IssuePolicyRequest issuePolicy)
        {
            try
            {
                var result = _policyService.IssuePolicy(issuePolicy);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new NoContentResult();
            }
        }
       
        [HttpGet]
        [Route("viewPolicy/{ConsumerId}/{BusinessId}/{PolicyId}")]
        public IActionResult ViewPolicy(string ConsumerId,string BusinessId, string PolicyId)
        {
			var token = HttpContext.Request.Headers["Authorization"];
            PolicyDetails policyDetails = _policyService.ViewPolicy(ConsumerId,BusinessId, PolicyId, token);
            return Ok(policyDetails);
        }
        
        [HttpGet]
        [Route("/getQuotes/{PropertyValue}/{BusinessValue}/{PropertyType}")]
        public IActionResult GetQuotes(int PropertyValue, int BusinessValue, string PropertyType)
        {
			var token = HttpContext.Request.Headers["Authorization"];
			ReturnData quotes = _policyService.GetQuotes(PropertyValue, BusinessValue, PropertyType, token);
			return Ok(quotes);
        }
    }
}
