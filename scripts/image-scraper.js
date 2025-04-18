

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const drinks = [
  {
    title: "Champagne",
    items: [
      { name: "Moet Chandon Rose", price: 200000 },
      { name: "Moet Chandon Brut", price: 170000 },
      { name: "Veuve Clicquot Brut", price: 220000 },
      { name: "Belaire Rose", price: 105000 },
      { name: "Veuve La Grande Dame", price: 200000 }
    ]
  },
  {
    title: "Whisky/Liquor/Vodka",
    items: [
      { name: "Azul", price: 500000 },
      { name: "Blue Label", price: 750000 },
      { name: "Macallan 15 Years", price: 300000 },
      { name: "Glenfiddich 21 Years", price: 600000 },
      { name: "Glenfiddich 18 Years", price: 230000 },
      { name: "Glenfiddich 15 Years", price: 150000 },
      { name: "Macallan 12 Years", price: 200000 },
      { name: "Gold Label", price: 115000 },
      { name: "Glenfiddich 12 Years", price: 100000 },
      { name: "Black Label (Big)", price: 78000 },
      { name: "Casa Reposado", price: 200000 },
      { name: "Small Batch (Teeling)", price: 50000 },
      { name: "Red Label", price: 37500 },
      { name: "Jameson Black Barrel", price: 70000 },
      { name: "Jameson", price: 42000 },
      { name: "Gentleman Jack", price: 70000 },
      { name: "Grant 12 Years", price: 45000 },
      { name: "Monkey Shoulder", price: 70000 },
      { name: "John Bannerman's", price: 25000 },
      { name: "Lakes The One", price: 115000 },
      { name: "Jack Daniels", price: 55000 },
      { name: "White Walker", price: 40000 },
      { name: "Jager Meister", price: 28000 },
      { name: "American Honey", price: 42500 },
      { name: "Chinese Drink (Big)", price: 15000 },
      { name: "Gordon Gin (Big)", price: 10000 },
      { name: "Gordon Gin (Small)", price: 4000 },
      { name: "Captain Morgan (Big)", price: 10500 },
      { name: "Captain Morgan (Small)", price: 4500 },
      { name: "Smirnoff Vodka (Big)", price: 10000 },
      { name: "Smirnoff Vodka (Small)", price: 4000 },
      { name: "Black & White", price: 30000 },
      { name: "Single Grain (Teeling)", price: 80000 },
      { name: "William Lawson", price: 25000 }
    ]
  },
  {
    title: "Cognac/Brandy",
    items: [
      { name: "Hennessy VSOP", price: 170000 },
      { name: "Hennessy VS (Big)", price: 100000 },
      { name: "Martel Character", price: 75000 },
      { name: "Martel Blue Swift", price: 155000 },
      { name: "Remy Martins VSOP", price: 140000 },
      { name: "Divin Bardar XO", price: 12000 },
      { name: "Singleton", price: 100000 }
    ]
  },
  {
    title: "Tequila",
    items: [
      { name: "Tequila", price: 45000 }
    ]
  },
  {
    title: "Aperitif/Sparkling Wines",
    items: [
      { name: "Campari (Big)", price: 40000 },
      { name: "Campari (Small)", price: 11500 },
      { name: "Andre Rose", price: 25000 },
      { name: "Andre Brut", price: 23000 },
      { name: "Famous Grouse", price: 25000 },
      { name: "Baileys (Big)", price: 41000 },
      { name: "Baileys Delight", price: 10000 },
      { name: "Best (Big)", price: 10000 },
      { name: "Vino Gano", price: 2000 },
      { name: "Oosa Bitters", price: 1500 },
      { name: "Casoni Bitter", price: 10000 },
      { name: "Origin Bitters (Small)", price: 2000 },
      { name: "1960 (Big)", price: 5000 },
      { name: "1960 (Small)", price: 2000 },
      { name: "Ace Bitters", price: 2000 },
      { name: "Odongwu Bitters", price: 2000 }
    ]
  },
  {
    title: "Wines",
    items: [
      { name: "Terramagna Wine (Red/White)", price: 20000 },
      { name: "Escudo Rojo", price: 35000 },
      { name: "Carlo Rossi Red", price: 20000 },
      { name: "Carlo Rossi Ice", price: 20000 },
      { name: "Night Train", price: 20000 },
      { name: "Agor", price: 20000 },
      { name: "Martinellis", price: 20000 },
      { name: "Chamdor", price: 20000 },
      { name: "Dominion Red", price: 20000 },
      { name: "Dominion Rose", price: 20000 },
      { name: "Mateus Rose", price: 20000 },
      { name: "Drostdy Hof", price: 20000 },
      { name: "Shiraz Red/Rose", price: 20000 },
      { name: "Four Cousins (Small)", price: 20000 },
      { name: "Brown Brother Rose", price: 20000 },
      { name: "Merlot", price: 20000 },
      { name: "Adelisa", price: 20000 },
      { name: "Declan Wine", price: 20000 },
      { name: "Don Venice", price: 20000 },
      { name: "Brown Brother Red", price: 20000 },
      { name: "Lambrusco", price: 20000 },
      { name: "Augostura Reserva", price: 20000 },
      { name: "Amarodi Augostura", price: 25000 },
      { name: "Leon Wine", price: 20000 },
      { name: "Sun Chasser", price: 20000 },
      { name: "Wave Dancer", price: 20000 },
      { name: "Star Chasser", price: 20000 },
      { name: "Willow Red Wine", price: 20000 },
      { name: "Sweet Kiss Red Wine", price: 20000 },
      { name: "Taylor Red Wine", price: 20000 }
    ]
  },
  {
    title: "Beers",
    items: [
      { name: "Star", price: 2500 },
      { name: "Gulder", price: 2500 },
      { name: "Legend", price: 2500 },
      { name: "33 Beer", price: 2500 },
      { name: "Hero", price: 2500 },
      { name: "Heineken", price: 3000 },
      { name: "Desperado", price: 2500 },
      { name: "Smirnoff Ice (Big)", price: 2500 },
      { name: "Smirnoff Ice (Small)", price: 2000 },
      { name: "Star Radler", price: 2000 },
      { name: "Small Stout", price: 2000 },
      { name: "Medium Stout", price: 2500 },
      { name: "Big Stout", price: 3000 },
      { name: "Origin Beer", price: 2500 },
      { name: "Malt", price: 1500 },
      { name: "Cranberry", price: 12500 },
      { name: "Fayrouz", price: 1500 },
      { name: "Minerals", price: 1000 },
      { name: "Power Horse", price: 3000 },
      { name: "Can Minerals", price: 1000 },
      { name: "Red Bull", price: 3500 },
      { name: "Blue Bullet", price: 2500 },
      { name: "Black Bullet", price: 3000 },
      { name: "Water (Small)", price: 400 },
      { name: "Palm Wine (Full Jug)", price: 6000 },
      { name: "Trophy", price: 2500 },
      { name: "Can Fearless", price: 2500 },
      { name: "Castle Lite", price: 2500 },
      { name: "Budweiser", price: 3000 },
      { name: "Life Beer", price: 2500 },
      { name: "Medium Heineken", price: 2500 },
      { name: "G/Smooth", price: 2500 },
      { name: "Tiger", price: 2500 },
      { name: "Exotic", price: 3000 },
      { name: "Chivita", price: 3500 },
      { name: "Hollandia", price: 3500 },
      { name: "Guiness Malt", price: 1500 },
      { name: "Don Simon", price: 7000 },
      { name: "Monster", price: 2500 },
      { name: "Can Schweppes", price: 1000 },
      { name: "Goldberg", price: 2500 },
      { name: "Double Black", price: 2000 },
      { name: "Trophy Stout", price: 2500 },
      { name: "Predator", price: 2000 },
      { name: "Vino Gano", price: 2500 },
      { name: "Osaas Bitters", price: 2000 },
      { name: "24/7 Gin", price: 2000 },
      { name: "Zagg/Can", price: 2000 },
      { name: "Beta Malt", price: 1500 },
      { name: "Small Origin Bitter", price: 2500 },
      { name: "Flying Fish", price: 2000 },
      { name: "Odongwu Bitters", price: 2500 },
      { name: "Odongwu Hammers", price: 2500 },
      { name: "Legend Twist", price: 2000 },
      { name: "Medium Legend", price: 2000 }
    ]
  },
];

