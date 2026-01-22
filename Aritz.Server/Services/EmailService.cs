using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
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
            message.From.Add(new MailboxAddress("Aritz Cosmetica Natural", senderEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Código de Verificación";
            message.Body = new TextPart("plain") { Text = $"Tu código de verificación es: {code}. Expira en 15 minutos." };

            using var client = new SmtpClient();
            await client.ConnectAsync(smtpServer, smtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(senderEmail, senderPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // Leemos la config
            var smtpServer = _config["EmailSettings:SmtpServer"];
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var senderEmail = _config["EmailSettings:SenderEmail"];
            var senderPassword = _config["EmailSettings:SenderPassword"];

            var message = new MimeMessage();

            // Configurar remitente y destinatario
            message.From.Add(new MailboxAddress("Aritz Admin System", senderEmail));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = subject;

            // IMPORTANTE: Usamos BodyBuilder para aceptar HTML
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = htmlMessage; // Aquí va tu tabla HTML
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();

            // Conexión segura
            await client.ConnectAsync(smtpServer, smtpPort, SecureSocketOptions.StartTls);

            // Autenticación
            await client.AuthenticateAsync(senderEmail, senderPassword);

            // Enviar
            await client.SendAsync(message);

            // Desconectar
            await client.DisconnectAsync(true);
        }
    }
}
