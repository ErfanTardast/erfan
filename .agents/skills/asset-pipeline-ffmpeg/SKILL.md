---
name: asset-pipeline-ffmpeg
description: Use when producing Keyvan hero video frames, compressed image sequences, fallback images, or validating public frame assets.
---

# Instructions

- Keep desktop sequences to 120-220 frames maximum.
- Use every second or third frame on mobile.
- Prefer WebP and keep frames ideally below 150 KB.
- Validate numbering, missing frames, and fallback image paths.
- Document extraction, for example:
  `ffmpeg -i input.mp4 -vf "fps=7.5,scale=1280:-2" -q:v 4 public/frames/frame_%04d.jpg`

# Boundaries

Do not create a sequence when a single responsive product image provides the same
commercial value at lower cost.