const food = [
  {
    title: "Main Course",
    items: [
      { name: "Egg Fried Rice", price: 2800 },
      { name: "Tia Coconut Rice", price: 6000 },
      { name: "Mixed Meat Fried Rice", price: 4000 },
      { name: "Plantain", price: 1000 },
      { name: "Coconut Rice", price: 2000 },
      { name: "Salad", price: 500 },
      { name: "Jollof Rice", price: 2000 },
      { name: "Fried Rice", price: 2000 },
      { name: "Chips", price: 2500 },
      { name: "Native Rice", price: 2500 },
      { name: "Asun Rice", price: 6000 },
      { name: "Pepper Sauce", price: 700 },
      { name: "Chinese Fried Rice", price: 3000 },
      { name: "Plain Basmati Rice", price: 2000 },
      { name: "Basmati Coconut Rice", price: 3800 },
      { name: "Basmati Jollof Rice", price: 3800 },
      { name: "Egg Sauce", price: 1500 },
      { name: "Basmati Fried Rice", price: 3800 },
      { name: "White Rice", price: 700 },
      { name: "White Yam", price: 1000 },
      { name: "Stew", price: 1000 },
      { name: "Basmatic Asun Rice", price: 5200 },
      { name: "Garden Egg Sauce", price: 1000 },
      { name: "Big Tray of Asun Rice", price: 37000 },
      { name: "Small Tray of Asun Rice", price: 18500 }
    ]
  },
  {
    title: "Starters",
    items: [
      { name: "Goat Meat Pepper Soup", price: 3000 },
      { name: "Assorted Pepper Soup", price: 2000 },
      { name: "Chicken Pepper Soup", price: 3000 },
      { name: "Crocker Pepper Soup", price: 3500 },
      { name: "Cowtail Pepper Soup", price: 2500 },
      { name: "Pepper Goat Meat", price: 3000 },
      { name: "Pepper Cow Tail", price: 2500 },
      { name: "Pepper Snail", price: 3000 },
      { name: "Pepper Chicken", price: 3000 },
      { name: "Pepper Turkey", price: 5500 },
      { name: "Pepper Crocker", price: 3500 },
      { name: "Pepper Gizzard", price: 2500 },
      { name: "Pepper Beef", price: 3000 },
      { name: "Pepper Assorted", price: 2000 },
      { name: "Goat Meat Peppersoup/Yam", price: 4000 }
    ]
  },
  {
    title: "Protein",
    items: [
      { name: "Dry Fish", price: 2500 },
      { name: "Cowtail", price: 2500 },
      { name: "Goat Meat", price: 1500 },
      { name: "Snail", price: 1500 },
      { name: "Beef", price: 1500 },
      { name: "Chicken", price: 3000 },
      { name: "Crocker Fish", price: 3500 },
      { name: "Turkey", price: 5500 },
      { name: "Gizzard", price: 2500 },
      { name: "Assorted", price: 2000 }
    ]
  },
  {
    title: "National",
    items: [
      { name: "Native Soup", price: 2000 },
      { name: "Afang Soup", price: 1800 },
      { name: "Egusi Soup", price: 1800 },
      { name: "Okro Soup", price: 1800 },
      { name: "Bitterleaf Soup", price: 1600 },
      { name: "Oha Soup", price: 1600 },
      { name: "Banga Stew", price: 1000 },
      { name: "Ukwa", price: 2500 }
    ]
  },
  {
    title: "Swallow",
    items: [
      { name: "Garri", price: 700 },
      { name: "Pounded Yam", price: 1800 },
      { name: "Oat Meal", price: 1800 },
      { name: "Semo", price: 1000 }
    ]
  },
  {
    title: "African Dish",
    items: [
      { name: "Abacha/Fish/Canda", price: 3400 },
      { name: "Tray of Abacha", price: 37000 },
      { name: "Half Tray of Abacha", price: 19000 },
      { name: "Abacha with Fish", price: 3000 },
      { name: "Abacha with Canda", price: 1900 },
      { name: "Only Abacha", price: 1500 },
      { name: "Ugba and Fish", price: 2500 },
      { name: "Only Ugba", price: 1000 },
      { name: "Extra Fish", price: 1500 },
      { name: "Canda", price: 400 },
      { name: "Nkwobi", price: 6000 },
      { name: "Isi-Ewu", price: 8000 },
      { name: "Chicken Nkwobi", price: 12500 }
    ]
  }
];

