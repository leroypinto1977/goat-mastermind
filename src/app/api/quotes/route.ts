import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    
    // Only admins can view all quotes
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to submit a quote.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email, businessName, niche, items, total } = body;

    if (!name || !email || !businessName || !niche) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, businessName, and niche are required' },
        { status: 400 }
      );
    }

    // Items should be an array of services with their levels and prices
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items must be an array' },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.create({
      data: {
        userId: session.user.id,
        name,
        email,
        businessName,
        items: {
          niche,
          services: items,
          total: total || 0,
        },
        status: 'PENDING',
      },
    });

    return NextResponse.json({ quote }, { status: 201 });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
