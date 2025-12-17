import { NextResponse } from 'next/server';
import { getAdminCredentials, generateSetupToken } from '@/lib/redis-store';

export async function GET() {
  try {
    // Check if admin is already set up
    const adminCreds = await getAdminCredentials();
    
    if (adminCreds) {
      return NextResponse.json({ setupComplete: true });
    }

    // Generate setup token
    const token = await generateSetupToken();
    
    // Log the token to console for admin to see
    console.log('\n' + '='.repeat(60));
    console.log('🔐 ADMIN SETUP REQUIRED');
    console.log('='.repeat(60));
    console.log(`\nSetup URL: ${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/adminl33t/setup?token=${token}`);
    console.log('\nThis token expires in 24 hours.');
    console.log('='.repeat(60) + '\n');

    return NextResponse.json({ 
      setupComplete: false,
      setupUrl: `/adminl33t/setup?token=${token}`,
      message: 'Setup token generated. Check server logs for the setup URL.'
    });
  } catch (error) {
    console.error('Setup check error:', error);
    return NextResponse.json({ error: 'Failed to check setup status' }, { status: 500 });
  }
}
