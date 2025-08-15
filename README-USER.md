# Automated Mockups for Photoshop

A desktop application that automates the creation of product mockups using Photoshop smart objects. Simply upload your template, select your artwork files, and generate multiple mockup variations with different perspectives and angles.

## Features

- 🎨 **Smart Object Replacement**: Automatically replaces smart object content in Photoshop templates
- 📁 **Batch Processing**: Process multiple artwork files at once
- 🔄 **Variation Generation**: Create multiple versions with different:
  - Distance (Scale)
  - Framing (Position)
  - Tilt angles
  - Rotation angles
- 💾 **PNG Export**: Automatically exports high-quality PNG files
- 🖼️ **Effects Preservation**: Maintains all Photoshop effects (shadows, bevels, warps, etc.)

## System Requirements

- **Operating System**: macOS 10.14+, Windows 10+, or Linux
- **Adobe Photoshop**: 2020 or newer (2025 recommended)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 100MB for application + space for your mockup files

## Installation

### macOS

1. Download the `.dmg` file from the releases page
2. Open the downloaded file
3. Drag "Automated Mockups" to your Applications folder
4. First time opening: Right-click and select "Open" to bypass Gatekeeper

### Windows

1. Download the `.exe` installer from the releases page
2. Run the installer
3. Follow the installation wizard
4. Launch from Start Menu or Desktop shortcut

### Linux

1. Download the `.AppImage` file from the releases page
2. Make it executable: `chmod +x Automated-Mockups-*.AppImage`
3. Run the application: `./Automated-Mockups-*.AppImage`

## How to Use

### Step 1: Prepare Your Photoshop Template

1. Create a PSD file with:
   - Background layers (your product/scene)
   - A Smart Object layer containing placeholder artwork
   - Any effects applied to the smart object (shadows, transforms, etc.)

2. Name your smart object layer clearly (e.g., "Product Smart Object")

### Step 2: Prepare Your Artwork Files

- Have your artwork ready as PNG files
- All artwork should be the same aspect ratio for best results
- Consider using similar color profiles for consistent effect application

### Step 3: Generate Mockups

1. **Launch the Application**

2. **Upload Template**:
   - Click "Select PSD Template"
   - Choose your prepared Photoshop file

3. **Enter Smart Object Name** (Optional):
   - Type the exact name of your smart object layer
   - Leave blank to auto-detect smart objects

4. **Select Artwork Files**:
   - Click "Select Artwork Files"
   - Choose one or more PNG files to use as replacements

5. **Configure Output Names** (Optional):
   - Enter custom names for each output file
   - Leave blank to use automatic naming

6. **Configure Variations** (Optional):
   - Enable variation types you want to create
   - **Distance**: Enter scale percentages (e.g., 95, 100, 105)
   - **Framing**: Enter position offsets (e.g., -20,0; 20,0)
   - **Tilt**: Enter tilt angles in degrees (e.g., -5, 0, 5)
   - **Rotation**: Enter rotation angles (e.g., -3, 0, 3)

7. **Generate Script**:
   - Click "Generate Photoshop Script"
   - Save the `.jsx` file to your computer

### Step 4: Run the Script in Photoshop

#### Method 1: File Menu
1. Open Photoshop
2. Go to File → Scripts → Browse...
3. Select the generated `.jsx` file
4. Follow any prompts (select which layer to replace)
5. Wait for processing to complete

#### Method 2: ExtendScript Toolkit
1. Open Adobe ExtendScript Toolkit
2. Open the generated `.jsx` file
3. Set target to Adobe Photoshop
4. Click Run

#### Method 3: Command Line (macOS)
```bash
osascript -e 'tell application "Adobe Photoshop 2025" to do javascript file "path/to/script.jsx"'
```

## Tips for Best Results

### Template Creation
- Use high-resolution templates (at least 2000px wide)
- Apply effects to the smart object layer, not the contents
- Test with one artwork file first

### Artwork Preparation
- Use consistent dimensions across all artwork
- PNG format with transparency works best
- Consider the background color of your mockup

### Troubleshooting Effects
If effects aren't applying consistently:
- Check artwork color profiles
- Ensure all artwork has similar properties (transparency, color mode)
- Verify smart object blend modes aren't color-dependent

## Common Issues

### "Smart object layer not found"
- Ensure you've typed the exact layer name
- Check for extra spaces in the layer name
- Try leaving the field blank for auto-detection

### Effects not applying
- Make sure effects are applied to the smart object layer itself
- Check if blend modes are compatible with your artwork colors
- Try with different artwork files to isolate the issue

### Script runs but no output
- Check the output folder path in the script
- Ensure Photoshop has write permissions
- Verify the template file path is correct

## Privacy & Security

- All processing happens locally on your computer
- No files are uploaded to any servers
- No internet connection required after installation
- Your designs and templates remain completely private

## Support

For issues, feature requests, or questions:
- Visit our GitHub repository
- Check the Issues section for known problems
- Create a new issue with:
  - Your OS and Photoshop version
  - Steps to reproduce the problem
  - Any error messages

## License

MIT License - See LICENSE file for details

---

Made with ❤️ for designers and creators