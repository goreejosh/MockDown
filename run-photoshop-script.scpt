tell application "Adobe Photoshop 2025"
    activate
    set scriptFile to POSIX file "/Users/joshg/Automated Mockups/test-layer-search.jsx"
    do javascript file scriptFile
end tell