import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../utils/themeAtom';

// Add styling that responds to theme changes
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 16px rgba(255, 255, 255, 0.1)' 
      : '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const CustomCard = ({ 
  title, 
  description, 
  imageUrl, 
  imageAlt = 'Card image',
  actionText = 'Learn More',
  onActionClick
}) => {
  const mode = useAtomValue(themeAtom);
  
  return (
    <StyledCard>
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={imageAlt}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={onActionClick}
          sx={{
            color: mode === 'dark' ? 'primary.light' : 'primary.main',
          }}
        >
          {actionText}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CustomCard; 