using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Authorization.Models;
using Authorization.Provider;
using Authorization.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace Authorization.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors]
	public class AuthController : ControllerBase
	{
		private IConfiguration _configuration;
		private readonly IAgentRepository _agentRepository;

		public AuthController(IConfiguration configuration, IAgentRepository agentRepository)
		{
			_configuration = configuration;
			_agentRepository = agentRepository;
		}

		[HttpPost]
		public IActionResult Login([FromBody] Login login)
		{
			AuthRepository _authRepository = new AuthRepository(_configuration, _agentRepository);
			IActionResult response = Unauthorized();
			var user = _authRepository.AuthenticateAgent(login);
			if (user == null)
			{
				return NotFound();
			}
			else
			{
				var tokenString = _authRepository.GenerateJSONWebToken(user);
				response = Ok(new { token = tokenString });
			}
			return response;
		}
	}
}