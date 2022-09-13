using ConsumerMicroservice.Models;
using ConsumerMicroservice.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ConsumerMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
	[Authorize]
    public class ConsumerController : Controller
    {
        private readonly IConsumerService _consumerService;
        
        public ConsumerController(IConsumerService consumerService)
        {
            _consumerService = consumerService;        
        }

        [HttpPost]
		[EnableCors]
		[Route("CreateConsumerBusiness")]
        public IActionResult CreateConsumerBusiness([FromBody] ConsumerBusiness consumerBusiness)
        {
            bool result = _consumerService.CreateConsumerBusiness(consumerBusiness);
            return Ok(result);
        }

        [HttpPut]
        [Route("UpdateConsumerBusiness")]
        public IActionResult UpdateConsumerBusiness(ConsumerBusiness consumerBusiness)
        {
            bool result = _consumerService.UpdateConsumerBusiness(consumerBusiness);
            return Ok(result);
        }


        [HttpPost]
        [Route("CreateBusinessProperty")]
        public IActionResult CreateBusinessProperty(BusinessProperty businessProperty)
        {
            bool result = _consumerService.CreateBusinessProperty(businessProperty);
            return Ok(result);
        }


        [HttpPut]
        [Route("UpdateBusinessProperty")]
        public IActionResult UpdateBusinessProperty(BusinessProperty businessProperty)
        {
            bool result = _consumerService.UpdateBusinessProperty(businessProperty);
            return Ok(result);
        }

        [HttpGet]
        [Route("viewConsumerBusiness/{ConsumerId}/{BusinessId}")]
        public IActionResult ViewConsumerBusiness(string ConsumerId, string BusinessId)
        {
            ConsumerBusinessDetails result = _consumerService.ViewConsumerBusiness(ConsumerId, BusinessId);
            if (result.Equals(null))
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("viewConsumerProperty/{ConsumerId}/{PropertyId}")]
        public IActionResult ViewConsumerProperty(string ConsumerId,string PropertyId)
        {
            BusinessPropertyDetails result = _consumerService.ViewConsumerProperty(ConsumerId, PropertyId);
            if(result.Equals(null))
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
