using MailKit.Net.Smtp;
using MimeKit;

namespace Online_Travel_and_Hospitality.Services
{
    // This class handles sending emails
    public class EmailService
    {
        private const string SmtpServer = "smtp.gmail.com";
        private const int SmtpPort = 587; // 465 for SSL (if required)
        private const string SenderEmail = "hotelmangement454@gmail.com";
        private const string SenderPassword = "spskjduohduykxtd";

        // Method to send an email asynchronously
        public async Task SendEmailAsync(string recipientEmail, string subject, string body)
        {
            // Create a new email message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(SenderEmail)); // Set the sender's email address
            email.To.Add(MailboxAddress.Parse(recipientEmail)); // Set the recipient's email address
            email.Subject = subject; // Set the email subject
            email.Body = new TextPart("html") { Text = body }; // Set the email body as HTML

            using var smtp = new SmtpClient();
            // Connect to the SMTP server with encryption
            await smtp.ConnectAsync(SmtpServer, SmtpPort, MailKit.Security.SecureSocketOptions.StartTls);

            // Authenticate with the SMTP server using the sender's credentials
            await smtp.AuthenticateAsync(SenderEmail, SenderPassword);

            // Send the email
            await smtp.SendAsync(email);
            // Disconnect from the SMTP server

            await smtp.DisconnectAsync(true);
        }
    }
}