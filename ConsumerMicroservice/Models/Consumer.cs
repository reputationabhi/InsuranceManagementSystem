using System;
using System.Collections.Generic;

#nullable disable

namespace ConsumerMicroservice.Models
{
    public partial class Consumer
    {
        public string ConsumerId { get; set; }
        public string ConsumerName { get; set; }
        public string Email { get; set; }
        public string Pan { get; set; }
        public string BusinessOverview { get; set; }
        public int ValidityofConsumer { get; set; }
        public int AgentId { get; set; }
        public string AgentName { get; set; }
    }
}
