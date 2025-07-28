#!/bin/bash

# Script to update all HTML files with clean URLs
# This script replaces .html links with clean URLs

echo "🔄 Updating all HTML files with clean URLs..."

# List of HTML files to update
files=(
  "services.html"
  "contact.html"
  "gallery.html"
  "blog.html"
  "service-areas.html"
  "privacy-policy.html"
  "terms-of-service.html"
  "warranty.html"
)

# Function to update navigation links in a file
update_navigation() {
  local file=$1
  echo "📝 Updating navigation in $file..."
  
  # Update navbar brand link
  sed -i 's|href="index\.html"|href="/"|g' "$file"
  
  # Update navigation links
  sed -i 's|href="index\.html">Home|href="/">Home|g' "$file"
  sed -i 's|href="about\.html">About|href="/about">About|g' "$file"
  sed -i 's|href="services\.html">Services|href="/services">Services|g' "$file"
  sed -i 's|href="service-areas\.html">Areas|href="/service-areas">Areas|g' "$file"
  sed -i 's|href="gallery\.html">Gallery|href="/gallery">Gallery|g' "$file"
  sed -i 's|href="blog\.html">Blog|href="/blog">Blog|g' "$file"
  sed -i 's|href="contact\.html">Contact|href="/contact">Contact|g' "$file"
}

# Function to update footer links in a file
update_footer() {
  local file=$1
  echo "🔗 Updating footer links in $file..."
  
  # Update service links
  sed -i 's|href="services\.html"|href="/services"|g' "$file"
  sed -i 's|href="gallery\.html"|href="/gallery"|g' "$file"
  sed -i 's|href="service-areas\.html"|href="/service-areas"|g' "$file"
  sed -i 's|href="contact\.html"|href="/contact"|g' "$file"
  
  # Update legal page links
  sed -i 's|href="privacy-policy\.html"|href="/privacy-policy"|g' "$file"
  sed -i 's|href="terms-of-service\.html"|href="/terms-of-service"|g' "$file"
  sed -i 's|href="warranty\.html"|href="/warranty"|g' "$file"
}

# Function to update content links in a file
update_content_links() {
  local file=$1
  echo "📄 Updating content links in $file..."
  
  # Update any remaining .html links in content
  sed -i 's|href="about\.html"|href="/about"|g' "$file"
  sed -i 's|href="services\.html"|href="/services"|g' "$file"
  sed -i 's|href="contact\.html"|href="/contact"|g' "$file"
  sed -i 's|href="gallery\.html"|href="/gallery"|g' "$file"
  sed -i 's|href="blog\.html"|href="/blog"|g' "$file"
  sed -i 's|href="service-areas\.html"|href="/service-areas"|g' "$file"
}

# Update each file
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "🔧 Processing $file..."
    update_navigation "$file"
    update_footer "$file"
    update_content_links "$file"
    echo "✅ Completed $file"
  else
    echo "⚠️  File $file not found"
  fi
done

echo "🎉 All HTML files updated with clean URLs!"
echo "📋 Summary of changes:"
echo "   - Navigation menus now use clean URLs (/about, /services, etc.)"
echo "   - Footer links updated to clean URLs"
echo "   - All internal .html links converted to clean URLs"
echo "   - Jekyll configuration enables clean URL routing"
