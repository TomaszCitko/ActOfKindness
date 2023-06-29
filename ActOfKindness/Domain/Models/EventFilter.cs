using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class EventFilter
    {
        public string? Localization { get; set; }
        public bool? IsOnline { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? EndingDate { get; set; }
        public EventType? Type { get; set; }

    }
}
