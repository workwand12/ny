# Toono Photo Setup Guide

## Step 1: Add Your Toono Photo

1. Place your toono photo in the `public` folder
2. Name it `toono-photo.jpg` (or update the path in `YurtToono.tsx`)

**Recommended image specs:**
- Square aspect ratio (1:1)
- High resolution (at least 800x800px)
- The toono should be centered in the image
- Good lighting to see the wooden structure clearly

## Step 2: Calibrate the Clickable Areas

Open `src/components/YurtToono.tsx` and find the `CALIBRATION` constants at the top:

```typescript
const CALIBRATION = {
  viewBoxSize: 400,      // SVG coordinate system size
  centerX: 200,          // Center X (half of viewBoxSize)
  centerY: 200,          // Center Y (half of viewBoxSize)
  innerRadius: 80,       // Inner radius of clickable ring
  outerRadius: 180,      // Outer radius of clickable ring
}
```

### How to Calibrate:

1. **Find the center point:**
   - Look at your toono photo and identify the center of the toono ring
   - If the image is perfectly centered, `centerX` and `centerY` should both be `200` (half of 400)
   - If the toono is off-center in your image, adjust these values

2. **Find the inner radius:**
   - Measure from the center to the **inner edge** of the toono ring (where you want clickable areas to start)
   - Update `innerRadius` value (in SVG coordinates, where 200 = center)

3. **Find the outer radius:**
   - Measure from the center to the **outer edge** of the toono ring (where you want clickable areas to end)
   - Update `outerRadius` value

### Example Calibration:

If your toono ring in the photo:
- Center is at (200, 200) ✓
- Inner edge is 90px from center → `innerRadius: 90`
- Outer edge is 190px from center → `outerRadius: 190`

Then update:
```typescript
const CALIBRATION = {
  viewBoxSize: 400,
  centerX: 200,
  centerY: 200,
  innerRadius: 90,   // Adjusted
  outerRadius: 190,  // Adjusted
}
```

## Step 3: Test and Fine-Tune

1. Open the website in your browser
2. In development mode, you'll see calibration info in the top-right corner
3. Hover over the toono image - you should see translucent highlights on the clickable areas
4. If the highlights don't match the ring:
   - **Too small**: Increase `innerRadius` and/or `outerRadius`
   - **Too large**: Decrease `innerRadius` and/or `outerRadius`
   - **Off-center**: Adjust `centerX` and/or `centerY`
   - **Wrong position**: The angles start at 0° (top) and go clockwise

## Features:

✅ **8 clickable donut wedges** - Only the ring area is clickable  
✅ **Center circle NOT clickable** - Protected area  
✅ **Outside areas NOT clickable** - Only the ring band  
✅ **Keyboard accessible** - Tab to focus, Enter/Space to activate  
✅ **Hover effects** - Subtle translucent highlight  
✅ **Focus outline** - Visible outline for keyboard navigation  
✅ **Responsive** - Works on all screen sizes  

## Troubleshooting:

**Image not showing:**
- Check the file path in `TOONO_IMAGE_PATH`
- Make sure the image is in the `public` folder
- Check browser console for errors

**Clickable areas not matching:**
- Adjust the `CALIBRATION` constants
- Use the dev overlay to see current values
- Test incrementally (adjust one value at a time)

**Clicks not working:**
- Check browser console for errors
- Make sure the SVG overlay is positioned correctly
- Verify the paths are being generated correctly

