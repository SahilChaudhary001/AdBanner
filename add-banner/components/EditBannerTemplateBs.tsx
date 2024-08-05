"use client";

import React, { useState, ChangeEvent } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface EditBannerTemplateBsProps {
  banner: {
    id: number;
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
  };
  onSave: (updatedBanner: any) => void;
  onClose: () => void;
}

const EditBannerTemplateBs: React.FC<EditBannerTemplateBsProps> = ({ banner, onSave, onClose }) => {
  const [title, setTitle] = useState(banner.title);
  const [description, setDescription] = useState(banner.description);
  const [cta, setCta] = useState(banner.cta);
  const [image, setImage] = useState(banner.image);
  const [background, setBackground] = useState(banner.background);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      ...banner,
      title,
      description,
      cta,
      image,
      background
    });
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          width: 400,
          p: 3,
          bgcolor: 'background.paper',
          mx: 'auto',
          mt: '10%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2">
          Edit Banner
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="CTA"
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" component="label" fullWidth sx={{ marginTop: 2 }}>
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        {image && <img src={image} alt="Banner" style={{ width: '100%', marginTop: 10 }} />}
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditBannerTemplateBs;
