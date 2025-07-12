import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prisma.blog_category.findMany({
      orderBy: [{ sort_order: 'asc' }, { name: 'asc' }],
    });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('GET /api/blog-categories error:', error);
    return NextResponse.json({ success: false, message: 'Internal error', details: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, slug, description, is_active = true, sort_order = 1 } = body;

    const exists = await prisma.blogCategory.findUnique({ where: { slug } });
    if (exists) {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 400 });
    }

    const category = await prisma.blog_Category.create({
      data: {
        name,
        slug,
        description,
        is_active,
        sort_order,
      },
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error('POST /api/blog-categories error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
