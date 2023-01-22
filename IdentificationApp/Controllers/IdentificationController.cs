using HelloApp;
using IdentificationApp.Handlers;
using IdentificationApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace IdentificationApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentificationController : ControllerBase
    {
        private readonly ILogger<IdentificationController> _logger;
        private readonly IUserHandler _userHandler;

        public IdentificationController(ILogger<IdentificationController> logger, IUserHandler userHandler)
        {
            _logger = logger;
            _userHandler = userHandler;
        }

        [HttpPost("register")]
        public async Task<IResult> Register([FromBody] RegisterDto dto)
        {
            var saved = await _userHandler.RegisterUser(dto);
            return saved > 0 ? Results.Ok(saved) : Results.StatusCode(500);
        }
    }
}