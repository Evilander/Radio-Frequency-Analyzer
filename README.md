# Flipper Zero SubGHz Frequency Analyzer

A simple web-based tool to identify common devices and get usage tips for SubGHz frequencies detected with a Flipper Zero.

## Overview

This tool helps Flipper Zero users identify what kinds of devices typically operate on specific SubGHz frequencies they discover during scanning. Enter any frequency (in various formats) and get information about:

- Common devices that use that frequency
- Specific Flipper Zero tips for working with that frequency

## Files in This Repository

- `index.html` - The main application
- `style.css` - Styling for the application
- `script.js` - Application logic
- `README.md` - This documentation file
- `LICENSE` - MIT License file

## How to Use

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/flipper-frequency-analyzer.git
   ```

2. Open `index.html` in your web browser

3. Enter a frequency in any of these formats:
   - 433.92MHz (with MHz suffix)
   - 433 (just the number)
   - 433920000 (in Hz)

4. Click "Analyze" to see what devices use that frequency

## Common Frequencies to Try

- **315MHz**: North American car key fobs, garage doors
- **433.92MHz**: European car key fobs, doorbells, weather stations
- **868MHz**: European alarm systems, home automation
- **915MHz**: ISM band devices, IoT devices in North America

## Screenshot

[Application Screenshot]

![Screenshot 2025-04-11 143100](https://github.com/user-attachments/assets/ea181046-2fda-4eb1-84b8-0dd88f3e2a5c)
