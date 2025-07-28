#!/bin/bash

# Image Optimization Script for Coastline Spray Foam
# Converts JPEG images to WebP format with fallbacks for better performance

echo "🖼️  Starting image optimization for better performance..."

# Create optimized images directory
mkdir -p assets/images/optimized
mkdir -p assets/images/webp

# Function to optimize a single image
optimize_image() {
  local input_file=$1
  local filename=$(basename "$input_file" .jpg)
  local webp_file="assets/images/webp/${filename}.webp"
  local optimized_file="assets/images/optimized/${filename}.jpg"
  
  echo "📸 Optimizing: $filename"
  
  # Create WebP version (if cwebp is available)
  if command -v cwebp &> /dev/null; then
    cwebp -q 85 -m 6 "$input_file" -o "$webp_file"
    echo "   ✅ Created WebP: $webp_file"
  else
    echo "   ⚠️  cwebp not found, skipping WebP creation"
  fi
  
  # Create optimized JPEG (if jpegoptim is available)
  if command -v jpegoptim &> /dev/null; then
    cp "$input_file" "$optimized_file"
    jpegoptim --size=200k --strip-all "$optimized_file"
    echo "   ✅ Optimized JPEG: $optimized_file"
  elif command -v convert &> /dev/null; then
    # Use ImageMagick as fallback
    convert "$input_file" -quality 85 -strip "$optimized_file"
    echo "   ✅ Optimized with ImageMagick: $optimized_file"
  else
    echo "   ⚠️  No optimization tools found, copying original"
    cp "$input_file" "$optimized_file"
  fi
}

# Process all JPEG images
echo "🔍 Finding JPEG images to optimize..."
find assets/images -name "*.jpg" -not -path "*/optimized/*" -not -path "*/webp/*" | while read -r image; do
  optimize_image "$image"
done

echo ""
echo "📊 Optimization Summary:"
echo "   Original images: $(find assets/images -name "*.jpg" -not -path "*/optimized/*" -not -path "*/webp/*" | wc -l)"
echo "   WebP images: $(find assets/images/webp -name "*.webp" 2>/dev/null | wc -l)"
echo "   Optimized JPEGs: $(find assets/images/optimized -name "*.jpg" 2>/dev/null | wc -l)"

echo ""
echo "🎯 Next Steps:"
echo "   1. Install optimization tools for better results:"
echo "      - Ubuntu/Debian: sudo apt-get install webp jpegoptim imagemagick"
echo "      - macOS: brew install webp jpegoptim imagemagick"
echo "   2. Update HTML to use optimized images with WebP fallbacks"
echo "   3. Implement lazy loading for gallery images"

echo ""
echo "✅ Image optimization complete!"
