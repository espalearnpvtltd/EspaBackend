# Course Images Management Guide

## Overview
This guide explains how to manage course images, including storage options, URL formats, and integration with the course API.

---

## Image Sources & Options

### Option 1: Unsplash (Free Stock Photos) ✅ **Currently Used**
- **Source**: https://unsplash.com
- **Cost**: Free
- **Quality**: High
- **URLs**: https://images.unsplash.com/photo-[ID]?w=500&h=300&fit=crop

### Option 2: AWS S3 (Recommended for Production)
```
https://your-bucket.s3.amazonaws.com/courses/physics/image1.jpg
```

### Option 3: Cloudinary (Image CDN)
```
https://res.cloudinary.com/your-account/image/upload/w_500,h_300,c_crop/course-physics.jpg
```

### Option 4: Firebase Storage
```
https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/courses%2Fphysics.jpg?alt=media
```

---

## Current Course Image URLs

All course images are stored in `COURSE_IMAGES.js` file with the following structure:

```javascript
export const courseImages = {
  physics12JEE: [
    "https://images.unsplash.com/photo-[ID]?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-[ID]?w=500&h=300&fit=crop"
  ],
  biology12NEET: [
    "https://images.unsplash.com/photo-[ID]?w=500&h=300&fit=crop"
  ]
};
```

---

## Adding Course Images via API

### Method 1: Single Image
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "title": "Physics for JEE",
    "subject": "Physics",
    "class": "12",
    "price": 5999,
    "pictures": [
      "https://images.unsplash.com/photo-532012197267-da84d127e765?w=500&h=300&fit=crop"
    ]
  }'
```

### Method 2: Multiple Images (Gallery)
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "title": "Physics for JEE",
    "subject": "Physics",
    "class": "12",
    "price": 5999,
    "pictures": [
      "https://images.unsplash.com/photo-532012197267-da84d127e765?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-543269865-cbdf26effbbb?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-516321318423-f06a6b1ef94b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-507842217343-583f20270319?w=500&h=300&fit=crop"
    ]
  }'
```

### Response
```json
{
  "message": "Course created",
  "course": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Physics for JEE",
    "subject": "Physics",
    "class": "12",
    "price": 5999,
    "pictures": [
      "https://images.unsplash.com/photo-532012197267-da84d127e765?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-543269865-cbdf26effbbb?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-516321318423-f06a6b1ef94b?w=500&h=300&fit=crop"
    ]
  }
}
```

---

## Image URL Formats

### Unsplash Format
```
https://images.unsplash.com/photo-[PHOTO_ID]?w=[WIDTH]&h=[HEIGHT]&fit=[FIT_MODE]
```

| Parameter | Values | Example |
|-----------|--------|---------|
| `w` | width in pixels | w=500 |
| `h` | height in pixels | h=300 |
| `fit` | crop, max, fill, scale | fit=crop |
| `q` | quality (1-100) | q=80 |

### Complete Example
```
https://images.unsplash.com/photo-532012197267-da84d127e765?
w=500&h=300&fit=crop&q=80
```

---

## Course Image Categories

### Class 10
- `science10` - Science courses
- `math10` - Mathematics courses
- `english10` - English courses
- `social10` - Social Studies
- `commerce10` - Commerce courses

### Class 11
- `physics11` - Physics
- `chemistry11` - Chemistry
- `biology11` - Biology
- `math11` - Mathematics
- `accountancy11` - Accountancy
- `business11` - Business Studies
- `economics11` - Economics
- `history11` - History
- `geography11` - Geography
- `polsci11` - Political Science

### Class 12
- `physics12JEE` - Physics (JEE)
- `physics12NEET` - Physics (NEET)
- `chemistry12` - Chemistry
- `biology12NEET` - Biology (NEET)
- `math12JEE` - Mathematics (JEE)
- `accountancy12` - Accountancy
- `business12` - Business Studies
- `economics12` - Economics
- `history12` - History
- `polsci12UPSC` - Political Science (UPSC)
- `geography12` - Geography
- `sociology12` - Sociology

### Competitive Exams
- `gate` - GATE Preparation
- `cat` - CAT Preparation
- `upsc` - UPSC Preparation

---

## Frontend Display Examples

