using Authorization.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Authorization.Repositories
{
    public class AuthRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IAgentRepository _agentRepository;
        public AuthRepository(IConfiguration configuration, IAgentRepository agentRepository)
        {
            _configuration = configuration;
            _agentRepository = agentRepository;
        }

        public string GenerateJSONWebToken(Login agentInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is my supper secret key for jwt"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
			  issuer: "codepediainfo",
			  audience: "codepediainfo",
			  null,
			  expires: DateTime.UtcNow.AddMinutes(15),
			  signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Login AuthenticateAgent(Login login)
		{
            return _agentRepository.GetAgentDetails(login);
        }

    }
}
