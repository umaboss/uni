import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      category_id,
      title,
      slug,
      short_description,
      description,
      image,
      image_ext,
      is_active,
      is_featured,
      sort_order,
      seo,
      views,
      likes,
      ip,
      custom_post_type,
      post_attributes,
      sm_question,
      sm_answer,
      review_detail,
      rating_count,
      review_count,
      avg_review_value,
    } = body;

    if (!title || !slug || !category_id) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Check if category exists
    const existingCategory = await prisma.blog_category.findUnique({
      where: { id: Number(category_id) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Invalid category_id. No such category exists.' },
        { status: 400 }
      );
    }

    const blog = await prisma.blogs.create({
      data: {
        category_id: Number(category_id),
        title,
        slug,
        short_description,
        description,
        image,
        image_ext,
        is_active: is_active ?? true,
        is_featured: is_featured ?? false,
        sort_order: sort_order ?? 1,
        seo: seo ?? '{}',
        views: views ?? 0,
        likes: likes ?? 0,
        ip: ip ?? '',
        custom_post_type: custom_post_type ?? 'blog',
        post_attributes: post_attributes ?? '{}',
        sm_question: sm_question ?? '[]',
        sm_answer: sm_answer ?? '[]',
        review_detail: review_detail ?? '[]',
        rating_count: rating_count ?? 0,
        review_count: review_count ?? 0,
        avg_review_value: avg_review_value ?? 0,
      },
    });

    return NextResponse.json({ success: true, message: 'Blog created', data: blog }, { status: 201 });
  } catch (error) {
    console.error('POST /api/blogs error:', error);
    return NextResponse.json({ success: false, message: 'Internal error', details: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const blogs = await prisma.blogs.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });
    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json({ success: false, message: 'Internal error', details: error.message }, { status: 500 });
  }
}















// import { prisma } from '@/lib/prisma';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const blogs = await prisma.blogs.findMany({
//         include: {
//           user: {
//             select: { id: true, email: true },
//           },
//           category: {
//             select: { id: true, name: true, slug: true },
//           },
//         },
//       });
//       res.status(200).json({ success: true, data: blogs });
//     } catch (err) {
//       res.status(500).json({ success: false, message: 'Error retrieving blogs', details: err });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const {
//         user_id, category_id, title, sm_question, sm_answer, review_detail, rating_count,
//         review_count, avg_review_value, slug, short_description, description, image,
//         image_ext, is_active, seo, views, likes, ip, custom_post_type, post_attributes,
//         is_featured, sort_order,
//       } = req.body;

//       // Validate user exists
//       if (user_id) {
//         const user = await prisma.user.findUnique({ where: { id: user_id } });
//         if (!user) {
//           return res.status(400).json({ message: `User not found with id=${user_id}` });
//         }
//       }

//       const blog = await prisma.blogs.create({
//         data: {
//           user_id,
//           category_id,
//           title,
//           sm_question: sm_question ?? '[]',
//           sm_answer: sm_answer ?? '[]',
//           review_detail: review_detail ?? '[]',
//           rating_count: rating_count ?? 0,
//           review_count: review_count ?? 0,
//           avg_review_value: avg_review_value ?? 0,
//           slug,
//           short_description,
//           description,
//           image,
//           image_ext,
//           is_active: is_active ?? 1,
//           seo,
//           views: views ?? 0,
//           likes: likes ?? 0,
//           ip,
//           custom_post_type,
//           post_attributes,
//           is_featured: is_featured ?? 0,
//           sort_order,
//         },
//       });

//       res.status(201).json({ message: 'Blog created successfully!', data: blog });
//     } catch (err) {
//       res.status(500).json({ message: 'Error creating blog', details: err });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
