
"use client";

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import styles from './AdBanner.module.css';

interface AdBannerProps {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  onEdit: (id: number) => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ id, title, description, cta, image, background, onEdit }) => {
  return (
    <Card sx={{ background, marginBottom: '20px' }}>
      <CardMedia
        component="img"
        alt={title}
        image={image}
        className={styles.bannerImage} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button size="small" variant="contained" color="primary" sx={{ marginTop: 1 }}>
          {cta}
        </Button>
        <Button size="small" variant="outlined" color="secondary" sx={{ marginTop: 1, marginLeft: 1 }} onClick={() => onEdit(id)}>
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
