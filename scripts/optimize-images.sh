#!/bin/bash

# Image Optimization Script for Vert Capital
# This script optimizes images in the public/vert directory
# Requires: imagemagick, jpegoptim, optipng

echo "🎨 Vert Capital Image Optimization Script"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${YELLOW}⚠️  Warning: $1 not found. Please install it for full optimization.${NC}"
        return 1
    fi
    return 0
}

echo "Checking dependencies..."
check_dependency "imagemagick" && echo "✓ ImageMagick installed"
check_dependency "jpegoptim" && echo "✓ jpegoptim installed"
check_dependency "optipng" && echo "✓ optipng installed"
echo ""

# Base directory
BASE_DIR="public/vert"

if [ ! -d "$BASE_DIR" ]; then
    echo "❌ Error: $BASE_DIR directory not found"
    exit 1
fi

echo "📁 Scanning $BASE_DIR for images..."
echo ""

# Optimize JPEG files
if command -v jpegoptim &> /dev/null; then
    echo "🖼️  Optimizing JPEG files..."
    find "$BASE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d '' file; do
        echo "  Processing: $file"
        jpegoptim --max=85 --strip-all --preserve "$file"
    done
    echo -e "${GREEN}✓ JPEG optimization complete${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping JPEG optimization (jpegoptim not installed)${NC}"
fi

echo ""

# Optimize PNG files
if command -v optipng &> /dev/null; then
    echo "🖼️  Optimizing PNG files..."
    find "$BASE_DIR" -type f -iname "*.png" -print0 | while IFS= read -r -d '' file; do
        echo "  Processing: $file"
        optipng -o5 "$file"
    done
    echo -e "${GREEN}✓ PNG optimization complete${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping PNG optimization (optipng not installed)${NC}"
fi

echo ""

# Generate WebP versions
if command -v cwebp &> /dev/null; then
    echo "🌐 Generating WebP versions..."
    find "$BASE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | while IFS= read -r -d '' file; do
        webp_file="${file%.*}.webp"
        if [ ! -f "$webp_file" ]; then
            echo "  Creating: $webp_file"
            cwebp -q 85 "$file" -o "$webp_file"
        fi
    done
    echo -e "${GREEN}✓ WebP generation complete${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping WebP generation (cwebp not installed)${NC}"
    echo "   Install with: brew install webp"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✨ Optimization complete!${NC}"
echo ""
echo "📊 Directory size:"
du -sh "$BASE_DIR"
echo ""
echo "💡 Tip: Run this script whenever you add new images to the project"
