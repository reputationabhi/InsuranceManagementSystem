using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using QuotesMicroservice.Service;
using QuotesMicroservice.Models;
using Microsoft.AspNetCore.Authorization;

namespace QuotesMicroservice.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors]
	[Authorize]
	public class QuotesController : ControllerBase
	{
		private readonly IQuotesService _QuotesService;
		public QuotesController(IQuotesService QuotesService)
		{
			_QuotesService = QuotesService;
		}

		[HttpGet]
		[Route("getQuotesForPolicy/{PropertyValue}/{BusinessValue}/{PropertyType}")]
		// getQuotesForPolicy/3/3/Building
		public ActionResult getQuotesForPolicy(int PropertyValue, int BusinessValue, string PropertyType)
		{

			var Quote = _QuotesService.QuotesForPolicyService(PropertyValue, BusinessValue, PropertyType);
			ReturnData obj = new ReturnData();
			if (Quote == "No Quotes, Contact Insurance Provider")
			{
				obj.value = "No Quotes, Contact Insurance Provider";
			}
			else
			{
				obj.value = Quote;
			}
			return Ok(obj);
		}
	}
}
