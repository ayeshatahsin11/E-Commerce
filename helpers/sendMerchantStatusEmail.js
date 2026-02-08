const nodemailer = require("nodemailer");

exports.sendMerchantStatusEmail = async (userEmail, userName, status, storeName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, 
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  // --- Dynamic Content Logic ---
  const isApproved = status === "approved";
  
  // Colors
  const accentColor = isApproved ? "#00e676" : "#ff1744"; // Green vs Red
  const cardBg = isApproved 
    ? "linear-gradient(145deg,#002412 0%,#050505 40%,#050505 100%)" // Subtle Green glow
    : "linear-gradient(145deg,#2b0505 0%,#050505 40%,#050505 100%)"; // Subtle Red glow

  // Text Content
  const subject = isApproved ? "🎉 You are now an UrbanPanda Merchant!" : "Update regarding your Merchant Application";
  const headline = isApproved ? "Welcome Aboard!" : "Application Update";
  
  const bodyText = isApproved
    ? `Congratulations! We are thrilled to inform you that your request to register <strong>${storeName}</strong> has been <strong>APPROVED</strong>. You now have full access to the merchant dashboard.`
    : `Thank you for your interest in partnering with UrbanPanda. After carefully reviewing your application for <strong>${storeName}</strong>, we are unable to approve your request at this time.`;

  const nextStepText = isApproved
    ? "To get started, please log in to your dashboard to set up your inventory. If you need help onboarding, contact our support team immediately."
    : "We understand this is disappointing. This decision is often due to incomplete verification details. You are welcome to update your profile and try again in 30 days.";

  const buttonText = isApproved ? "Go to Dashboard" : "Contact Support";
  const buttonLink = isApproved ? "http://localhost:5173/dashboard" : "http://localhost:5173/contact"; // Change these to your actual links

  // --- Email Template ---
  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: subject,
    html: `<!doctypehtml><html xmlns=http://www.w3.org/1999/xhtml><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>${headline}</title><body style=margin:0;padding:0;background-color:#f4f7ff;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif><center><table border=0 cellpadding=0 cellspacing=0 width=100% style="background-color:#f4f7ff;table-layout:fixed;padding:40px 0"align=center><tr><td align=center>
    
    <table border=0 cellpadding=0 cellspacing=0 width=600 style="max-width:600px;width:100%;background:#050505;background:${cardBg};border-radius:32px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.4);border:1px solid rgba(255,255,255,0.1)" class=main-card>
      
      <!-- LOGO -->
      <tr>
        <td style="padding:40px 50px 20px;text-align:center">
          <div style=color:#fff;font-size:24px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px>URBAN<span style=color:#bc8aff>PANDA</span></div>
        </td>
      </tr>

      <!-- STATUS ICON/TEXT -->
      <tr>
        <td style="padding:0 50px;text-align:center">
          <h1 style="color:${accentColor};font-size:32px;font-weight:800;margin:0 0 10px 0;letter-spacing:-0.5px">${headline}</h1>
          <p style="color:#d1c4e9;font-size:16px;line-height:1.6;margin:0">
            Hi, <strong style="color:#fff">${userName}</strong>
          </p>
        </td>
      </tr>

      <!-- DYNAMIC BODY -->
      <tr>
        <td style="padding:30px 40px">
          <table border=0 cellpadding=0 cellspacing=0 width=100% style="background:rgba(255,255,255,.05);border-left:4px solid ${accentColor};border-radius:8px">
            <tr>
              <td style="padding:25px;text-align:left;color:#e0e0e0;font-size:15px;line-height:1.7">
                ${bodyText}
              </td>
            </tr>
          </table>
          
          <p style="color:#a0a0a0;font-size:14px;line-height:1.6;margin-top:25px;text-align:center">
            ${nextStepText}
          </p>
        </td>
      </tr>

      <!-- BUTTON -->
      <tr>
        <td style="padding:10px 50px 40px;text-align:center">
           <a href="${buttonLink}" style="display:inline-block;background:${accentColor};color:#000;text-decoration:none;padding:14px 35px;border-radius:50px;font-weight:700;font-size:14px;box-shadow:0 4px 15px ${isApproved ? 'rgba(0,230,118,0.4)' : 'rgba(255,23,68,0.4)'};">
             ${buttonText}
           </a>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="padding:30px;text-align:center;border-top:1px solid rgba(255,255,255,0.1)">
          <div style=color:rgba(255,255,255,.5);font-size:12px;line-height:1.5>
            © 2026 UrbanPanda Inc.<br>
            <span style="color:#bc8aff">Automated Notification System</span>
          </div>
        </td>
      </tr>

    </table>
    </td></tr></table></center></body></html>`,
  });

  console.log("Status update email sent to %s", userEmail);
};