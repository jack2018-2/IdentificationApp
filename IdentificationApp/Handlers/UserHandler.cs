using HelloApp;
using IdentificationApp.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace IdentificationApp.Handlers
{
    public class UserHandler : IUserHandler
    {
        public async Task<bool> IdentificateUser(IdentificationDto identification)
        {
            var saved = 0;
            using (ApplicationContext db = new ApplicationContext())
            {
                var user = await db.Users.FindAsync(identification.Id);
                if (user == null)
                {
                    return false;
                }
                EnrichUser(user, identification);
                db.Users.Update(user);
                saved = await db.SaveChangesAsync();
            }
            return saved > 0;
        }

        private void EnrichUser(User user, IdentificationDto identification)
        {
            user.Position = identification.Position;
            user.Phone = identification.Phone;
            user.FirstName = identification.Name;
            user.Address = identification.Address;
            user.Inn = identification.Inn;
            user.Passport = identification.Passport;
        }

        public async Task<int> RegisterUser(RegisterDto dto)
        {
            var saved = 0;
            EntityEntry<User> created;
            var user = new User() { Login = dto.Login, Password = dto.Password };
            using (ApplicationContext db = new ApplicationContext())
            {
                created = db.Users.Add(user);
                saved = await db.SaveChangesAsync();
            }
            return saved > 0 ? user.Id : -1;
        }
    }
}
