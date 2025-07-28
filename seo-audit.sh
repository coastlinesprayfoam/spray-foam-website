#!/bin/bash

# SEO Audit Script for Coastline Spray Foam
# Checks for SEO best practices and performance optimizations

echo "🔍 Starting comprehensive SEO audit for Coastline Spray Foam..."
echo "=================================================="

# Function to check if a file exists
check_file() {
  if [ -f "$1" ]; then
    echo "✅ $1 - Found"
    return 0
  else
    echo "❌ $1 - Missing"
    return 1
  fi
}

# Function to check if content exists in file
check_content() {
  if grep -q "$2" "$1" 2>/dev/null; then
    echo "✅ $1 contains $2"
    return 0
  else
    echo "❌ $1 missing $2"
    return 1
  fi
}

echo ""
echo "📁 Essential SEO Files Check:"
echo "------------------------------"
check_file "sitemap.xml"
check_file "robots.txt"
check_file "site.webmanifest"
check_file "favicon.ico"

echo ""
echo "🏗️ Technical SEO Check:"
echo "------------------------"
check_content "index.html" "meta name=\"description\""
check_content "index.html" "meta property=\"og:title\""
check_content "index.html" "meta property=\"twitter:card\""
check_content "index.html" "application/ld+json"
check_content "index.html" "rel=\"canonical\""

echo ""
echo "⚡ Performance Optimizations Check:"
echo "-----------------------------------"
check_content "index.html" "rel=\"preload\""
check_content "index.html" "rel=\"dns-prefetch\""
check_content "index.html" "defer"
check_content "index.html" "media=\"print\" onload"
check_file "assets/css/critical.css"
check_file "assets/js/performance.js"

echo ""
echo "🖼️ Image Optimization Check:"
echo "-----------------------------"
if [ -d "assets/images/webp" ]; then
  webp_count=$(find assets/images/webp -name "*.webp" 2>/dev/null | wc -l)
  echo "✅ WebP images directory exists ($webp_count WebP files)"
else
  echo "❌ WebP images directory missing"
fi

if [ -d "assets/images/optimized" ]; then
  opt_count=$(find assets/images/optimized -name "*.jpg" 2>/dev/null | wc -l)
  echo "✅ Optimized images directory exists ($opt_count optimized files)"
else
  echo "❌ Optimized images directory missing"
fi

echo ""
echo "🔧 Service Worker Check:"
echo "------------------------"
check_file "sw.js"
check_content "index.html" "serviceWorker"

echo ""
echo "📱 Mobile Optimization Check:"
echo "-----------------------------"
check_content "index.html" "viewport"
check_content "site.webmanifest" "display.*standalone"
check_content "_config.yml" "jekyll-seo-tag"

echo ""
echo "🎯 Core Web Vitals Optimization Check:"
echo "--------------------------------------"
check_content "assets/js/performance.js" "observeLCP"
check_content "assets/js/performance.js" "observeFID"
check_content "assets/js/performance.js" "observeCLS"
check_content "assets/js/performance.js" "lazyLoadImages"

echo ""
echo "📊 SEO Audit Summary:"
echo "====================="

# Count total checks
total_files=0
passed_files=0

# Essential files
for file in "sitemap.xml" "robots.txt" "site.webmanifest" "favicon.ico"; do
  total_files=$((total_files + 1))
  if [ -f "$file" ]; then
    passed_files=$((passed_files + 1))
  fi
done

# Calculate score
score=$((passed_files * 100 / total_files))

echo "📈 SEO Score: $score% ($passed_files/$total_files essential files)"

if [ $score -ge 90 ]; then
  echo "🎉 Excellent! Your SEO implementation is outstanding."
elif [ $score -ge 75 ]; then
  echo "👍 Good! Minor improvements needed."
elif [ $score -ge 50 ]; then
  echo "⚠️  Fair. Several improvements recommended."
else
  echo "🚨 Poor. Major SEO improvements needed."
fi

echo ""
echo "🚀 Next Steps for Lighthouse Performance:"
echo "========================================="
echo "1. Run image optimization: chmod +x optimize-images.sh && ./optimize-images.sh"
echo "2. Test with Google PageSpeed Insights"
echo "3. Validate structured data with Google's Rich Results Test"
echo "4. Check mobile-friendliness with Google's Mobile-Friendly Test"
echo "5. Monitor Core Web Vitals in Google Search Console"

echo ""
echo "✅ SEO audit complete!"
