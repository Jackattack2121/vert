#!/usr/bin/env node

/**
 * Listmonk Setup Script for Vert Capital
 * 
 * This script automatically configures Listmonk with:
 * - Client mailing lists
 * - Basic settings
 * - Template structures
 * 
 * Prerequisites:
 * 1. Listmonk must be running on http://localhost:9000
 * 2. You must have created an admin account
 * 3. You need to provide admin credentials
 * 
 * Usage:
 * node scripts/setup-listmonk.js
 */

const LISTMONK_URL = process.env.LISTMONK_URL || 'http://localhost:9000'

// API credentials from config.toml (separate from web UI login)
const LISTMONK_USERNAME = process.env.LISTMONK_USERNAME || 'listmonk_api'
const LISTMONK_PASSWORD = process.env.LISTMONK_PASSWORD || 'VERT_API_2024_Secure!'

console.log('🚀 Starting Listmonk setup for Vert Capital...\n')

// Create Basic Auth header
const authHeader = 'Basic ' + Buffer.from(`${LISTMONK_USERNAME}:${LISTMONK_PASSWORD}`).toString('base64')

/**
 * Make authenticated request to Listmonk API
 */
async function listmonkRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${LISTMONK_URL}/api${endpoint}`, options)
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`❌ Error calling ${endpoint}:`, error.message)
    throw error
  }
}

/**
 * Get all existing lists
 */
async function getLists() {
  const response = await listmonkRequest('/lists')
  return response.data.results
}

/**
 * Create a mailing list
 */
async function createList(name, type, description, tags = []) {
  console.log(`📋 Creating list: ${name}...`)
  
  try {
    const response = await listmonkRequest('/lists', 'POST', {
      name,
      type,
      optin: 'double',
      description,
      tags,
    })
    
    console.log(`✅ Created list: ${name} (ID: ${response.data.id})`)
    return response.data
  } catch (error) {
    console.log(`⚠️  List "${name}" might already exist, skipping...`)
    return null
  }
}

/**
 * Get or create a list (idempotent)
 */
async function ensureList(name, type, description, tags = []) {
  const lists = await getLists()
  const existingList = lists.find(l => l.name === name)
  
  if (existingList) {
    console.log(`✅ List "${name}" already exists (ID: ${existingList.id})`)
    return existingList
  }
  
  return await createList(name, type, description, tags)
}

/**
 * Main setup function
 */
async function setup() {
  try {
    console.log('🔐 Testing authentication...')
    const health = await listmonkRequest('/health')
    console.log('✅ Connected to Listmonk successfully!\n')

    console.log('📋 Setting up mailing lists...\n')

    // Create main investor lists
    const lists = []

    lists.push(await ensureList(
      'Investor Updates',
      'public',
      'General investor updates, company news, and announcements',
      ['investors', 'general']
    ))

    lists.push(await ensureList(
      'ASX Announcements',
      'public',
      'Urgent ASX market announcements and price-sensitive information',
      ['investors', 'asx', 'urgent']
    ))

    lists.push(await ensureList(
      'Quarterly Reports',
      'public',
      'Quarterly financial and activities reports',
      ['investors', 'reports']
    ))

    lists.push(await ensureList(
      'Media & Press',
      'public',
      'Media releases and press coverage notifications',
      ['investors', 'media']
    ))

    console.log('\n✨ Setup complete!\n')
    console.log('📊 Summary:')
    console.log(`   - ${lists.filter(l => l).length} lists created/verified`)
    console.log('\n📝 Next steps:')
    console.log('   1. Configure SMTP settings in Listmonk dashboard')
    console.log('   2. Test sending an email campaign')
    console.log('   3. Update LISTMONK_PASSWORD in .env file')
    console.log('\n🔗 Access Listmonk: ' + LISTMONK_URL)

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message)
    console.log('\n💡 Make sure:')
    console.log('   - Listmonk is running (http://localhost:9000)')
    console.log('   - You have created an admin account')
    console.log('   - Credentials are correct')
    console.log('   - Run: docker-compose up -d')
    process.exit(1)
  }
}

// Run setup
setup()