// Add stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

// Configuration
const BASE_IMAGE_DIR = path.join(__dirname, '../public');
const MIN_FILE_SIZE = 150 * 1024; // 150KB in bytes
const MIN_WIDTH = 800; // Minimum image width in pixels
const MIN_HEIGHT = 800; // Minimum image height in pixels
const ASPECT_RATIO_RANGE = [0.8, 1.2]; // Width/height ratio range
const REQUEST_DELAY = 3000; // Delay between requests to avoid rate limiting
const MAX_CANDIDATES = 5; // Maximum number of candidate images to evaluate

// Your drinks and food data arrays remain the same...

/**
 * Gets image metadata from URL without downloading
 */
async function getImageMetadata(url) {
  return new Promise((resolve) => {
    https.get(url, { method: 'HEAD' }, (response) => {
      const contentLength = response.headers['content-length'];
      const contentType = response.headers['content-type'];

      if (!contentType || !contentType.startsWith('image/')) {
        return resolve({ valid: false, reason: 'Not an image' });
      }

      resolve({
        valid: true,
        size: contentLength ? parseInt(contentLength) : 0,
        contentType
      });
    }).on('error', () => resolve({ valid: false, reason: 'Request failed' }));
  });
}

/**
 * Downloads image to temporary file for validation
 */
