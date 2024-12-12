import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  fetchProducts,
  fetchCategories,
  toggleLike,
  deleteProduct,
  setFilter,
  setSelectedCategory,
} from "@features/products/productsSlice";
import styles from "./ProductsPage.module.scss";
import {
  Typography,
  IconButton,
  Button,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export const ProductsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: products,
    categories,
    filter,
    selectedCategory,
    loading,
  } = useSelector((state: RootState) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, products.length]);

  const handleFilterChange = (newFilter: "all" | "liked") => {
    dispatch(setFilter(newFilter));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    dispatch(setSelectedCategory(category));
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (filter === "liked" && !product.isLiked) return false;
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
        <Typography
          variant='body1'
          className={styles.loadingText}
        >
          Загрузка продуктов...
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate("/create-product")}
        className={styles.button}
      >
        Создать продукт
      </Button>
      <div className={styles.top}>
        <div className={styles.filterButtons}>
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("all")}
            className={styles.button}
          >
            Все
          </Button>
          <Button
            variant={filter === "liked" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("liked")}
            className={styles.button}
          >
            Избранное
          </Button>
          <Select
            value={selectedCategory || ""}
            onChange={e => handleCategoryChange(e.target.value || null)}
            displayEmpty
            variant='outlined'
            className={styles.categorySelect}
          >
            <MenuItem value=''>Все категории</MenuItem>
            {categories.map(category => (
              <MenuItem
                key={category}
                value={category}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>

        <TextField
          placeholder='Поиск продуктов...'
          autoComplete='off'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={styles.searchField}
          variant='outlined'
          fullWidth
        />
      </div>

      <div className={styles.cardContainer}>
        {currentProducts.map(product => (
          <div
            key={product.id}
            className={styles.card}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.title}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <Typography className={styles.cardTitle}>
                {product.title}
              </Typography>
              <Typography className={styles.cardPrice}>
                ${product.price.toFixed(2)}
              </Typography>
            </div>
            <div className={styles.cardActions}>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  dispatch(toggleLike(product.id));
                }}
              >
                {product.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  dispatch(deleteProduct(product.id));
                }}
                color='error'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        className={styles.pagination}
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color='primary'
      />
    </div>
  );
};

export default ProductsPage;
