import PSD from 'psd';

export interface SmartObjectLayer {
  name: string;
  id: number;
  path: string;
}

export async function parsePSDFile(filePath: string): Promise<SmartObjectLayer[]> {
  try {
    // Read the file
    const buffer = await window.electronAPI.readFile(filePath);
    
    // Parse the PSD
    const psd = new PSD(buffer);
    psd.parse();
    
    const smartObjects: SmartObjectLayer[] = [];
    
    // Recursive function to find all smart object layers
    function findSmartObjects(node: any, path: string = ''): void {
      if (node.layer) {
        // Check if it's a smart object
        // In PSD.js, smart objects have additionalLayerInfo with 'SoLd' or 'PlLd' keys
        const layer = node.layer;
        if (layer.additionalLayerInfo && 
            (layer.additionalLayerInfo.SoLd || layer.additionalLayerInfo.PlLd)) {
          smartObjects.push({
            name: node.name,
            id: layer.id || smartObjects.length,
            path: path ? `${path} > ${node.name}` : node.name
          });
        }
      }
      
      // Check children
      if (node.children && node.children().length > 0) {
        const currentPath = path ? `${path} > ${node.name}` : node.name;
        node.children().forEach((child: any) => {
          findSmartObjects(child, node.isRoot ? '' : currentPath);
        });
      }
    }
    
    // Start from the root
    const tree = psd.tree();
    findSmartObjects(tree);
    
    return smartObjects;
  } catch (error) {
    console.error('Error parsing PSD file:', error);
    
    // Fallback: return empty array and let user manually input
    return [];
  }
}