import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import { updateProduct } from "@features/products/productsSlice";
import styles from "./ProductEditPage.module.scss";
import { TextField, Button, Typography, Box } from "@mui/material";

const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === Number(id))
  );

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [image, setImage] = useState(product?.image || "");

  if (!product) {
    return (
      <div className={styles.container}>
        <Typography
          variant='h5'
          color='error'
        >
          Продукт не найден!
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate("/products")}
        >
          Вернуться к списку
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      title,
      description,
      price: parseFloat(price),
      image,
    };

    dispatch(updateProduct(updatedProduct));
    navigate(`/products/${id}`);
  };

  return (
    <Box className={styles.container}>
      <Typography
        variant='h4'
        className={styles.header}
      >
        Редактировать продукт
      </Typography>
      <Box className={styles.form}>
        <TextField
          label='Название продукта'
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Описание'
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin='normal'
        />
        <TextField
          label='Цена'
          value={price}
          onChange={e => setPrice(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='URL изображения'
          value={image}
          onChange={e => setImage(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Box className={styles.buttons}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSave}
            className={styles.saveButton}
          >
            Сохранить
          </Button>
          <Button
            variant='outlined'
            onClick={() => navigate(`/products/${id}`)}
            className={styles.cancelButton}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEditPage;
