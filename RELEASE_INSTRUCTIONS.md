# Creating a GitHub Release for MockDown

## 🚀 Your Code is Now Live!

Your repository is now available at: https://github.com/goreejosh/MockDown

## 📦 Creating Your First Release

Follow these steps to create a release with your DMG files:

### Step 1: Go to Your Repository
Visit: https://github.com/goreejosh/MockDown

### Step 2: Create a New Release
1. Click on **"Releases"** (right side of the page)
2. Click **"Create a new release"** or **"Draft a new release"**

### Step 3: Fill in Release Details

**Tag version:** `v1.0.0`

**Release title:** `MockDown v1.0.0 - Initial Release`

**Description:** (Copy and paste this)
```markdown
# MockDown v1.0.0

The first release of MockDown - Automated Mockups for Photoshop!

## ✨ Features
- Smart object replacement in Photoshop templates
- Batch processing of multiple artwork files
- Variation generation (scale, position, tilt, rotation)
- Automatic PNG export with custom naming
- Preserves all Photoshop effects

## 📦 Downloads

### macOS
- **Intel Macs**: `Automated.Mockups-1.0.0.dmg`
- **Apple Silicon (M1/M2/M3)**: `Automated.Mockups-1.0.0-arm64.dmg`

### Installation
1. Download the appropriate DMG for your Mac
2. Open the DMG file
3. Drag MockDown to Applications
4. First launch: Right-click → Open

## 🔧 Requirements
- macOS 10.14 or later
- Adobe Photoshop 2020 or later

## 📝 Notes
- This is an unsigned build. You'll need to right-click → Open on first launch
- Windows and Linux versions coming soon!
```

### Step 4: Attach the DMG Files

Click **"Attach binaries"** and upload these files from your `/release` folder:
- `Automated Mockups-1.0.0.dmg` (96MB)
- `Automated Mockups-1.0.0-arm64.dmg` (92MB)

Optional: Also upload the ZIP versions:
- `Automated Mockups-1.0.0-mac.zip`
- `Automated Mockups-1.0.0-arm64-mac.zip`

### Step 5: Publish
1. Check **"Set as the latest release"**
2. Click **"Publish release"**

## 🎉 Done!

Your release will be live at:
https://github.com/goreejosh/MockDown/releases/tag/v1.0.0

Users can now:
1. Visit your repository
2. Click on Releases
3. Download the appropriate DMG for their system
4. Start using MockDown!

## 📈 Next Steps

### For Future Releases:
1. Update version in `package.json`
2. Make your changes
3. Build: `npm run dist:mac`
4. Create new release with incremented version (v1.1.0, v1.2.0, etc.)

### To Track Downloads:
- GitHub shows download counts next to each release asset
- Check back periodically to see how many people are using your app!

### Promotion Ideas:
- Share on Twitter/X with #ElectronJS #Photoshop #DesignTools
- Post in relevant subreddits (r/photoshop, r/graphic_design)
- Share with design communities on Discord/Slack
- Create a demo video showing the workflow

## 🌟 Getting Stars

Encourage users to star your repository:
- Add a star badge to your README
- Include "⭐ Star this repo" in your release notes
- Thank contributors and stargazers in your README

---

**Your app is now ready for the world! 🚀**