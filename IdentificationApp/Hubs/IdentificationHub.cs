using IdentificationApp.Handlers;
using IdentificationApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace IdentificationApp.Hubs
{
    public class IdentificationHub : Hub
    {
        private readonly IUserHandler _userHandler;

        public IdentificationHub(IUserHandler userHandler) : base() {
            _userHandler = userHandler;
        }

        /// <summary>
        /// Идентификация пользователя.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <remarks>Thread.Sleep здесь имитирует долгий метод, тк иначе не будет смысла в 
        /// обновлении статусов - они будут пролетать моментально</remarks>
        public async Task Identificate(object u)
        {
            await Clients.Caller.SendAsync("statusChange", IdentificationStatus.Processing);
            try
            {
                var user = JsonSerializer.Deserialize<IdentificationDto>(u.ToString());
                await _userHandler.IdentificateUser(user);
                Thread.Sleep(5000);
                await Clients.Caller.SendAsync("statusChange", IdentificationStatus.Success);
                Thread.Sleep(5000);
            }
            catch (Exception e)
            {
                //какая-то обработка
                await Clients.Caller.SendAsync("statusChange", IdentificationStatus.Error);
            }
            finally
            {
                await Clients.Caller.SendAsync("close");
            }
        }
    }
}
