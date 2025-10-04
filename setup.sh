#!/bin/bash

# Personal GitHub Pages Site Setup Script
# This script helps you quickly customize your site

echo "🎯 Personal GitHub Pages Site Setup"
echo "=================================="
echo ""

# Check if we're in the right directory
if [[ ! -f "index.html" ]]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📝 Let's customize your site!"
echo ""

# Get user information
read -p "Enter your full name: " USER_NAME
read -p "Enter your professional tagline: " USER_TAGLINE
read -p "Enter your email address: " USER_EMAIL
read -p "Enter your LinkedIn profile URL (optional): " LINKEDIN_URL
read -p "Enter your Instagram handle (optional, without @): " INSTAGRAM_HANDLE
read -p "Enter your Twitter/X handle (optional, without @): " TWITTER_HANDLE

echo ""
echo "🔧 Updating your profile..."

# Update profile.json
cat > data/profile.json << EOF
{
  "name": "$USER_NAME",
  "tagline": "$USER_TAGLINE",
  "bio": "Welcome to my personal space on the web! I'm passionate about sharing quality products and experiences that have made a positive impact on my life. Browse through my curated selection of affiliate products below.",
  "email": "$USER_EMAIL",
  "profileImage": "assets/images/profile.jpg",
  "socialLinks": [
EOF

# Add social links if provided
FIRST_LINK=true
if [[ ! -z "$LINKEDIN_URL" ]]; then
    if [[ "$FIRST_LINK" = false ]]; then
        echo "    ," >> data/profile.json
    fi
    echo "    {" >> data/profile.json
    echo "      \"platform\": \"LinkedIn\"," >> data/profile.json
    echo "      \"url\": \"$LINKEDIN_URL\"" >> data/profile.json
    echo -n "    }" >> data/profile.json
    FIRST_LINK=false
fi

if [[ ! -z "$INSTAGRAM_HANDLE" ]]; then
    if [[ "$FIRST_LINK" = false ]]; then
        echo "," >> data/profile.json
    fi
    echo "    {" >> data/profile.json
    echo "      \"platform\": \"Instagram\"," >> data/profile.json
    echo "      \"url\": \"https://instagram.com/$INSTAGRAM_HANDLE\"" >> data/profile.json
    echo -n "    }" >> data/profile.json
    FIRST_LINK=false
fi

if [[ ! -z "$TWITTER_HANDLE" ]]; then
    if [[ "$FIRST_LINK" = false ]]; then
        echo "," >> data/profile.json
    fi
    echo "    {" >> data/profile.json
    echo "      \"platform\": \"Twitter\"," >> data/profile.json
    echo "      \"url\": \"https://twitter.com/$TWITTER_HANDLE\"" >> data/profile.json
    echo -n "    }" >> data/profile.json
    FIRST_LINK=false
fi

# Close the JSON
echo "" >> data/profile.json
echo "  ]" >> data/profile.json
echo "}" >> data/profile.json

# Update page titles
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/Your Name/$USER_NAME/g" index.html
    sed -i '' "s/Your Name/$USER_NAME/g" affiliates.html
    sed -i '' "s/Your Name/$USER_NAME/g" 404.html
else
    # Linux
    sed -i "s/Your Name/$USER_NAME/g" index.html
    sed -i "s/Your Name/$USER_NAME/g" affiliates.html
    sed -i "s/Your Name/$USER_NAME/g" 404.html
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎨 Next steps:"
echo "1. Replace 'assets/images/profile.jpg' with your photo"
echo "2. Edit 'data/affiliates.json' to add your affiliate products"
echo "3. Add product images to 'assets/images/'"
echo "4. Create PDF guides in 'assets/files/'"
echo "5. Commit and push to GitHub to deploy"
echo ""
echo "🚀 To deploy:"
echo "   git add ."
echo "   git commit -m \"Initial site customization\""
echo "   git push origin main"
echo ""
echo "📖 For detailed instructions, see README.md"
echo ""
echo "Happy creating! 🎉"