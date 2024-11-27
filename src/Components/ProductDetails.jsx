import { Box, CircularProgress, Grid, Typography, Button, Rating } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [ProductDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${param?.product_id}`);
        setProductDetails(response?.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [param?.product_id]);

  return (
    <>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid container spacing={4} sx={{ width: '100%', maxWidth: '900px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '8px' }}>
            {}
            <Grid item xs={12} sm={6} className="text-center">
              <img
                src={ProductDetails?.image}
                alt={ProductDetails?.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Grid>

            {}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976D2', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Category: {ProductDetails?.category}
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: '700', color: '#333', marginTop: '1rem' }}>
                {ProductDetails?.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <Rating value={ProductDetails?.rating?.rate || 0} readOnly />
                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '0.5rem' }}>
                  {ProductDetails?.rating?.count} reviews
                </Typography>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D32F2F', marginTop: '1rem' }}>
                ${ProductDetails?.price}
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '1rem', textAlign: 'justify', color: '#555' }}>
                {ProductDetails?.description}
              </Typography>

              <Box sx={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Button variant="contained" color="primary" sx={{ padding: '0.8rem 2rem', fontWeight: 'bold', transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#115293' } }}>
                  Learn More
                </Button>
                <Button variant="outlined" color="secondary" sx={{ padding: '0.8rem 2rem', fontWeight: 'bold', transition: 'border-color 0.3s ease', '&:hover': { borderColor: '#D32F2F', color: '#D32F2F' } }}>
                  Contact Us
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
