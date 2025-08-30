using MailKit.Security;
using MailKit.Net.Smtp;
using MimeKit;

namespace Aritz.Server.Services
{

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendVerificationEmailAsync(string toEmail, string code)
        {
            var smtpServer = _config["EmailSettings:SmtpServer"];
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var senderEmail = _config["EmailSettings:SenderEmail"];
            var senderPassword = _config["EmailSettings:SenderPassword"];

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Tu E-commerce", senderEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Código de Verificación";
            message.Body = new TextPart("plain") { Text = $"Tu código de verificación es: {code}. Expira en 15 minutos." };

            using var client = new SmtpClient();
            await client.ConnectAsync(smtpServer, smtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(senderEmail, senderPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
