const nodemailer = require("nodemailer");

exports.sendEmail = async (email, name, OTP) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, // Use true for port 465, false for port 587
        auth: {                                    // auth: the user or organization who'll send the verification mail
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,                         // we can send email to mutiple users at same time, like take an array , store those emails there and write that array name in to: place
        subject: "Email Verification",

        html: `<!doctypehtml><html xmlns=http://www.w3.org/1999/xhtml><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Verify Your Account</title><body style="margin:0;padding:0;background-color:#f4f7ff;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif"><center><table border=0 cellpadding=0 cellspacing=0 width=100% style="background-color:#f4f7ff;table-layout:fixed;padding:40px 0"align=center><tr><td align=center><table border=0 cellpadding=0 cellspacing=0 width=600 style="max-width:600px;width:100%;background:#050505;background:linear-gradient(145deg,#050505 0,#2e005e 50%,#6a0dad 100%);border-radius:32px;overflow:hidden;box-shadow:0 20px 40px rgba(46,0,94,.25)"class=main-card><tr><td style="padding:60px 50px;text-align:center"><div style=color:#fff;font-size:24px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:40px>URBAN<span style=color:#bc8aff>PANDA</span></div><h1 style="color:#fff;font-size:32px;font-weight:800;margin:0 0 15px 0;line-height:1.2">Hi,${name}!</h1><p style="color:#d1c4e9;font-size:16px;line-height:1.6;margin:0 0 40px 0">Welcome to our community. To ensure your account is secure and ready to go, please use the verification code below:<table border=0 cellpadding=0 cellspacing=0 width=80% style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:20px"align=center><tr><td style=padding:30px;text-align:center><h2 style="color:#fff;font-size:48px;font-weight:800;letter-spacing:10px;margin:0;text-shadow:0 0 15px rgba(188,138,255,.4)">${OTP}</h2></table><p style="color:#d1c4e9;font-size:14px;line-height:1.6;margin:40px 0 0 0">This code is valid for 10 minutes.<br>If you didn't request this, you can ignore this email.<div style="height:1px;background:rgba(255,255,255,.1);margin:40px 0"></div><div style=color:rgba(255,255,255,.5);font-size:12px;line-height:1.5>© 2026 UrbanPanda Inc.<br><a href=# style=color:#bc8aff;text-decoration:none>Privacy Policy</a> • <a href=# style=color:#bc8aff;text-decoration:none>Support</a></div></table><table border=0 cellpadding=0 cellspacing=0 width=600><tr><td style=padding:20px;text-align:center;color:#a0abbf;font-size:12px>You are receiving this because you signed up at urbanpanda.com</table></table></center>`,
    });
}
