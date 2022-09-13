using System;
using System.Collections.Generic;

#nullable disable

namespace ConsumerMicroservice.Models
{
    public partial class Business
    {
        public string BusinessId { get; set; }
        public string BusinessType { get; set; }
        public int AnnualTurnOver { get; set; }
        public int TotalEmployees { get; set; }
        public int CapitalInvested { get; set; }
    }
}
