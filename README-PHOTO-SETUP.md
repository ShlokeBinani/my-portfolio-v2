# Photo Setup Instructions

## Adding Shloke's Photo to the About Section

To add the photo to the About Me section, follow these steps:

1. **Save the photo**: Take the photo from the uploaded image (the VIT presentation photo showing Shloke in a white shirt) and save it as `shloke-photo.jpg`

2. **Place the file**: Put the `shloke-photo.jpg` file in the `public/` directory of your project

3. **Verify the path**: The component is already configured to look for `/shloke-photo.jpg`, which maps to `public/shloke-photo.jpg`

4. **Fallback**: If the photo is not found, the component will automatically show a "Photo Coming Soon" placeholder with a gradient background

## Photo Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 512x512 pixels or similar square dimensions
- **Quality**: High quality for professional appearance
- **Filename**: Must be exactly `shloke-photo.jpg` (case-sensitive)

## File Structure
```
public/
  └── shloke-photo.jpg    (your photo goes here)
src/
  └── components/
      └── About.tsx       (already configured)
```

The photo will be displayed in a 256x256 rounded square with a blue border and shadow effect, fitting the overall design theme of the portfolio.