#!/usr/bin/env node

/**
 * Translation Validation Script
 * 
 * Validates that all translation files have matching keys with the English source file.
 * Detects missing keys, extra keys, and structural differences.
 * 
 * Usage:
 *   node scripts/validate-translations.js
 *   npm run validate:translations
 */

const fs = require('fs');
const path = require('path');

// Configuration
const locales = ['en', 'de', 'bs', 'zh', 'ja', 'fr', 'it'];
const messagesDir = path.join(__dirname, '../messages');
const sourceLocale = 'en';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

/**
 * Load translation file for a locale
 */
function loadTranslations(locale) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`${colors.red}Error: Translation file not found: ${filePath}${colors.reset}`);
    process.exit(1);
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`${colors.red}Error parsing ${locale}.json: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

/**
 * Get all keys from a nested object
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively get keys from nested objects
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      // Leaf node - add the key
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * Get value at nested key path
 */
function getValueAtPath(obj, path) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return current;
}

/**
 * Check if a translation value is just a placeholder (same as English)
 */
function isPlaceholderTranslation(sourceValue, targetValue) {
  return sourceValue === targetValue;
}

/**
 * Validate a single locale against the source
 */
function validateLocale(locale, sourceKeys, sourceTranslations, targetTranslations) {
  const targetKeys = getAllKeys(targetTranslations);
  
  // Find missing keys (in source but not in target)
  const missingKeys = sourceKeys.filter(key => !targetKeys.includes(key));
  
  // Find extra keys (in target but not in source)
  const extraKeys = targetKeys.filter(key => !sourceKeys.includes(key));
  
  // Find placeholder translations (not translated, same as English)
  const placeholderKeys = [];
  if (locale !== sourceLocale) {
    for (const key of sourceKeys) {
      const sourceValue = getValueAtPath(sourceTranslations, key);
      const targetValue = getValueAtPath(targetTranslations, key);
      
      if (targetValue && typeof sourceValue === 'string' && typeof targetValue === 'string') {
        if (isPlaceholderTranslation(sourceValue, targetValue)) {
          placeholderKeys.push(key);
        }
      }
    }
  }
  
  return {
    locale,
    totalKeys: sourceKeys.length,
    translatedKeys: targetKeys.length,
    missingKeys,
    extraKeys,
    placeholderKeys,
    isValid: missingKeys.length === 0 && extraKeys.length === 0,
  };
}

/**
 * Display validation results
 */
function displayResults(results) {
  console.log(`\n${colors.cyan}===========================================`);
  console.log(`Translation Validation Report`);
  console.log(`===========================================${colors.reset}\n`);
  
  let hasErrors = false;
  let hasWarnings = false;
  
  for (const result of results) {
    if (result.locale === sourceLocale) continue; // Skip source locale
    
    console.log(`${colors.blue}Locale: ${result.locale.toUpperCase()}${colors.reset}`);
    console.log(`  Total keys in source: ${result.totalKeys}`);
    console.log(`  Keys in ${result.locale}: ${result.translatedKeys}`);
    
    // Missing keys (errors)
    if (result.missingKeys.length > 0) {
      hasErrors = true;
      console.log(`\n  ${colors.red}❌ Missing ${result.missingKeys.length} keys:${colors.reset}`);
      result.missingKeys.slice(0, 10).forEach(key => {
        console.log(`     - ${key}`);
      });
      if (result.missingKeys.length > 10) {
        console.log(`     ... and ${result.missingKeys.length - 10} more`);
      }
    }
    
    // Extra keys (warnings)
    if (result.extraKeys.length > 0) {
      hasWarnings = true;
      console.log(`\n  ${colors.yellow}⚠️  Extra ${result.extraKeys.length} keys (not in source):${colors.reset}`);
      result.extraKeys.slice(0, 5).forEach(key => {
        console.log(`     - ${key}`);
      });
      if (result.extraKeys.length > 5) {
        console.log(`     ... and ${result.extraKeys.length - 5} more`);
      }
    }
    
    // Placeholder translations (warnings)
    if (result.placeholderKeys.length > 0) {
      hasWarnings = true;
      console.log(`\n  ${colors.yellow}⚠️  ${result.placeholderKeys.length} placeholder translations (same as English):${colors.reset}`);
      result.placeholderKeys.slice(0, 5).forEach(key => {
        console.log(`     - ${key}`);
      });
      if (result.placeholderKeys.length > 5) {
        console.log(`     ... and ${result.placeholderKeys.length - 5} more`);
      }
    }
    
    // Success
    if (result.isValid && result.placeholderKeys.length === 0) {
      console.log(`\n  ${colors.green}✅ All keys present and translated!${colors.reset}`);
    }
    
    console.log('');
  }
  
  // Summary
  console.log(`${colors.cyan}===========================================${colors.reset}\n`);
  
  if (!hasErrors && !hasWarnings) {
    console.log(`${colors.green}✅ All translation files are in sync!${colors.reset}\n`);
    return 0;
  } else if (hasErrors) {
    console.log(`${colors.red}❌ Translation validation failed!${colors.reset}`);
    console.log(`${colors.red}   Please add missing keys to translation files.${colors.reset}\n`);
    return 1;
  } else if (hasWarnings) {
    console.log(`${colors.yellow}⚠️  Translation validation passed with warnings.${colors.reset}`);
    console.log(`${colors.yellow}   Consider reviewing placeholder translations.${colors.reset}\n`);
    return 0;
  }
}

/**
 * Main function
 */
function main() {
  console.log(`${colors.magenta}Starting translation validation...${colors.reset}\n`);
  
  // Load all translations
  const translations = {};
  for (const locale of locales) {
    translations[locale] = loadTranslations(locale);
  }
  
  // Get source keys
  const sourceTranslations = translations[sourceLocale];
  const sourceKeys = getAllKeys(sourceTranslations);
  
  console.log(`Source locale (${sourceLocale}): ${sourceKeys.length} keys\n`);
  
  // Validate each locale
  const results = locales.map(locale => {
    return validateLocale(
      locale,
      sourceKeys,
      sourceTranslations,
      translations[locale]
    );
  });
  
  // Display results
  const exitCode = displayResults(results);
  
  process.exit(exitCode);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { getAllKeys, validateLocale };
