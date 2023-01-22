using IdentificationApp.Models;
using Microsoft.EntityFrameworkCore;

namespace HelloApp
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationContext()
        {
            // решил не делать миграции, тк не предполагается изменения моделей судя по тз
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // ToDo конфиг
            optionsBuilder.UseNpgsql("Host=localhost;Username=postgres;Password=root;Database=IdentificationDb;port=5432;Command Timeout=0");
        }
    }
}