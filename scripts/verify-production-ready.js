#!/usr/bin/env node

/**
 * Production Readiness Verification Script
 * Checks if all configurations are set correctly before deployment
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'listmonk/config.production.toml',
  'listmonk/Dockerfile.production',
  'railway.json',
  'next.config.js',
  'tailwind.config.ts',
  'docker-compose.yml',
  'DEPLOYMENT.md',
  'RAILWAY-ENV-TEMPLATE.md',
  'VERCEL-ENV-TEMPLATE.md',
];

const requiredDirectories = [
  'app',
  'components',
  'lib',
  'public',
  'listmonk',
  'scripts',
];

const requiredPackages = [
  'next',
  'react',
  'react-dom',
  'typescript',
  'tailwindcss',
  'gsap',
  'swiper',
];

console.log('🔍 Verifying production readiness for Yugo Metals...\n');

let errors = 0;
let warnings = 0;

// Check required files
console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    errors++;
  }
});

console.log('');

// Check required directories
console.log('📂 Checking required directories...');
requiredDirectories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`  ✅ ${dir}/`);
  } else {
    console.log(`  ❌ ${dir}/ - MISSING`);
    errors++;
  }
});

console.log('');

// Check package.json and dependencies
console.log('📦 Checking dependencies...');
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  requiredPackages.forEach(pkg => {
    if (allDeps[pkg]) {
      console.log(`  ✅ ${pkg} (${allDeps[pkg]})`);
    } else {
      console.log(`  ❌ ${pkg} - NOT INSTALLED`);
      errors++;
    }
  });
} else {
  console.log('  ❌ package.json - MISSING');
  errors++;
}

console.log('');

// Check .gitignore
console.log('🔒 Checking .gitignore...');
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8');
  const requiredIgnores = ['.env', '.env.local', '.env.production', 'node_modules'];
  
  requiredIgnores.forEach(pattern => {
    if (gitignore.includes(pattern)) {
      console.log(`  ✅ ${pattern} is ignored`);
    } else {
      console.log(`  ⚠️  ${pattern} not in .gitignore`);
      warnings++;
    }
  });
} else {
  console.log('  ❌ .gitignore - MISSING');
  errors++;
}

console.log('');

// Check Listmonk config
console.log('⚙️  Checking Listmonk production config...');
const listmonkConfigPath = path.join(process.cwd(), 'listmonk/config.production.toml');
if (fs.existsSync(listmonkConfigPath)) {
  const config = fs.readFileSync(listmonkConfigPath, 'utf8');
  
  const checks = [
    { pattern: '${SUPABASE_DB_HOST}', name: 'Supabase DB host variable' },
    { pattern: '${SUPABASE_DB_PASSWORD}', name: 'Supabase DB password variable' },
    { pattern: '${RESEND_API_KEY}', name: 'Resend API key variable' },
    { pattern: '${LISTMONK_ENCRYPTION_KEY}', name: 'Encryption key variable' },
    { pattern: 'ssl_mode = "require"', name: 'SSL mode for Supabase' },
    { pattern: 'smtp.resend.com', name: 'Resend SMTP host' },
  ];
  
  checks.forEach(check => {
    if (config.includes(check.pattern)) {
      console.log(`  ✅ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name} - NOT CONFIGURED`);
      errors++;
    }
  });
} else {
  console.log('  ❌ config.production.toml - MISSING');
  errors++;
}

console.log('');

// Check Railway config
console.log('🚂 Checking Railway configuration...');
const railwayConfigPath = path.join(process.cwd(), 'railway.json');
if (fs.existsSync(railwayConfigPath)) {
  const railwayConfig = JSON.parse(fs.readFileSync(railwayConfigPath, 'utf8'));
  
  if (railwayConfig.build?.dockerfilePath) {
    console.log('  ✅ Dockerfile path configured');
  } else {
    console.log('  ❌ Dockerfile path not configured');
    errors++;
  }
  
  if (railwayConfig.deploy?.restartPolicyType) {
    console.log('  ✅ Restart policy configured');
  } else {
    console.log('  ⚠️  Restart policy not configured');
    warnings++;
  }
} else {
  console.log('  ❌ railway.json - MISSING');
  errors++;
}

console.log('');

// Check Next.js config
console.log('⚛️  Checking Next.js configuration...');
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  console.log('  ✅ next.config.js exists');
} else {
  console.log('  ❌ next.config.js - MISSING');
  errors++;
}

console.log('');

// Check API routes
console.log('🌐 Checking API routes...');
const apiRoutePath = path.join(process.cwd(), 'app/api/subscribe/route.ts');
if (fs.existsSync(apiRoutePath)) {
  const apiRoute = fs.readFileSync(apiRoutePath, 'utf8');
  
  if (apiRoute.includes('process.env.LISTMONK_URL')) {
    console.log('  ✅ Environment variables used in API route');
  } else {
    console.log('  ⚠️  API route may have hardcoded values');
    warnings++;
  }
} else {
  console.log('  ❌ API route - MISSING');
  errors++;
}

console.log('');

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 VERIFICATION SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (errors === 0 && warnings === 0) {
  console.log('✅ All checks passed! Ready for production deployment.');
  console.log('');
  console.log('📖 Next steps:');
  console.log('   1. Read DEPLOYMENT.md for deployment instructions');
  console.log('   2. Generate production keys: ./scripts/generate-env-keys.sh');
  console.log('   3. Set up Supabase and Resend accounts');
  console.log('   4. Deploy to Railway and Vercel');
  process.exit(0);
} else if (errors === 0) {
  console.log(`⚠️  ${warnings} warning(s) found. Review before deploying.`);
  console.log('');
  console.log('📖 Check the warnings above and verify they are intentional.');
  process.exit(0);
} else {
  console.log(`❌ ${errors} error(s) and ${warnings} warning(s) found.`);
  console.log('');
  console.log('🔧 Please fix the errors above before deploying to production.');
  console.log('📖 See DEPLOYMENT.md for setup instructions.');
  process.exit(1);
}

