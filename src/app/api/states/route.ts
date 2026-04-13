import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const states = await prisma.state.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(states);
  } catch (error) {
    console.error('SERVER ERROR IN /api/states:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as any).message }, { status: 500 });
  }
}
