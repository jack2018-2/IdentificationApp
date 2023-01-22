namespace IdentificationApp.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public string? FirstName { get; set; }

        public string? MiddleName { get; set; }

        public string? SurName { get; set; }

        public int? Inn { get; set; }

        // ToDo разбивать на отдельные?
        public string? Passport { get; set; }
        
        public string? Phone { get; set; }

        // ToDo разбивать на отдельные?
        public string? Address { get; set; }

        public int? Position { get; set; }
    }
}