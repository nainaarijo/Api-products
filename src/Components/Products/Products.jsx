import React, { useEffect, useState } from 'react'
import { Box, Card, crad, Divider, IconButton, Snackbar, SnackbarContent, Typography } from '@mui/material'
import Product1 from '../../assests/lays.webp'
import Product2 from '../../assests/candi.webp'
import Product3 from '../../assests/haleeb.webp'
import Product4 from '../../assests/pepsi.webp'
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import './Product.css'

const dummyProducts = [
    {
        id: 1,
        img: Product1,
        name: 'Lays',
        price: "60"
    },

    {
        id: 2,
        img: Product2,
        name: 'Candi',
        price: "60"
    },

    {
        id: 3,
        img: Product3,
        name: 'Haleeb',
        price: "60"
    },

    {
        id: 4,
        img: Product4,
        name: 'Pepsi',
        price: "60"
    },
];



const Products = () => {
    const [CartList, setCartList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false)

 const CartHandler = (product) => {
        const isExist = CartList.find((Cart) => Cart.id === product.id);

        if (!isExist) {
            setCartList((prev) => [...prev, product]);

            let strCartList = JSON.stringify(CartList )

            localStorage.setItem('CartList',strCartList );
        } else {
            setOpenAlert(true)
        }

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}

            >
                <SnackbarContent style={{
                    backgroundColor: 'teal',
                }}
                    message={<span id="client-snackbar">Product already in cart list < CloseIcon onClick={handleClose} /> </span>}
                />
            </Snackbar>
            <Box sx={{ display: 'flex', gap: '50px ', marginTop: '70px' }} className='container'>
                {dummyProducts?.map((product, index) => (
                    <Card className='cards' key={index} sx={{ padding: '70px', cursor: 'pointer', width: '270px' }}>
                        <Box>
                            <img className='product-img' width={100} src={product.img} alt={`${product.name}`} />
                            <Typography variant="h5">{product.name}</Typography>
                            <Divider sx={{ borderColor: '#333', marginTop: '10px' }} variant='fullwidth' />
                            <Box className='d-flex justify-content-between mt-5'>
                                <ShareIcon />
                                <FavoriteIcon />
                                <AddShoppingCartIcon onClick={() => (CartHandler(product))} />
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>


        </>

    )
}

export default Products
