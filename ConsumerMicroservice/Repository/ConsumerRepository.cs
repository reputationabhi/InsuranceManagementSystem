using ConsumerMicroservice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumerMicroservice.Repository
{
    public class ConsumerRepository : IConsumerRepository
    {
        private PolicyAdministrationSystemContext dbContext;
        public ConsumerRepository()
        {
            dbContext = new PolicyAdministrationSystemContext();
        }
        public bool CreateBusinessProperty(BusinessProperty businessProperty)
        {
            Property property = new Property()
            {
                PropertyId = businessProperty.PropertyId,
                BuildingSqft = businessProperty.BuildingSqft,
                BuildingType = businessProperty.BuildingType,
                BuildingStoreys = businessProperty.BuildingStoreys,
                BuildingAge = businessProperty.BuildingAge,
                CostOfTheAsset = businessProperty.CostOfTheAsset,
                SalvageValue = businessProperty.SalvageValue,
                UsefulLifeOfTheAsset = businessProperty.UsefulLifeOfTheAsset,
            };

            //PropertyData.PropertyList.Add(property);
            dbContext.Properties.Add(property);
            if (dbContext.SaveChanges() > 0)
            {
                return true;
            }
            return false;
        }

        public bool CreateConsumerBusiness(ConsumerBusiness consumerBusiness)
        {
            Consumer consumer = new Consumer()
            {
                ConsumerId = consumerBusiness.ConsumerId,
                ConsumerName = consumerBusiness.ConsumerName,
                Email = consumerBusiness.Email,
                Pan = consumerBusiness.Pan,
                BusinessOverview = consumerBusiness.BusinessOverview,
                ValidityofConsumer = consumerBusiness.ValidityofConsumer,
                AgentId = consumerBusiness.AgentId,
                AgentName = consumerBusiness.AgentName,
            };

            Business business = new Business()
            {
                BusinessId = consumerBusiness.BusinessId,
                BusinessType = consumerBusiness.BusinessType,
                AnnualTurnOver = consumerBusiness.AnnualTurnOver,
                TotalEmployees = consumerBusiness.TotalEmployees,
                CapitalInvested = consumerBusiness.CapitalInvested
            };

            dbContext.Consumers.Add(consumer);
            dbContext.Businesses.Add(business);
            if (dbContext.SaveChanges() > 0)
            {
                return true;
            }
            return false;
        }

        public bool UpdateBusinessProperty(BusinessProperty businessProperty)
        {
            Property updateProperty = new Property()
            {
                PropertyId = businessProperty.PropertyId,
                BuildingSqft = businessProperty.BuildingSqft,
                BuildingType = businessProperty.BuildingType,
                BuildingStoreys = businessProperty.BuildingStoreys,
                BuildingAge = businessProperty.BuildingAge,
                CostOfTheAsset = businessProperty.CostOfTheAsset,
                SalvageValue = businessProperty.SalvageValue,
                UsefulLifeOfTheAsset = businessProperty.UsefulLifeOfTheAsset,
            };

            Property deleteProperty = dbContext.Properties.FirstOrDefault(p => p.PropertyId.Equals(businessProperty.PropertyId));
            if (deleteProperty == null)
            {
                return false;
            }
            dbContext.Properties.Remove(deleteProperty);
            dbContext.Properties.Add(updateProperty);
            if (dbContext.SaveChanges()>0)
            {
                return true;
            }
            return false;

        }

        public bool UpdateConsumerBusiness(ConsumerBusiness consumerBusiness)
        {

            Consumer updateConsumer = new Consumer()
            {
                ConsumerId = consumerBusiness.ConsumerId,
                ConsumerName = consumerBusiness.ConsumerName,
                Email = consumerBusiness.Email,
                Pan = consumerBusiness.Pan,
                BusinessOverview = consumerBusiness.BusinessOverview,
                ValidityofConsumer = consumerBusiness.ValidityofConsumer,
                AgentId = consumerBusiness.AgentId,
                AgentName = consumerBusiness.AgentName,
            };

            Business updatebusiness = new Business()
            {
                BusinessId = consumerBusiness.BusinessId,
                BusinessType = consumerBusiness.BusinessType,
                AnnualTurnOver = consumerBusiness.AnnualTurnOver,
                TotalEmployees = consumerBusiness.TotalEmployees,
                CapitalInvested = consumerBusiness.CapitalInvested
            };

            Consumer deleteConsumer = dbContext.Consumers.FirstOrDefault(c => c.ConsumerId.Equals(consumerBusiness.ConsumerId));
            Business deleteBusiness = dbContext.Businesses.FirstOrDefault(b => b.BusinessId.Equals(consumerBusiness.BusinessId));
            if (deleteConsumer == null || deleteBusiness == null)
            {
                return false;
            }
            dbContext.Consumers.Remove(deleteConsumer);
            dbContext.Businesses.Remove(deleteBusiness);
            dbContext.Consumers.Add(updateConsumer);
            dbContext.Businesses.Add(updatebusiness);
            if (dbContext.SaveChanges() > 0)
            {
                return true;
            }
            return false;

        }

        public ConsumerBusinessDetails ViewConsumerBusiness(string ConsumerId, string BusinessId)
        {
            if (ConsumerId == null || BusinessId == null)
            {
                
                throw new System.ArgumentException("No such customerid is stored");
            }
            Consumer viewConsumer = dbContext.Consumers.FirstOrDefault(c => c.ConsumerId.Equals(ConsumerId));
            Business viewBusiness = dbContext.Businesses.FirstOrDefault(b => b.BusinessId.Equals(BusinessId));
            ConsumerBusinessDetails consumerBusiness = new ConsumerBusinessDetails()
            {
                ConsumerId = viewConsumer.ConsumerId,
                ConsumerName = viewConsumer.ConsumerName,
                Email = viewConsumer.Email,
                Pan = viewConsumer.Pan,
                AgentId = viewConsumer.AgentId,
                AgentName = viewConsumer.AgentName,
                BusinessId = viewBusiness.BusinessId,
                BusinessOverview = viewConsumer.BusinessOverview,
                ValidityofConsumer = viewConsumer.ValidityofConsumer,
                BusinessType = viewBusiness.BusinessType,
                AnnualTurnOver = viewBusiness.AnnualTurnOver,
                TotalEmployees = viewBusiness.TotalEmployees,
                CapitalInvested = viewBusiness.CapitalInvested,
            };
            try
            {
                consumerBusiness.BusinessValue = viewBusiness.AnnualTurnOver / viewBusiness.CapitalInvested;
            }
            catch (Exception e)
            {
               
                Console.WriteLine(e.Message);
            }

            return consumerBusiness;
        }

        public BusinessPropertyDetails ViewConsumerProperty(string ConsumerId, string PropertyId)
        {
            if (ConsumerId == null || PropertyId == null)
            {
                
                throw new System.ArgumentException("No such customerid is stored");
            }
            Property viewProperty = dbContext.Properties.FirstOrDefault(p => p.PropertyId.Equals(PropertyId));

            BusinessPropertyDetails businessProperty = new BusinessPropertyDetails()
            {
                ConsumerId = ConsumerId,
                PropertyId = viewProperty.PropertyId,
                BuildingSqft = viewProperty.BuildingSqft,
                BuildingType = viewProperty.BuildingType,
                BuildingStoreys = viewProperty.BuildingStoreys,
                BuildingAge = viewProperty.BuildingAge,
                CostOfTheAsset = viewProperty.CostOfTheAsset,
                SalvageValue = viewProperty.SalvageValue,
                UsefulLifeOfTheAsset = viewProperty.UsefulLifeOfTheAsset,
                
            };
            try
            {
                businessProperty.PropertyValue = (viewProperty.CostOfTheAsset - viewProperty.SalvageValue) / viewProperty.UsefulLifeOfTheAsset;
            }
            catch (Exception e)
            {
               
                Console.WriteLine(e.Message);
            }

            return businessProperty;
        }

    }
}
