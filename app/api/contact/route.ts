import { NextRequest, after } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { error: "Required fields (name, email, message) are missing." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Mail server credentials are not configured in environment variables.");
      return Response.json(
        { error: "Mail service is currently misconfigured." },
        { status: 500 }
      );
    }

    const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
    const emailPort = parseInt(process.env.EMAIL_PORT || "465", 10);
    const emailSecure = process.env.EMAIL_SECURE ? process.env.EMAIL_SECURE === "true" : (emailPort === 465);

    const smtpOptions: SMTPTransport.Options & { family?: number } = {
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // Force IPv4 to avoid slow Node.js DNS/IPv6 connection timeouts (often causes 20+ sec delays)
      family: 4,
      connectionTimeout: 5000, // 5s timeout
      greetingTimeout: 5000,
      socketTimeout: 5000,
    };

    // Configure Nodemailer SMTP transporter dynamically
    const transporter = nodemailer.createTransport(smtpOptions);

    const mailOptions = {
      from: `"${name}" <${email}>`, // From address is from user entered in UI
      to: emailUser, // To address is from EMAIL_USER
      replyTo: email,
      subject: `Portfolio Contact: ${subject || "No Subject"} - from ${name}`,
      text: `You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Subject: ${subject || "N/A"}

Message:
${message}
`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 0;">New Portfolio Inquiry</h2>
          
          <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 100px;">From:</td>
              <td style="padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 6px 0;">${subject || "N/A"}</td>
            </tr>
          </table>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #4f46e5; margin-bottom: 20px; white-space: pre-wrap;">
${message}
          </div>
          
          <footer style="font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 15px;">
            This email was sent automatically from your portfolio website's contact form.
          </footer>
        </div>
      `,
    };

    // Send the email in the background so the HTTP response returns immediately (~100ms)
    after(async () => {
      try {
        await transporter.sendMail(mailOptions);
        console.log("Contact email sent successfully in the background.");
      } catch (err) {
        console.error("Error sending contact email in background:", err);
      }
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return Response.json(
      { error: error?.message || "Failed to dispatch email inquiry." },
      { status: 500 }
    );
  }
}
