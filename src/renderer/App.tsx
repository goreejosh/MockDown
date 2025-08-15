import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { generatePhotoshopScript } from './utils/scriptGenerator';
// import { parsePSDFile } from './utils/psdParser';
import './App.css';

interface TemplateInfo {
  path: string;
  name: string;
  smartObjectName: string;
  smartObjectLayers?: SmartObjectLayer[];
}

interface SmartObjectLayer {
  name: string;
  id: number;
  path: string;
}

interface ArtworkFile {
  path: string;
  name: string;
  outputName?: string;
}

interface VariationSettings {
  distance: { enabled: boolean; values: number[] }; // Scale percentages
  framing: { enabled: boolean; values: { x: number; y: number }[] }; // Position offsets
  tilt: { enabled: boolean; values: number[] }; // Tilt angles in degrees
  rotation: { enabled: boolean; values: number[] }; // Rotation angles in degrees
}

function App() {
  const [template, setTemplate] = useState<TemplateInfo | null>(null);
  const [artworkFiles, setArtworkFiles] = useState<ArtworkFile[]>([]);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<VariationSettings>({
    distance: { enabled: false, values: [95, 105] },
    framing: { enabled: false, values: [{x: -20, y: 0}, {x: 20, y: 0}] },
    tilt: { enabled: false, values: [-5, 5] },
    rotation: { enabled: false, values: [-3, 3] }
  });

  // Handle PSD template selection
  const handleSelectTemplate = async () => {
    const filePath = await window.electronAPI.selectPSDFile();
    if (filePath) {
      const fileName = filePath.split(/[\\/]/).pop() || '';
      
      // Parse the PSD file to find smart objects
      // const smartObjectLayers = await parsePSDFile(filePath);
      
      setTemplate({
        path: filePath,
        name: fileName,
        smartObjectName: '', // smartObjectLayers.length === 1 ? smartObjectLayers[0].name : '',
        smartObjectLayers: [] // smartObjectLayers
      });
    }
  };

  // Handle artwork file selection
  const handleSelectArtwork = async () => {
    const filePaths = await window.electronAPI.selectArtworkFiles();
    const newFiles = filePaths.map(path => ({
      path,
      name: path.split(/[\\/]/).pop() || ''
    }));
    setArtworkFiles([...artworkFiles, ...newFiles]);
  };

  // Remove artwork file
  const removeArtworkFile = (index: number) => {
    setArtworkFiles(artworkFiles.filter((_, i) => i !== index));
  };

  // Update smart object name
  const updateSmartObjectName = (name: string) => {
    if (template) {
      setTemplate({ ...template, smartObjectName: name });
    }
  };

  // Update artwork output name
  const updateArtworkOutputName = (index: number, outputName: string) => {
    const updatedFiles = [...artworkFiles];
    updatedFiles[index] = { ...updatedFiles[index], outputName };
    setArtworkFiles(updatedFiles);
  };

  // Generate the Photoshop script
  const handleGenerateScript = async () => {
    if (!template || artworkFiles.length === 0) return;

    setIsGenerating(true);
    try {
      const script = generatePhotoshopScript({
        templatePath: template.path,
        artworkPaths: artworkFiles.map(f => f.path),
        outputFolder: template.path.substring(0, template.path.lastIndexOf(/[\\/]/.exec(template.path)?.[0] || '')) + '/output',
        smartObjectName: template.smartObjectName,
        outputNames: artworkFiles.map(f => f.outputName),
        variations: variations
      });
      
      setGeneratedScript(script);
    } catch (error) {
      console.error('Error generating script:', error);
      alert('Error generating script. Please check the console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save the generated script
  const handleSaveScript = async () => {
    if (!generatedScript) return;
    
    const savedPath = await window.electronAPI.saveScript(generatedScript);
    if (savedPath) {
      alert(`Script saved to: ${savedPath}\n\nYou can now run this script in Photoshop:\n1. Open Photoshop\n2. Go to File > Scripts > Browse\n3. Select the saved JSX file`);
    }
  };

  // Dropzone for PSD template
  const {
    getRootProps: getTemplateRootProps,
    getInputProps: getTemplateInputProps,
    isDragActive: isTemplateDragActive
  } = useDropzone({
    accept: {
      'image/vnd.adobe.photoshop': ['.psd']
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        
        // Parse the PSD file to find smart objects
        // const smartObjectLayers = await parsePSDFile(file.path);
        
        setTemplate({
          path: file.path,
          name: file.name,
          smartObjectName: '', // smartObjectLayers.length === 1 ? smartObjectLayers[0].name : '',
          smartObjectLayers: [] // smartObjectLayers
        });
      }
    }
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Automated Mockup Generator</h1>
        <p>Create Photoshop scripts for batch mockup generation</p>
      </header>

      <main className="app-main">
        {/* Template Section */}
        <div className="section">
          <h2 className="section-title">1. Select PSD Template</h2>
          <p className="section-subtitle">Choose a Photoshop file with a smart object layer</p>
          
          {!template ? (
            <div className="template-upload">
              <div 
                {...getTemplateRootProps()} 
                className={`dropzone ${isTemplateDragActive ? 'active' : ''}`}
              >
                <input {...getTemplateInputProps()} />
                <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L2.621 19.485C2.72915 19.9177 2.97882 20.3018 3.33033 20.5763C3.68184 20.8508 4.11501 21.0003 4.561 21H19.439C19.885 21.0003 20.3182 20.8508 20.6697 20.5763C21.0212 20.3018 21.2708 19.9177 21.379 19.485L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Drag & drop your PSD template here</p>
                <p className="or-text">or</p>
                <button className="btn btn-primary" onClick={handleSelectTemplate}>
                  Browse Files
                </button>
              </div>
            </div>
          ) : (
            <div className="template-info">
              <div className="file-item">
                <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="file-name">{template.name}</span>
                <button className="file-remove" onClick={() => setTemplate(null)}>Remove</button>
              </div>
              <div className="layer-name-input">
                <label htmlFor="smart-object-name">Smart Object Layer Name (Optional):</label>
                <input
                  id="smart-object-name"
                  type="text"
                  value={template.smartObjectName}
                  onChange={(e) => updateSmartObjectName(e.target.value)}
                  placeholder="Leave blank to auto-detect, or enter layer name"
                  className="input-field"
                />
                <p className="input-hint">The script will find the smart object automatically, or you can specify a name if you have multiple smart objects.</p>
              </div>
            </div>
          )}
        </div>

        {/* Artwork Section */}
        <div className="section">
          <h2 className="section-title">2. Select Artwork Files</h2>
          <p className="section-subtitle">Choose PNG images to place in the smart object</p>
          
          <button 
            className="btn btn-secondary" 
            onClick={handleSelectArtwork}
            disabled={!template}
          >
            Add Artwork Files
          </button>

          {artworkFiles.length > 0 && (
            <div className="file-list">
              {artworkFiles.map((file, index) => (
                <div key={index} className="artwork-item">
                  <div className="file-item">
                    <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="file-name">{file.name}</span>
                    <button className="file-remove" onClick={() => removeArtworkFile(index)}>
                      Remove
                    </button>
                  </div>
                  <div className="output-name-input">
                    <input
                      type="text"
                      value={file.outputName || ''}
                      onChange={(e) => updateArtworkOutputName(index, e.target.value)}
                      placeholder={`Output name (optional, default: ${file.name.replace(/\.[^.]+$/, '')}_mockup)`}
                      className="input-field input-field-small"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Variations Section */}
        <div className="section">
          <h2 className="section-title">3. Configure Variations (Optional)</h2>
          <p className="section-subtitle">Create multiple versions with different camera angles</p>
          
          <div className="variations-grid">
            {/* Distance (Scale) */}
            <div className="variation-control">
              <label>
                <input
                  type="checkbox"
                  checked={variations.distance.enabled}
                  onChange={(e) => setVariations({
                    ...variations,
                    distance: { ...variations.distance, enabled: e.target.checked }
                  })}
                />
                Distance (Scale)
              </label>
              {variations.distance.enabled && (
                <div className="variation-values">
                  <input
                    type="text"
                    placeholder="e.g., 95, 100, 105"
                    defaultValue={variations.distance.values.join(', ')}
                    onBlur={(e) => {
                      const input = e.target.value.trim();
                      const values = input ? input.split(',').map(v => {
                        const num = parseFloat(v.trim());
                        return isNaN(num) ? null : num;
                      }).filter(v => v !== null) as number[] : [];
                      setVariations({
                        ...variations,
                        distance: { ...variations.distance, values: values.length > 0 ? values : [100] }
                      });
                    }}
                    className="input-field input-field-small"
                  />
                  <span className="input-hint">Percentages (100 = original size)</span>
                </div>
              )}
            </div>

            {/* Framing (Position) */}
            <div className="variation-control">
              <label>
                <input
                  type="checkbox"
                  checked={variations.framing.enabled}
                  onChange={(e) => setVariations({
                    ...variations,
                    framing: { ...variations.framing, enabled: e.target.checked }
                  })}
                />
                Framing (Position)
              </label>
              {variations.framing.enabled && (
                <div className="variation-values">
                  <input
                    type="text"
                    placeholder="e.g., -20,0; 20,0; 0,15"
                    defaultValue={variations.framing.values.map(v => `${v.x},${v.y}`).join('; ')}
                    onBlur={(e) => {
                      const input = e.target.value.trim();
                      const pairs = input ? input.split(';').map(pair => {
                        const parts = pair.split(',');
                        if (parts.length === 2) {
                          const x = parseFloat(parts[0].trim());
                          const y = parseFloat(parts[1].trim());
                          return (!isNaN(x) && !isNaN(y)) ? {x, y} : null;
                        }
                        return null;
                      }).filter(v => v !== null) as {x: number, y: number}[] : [];
                      setVariations({
                        ...variations,
                        framing: { ...variations.framing, values: pairs.length > 0 ? pairs : [{x: 0, y: 0}] }
                      });
                    }}
                    className="input-field input-field-small"
                  />
                  <span className="input-hint">X,Y pixel offsets (e.g., -20,0)</span>
                </div>
              )}
            </div>

            {/* Tilt */}
            <div className="variation-control">
              <label>
                <input
                  type="checkbox"
                  checked={variations.tilt.enabled}
                  onChange={(e) => setVariations({
                    ...variations,
                    tilt: { ...variations.tilt, enabled: e.target.checked }
                  })}
                />
                Tilt
              </label>
              {variations.tilt.enabled && (
                <div className="variation-values">
                  <input
                    type="text"
                    placeholder="e.g., -5, 0, 5"
                    defaultValue={variations.tilt.values.join(', ')}
                    onBlur={(e) => {
                      const input = e.target.value.trim();
                      const values = input ? input.split(',').map(v => {
                        const num = parseFloat(v.trim());
                        return isNaN(num) ? null : num;
                      }).filter(v => v !== null) as number[] : [];
                      setVariations({
                        ...variations,
                        tilt: { ...variations.tilt, values: values.length > 0 ? values : [0] }
                      });
                    }}
                    className="input-field input-field-small"
                  />
                  <span className="input-hint">Degrees of tilt</span>
                </div>
              )}
            </div>

            {/* Rotation */}
            <div className="variation-control">
              <label>
                <input
                  type="checkbox"
                  checked={variations.rotation.enabled}
                  onChange={(e) => setVariations({
                    ...variations,
                    rotation: { ...variations.rotation, enabled: e.target.checked }
                  })}
                />
                Rotation
              </label>
              {variations.rotation.enabled && (
                <div className="variation-values">
                  <input
                    type="text"
                    placeholder="e.g., -3, 0, 3"
                    defaultValue={variations.rotation.values.join(', ')}
                    onBlur={(e) => {
                      const input = e.target.value.trim();
                      const values = input ? input.split(',').map(v => {
                        const num = parseFloat(v.trim());
                        return isNaN(num) ? null : num;
                      }).filter(v => v !== null) as number[] : [];
                      setVariations({
                        ...variations,
                        rotation: { ...variations.rotation, values: values.length > 0 ? values : [0] }
                      });
                    }}
                    className="input-field input-field-small"
                  />
                  <span className="input-hint">Degrees of rotation</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Script Generation Section */}
        {template && artworkFiles.length > 0 && (
          <div className="section">
            <h2 className="section-title">4. Generate Script</h2>
            <button 
              className="btn btn-primary" 
              onClick={handleGenerateScript}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Photoshop Script'}
            </button>

            {generatedScript && (
              <div className="script-section">
                <h3 className="section-subtitle">Generated Script Preview:</h3>
                <div className="script-preview">
                  {generatedScript}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Action Bar */}
      {generatedScript && (
        <div className="action-bar">
          <button className="btn btn-primary" onClick={handleSaveScript}>
            Save Script
          </button>
        </div>
      )}
    </div>
  );
}

export default App;