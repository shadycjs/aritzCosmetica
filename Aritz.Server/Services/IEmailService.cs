namespace Aritz.Server.Services
{
    public interface IEmailService
    {
        Task SendVerificationEmailAsync(string toEmail, string code);

        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
