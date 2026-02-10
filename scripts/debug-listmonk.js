#!/usr/bin/env node

/**
 * Debug Listmonk API Connection
 * Tests various authentication methods to find what works
 */

const LISTMONK_URL = process.env.LISTMONK_URL || 'http://localhost:9000'
const EMAIL = process.env.ADMIN_EMAIL || 'admin@vertcapital.com.au'
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || ''
const API_USERNAME = process.env.LISTMONK_USERNAME || 'listmonk_api'
const API_PASSWORD = process.env.LISTMONK_PASSWORD || ''

if (!PASSWORD || !API_PASSWORD) {
  console.error('❌ ERROR: Required environment variables not set')
  console.error('   Please set DIRECTUS_ADMIN_PASSWORD and LISTMONK_PASSWORD')
  console.error('   Example: DIRECTUS_ADMIN_PASSWORD=xxx LISTMONK_PASSWORD=yyy node scripts/debug-listmonk.js')
  process.exit(1)
}

console.log('🔍 Debugging Listmonk API connection...\n')
console.log('URL:', LISTMONK_URL)
console.log('Email:', EMAIL)
console.log('Password:', '***' + PASSWORD.slice(-4))
console.log('')

async function testEndpoint(name, endpoint, auth) {
  try {
    console.log(`Testing: ${name}`)
    console.log(`  Endpoint: ${endpoint}`)
    console.log(`  Auth: ${auth ? 'Yes' : 'No'}`)
    
    const options = {
      method: 'GET',
      headers: {},
    }
    
    if (auth) {
      options.headers['Authorization'] = auth
    }
    
    const response = await fetch(`${LISTMONK_URL}${endpoint}`, options)
    const text = await response.text()
    
    console.log(`  Status: ${response.status} ${response.statusText}`)
    console.log(`  Response: ${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`)
    console.log('')
    
    return response.status === 200
  } catch (error) {
    console.log(`  Error: ${error.message}`)
    console.log('')
    return false
  }
}

async function debug() {
  // Test 1: API credentials from config.toml
  const apiAuth = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')
  const success1 = await testEndpoint('API Credentials (from config.toml)', '/api/health', apiAuth)
  
  if (success1) {
    console.log('🎉 SUCCESS! API credentials from config.toml work!')
    const listsTest = await testEndpoint('Lists endpoint (API creds)', '/api/lists', apiAuth)
    if (listsTest) {
      console.log('✅ Lists endpoint also works! Ready to create lists.')
    }
    return
  }
  
  // Test 2: No auth
  await testEndpoint('No authentication', '/api/health', null)
  
  // Test 3: Basic auth with email
  const basicAuth1 = 'Basic ' + Buffer.from(`${EMAIL}:${PASSWORD}`).toString('base64')
  await testEndpoint('Basic Auth (email:password)', '/api/health', basicAuth1)
  
  // Test 4: Basic auth with username only
  const username = 'admin'
  const basicAuth2 = 'Basic ' + Buffer.from(`${username}:${PASSWORD}`).toString('base64')
  await testEndpoint('Basic Auth (username:password)', '/api/health', basicAuth2)
  
  // Test 5: Try /api/lists instead
  await testEndpoint('Lists endpoint (no auth)', '/api/lists', null)
  await testEndpoint('Lists endpoint (basic auth - email)', '/api/lists', basicAuth1)
  await testEndpoint('Lists endpoint (basic auth - username)', '/api/lists', basicAuth2)
  
  console.log('❌ All tests failed!')
  console.log('\n💡 Possible solutions:')
  console.log('   1. Check if Listmonk fully restarted')
  console.log('   2. Verify config.toml has admin_username and admin_password')
  console.log('   3. Check Listmonk logs: docker-compose logs listmonk')
}

debug().catch(console.error)

