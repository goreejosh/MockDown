# MockDown - Automated Mockups for Photoshop

An Electron desktop application that automates the creation of product mockups using Photoshop smart objects. Generate multiple mockup variations with different perspectives, angles, and positions - all from a single template!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **Smart Object Replacement** - Automatically replaces smart object content in Photoshop templates
- 📁 **Batch Processing** - Process multiple artwork files at once
- 🔄 **Variation Generation** - Create multiple versions with different:
  - Distance (Scale: 95%, 100%, 105%, etc.)
  - Framing (Position offsets)
  - Tilt angles
  - Rotation angles
- 💾 **PNG Export** - Automatically exports high-quality PNG files
- 🖼️ **Effects Preservation** - Maintains all Photoshop effects (shadows, bevels, warps, etc.)

## 🖥️ Screenshots

<details>
<summary>View Application Interface</summary>

- Clean, intuitive interface
- Drag-and-drop file selection
- Real-time script preview
- Variation configuration panel

</details>

## 🚀 Quick Start

### Download

Download the latest release for your platform:

- **macOS Intel**: [Download DMG](../../releases)
- **macOS Apple Silicon**: [Download ARM64 DMG](../../releases)
- **Windows**: Coming soon
- **Linux**: Coming soon

### Installation

#### macOS
1. Download the `.dmg` file
2. Open the downloaded file
3. Drag "Automated Mockups" to Applications
4. First launch: Right-click → Open (to bypass Gatekeeper)

## 📖 How It Works

1. **Prepare Your Template**
   - Create a PSD with smart object layers
   - Apply effects to the smart object
   - Save your template

2. **Load Your Assets**
   - Select your PSD template
   - Choose artwork PNG files
   - Configure variations (optional)

3. **Generate Script**
   - Click "Generate Photoshop Script"
   - Save the `.jsx` file

4. **Run in Photoshop**
   - File → Scripts → Browse
   - Select the generated script
   - Watch the magic happen!

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Adobe Photoshop 2020+

### Setup

```bash
# Clone the repository
git clone https://github.com/goreejosh/MockDown.git
cd MockDown

# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run dist:mac    # macOS
npm run dist:win    # Windows
npm run dist:linux  # Linux
```

### Project Structure

```
MockDown/
├── src/
│   ├── main/          # Electron main process
│   ├── renderer/      # React UI
│   └── utils/         # Script generation
├── build/             # Build resources
├── release/           # Packaged apps
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI powered by [React](https://reactjs.org/)
- Photoshop automation via ExtendScript

## 📧 Contact

Josh G - [@goreejosh](https://github.com/goreejosh)

Project Link: [https://github.com/goreejosh/MockDown](https://github.com/goreejosh/MockDown)

---

<div align="center">
  
**If you find this tool useful, please consider giving it a ⭐ on GitHub!**

</div>