import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// Map gallery folder names to Cloudinary folder paths and tags
const folderMap: Record<string, { folder: string; tags: string[] }> = {
  'OneYear': { 
    folder: 'Photographer/Gallery/one_year', 
    tags: ['one_year', 'one-year', 'oneyear', 'one year', 'גיל שנה'] 
  },
  'BatMitzva': { 
    folder: 'Photographer/Gallery/BatMitzva', 
    tags: ['batmitzva', 'bat-mitzva', 'בת מצווה'] 
  },
  'Family': { 
    folder: 'Photographer/Gallery/Family', 
    tags: ['family', 'משפחה'] 
  },
  'Pregnancy': { 
    folder: 'Photographer/Gallery/Pregnancy', 
    tags: ['pregnancy', 'הריון'] 
  },
  'BarMitzva': { 
    folder: 'Photographer/Gallery/BarMitzva', 
    tags: ['barmitzva', 'bar-mitzva', 'בר מצווה'] 
  },
  'NewBorn': { 
    folder: 'Photographer/Gallery/NewBorn', 
    tags: ['newborn', 'new-born', 'ניו בורן'] 
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ folder: string }> }
) {
  const { folder } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const offset = (page - 1) * limit;
  
  console.log(`=== API Route: /api/gallery/${folder} === (page: ${page}, limit: ${limit}, offset: ${offset})`);
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  console.log('API Route - Cloudinary config:', {
    cloudName: cloudName ? '✓ Set' : '✗ Missing',
    apiKey: apiKey ? '✓ Set' : '✗ Missing',
    apiSecret: apiSecret ? '✓ Set' : '✗ Missing',
  });

  // Check if Cloudinary credentials are missing
  if (!cloudName || !apiKey || !apiSecret) {
    console.error('API Route - Missing Cloudinary credentials');
    return NextResponse.json(
      { 
        images: [], 
        success: false, 
        error: 'Cloudinary credentials not configured. Please set environment variables in Vercel.' 
      },
      { status: 500 }
    );
  }

  try {
    // Get Cloudinary folder path and tags from mapping
    const folderConfig = folderMap[folder] || { 
      folder: `Photographer/${folder}`, 
      tags: [folder.toLowerCase()] 
    };
    const cloudinaryFolder = folderConfig.folder;
    const searchTags = folderConfig.tags;
    
    console.log(`API Route - Fetching images for folder: ${cloudinaryFolder}, tags: ${searchTags.join(', ')}`);
    
    // Try multiple folder path variations
    const folderVariations = [
      cloudinaryFolder,
      cloudinaryFolder.toLowerCase(),
      cloudinaryFolder.replace(/_/g, '-'),
      `Photographer/Gallery/${folder}`,
      `Photographer/Gallery/${folder.toLowerCase()}`,
      `photographer/gallery/${folder.toLowerCase()}`,
      `Photographer/${folder}`,
      `Photographer/${folder.toLowerCase()}`,
    ];
    
    // First, try Search API with tags (since images might be tagged instead of in folders)
    for (const tag of searchTags) {
      try {
        console.log(`API Route - Trying Search API with tag: ${tag}`);
        const searchResult = await cloudinary.search
          .expression(`tags:${tag} AND resource_type:image`)
          .max_results(500)
          .execute();

        console.log(`API Route - Search API response for tag ${tag}:`, {
          total_count: searchResult.total_count,
          resourceCount: searchResult.resources?.length || 0,
        });

        if (searchResult.resources && searchResult.resources.length > 0) {
          console.log(`API Route - Found ${searchResult.resources.length} images with tag ${tag}`);
          
          const allImages = searchResult.resources
            .filter((resource: any) => resource.resource_type === 'image')
            .map((resource: any) => ({
              src: resource.secure_url,
              alt: resource.public_id.split('/').pop() || 'Gallery Image',
              publicId: resource.public_id,
            }));
          
          // Apply pagination
          const paginatedImages = allImages.slice(offset, offset + limit);
          const hasMore = offset + limit < allImages.length;
          
          console.log(`API Route - Returning ${paginatedImages.length} images (page ${page}, hasMore: ${hasMore})`);
          return NextResponse.json({ 
            images: paginatedImages, 
            success: true,
            pagination: {
              page,
              limit,
              total: allImages.length,
              hasMore,
            }
          });
        }
      } catch (searchError: any) {
        console.log(`API Route - Search API failed for tag ${tag}:`, searchError?.message);
        continue; // Try next tag
      }
    }
    
    // Use Search API with folder expression
    for (const folderPath of folderVariations) {
      try {
        console.log(`API Route - Trying folder path: ${folderPath}`);
        const searchResult = await cloudinary.search
          .expression(`folder:${folderPath} AND resource_type:image`)
          .max_results(500)
          .execute();

        console.log(`API Route - Search API response for ${folderPath}:`, {
          total_count: searchResult.total_count,
          resourceCount: searchResult.resources?.length || 0,
        });

        if (searchResult.resources && searchResult.resources.length > 0) {
          console.log(`API Route - Found ${searchResult.resources.length} images in ${folderPath} folder`);
          
          const allImages = searchResult.resources
            .filter((resource: any) => resource.resource_type === 'image')
            .map((resource: any) => ({
              src: resource.secure_url,
              alt: resource.public_id.split('/').pop() || 'Gallery Image',
              publicId: resource.public_id,
            }));
          
          // Apply pagination
          const paginatedImages = allImages.slice(offset, offset + limit);
          const hasMore = offset + limit < allImages.length;
          
          console.log(`API Route - Returning ${paginatedImages.length} images (page ${page}, hasMore: ${hasMore})`);
          return NextResponse.json({ 
            images: paginatedImages, 
            success: true,
            pagination: {
              page,
              limit,
              total: allImages.length,
              hasMore,
            }
          });
        }
      } catch (searchError: any) {
        console.log(`API Route - Search API failed for ${folderPath}:`, searchError?.message);
        continue; // Try next variation
      }
    }
    
    // Fallback: Try Admin API with prefix for all variations
    for (const folderPath of folderVariations) {
      try {
        console.log(`API Route - Fallback: Trying Admin API with prefix: ${folderPath}`);
        const result = await cloudinary.api.resources({
          type: 'upload',
          resource_type: 'image',
          prefix: folderPath,
          max_results: 500,
        });

        if (result.resources && result.resources.length > 0) {
          console.log(`API Route - Found ${result.resources.length} images via Admin API in ${folderPath}`);
          const allImages = result.resources.map((resource: any) => ({
            src: resource.secure_url,
            alt: resource.public_id.split('/').pop() || 'Gallery Image',
            publicId: resource.public_id,
          }));
          
          // Apply pagination
          const paginatedImages = allImages.slice(offset, offset + limit);
          const hasMore = offset + limit < allImages.length;
          
          console.log(`API Route - Returning ${paginatedImages.length} images (page ${page}, hasMore: ${hasMore})`);
          return NextResponse.json({ 
            images: paginatedImages, 
            success: true,
            pagination: {
              page,
              limit,
              total: allImages.length,
              hasMore,
            }
          });
        }
      } catch (adminError: any) {
        console.log(`API Route - Admin API failed for ${folderPath}:`, adminError?.message);
        continue; // Try next variation
      }
    }
    
    // Final fallback: Fetch all images from Photographer folder and check their structure
    try {
      console.log('API Route - Final fallback: Fetching all images from Photographer folder to inspect structure');
      const allImagesResult = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        prefix: 'Photographer',
        max_results: 500,
      });

      if (allImagesResult.resources && allImagesResult.resources.length > 0) {
        console.log(`API Route - Found ${allImagesResult.resources.length} total images in Photographer folder`);
        
        // Log sample public_ids to see the structure
        console.log('API Route - Sample public_ids (first 10):', 
          allImagesResult.resources.slice(0, 10).map((r: any) => ({
            public_id: r.public_id,
            folder: r.folder,
            tags: r.tags,
          }))
        );

        // Try to find images by checking if public_id contains the folder name
        const folderNameLower = folder.toLowerCase();
        const folderNameVariations = [
          folderNameLower,
          folderNameLower.replace(/_/g, '-'),
          folderNameLower.replace(/-/g, '_'),
          'one_year',
          'one-year',
          'oneyear',
        ];

        const matchingImages = allImagesResult.resources.filter((resource: any) => {
          const publicId = (resource.public_id || '').toLowerCase();
          const tags = (resource.tags || []).map((t: string) => t.toLowerCase());
          const folder = (resource.folder || '').toLowerCase();
          
          // Check if any tag matches
          const hasMatchingTag = searchTags.some((tag) => 
            tags.includes(tag.toLowerCase())
          );
          
          // Check if any folder name variation matches
          const hasMatchingFolder = folderNameVariations.some((variation) => 
            publicId.includes(variation) || 
            folder.includes(variation)
          );
          
          return hasMatchingTag || hasMatchingFolder;
        });

        if (matchingImages.length > 0) {
          console.log(`API Route - Found ${matchingImages.length} images matching folder variations`);
          const allImages = matchingImages.map((resource: any) => ({
            src: resource.secure_url,
            alt: resource.public_id.split('/').pop() || 'Gallery Image',
            publicId: resource.public_id,
          }));
          
          // Apply pagination
          const paginatedImages = allImages.slice(offset, offset + limit);
          const hasMore = offset + limit < allImages.length;
          
          console.log(`API Route - Returning ${paginatedImages.length} images (page ${page}, hasMore: ${hasMore})`);
          return NextResponse.json({ 
            images: paginatedImages, 
            success: true,
            pagination: {
              page,
              limit,
              total: allImages.length,
              hasMore,
            }
          });
        }
      }
    } catch (fallbackError: any) {
      console.error('API Route - Final fallback also failed:', fallbackError?.message);
    }
    
    console.warn(`API Route - No images found in folder: ${cloudinaryFolder}`);
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