### React Gallery Component
```jsx
import { useState } from 'react';

function CourseGallery({ pictures = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!pictures || pictures.length === 0) {
    return <div className="no-image">No images available</div>;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="course-gallery">
      <div className="main-image">
        <img src={pictures[currentIndex]} alt="Course" />
        {pictures.length > 1 && (
          <>
            <button className="prev" onClick={goToPrevious}>❮</button>
            <button className="next" onClick={goToNext}>❯</button>
            <span className="image-counter">
              {currentIndex + 1} / {pictures.length}
            </span>
          </>
        )}
      </div>

      {pictures.length > 1 && (
        <div className="thumbnail-gallery">
          {pictures.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt="Thumbnail"
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseGallery;
```

### CSS Styling
```css
.course-gallery {
  width: 100%;
  max-width: 600px;
}

.main-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 4px;
  transition: background 0.3s;
}

.prev:hover, .next:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev { left: 10px; }
.next { right: 10px; }

.image-counter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.thumbnail-gallery {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #007bff;
}

.thumbnail:hover {
  opacity: 0.8;
}
```

### Vue.js Component
```vue
<template>
  <div class="course-gallery" v-if="pictures && pictures.length > 0">
    <div class="main-image">
      <img :src="pictures[currentIndex]" alt="Course image" />
      <template v-if="pictures.length > 1">
        <button class="prev" @click="previousImage">❮</button>
        <button class="next" @click="nextImage">❯</button>
        <span class="image-counter">{{ currentIndex + 1 }} / {{ pictures.length }}</span>
      </template>
    </div>

    <div class="thumbnail-gallery" v-if="pictures.length > 1">
      <img
        v-for="(pic, index) in pictures"
        :key="index"
        :src="pic"
        :class="['thumbnail', { active: index === currentIndex }]"
        @click="currentIndex = index"
      />
    </div>
  </div>
  <div v-else class="no-image">No images available</div>
</template>

<script>
export default {
  props: {
    pictures: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.pictures.length;
    },
    previousImage() {
      this.currentIndex = (this.currentIndex - 1 + this.pictures.length) % this.pictures.length;
    }
  }
};
</script>
```

---

## Uploading Your Own Images

### Step 1: Choose a Service

#### Option A: AWS S3
```javascript
// Install: npm install aws-sdk

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const uploadToS3 = (file, courseId) => {
  const params = {
    Bucket: 'your-bucket-name',
    Key: `courses/${courseId}/${file.name}`,
    Body: file
  };
  
  return s3.upload(params).promise();
};
```

#### Option B: Cloudinary
```javascript
// Install: npm install cloudinary

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (file) => {
  return cloudinary.uploader.upload(file.path, {
    folder: 'espa-courses',
    width: 500,
    height: 300,
    crop: 'fill'
  });
};
```

### Step 2: Get Upload URL
```bash
# Example response from upload service
{
  "secure_url": "https://your-cdn.com/courses/physics/image1.jpg",
  "public_id": "espa-courses/physics/image1"
}
```

### Step 3: Save to Course
```bash
curl -X PUT 'http://localhost:5001/api/courses/[COURSE_ID]' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "pictures": [
      "https://your-cdn.com/courses/physics/image1.jpg",
      "https://your-cdn.com/courses/physics/image2.jpg"
    ]
  }'
```

---

## Best Practices

✅ **Image Optimization**
- Use 500x300px for thumbnails
- Use 1200x600px for hero images
- Compress images to <100KB
- Use WebP format when possible

✅ **Multiple Formats**
- Store 2-4 images per course
- First image as thumbnail
- Include course in action photos
- Show course materials/resources

✅ **CDN Usage**
- Always use CDN URLs
- Enable caching headers
- Use responsive image sizes
- Implement lazy loading

✅ **Accessibility**
- Add alt text descriptions
- Ensure adequate contrast
- Use descriptive filenames
- Provide text alternatives

---

## Image URLs Reference

### Unsplash Photo IDs Used
| Category | Photo IDs | URL |
|----------|-----------|-----|
| Physics | 532012197267-da84d127e765 | science photos |
| Chemistry | 576175192918-06d5d39f0e38 | lab photos |
| Biology | 576088160562-40f694ba6b22 | nature/biology |
| Math | 596524496916-bc4ee5541481 | patterns/math |
| History | 507842217343-583f20270319 | vintage/books |
| Geography | 526778548025-fa2f459cd5c1 | maps/landscapes |
| Business | 552664730-d307ca884978 | office/business |

---

## Summary

**Current Status**: Using Unsplash (Free)
**Images Per Course**: 1-4 images
**Format**: JPEG with responsive sizing
**CDN**: Unsplash CDN
**Storage Location**: `COURSE_IMAGES.js` file

**To Switch Services**: Update image URLs in `COURSE_IMAGES.js` and database courses
