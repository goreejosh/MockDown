import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectPSDFile: () => ipcRenderer.invoke('select-psd-file'),
  selectArtworkFiles: () => ipcRenderer.invoke('select-artwork-files'),
  saveScript: (scriptContent: string) => ipcRenderer.invoke('save-script', scriptContent),
  readFile: async (filePath: string) => {
    const fs = require('fs');
    return fs.promises.readFile(filePath);
  }
});

// Type definitions for TypeScript
export interface ElectronAPI {
  selectPSDFile: () => Promise<string | null>;
  selectArtworkFiles: () => Promise<string[]>;
  saveScript: (scriptContent: string) => Promise<string | null>;
  readFile: (filePath: string) => Promise<Buffer>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}