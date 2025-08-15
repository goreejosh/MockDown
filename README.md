# Automated Mockups

An Electron application for generating Photoshop scripts that automate mockup creation with smart object replacement.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run dev
```

3. Build the application:
```bash
npm run build
npm run dist
```

## How to Use

1. **Upload PSD Template**: Select a Photoshop file that contains a smart object layer with your effects (inner shadow, bevel, warp, etc.)

2. **Add Artwork Files**: Select one or more PNG files that you want to place into the smart object

3. **Generate Script**: Click "Generate Photoshop Script" to create a JSX script

4. **Save & Run**: Save the script and run it in Photoshop:
   - Open Photoshop
   - Go to File > Scripts > Browse
   - Select the saved JSX file
   - The script will automatically process all your artwork files and save mockups

## Features

- ✅ Drag & drop support for files
- ✅ Batch processing of multiple artwork files
- ✅ Preserves all smart object effects
- ✅ Generates standard Photoshop JSX scripts
- ✅ Cross-platform (Windows, macOS, Linux)

## Development

The app is built with:
- Electron
- React
- TypeScript
- Vite

### Project Structure
```
src/
├── main/          # Electron main process
├── renderer/      # React UI
└── utils/         # Utilities (script generator)
```

## Notes

- The generated script assumes your smart object layer is named "Layer 1" by default
- Output files are saved in an "output" folder next to your template
- Make sure your PSD file has at least one smart object layer