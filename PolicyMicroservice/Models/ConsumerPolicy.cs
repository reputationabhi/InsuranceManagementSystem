using System;
using System.Collections.Generic;

#nullable disable

namespace PolicyMicroservice.Models
{
    public partial class ConsumerPolicy
    {
        public int Id { get; set; }
        public string ConsumerId { get; set; }
        public string BusinessId { get; set; }
        public string PolicyId { get; set; }
        public string AcceptedQuotes { get; set; }
        public string PolicyStatus { get; set; }
        public string PaymentDetails { get; set; }
        public string AcceptanceStatus { get; set; }
        public DateTime? EffectiveDate { get; set; }
    }
}
