#!/bin/bash
# Generate secure keys for production deployment
# Run this script before deploying to Railway/Vercel

echo "🔐 Generating secure keys for Yugo Metals production deployment..."
echo ""

# Generate Listmonk API Password
echo "LISTMONK_API_PASSWORD:"
LISTMONK_API_PASSWORD=$(openssl rand -base64 24)
echo "$LISTMONK_API_PASSWORD"
echo ""

# Generate Listmonk Encryption Key (32 characters)
echo "LISTMONK_ENCRYPTION_KEY:"
LISTMONK_ENCRYPTION_KEY=$(openssl rand -hex 16)
echo "$LISTMONK_ENCRYPTION_KEY"
echo ""

echo "✅ Keys generated successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Copy these keys to a secure password manager"
echo "2. Add LISTMONK_API_PASSWORD to both Railway and Vercel"
echo "3. Add LISTMONK_ENCRYPTION_KEY to Railway only"
echo "4. NEVER commit these values to Git"
echo ""
echo "⚠️  For Railway configuration, also get:"
echo "   - Supabase credentials from: https://app.supabase.com"
echo "   - Resend API key from: https://resend.com/api-keys"
echo ""
echo "📖 See DEPLOYMENT.md for complete instructions"

