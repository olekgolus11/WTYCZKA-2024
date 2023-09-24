import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;
  try {
    const data = await resend.emails.send({
      from: `WTYCZKA <onboarding@resend.dev>`,
      to: "wtyczka2023@samorzad.p.lodz.pl",
      reply_to: email,
      subject: `Pytanie od użytkownika ${name}`,
      text: "Wyjazd wtyczka",
      react: EmailTemplate({ name: name, message: message, email: email }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
