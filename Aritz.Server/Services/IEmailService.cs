namespace Aritz.Server.Services
{
    public interface IEmailService
    {
        Task SendVerificationEmailAsync(string toEmail, string code);
    }
}
