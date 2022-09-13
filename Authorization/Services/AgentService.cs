using Authorization.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Provider
{
    public class AgentService : IAgentService
    {
		private PolicyAdministrationSystemContext dbContext;
		public AgentService()
		{
			dbContext = new PolicyAdministrationSystemContext();
		}
		//private List<Login> AgentList = new List<Login>(dbContext.LoginCredentials.ToList());
        //{
        //    new Login{ Username = "Abhishek", Password = "Agent@123"},
        //    new Login{ Username = "Roushan", Password = "Agent@123"},
        //    new Login{ Username = "Prince", Password = "Agent@123"},
        //    new Login{ Username = "Souradeep", Password = "Agent@123"}
        //};
        public List<Login> GetList()
        {
			//return AgentList;
			return dbContext.LoginCredentials.ToList();
        }

        public Login GetAgent(Login cred)
        {
            List<Login> AgentList = GetList();
            Login agentDetails = AgentList.FirstOrDefault(user => user.Username == cred.Username && user.Password == cred.Password);

            return agentDetails;
        }
    }
}
