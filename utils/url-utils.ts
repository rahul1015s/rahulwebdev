export function convertDriveUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;

  try {
    // Handle Google Drive direct file ID format
    if (url.startsWith('drive://')) {
      const fileId = url.replace('drive://', '');
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    // Extract file ID from various Google Drive URL formats
    const patterns = [
      /\/d\/([^\/?#]+)/,           // /d/FILE_ID
      /\/file\/d\/([^\/?#]+)/,     // /file/d/FILE_ID
      /id=([^&?#]+)/,              // ?id=FILE_ID
      /\/folders\/([^\/?#]+)/,     // /folders/FILE_ID (for folders)
      /open\?id=([^&]+)/,          // open?id=FILE_ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }

    // If no pattern matches, return original URL
    return url;
  } catch (error) {
    console.error('Error converting Google Drive URL:', error);
    return url;
  }
}

/**
 * Convert OneDrive URL to direct download URL
 * Supports multiple OneDrive URL formats
 */
export function convertOneDriveUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;

  try {
    // Handle OneDrive direct file ID format
    if (url.startsWith('onedrive://')) {
      const fileId = url.replace('onedrive://', '');
      return `https://api.onedrive.com/v1.0/drives/me/items/${fileId}/content`;
    }

    // Handle OneDrive personal URLs
    if (url.includes('onedrive.live.com')) {
      // Convert view URL to download URL
      if (url.includes('/redir?')) {
        return url.replace('/redir?', '/download?');
      }
      if (url.includes('?')) {
        return url.replace('?', 'download?');
      }
    }

    // Handle OneDrive for Business/SharePoint URLs
    if (url.includes('sharepoint.com') || url.includes('1drv.ms')) {
      // For SharePoint, we need to use the SharePoint API or keep as is
      // since direct download URLs are more complex
      return url;
    }

    return url;
  } catch (error) {
    console.error('Error converting OneDrive URL:', error);
    return url;
  }
}

/**
 * Convert Dropbox URL to direct download URL
 */
export function convertDropboxUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;

  try {
    // Handle Dropbox shared links
    if (url.includes('dropbox.com/s/')) {
      // Convert to raw content URL
      return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
               .replace('?dl=0', '?raw=1')
               .split('?')[0] + '?raw=1';
    }

    return url;
  } catch (error) {
    console.error('Error converting Dropbox URL:', error);
    return url;
  }
}

/**
 * Normalize image URL by detecting the service and converting to direct view URL
 */
export function normalizeImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;

  try {
    const trimmedUrl = url.trim();
    
    // Check for empty URL
    if (!trimmedUrl) return '';

    // Skip normalization for data URLs
    if (trimmedUrl.startsWith('data:')) return trimmedUrl;

    // Keep root-relative and same-page-relative asset paths intact
    if (trimmedUrl.startsWith('/')) return trimmedUrl;
    if (trimmedUrl.startsWith('./') || trimmedUrl.startsWith('../')) return trimmedUrl;

    // Skip normalization for already proxied URLs
    if (trimmedUrl.includes('/api/proxy/image')) return trimmedUrl;

    // Skip normalization for already normalized URLs
    if (trimmedUrl.includes('drive.google.com/uc?export=view')) return trimmedUrl;

    // Detect service and convert accordingly
    if (trimmedUrl.includes('drive.google.com') || trimmedUrl.startsWith('drive://')) {
      // Use server-side proxy for Drive links to avoid redirect/CORS issues
      const direct = convertDriveUrl(trimmedUrl);
      return `/api/proxy/image?url=${encodeURIComponent(direct)}`;
    }

    if (trimmedUrl.includes('onedrive.live.com') || 
        trimmedUrl.includes('1drv.ms') || 
        trimmedUrl.startsWith('onedrive://')) {
      return convertOneDriveUrl(trimmedUrl);
    }

    if (trimmedUrl.includes('dropbox.com')) {
      return convertDropboxUrl(trimmedUrl);
    }

    // For other URLs, ensure they have proper protocol
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      return `https://${trimmedUrl}`;
    }

    return trimmedUrl;
  } catch (error) {
    console.error('Error normalizing image URL:', error);
    return url;
  }
}

/**
 * Validate if a URL is accessible (basic validation)
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  if (!url || typeof url !== 'string') return false;

  try {
    // Skip validation for data URLs and local URLs
    if (url.startsWith('data:') || url.startsWith('/') || url.includes('localhost')) {
      return true;
    }

    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error validating image URL:', error);
    return false;
  }
}

/**
 * Extract file information from URL
 */
export function getFileInfoFromUrl(url: string): {
  service: 'google-drive' | 'onedrive' | 'dropbox' | 'other';
  fileId?: string;
  fileName?: string;
} {
  if (!url) return { service: 'other' };

  try {
    // Google Drive
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/[\/?](?:id=|d\/)([^\/&?#]+)/);
      return {
        service: 'google-drive',
        fileId: idMatch ? idMatch[1] : undefined
      };
    }

    // OneDrive
    if (url.includes('onedrive.live.com') || url.includes('1drv.ms')) {
      return {
        service: 'onedrive'
      };
    }

    // Dropbox
    if (url.includes('dropbox.com')) {
      const fileMatch = url.match(/\/s\/([^\/?]+)/);
      return {
        service: 'dropbox',
        fileId: fileMatch ? fileMatch[1] : undefined
      };
    }

    return { service: 'other' };
  } catch (error) {
    console.error('Error extracting file info from URL:', error);
    return { service: 'other' };
  }
}

/**
 * Check if URL needs normalization
 */
export function needsNormalization(url: string): boolean {
  if (!url) return false;

  return (
    url.includes('drive.google.com/d') ||
    url.includes('drive.google.com/file/d') ||
    url.includes('onedrive.live.com/redir') ||
    url.includes('dropbox.com/s/') ||
    url.startsWith('drive://') ||
    url.startsWith('onedrive://')
  );
}

export default {
  convertDriveUrl,
  convertOneDriveUrl,
  convertDropboxUrl,
  normalizeImageUrl,
  validateImageUrl,
  getFileInfoFromUrl,
  needsNormalization
};
