using System.Text.Json.Serialization;

namespace IdentificationApp.Models
{
    public class IdentificationDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? Inn { get; set; }

        // ToDo разбивать на отдельные?
        public string? Passport { get; set; }

        public string? Phone { get; set; }

        // ToDo разбивать на отдельные?
        public string? Address { get; set; }

        public int? Position { get; set; }
    }
}
