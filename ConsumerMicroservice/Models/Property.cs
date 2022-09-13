using System;
using System.Collections.Generic;

#nullable disable

namespace ConsumerMicroservice.Models
{
    public partial class Property
    {
        public string PropertyId { get; set; }
        public int BuildingSqft { get; set; }
        public string BuildingType { get; set; }
        public int BuildingStoreys { get; set; }
        public int BuildingAge { get; set; }
        public int CostOfTheAsset { get; set; }
        public int SalvageValue { get; set; }
        public int UsefulLifeOfTheAsset { get; set; }
    }
}
