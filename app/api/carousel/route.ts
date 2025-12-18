import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('=== API Route: /api/carousel ===');
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  console.log('API Route - Cloudinary config:', {
    cloudName: cloudName ? '✓ Set' : '✗ Missing',
    apiKey: apiKey ? '✓ Set' : '✗ Missing',
    apiSecret: apiSecret ? '✓ Set' : '✗ Missing',
  });

  try {
    console.log('API Route - Using Search API to find images in Photographer/Carousel folder');
    
    // Use Search API with folder expression - this works even if public_id doesn't include folder
    try {
      const searchResult = await cloudinary.search
        .expression('folder:Photographer/Carousel AND resource_type:image')
        .max_results(500)
        .execute();

      console.log(`API Route - Search API response:`, {
        total_count: searchResult.total_count,
        resourceCount: searchResult.resources?.length || 0,
      });

      if (searchResult.resources && searchResult.resources.length > 0) {
        console.log(`API Route - Found ${searchResult.resources.length} images in Photographer/Carousel folder`);
        console.log('API Route - Sample public_ids:', 
          searchResult.resources.slice(0, 10).map((r: any) => r.public_id));
        
        const images = searchResult.resources
          .filter((resource: any) => resource.resource_type === 'image')
          .map((resource: any) => ({
            src: resource.secure_url,
            alt: resource.public_id.split('/').pop() || 'Carousel Image',
            publicId: resource.public_id,
          }));
        
        console.log(`API Route - Mapped to ${images.length} image resources`);
        return NextResponse.json({ images, success: true });
      } else {
        console.warn('API Route - Search API returned 0 results for folder:Photographer/Carousel');
      }
    } catch (searchError: any) {
      console.error('API Route - Search API failed:', {
        message: searchError?.message,
        http_code: searchError?.http_code,
        error: searchError?.error,
      });
      
      // Fallback: Try Admin API with prefix
      try {
        console.log('API Route - Fallback: Trying Admin API with prefix');
        const result = await cloudinary.api.resources({
          type: 'upload',
          resource_type: 'image',
          prefix: 'Photographer/Carousel',
          max_results: 500,
        });

        if (result.resources && result.resources.length > 0) {
          console.log(`API Route - Found ${result.resources.length} images via Admin API`);
          const images = result.resources.map((resource: any) => ({
            src: resource.secure_url,
            alt: resource.public_id.split('/').pop() || 'Carousel Image',
            publicId: resource.public_id,
          }));
          return NextResponse.json({ images, success: true });
        }
      } catch (adminError: any) {
        console.error('API Route - Admin API fallback also failed:', adminError?.message);
      }
    }
    
    console.warn('API Route - No resources found in any Carousel folder variation');

    console.warn('API Route - No images found');
    return NextResponse.json({ images: [], success: false, error: 'No images found' });
  } catch (error: any) {
    console.error('API Route - Final Error:', {
      message: error?.message,
      http_code: error?.http_code,
      error: error?.error,
    });
    return NextResponse.json(
      { images: [], success: false, error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

