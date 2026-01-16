#!/usr/bin/env node

/**
 * Image Optimization Script
 * Optimizes images in public/images/ and public/icons/ directories before build
 * Uses sharp for image processing
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const dirsToOptimize = ['images', 'icons'];

// Configuration
const config = {
  jpeg: { quality: 85, mozjpeg: true },
  png: { compressionLevel: 9, palette: true },
  webp: { quality: 85 },
  avif: { quality: 80 },
};

/**
 * Get all image files recursively from a directory
 */
function getImageFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!file.startsWith('.') && file !== 'node_modules') {
        getImageFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileSize = fs.statSync(filePath).size;
    
    // Skip already small files (less than 10KB)
    if (fileSize < 10 * 1024) {
      console.log(`⏭️  Skipping ${path.relative(publicDir, filePath)} (already small)`);
      return;
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();

    let optimized;
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        optimized = image.jpeg(config.jpeg);
        break;
      case '.png':
        optimized = image.png(config.png);
        break;
      case '.webp':
        optimized = image.webp(config.webp);
        break;
      case '.avif':
        optimized = image.avif(config.avif);
        break;
      default:
        return;
    }

    // Create backup directory
    const backupDir = path.join(path.dirname(filePath), '.originals');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Backup original if not already backed up
    const backupPath = path.join(backupDir, path.basename(filePath));
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    // Save optimized image
    await optimized.toFile(filePath + '.tmp');
    
    const newSize = fs.statSync(filePath + '.tmp').size;
    const savings = ((fileSize - newSize) / fileSize * 100).toFixed(1);

    // Only replace if we achieved compression
    if (newSize < fileSize) {
      fs.renameSync(filePath + '.tmp', filePath);
      console.log(`✅ Optimized ${path.relative(publicDir, filePath)} (${savings}% smaller)`);
    } else {
      fs.unlinkSync(filePath + '.tmp');
      console.log(`⏭️  Skipping ${path.relative(publicDir, filePath)} (no improvement)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Starting image optimization...\n');

  let totalFiles = 0;

  for (const dir of dirsToOptimize) {
    const dirPath = path.join(publicDir, dir);
    console.log(`\n📁 Processing ${dir}/`);
    
    const imageFiles = getImageFiles(dirPath);
    
    if (imageFiles.length === 0) {
      console.log(`  No images found in ${dir}/`);
      continue;
    }

    console.log(`  Found ${imageFiles.length} images\n`);
    totalFiles += imageFiles.length;

    for (const file of imageFiles) {
      await optimizeImage(file);
    }
  }

  console.log(`\n✨ Optimization complete! Processed ${totalFiles} images.\n`);
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
