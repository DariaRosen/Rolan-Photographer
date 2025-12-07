import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:carousel')
      .sort_by([{ created_at: 'desc' }])
      .max_results(50)
      .execute();

    const images = result.resources.map((resource: any) => ({
      src: resource.secure_url,
      alt: resource.public_id.split('/').pop() || 'Carousel Image',
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching carousel images from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch carousel images' },
      { status: 500 }
    );
  }
}

