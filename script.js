// Database of frequency information
const FrequencyData = {
    "315MHz": {
        devices: "Car key fobs (older North American vehicles), garage door openers, home automation systems, wireless sensors",
        advice: "Common in North America. Capture and replay might work for simple fixed-code systems, but many modern systems use rolling codes and are more secure."
    },
    "433.92MHz": {
        devices: "Car key fobs (European/Asian vehicles), garage door openers, weather stations, home automation, wireless doorbells, alarm systems",
        advice: "Very common worldwide. Good frequency to explore, but expect mixed results with rolling code systems. Try RAW recording mode for complex signals."
    },
    "868MHz": {
        devices: "European alarm systems, home automation, smart meters, some industrial equipment, some modern garage door openers",
        advice: "Common in Europe. Often used for more secure systems. Check local regulations as usage might be restricted."
    },
    "915MHz": {
        devices: "ISM band devices, smart meters, industrial equipment, some alarm systems (North America)",
        advice: "Common in North America and Australia. Good for exploring IoT devices. Try different modulations (AM/FM) for best results."
    },
    "300-350MHz": {
        devices: "Various key fobs, older garage door systems, some industrial remotes",
        advice: "Less common today but still found in older systems. Good for finding legacy devices with simpler security."
    },
    "390-405MHz": {
        devices: "Some car manufacturers' key fobs, certain commercial systems",
        advice: "Less common frequency range. Worth exploring for specialized systems not found on standard frequencies."
    },
    "426-435MHz": {
        devices: "Common range for various remote controls, security systems, and automation equipment",
        advice: "Very active frequency range in many regions. Try scanning this entire range slowly for best results."
    },
    "863-870MHz": {
        devices: "European IoT devices, wireless headphones, baby monitors, some alarm systems",
        advice: "Heavily used in Europe for various applications. May require special attention to modulation settings."
    },
    "902-928MHz": {
        devices: "North American ISM band, LoRa devices, smart meters, ZigBee, various IoT devices",
        advice: "Rich hunting ground for IoT devices. Use Add Manually in the Flipper to test specific frequencies within this range."
    }
};

// Function to find the closest frequency match
function findClosestFrequency(input) {
    // Strip any non-numeric and non-decimal characters, except M, m, H, h, z, Z
    const cleanInput = input.replace(/[^0-9.MmHhZz]/g, "");
    
    // Extract the numeric part
    const numericMatch = cleanInput.match(/([0-9.]+)/);
    if (!numericMatch) return null;
    
    let frequency = parseFloat(numericMatch[0]);
    
    // Determine if the user specified MHz or just a number
    const isMHz = /[Mm][Hh][Zz]/.test(cleanInput);
    
    // If no MHz specified and the number is large, convert to MHz
    if (!isMHz) {
        if (frequency > 1000000) {
            frequency = frequency / 1000000;
        } else if (frequency > 1000) {
            frequency = frequency / 1000;
        }
    }
    
    // Define frequency ranges for matching
    const ranges = [
        { name: "300-350MHz", min: 300, max: 350 },
        { name: "315MHz", min: 314, max: 316 },
        { name: "390-405MHz", min: 390, max: 405 },
        { name: "426-435MHz", min: 426, max: 435 },
        { name: "433.92MHz", min: 433, max: 435 },
        { name: "863-870MHz", min: 863, max: 870 },
        { name: "868MHz", min: 867, max: 869 },
        { name: "902-928MHz", min: 902, max: 928 },
        { name: "915MHz", min: 914, max: 916 }
    ];
    
    // Find matching range
    for (const range of ranges) {
        if (frequency >= range.min && frequency <= range.max) {
            return range.name;
        }
    }
    
    // If no direct match, find closest
    let closestRange = null;
    let minDistance = Infinity;
    
    for (const range of ranges) {
        const midPoint = (range.min + range.max) / 2;
        const distance = Math.abs(frequency - midPoint);
        
        if (distance < minDistance) {
            minDistance = distance;
            closestRange = range.name;
        }
    }
    
    return closestRange;
}

// DOM Elements
const frequencyInput = document.getElementById('frequency');
const analyzeBtn = document.getElementById('analyzeBtn');
const errorBox = document.getElementById('errorBox');
const resultBox = document.getElementById('resultBox');
const resultTitle = document.getElementById('resultTitle');
const deviceInfo = document.getElementById('deviceInfo');
const adviceInfo = document.getElementById('adviceInfo');

// Initialize the UI
function initUI() {
    errorBox.style.display = 'none';
    resultBox.style.display = 'none';
    
    // Add event listeners
    analyzeBtn.addEventListener('click', handleAnalyze);
    frequencyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAnalyze();
        }
    });
    
    // Add click listeners to quick reference frequencies
    document.querySelectorAll('.freq').forEach(elem => {
        elem.addEventListener('click', function() {
            frequencyInput.value = this.textContent;
            handleAnalyze();
        });
    });
}

// Handle analysis
function handleAnalyze() {
    const input = frequencyInput.value;
    
    // Reset UI
    errorBox.style.display = 'none';
    resultBox.style.display = 'none';
    
    if (!input.trim()) {
        showError('Please enter a frequency');
        return;
    }
    
    try {
        const closestMatch = findClosestFrequency(input);
        
        if (closestMatch && FrequencyData[closestMatch]) {
            showResult(closestMatch, FrequencyData[closestMatch]);
        } else {
            showError('No matching frequency information found. Please try a common SubGHz frequency (e.g., 315MHz, 433.92MHz, 868MHz)');
        }
    } catch (err) {
        showError('Error analyzing frequency: ' + err.message);
    }
}

// Show error message
function showError(message) {
    errorBox.textContent = message;
    errorBox.style.display = 'block';
}

// Show result
function showResult(frequency, data) {
    resultTitle.textContent = 'Frequency Information: ' + frequency;
    deviceInfo.textContent = data.devices;
    adviceInfo.textContent = data.advice;
    resultBox.style.display = 'block';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initUI);