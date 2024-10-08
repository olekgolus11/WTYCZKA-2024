import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { password } = await req.json();
  const cookiesStore = cookies()

  if (password === 'omerta') {
    console.log('[ACTION] Password is correct');
    cookiesStore.set('magic', 'test');
    return NextResponse.json({ success: true });
  }

  console.log('[ACTION] Password is incorrect!!!');

  return NextResponse.json({ success: false }, { status: 401 });
}