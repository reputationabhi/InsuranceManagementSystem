using System;
using System.Collections.Generic;

#nullable disable

namespace QuotesMicroservice.Models
{
    public partial class QuotesMaster
    {
        public int Id { get; set; }
        public int? MinBusinessValue { get; set; }
        public int? MaxBusinessValue { get; set; }
        public int? MinPropertyValue { get; set; }
        public int? MaxPropertyValue { get; set; }
        public string PropertyType { get; set; }
        public string Quotes { get; set; }
    }
}
