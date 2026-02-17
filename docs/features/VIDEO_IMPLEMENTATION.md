# Video Background Implementation

## Overview

The hero slider now supports video backgrounds in addition to static images, creating a more dynamic and engaging homepage experience.

## Features

### Video Backgrounds
- **Slide 1**: `/public/herobg.mp4` - Introductory welcome slide
- **Slide 2**: `/public/herobg2.mp4` - Discovery highlight slide
- **Properties**:
  - Auto-play enabled
  - Looping (continuous playback)
  - Muted (for autoplay compliance)
  - `playsInline` for mobile devices
  - Dark overlay (50% black) for text readability

### Video Slider Support
The hero slider features two video backgrounds:
- Slide 1: Welcome video with introductory text
- Slide 2: Discovery video with project highlights
- Text animates in on each slide transition
- Smooth transitions between video slides

## Implementation

### Slide Configuration

```typescript
const heroSlides = [
  {
    title: 'Welcome to Yugo Metals',
    subtitle: 'Leading the Future of Critical Minerals',
    description: 'Exploring rare earth elements and battery metals across Australia\'s most promising mineral regions',
    video: '/herobg.mp4', // First video slide - Introductory
  },
  {
    title: 'Breakthrough High Grade Rare Earth Elements Discovery',
    subtitle: 'Mick Well - Heart of the Gascoyne Mineral Field',
    description: 'An emerging rare earths region with 913 km² of exploration tenure',
    video: '/herobg2.mp4', // Second video slide - Discovery
  },
]
```

### HeroSlider Component

The component automatically detects whether to render a video or image:

```tsx
{slide.video ? (
  <video autoPlay loop muted playsInline className="...">
    <source src={slide.video} type="video/mp4" />
  </video>
) : (
  <div className="bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
)}
```

## Video Requirements

### Format
- **Container**: MP4
- **Video Codec**: H.264
- **Audio**: Not required (video is muted)

### Optimization Recommendations
- **Resolution**: 1920x1080 (Full HD) or higher
- **Bitrate**: 5-10 Mbps for good quality/size balance
- **Duration**: 10-30 seconds (looping creates longer effect)
- **File Size**: Aim for < 10MB for faster loading

### Compression Tips
Use tools like:
- **FFmpeg**: `ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -an output.mp4`
- **HandBrake**: Use web-optimized preset
- **Online tools**: CloudConvert, Online-Convert

## Browser Compatibility

### Supported Browsers
✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile Safari (iOS)
✅ Chrome Mobile (Android)

### Autoplay Notes
- Video must be **muted** for autoplay to work
- `playsInline` attribute required for iOS devices
- Some browsers may block autoplay on low battery/data saver mode

## Performance Considerations

### Loading Strategy
- Video loads in background while page initializes
- Overlay ensures text is readable even before video loads
- Fallback to solid color if video fails to load

### Optimization
- Consider lazy loading video for slides beyond the first
- Provide poster image for slower connections
- Use CDN for video hosting in production

## Future Enhancements

### Potential Additions
1. **Poster Image**: Add fallback image while video loads
2. **Multiple Formats**: Provide WebM alongside MP4 for better compression
3. **Responsive Videos**: Different video files for mobile/desktop
4. **Play/Pause Controls**: Optional user control
5. **Preload Strategy**: Only load video when slide is approaching

### Example with Poster
```tsx
<video 
  autoPlay 
  loop 
  muted 
  playsInline
  poster="/images/video-poster.jpg"
>
  <source src={slide.video} type="video/mp4" />
</video>
```

## Accessibility

- Video is decorative (background only)
- All content is presented in text overlay
- Muted by default (no audio distractions)
- Motion can be reduced via CSS media query if needed

```css
@media (prefers-reduced-motion: reduce) {
  video {
    animation: none;
    transition: none;
  }
}
```

## Testing Checklist

- [ ] Video plays automatically on desktop
- [ ] Video plays on mobile devices (iOS/Android)
- [ ] Video loops seamlessly
- [ ] Text overlay is readable
- [ ] Transition to next slide works smoothly
- [ ] Video doesn't cause performance issues
- [ ] Page loads reasonably fast with video
- [ ] Video works in all target browsers

