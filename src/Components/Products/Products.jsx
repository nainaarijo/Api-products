import {
    Box,
    Card,
    CircularProgress,
    Divider,
    Grid,
    Snackbar,
    SnackbarContent,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../Products/Product.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [cartList, setCartList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    console.log(isLoading, "isLoading");

    const cartHandler = (product) => {
        const isExist = cartList.find((cart) => cart.id === product.id);

        if (!isExist) {
            setCartList((prev) => [...prev, product]);
        } else {
            setOpenAlert(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
    };

    const searchHandler = (event) => {
        if (event?.target?.value === "") {
            return;
        }
        const filteredArr = products?.filter((product) =>
            product?.title.toLowerCase().includes(event?.target?.value.toLowerCase())
        );
        setProducts(filteredArr);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("https://fakestoreapi.com/products");
                console.log(response, "products");

                if (response.status === 200) {
                    setIsLoading(false);
                    setProducts(response?.data);
                } else {
                    setIsLoading(true);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Box className="container mt-3">
                <TextField
                    onChange={searchHandler}
                    size="small"
                    placeholder="Search items..."
                />
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: "#bb2124",
                    }}
                    message={
                        <Box className="d-flex justify-content-between">
                            <span id="client-snackbar">Product already in cart list</span>
                            <CloseIcon sx={{ float: "right" }} onClick={handleClose} />
                        </Box>
                    }
                />
            </Snackbar>

            {isLoading ? (
                <Box className="text-center mt-5">
                    <CircularProgress color="inherit" />
                </Box>
            ) : (
                <Grid container className="container mt-3">
                    {products?.map((product, index) => {
                        return (
                            <Grid item xs={12} md={3} mb={3} key={index}>
                                <Card
                                    sx={{ padding: "20px", cursor: "pointer", width: "275px" }}
                                >
                                    <Box>
                                        <Box className="text-center">
                                            <img
                                                style={{ maxHeight: "140px", minHeight: "140px" }}
                                                className="product-img"
                                                width={100}
                                                src={product.image}
                                                alt={product.title}
                                            />
                                        </Box>
                                        <Tooltip title={product?.title} placement="top">
                                            <Typography variant="h6" className="mt-3">
                                                {product?.title?.length >= 22
                                                    ? `${product?.title.slice(0, 18)}...`
                                                    : product?.title}
                                            </Typography>
                                        </Tooltip>
                                        <Divider sx={{ borderColor: "#333" }} variant="fullwidth" />
                                        <Box className="d-flex justify-content-between mt-2">
                                            <Tooltip title="Product Details">
                                                <VisibilityIcon
                                                    onClick={() => {
                                                        navigate(`/product-details/${product?.id}`);
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Add to Favorite">
                                                <FavoriteIcon />
                                            </Tooltip>
                                            <Tooltip title="Add to Cart">
                                                <AddShoppingCartIcon
                                                    onClick={() => cartHandler(product)}
                                                />
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </>
    );
};

export default Products;
