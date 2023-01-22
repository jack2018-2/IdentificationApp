using IdentificationApp.Models;

namespace IdentificationApp.Handlers
{
    public interface IUserHandler
    {
        /// <summary>
        /// Идентификация пользователя
        /// </summary>
        /// <param name="identification"></param>
        /// <returns></returns>
        public Task<bool> IdentificateUser(IdentificationDto identification);

        /// <summary>
        /// Идентификация пользователя
        /// </summary>
        /// <param name="register"></param>
        /// <returns>Id созданного пользователя</returns>
        public Task<int> RegisterUser(RegisterDto register);
    }
}
