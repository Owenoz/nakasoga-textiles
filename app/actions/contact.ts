"use server";

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // In production, you would use a service like:
    // - Resend (resend.com)
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    
    // For now, we'll log it and simulate success
    console.log("Contact Form Submission:", {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, you would send an actual email here
    // Example with Resend:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Nakasoga Textiles <noreply@nakasogatextiles.com>',
      to: 'Idriisakimbgwe@yahoo.com',
      subject: `Contact Form: ${formData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    });
    */

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, message: "Failed to send message. Please try WhatsApp instead." };
  }
}
