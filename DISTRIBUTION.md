# Distribution Guide - Automated Mockups

## 🎉 Build Successful!

Your application has been successfully packaged for distribution. Here's what was created:

### Generated Files (in `/release` folder)

#### macOS Distributions

1. **DMG Files** (Recommended for distribution)
   - `Automated Mockups-1.0.0.dmg` - Intel Mac version (x64)
   - `Automated Mockups-1.0.0-arm64.dmg` - Apple Silicon version (M1/M2/M3)
   
2. **ZIP Files** (Alternative distribution)
   - `Automated Mockups-1.0.0-mac.zip` - Intel Mac version
   - `Automated Mockups-1.0.0-arm64-mac.zip` - Apple Silicon version

### How to Distribute

#### Option 1: Direct Download (Simplest)

1. **Upload the files** to your preferred hosting:
   - GitHub Releases (recommended)
   - Google Drive
   - Dropbox
   - Your website

2. **Share the download links** with users:
   - Intel Mac users: `Automated Mockups-1.0.0.dmg`
   - Apple Silicon users: `Automated Mockups-1.0.0-arm64.dmg`
   - Or provide the universal link and let users choose

#### Option 2: GitHub Releases (Professional)

1. Create a new repository on GitHub (if not already done)
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial release"
   git remote add origin https://github.com/yourusername/automated-mockups.git
   git push -u origin main
   ```

3. Create a new release:
   - Go to your repo → Releases → Create new release
   - Tag version: `v1.0.0`
   - Release title: `Automated Mockups v1.0.0`
   - Attach the DMG and ZIP files
   - Add release notes

#### Option 3: Website Distribution

Create a simple landing page with:
- App description
- Screenshots
- Download buttons for each platform
- Installation instructions

### Building for Other Platforms

#### Windows
```bash
npm run dist:win
```
Creates:
- `.exe` installer
- `.portable.exe` (no installation needed)

#### Linux
```bash
npm run dist:linux
```
Creates:
- `.AppImage` (universal Linux package)
- `.deb` (Debian/Ubuntu)

#### All Platforms
```bash
npm run dist:all
```

### Important Notes

#### Code Signing (macOS)

The current build is **not code signed**, which means:
- Users will see a security warning when opening the app
- They need to right-click → Open to bypass Gatekeeper
- For professional distribution, consider getting an Apple Developer certificate ($99/year)

To add code signing later:
1. Get Apple Developer account
2. Create Developer ID Application certificate
3. The build process will automatically use it

#### Auto-Updates

To add auto-updates in the future:
1. Set up a release server (GitHub Releases works well)
2. Add `electron-updater` package
3. Configure update URL in package.json
4. Add update check code to main process

### Next Steps

1. **Test the packaged app** on a different Mac to ensure it works
2. **Create better icons** (current ones are placeholders):
   - Design a 1024x1024 icon
   - Convert to required formats using icon converters
3. **Add version numbering** - update version in package.json for each release
4. **Consider code signing** for professional distribution
5. **Create a website or GitHub page** for the project

### File Sizes

Current build sizes:
- macOS Intel: ~96 MB (DMG)
- macOS ARM: ~92 MB (DMG)

These are typical Electron app sizes including the Chrome runtime.

### Sharing Your App

You can now share your app! The DMG files in the `/release` folder are ready for distribution.

**Quick share for testing:**
1. Upload DMG to Google Drive or Dropbox
2. Share the link with testers
3. They download, open DMG, drag to Applications
4. Done! 🎉

---

## Building Updates

When you make changes and want to create a new version:

1. Update version in `package.json`
2. Make your code changes
3. Run `npm run dist:mac` (or platform of choice)
4. Upload new files
5. Notify users of the update

---

Congratulations on creating your first Electron app distribution! 🚀