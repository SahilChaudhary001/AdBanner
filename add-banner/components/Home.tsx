"use client";

import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import AdBanner from '../components/AdBanner';
import EditBannerTemplateBs from '../components/EditBannerTemplateBs';
import CreateBannerTemplate from './createBannerTemplate';
import adBanners from '../data/adBanners.json';

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

const Home: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editBannerId, setEditBannerId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const storedBanners = localStorage.getItem('banners');
    if (storedBanners) {
      setBanners(JSON.parse(storedBanners));
    } else {
      setBanners(adBanners);
    }
  }, []);

  const saveBannersToLocalStorage = (banners: Banner[]) => {
    localStorage.setItem('banners', JSON.stringify(banners));
  };

  const handleEdit = (id: number) => {
    setEditBannerId(id);
  };

  const handleSave = (updatedBanner: Banner) => {
    const updatedBanners = banners.map(b => b.id === updatedBanner.id ? updatedBanner : b);
    setBanners(updatedBanners);
    saveBannersToLocalStorage(updatedBanners);
    setEditBannerId(null);
  };

  const handleCreate = (newBanner: Banner) => {
    const updatedBanners = [...banners, newBanner];
    setBanners(updatedBanners);
    saveBannersToLocalStorage(updatedBanners);
    setIsCreating(false);
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 3 }}
        onClick={() => setIsCreating(true)}
      >
        Create New Banner
      </Button>
      <Grid container spacing={3}>
        {banners.map(banner => (
          <Grid item xs={12} sm={6} md={4} key={banner.id}>
            <AdBanner {...banner} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
      {editBannerId !== null && (
        <EditBannerTemplateBs
          banner={banners.find(b => b.id === editBannerId)!}
          onSave={handleSave}
          onClose={() => setEditBannerId(null)}
        />
      )}
      {isCreating && (
        <CreateBannerTemplate
          onSave={handleCreate}
          onClose={() => setIsCreating(false)}
        />
      )}
    </Container>
  );
};

export default Home;
