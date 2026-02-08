const nodemailer = require("nodemailer");

exports.sendMerchantRequestEmail = async (adminEmail, adminName, applicantName, storeName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: adminEmail, 
    subject: "Action Required: New Merchant Application",
    html: `<!doctypehtml><html xmlns=http://www.w3.org/1999/xhtml><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Merchant Request</title><body style=margin:0;padding:0;background-color:#f4f7ff;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif><center><table border=0 cellpadding=0 cellspacing=0 width=100% style="background-color:#f4f7ff;table-layout:fixed;padding:40px 0"align=center><tr><td align=center>
    
    <table border=0 cellpadding=0 cellspacing=0 width=600 style="max-width:600px;width:100%;background:#050505;background:linear-gradient(145deg,#050505 0,#2e005e 50%,#6a0dad 100%);border-radius:32px;overflow:hidden;box-shadow:0 20px 40px rgba(46,0,94,.25)" class=main-card>
      
      <!-- LOGO HEADER -->
      <tr>
        <td style="padding:40px 50px 20px;text-align:center">
          <div style=color:#fff;font-size:24px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px>URBAN<span style=color:#bc8aff>PANDA</span></div>
        </td>
      </tr>

      <!-- GREETING & TITLE -->
      <tr>
        <td style="padding:0 50px;text-align:center">
          <h1 style="color:#fff;font-size:28px;font-weight:800;margin:0 0 10px 0;line-height:1.2">Merchant Request</h1>
          <p style="color:#d1c4e9;font-size:16px;line-height:1.6;margin:0">
            Hello, <strong style="color:#fff">${adminName}</strong>!
          </p>
          <p style="color:#d1c4e9;font-size:15px;line-height:1.6;margin:10px 0 30px 0">
            A new user has applied to become a merchant on UrbanPanda. Please review the details below and take action.
          </p>
        </td>
      </tr>

      <!-- APPLICANT DETAILS CARD -->
      <tr>
        <td style="padding:0 40px">
          <table border=0 cellpadding=0 cellspacing=0 width=100% style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px">
            <tr>
              <td style="padding:25px;text-align:left">
                <!-- Applicant Name -->
                <p style="color:#bc8aff;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin:0 0 5px 0">Applicant Name</p>
                <h3 style="color:#fff;font-size:18px;margin:0 0 20px 0">${applicantName}</h3>
                
                <!-- Store Name -->
                <p style="color:#bc8aff;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin:0 0 5px 0">Store Name</p>
                <h3 style="color:#fff;font-size:18px;margin:0">${storeName}</h3>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ACTION BUTTONS -->
      <tr>
        <td style="padding:40px 50px;text-align:center">
          <table border=0 cellpadding=0 cellspacing=0 width=100%>
            <tr>
              <td align="center" style="padding-bottom: 10px;">
                <!-- REJECT BUTTON -->
                <a href="#" style="display:inline-block;background:rgba(255,23,68,0.2);border:1px solid #ff1744;color:#ff1744;text-decoration:none;padding:12px 30px;border-radius:50px;font-weight:700;font-size:14px;margin-right:10px;">
                  Reject
                </a>

                <!-- APPROVE BUTTON -->
                <a href="#" style="display:inline-block;background:#00e676;color:#000;text-decoration:none;padding:12px 30px;border-radius:50px;font-weight:700;font-size:14px;box-shadow:0 4px 15px rgba(0,230,118,0.4);">
                  Approve Application
                </a>
              </td>
            </tr>
          </table>
          <p style="color:#d1c4e9;font-size:12px;margin-top:20px;opacity:0.7">These links will expire in 24 hours.</p>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="padding:30px;text-align:center;border-top:1px solid rgba(255,255,255,0.1)">
          <div style=color:rgba(255,255,255,.5);font-size:12px;line-height:1.5>
            © 2026 UrbanPanda Inc.<br>
            <a href=# style=color:#bc8aff;text-decoration:none>Admin Dashboard</a>
          </div>
        </td>
      </tr>

    </table>
    </td></tr></table></center></body></html>`,
  });

  console.log("Merchant Request Email sent: %s", info.messageId);
};

