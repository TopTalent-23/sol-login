import { NextRequest, NextResponse } from 'next/server';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { connectToDatabase } from '../../../../lib/mongo';
import { UserModel } from '../../../../models/User';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const createJwt = async (user: any) => {
  const payload = {
    telegramUserId: user.telegramUserId,
    username: user.username,
    evmAddress: user.evmAddress,
    userId: user._id,
  };

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const telegramUserId = searchParams.get('telegramUserId');
  const username = searchParams.get('username');
  const address = searchParams.get('address');
  const signature = searchParams.get('signature');
  const language = searchParams.get('language') || 'en';
  const redirectEncoded = searchParams.get('redirectUrl');

  if (!telegramUserId || !username || !address || !signature) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    let user = await UserModel.findOne({ telegramUserId });

    if (!user) {
      const wallet = Keypair.generate();
      const solanaWallet = bs58.encode(wallet.secretKey);
      user = await UserModel.create({
        telegramUserId,
        username,
        evmAddress: address,
        signature,
        solanaWallet,
        language,
        createdAt: new Date()
      });
    }

    const token = await createJwt(user);
    (await cookies()).set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    // Handle optional redirectUrl (base64-encoded JSON string)
    if (redirectEncoded) {
      try {
        const decoded = Buffer.from(redirectEncoded, 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        const redirectTarget = parsed.redirectUrl || '/dashboard';
        return NextResponse.redirect(new URL(redirectTarget, req.url));
      } catch (err) {
        console.warn('Invalid redirectUrl provided');
      }
    }

    return NextResponse.json({ message: 'Authenticated', user });
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
