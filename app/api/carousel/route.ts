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
    console.log('API Route - Attempting to fetch from folder: Photographer/Carousel');
    
    // Try Search API first (might work differently with IP restrictions)
    try {
      console.log('API Route - Trying Search API...');
      
      // Fetch all resources with pagination if needed
      let allResources: any[] = [];
      let nextCursor: string | undefined = undefined;
      let pageCount = 0;
      
      do {
        pageCount++;
        console.log(`API Route - Fetching page ${pageCount}...`);
        
        const searchQuery = cloudinary.search
          .expression('folder:Photographer/Carousel')
          .max_results(500);
        
        if (nextCursor) {
          searchQuery.next_cursor(nextCursor);
        }
        
        const searchResult = await searchQuery.execute();

        console.log(`API Route - Page ${pageCount} response:`, {
          hasResources: !!searchResult.resources,
          resourceCount: searchResult.resources?.length || 0,
          totalCount: searchResult.total_count,
          nextCursor: searchResult.next_cursor,
        });

        if (searchResult.resources && searchResult.resources.length > 0) {
          allResources = [...allResources, ...searchResult.resources];
          nextCursor = searchResult.next_cursor;
        } else {
          nextCursor = undefined;
        }
      } while (nextCursor);

      console.log(`API Route - Total resources fetched across ${pageCount} pages: ${allResources.length}`);
      console.log('API Route - All resource public_ids:', allResources.map((r: any) => r.public_id));

      if (allResources.length > 0) {
        // Filter only image resources and map them
        const images = allResources
          .filter((resource: any) => resource.resource_type === 'image')
          .map((resource: any) => ({
            src: resource.secure_url,
            alt: resource.public_id.split('/').pop() || 'Carousel Image',
            publicId: resource.public_id,
          }));
        
        console.log(`API Route - Filtered to ${images.length} image resources`);
        console.log('API Route - All image URLs:', images.map((img: any) => img.src));
        
        return NextResponse.json({ images, success: true });
      }
    } catch (searchError: any) {
      console.error('API Route - Search API failed:', {
        message: searchError?.message,
        http_code: searchError?.http_code,
        error: searchError?.error,
        errorMessage: searchError?.error?.message,
        fullError: JSON.stringify(searchError, null, 2),
      });
    }

    // Try Admin API as fallback
    try {
      console.log('API Route - Trying Admin API...');
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'Photographer/Carousel',
        max_results: 500,
      });

      console.log('API Route - Admin API response:', {
        hasResources: !!result.resources,
        resourceCount: result.resources?.length || 0,
      });

      if (result.resources && result.resources.length > 0) {
        console.log(`API Route - Successfully fetched ${result.resources.length} images via Admin API`);
        console.log('API Route - All resource public_ids:', result.resources.map((r: any) => r.public_id));
        
        // Filter only image resources and map them
        const images = result.resources
          .filter((resource: any) => resource.resource_type === 'image' || !resource.resource_type)
          .map((resource: any) => ({
            src: resource.secure_url,
            alt: resource.public_id.split('/').pop() || 'Carousel Image',
            publicId: resource.public_id,
          }));
        
        console.log(`API Route - Filtered to ${images.length} image resources`);
        console.log('API Route - All image URLs:', images.map((img: any) => img.src));
        
        return NextResponse.json({ images, success: true });
      }
    } catch (adminError: any) {
      console.error('API Route - Admin API failed:', {
        message: adminError?.message,
        http_code: adminError?.http_code,
        error: adminError?.error,
        errorMessage: adminError?.error?.message,
        fullError: JSON.stringify(adminError, null, 2),
      });
    }

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