async function downloadTempImage(url) {
  const tempPath = path.join(__dirname, 'temp_image.jpg');
  try {
    await new Promise((resolve, reject) => {
      https.get(url, (response) => {
        const fileStream = fs.createWriteStream(tempPath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close(resolve);
        });
      }).on('error', reject);
    });
    return tempPath;
  } catch (err) {
    console.error('Download error:', err.message);
    return null;
  }
}

/**
 * Validates image and returns quality score
 */
async function evaluateImageQuality(url) {
  const tempPath = await downloadTempImage(url);
  if (!tempPath) return { score: 0 };

  try {
    const metadata = await sharp(tempPath).metadata();
    const aspectRatio = metadata.width / metadata.height;
    const fileStats = fs.statSync(tempPath);

    // Calculate quality score (higher is better)
    const sizeScore = Math.min(1, fileStats.size / (2 * 1024 * 1024)); // Normalize to 2MB
    const resolutionScore = Math.min(1, (metadata.width * metadata.height) / (2000 * 2000)); // Normalize to 2000x2000
    const aspectRatioScore = ASPECT_RATIO_RANGE[0] <= aspectRatio && aspectRatio <= ASPECT_RATIO_RANGE[1] ? 1 : 0.5;

    const totalScore = sizeScore * 0.4 + resolutionScore * 0.5 + aspectRatioScore * 0.1;

    return {
      score: totalScore,
      width: metadata.width,
      height: metadata.height,
      size: fileStats.size,
      aspectRatio: aspectRatio.toFixed(2),
      path: tempPath
    };
  } catch (err) {
    return { score: 0 };
  } finally {
    // Clean up temp file if we're not keeping it
    if (tempPath && fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

/**
 * Finds and downloads the highest quality image from Bing
 */
async function downloadBestImageFromBing(searchQuery, savePath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });
  await page.setRequestInterception(true);

  // Block unnecessary resources to speed up page loading
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (['stylesheet', 'font', 'media', 'other'].includes(resourceType)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    console.log(`🔍 Searching Bing for: ${searchQuery}`);
    await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(searchQuery)}&qft=+filterui:imagesize-large`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Get the first few image results from Bing
    const imageUrls = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img.mimg'))
        .map(img => img.src)
        .filter(src => src.startsWith('http') && !src.includes('data:image'))
        .slice(0, 3);
    });

    console.log(`Found ${imageUrls.length} potential images from Bing`);

    let bestImage = { score: 0 };

    // Evaluate each candidate image
    for (const url of imageUrls) {
      try {
        console.log(`🔍 Evaluating image: ${url}`);
        const imageInfo = await evaluateImageQuality(url);

        if (imageInfo.score > bestImage.score) {
          bestImage = { ...imageInfo, url };
          console.log(`🏆 New best image (score: ${imageInfo.score.toFixed(2)})`);
        }
      } catch (err) {
        console.error(`⚠️ Error evaluating image: ${err.message}`);
      }
    }

    // Download the best image if we found one
    if (bestImage.score > 0) {
      console.log(`🏅 Downloading best image (score: ${bestImage.score.toFixed(2)}):`);
      console.log(`   Resolution: ${bestImage.width}x${bestImage.height}`);
      console.log(`   Size: ${(bestImage.size / 1024).toFixed(1)}KB`);
      console.log(`   Aspect Ratio: ${bestImage.aspectRatio}`);

      await new Promise((resolve, reject) => {
        https.get(bestImage.url, (response) => {
          const fileStream = fs.createWriteStream(savePath);
          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close(resolve);
          });
        }).on('error', reject);
      });

      return true;
    }

    return false;
  } finally {
    await browser.close();
  }
}

/**
 * Sanitizes a product name for use in filenames
 */
function sanitizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Scrapes highest quality images for products from Bing
 */
async function scrapeImagesFromBing(data, type) {
  for (const category of data) {
    const categoryDir = sanitizeName(category.title);

    for (const item of category.items) {
      if (item.imageUrl) continue;

      const searchQuery = `${item.name} professional product shot white background -mockup -label -packshot`;
      const imageName = `${sanitizeName(item.name)}.jpg`;
      const relativePath = `/${type}/${categoryDir}/${imageName}`;
      const savePath = path.join(BASE_IMAGE_DIR, relativePath);

      try {
        if (!fs.existsSync(path.dirname(savePath))) {
          fs.mkdirSync(path.dirname(savePath), { recursive: true });
        }

        // Download the best image from Bing
        const success = await downloadBestImageFromBing(searchQuery, savePath);
        if (success) {
          item.imageUrl = relativePath;
        } else {
          console.warn(`❌ No suitable image found for: ${item.name}`);
        }
      } catch (err) {
        console.error(`⚠️ Error processing ${item.name}:`, err.message);
      }

      // Be polite with delays
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
    }
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Starting image scraping from Bing...');

    // Create base directory if it doesn't exist
    if (!fs.existsSync(BASE_IMAGE_DIR)) {
      fs.mkdirSync(BASE_IMAGE_DIR, { recursive: true });
    }

    // Install sharp if not already installed
    try {
      await sharp();
    } catch (err) {
      console.log('⚠️ Sharp module not found. Run "npm install sharp" for better image validation.');
    }

    await scrapeImagesFromBing(food, 'food');
    await scrapeImagesFromBing(drinks, 'drinks');

    console.log('🎉 All done! Images saved to:', BASE_IMAGE_DIR);
  } catch (err) {
    console.error('🚨 Script failed:', err);
    process.exit(1);
  }
}

main();
