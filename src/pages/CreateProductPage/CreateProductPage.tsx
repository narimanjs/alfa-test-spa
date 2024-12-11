import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  addProduct,
  setFilter,
  setSelectedCategory,
} from "@features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import styles from "./CreateProductPage.module.scss";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
} from "@mui/material";

const categories = ["Электроника", "Одежда", "Книги", "Аксессуары"];

const CreateProductPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    price: false,
    category: false,
  });

  const handleSubmit = () => {
    // Валидация полей
    const newErrors = {
      title: !title.trim(),
      description: !description.trim(),
      price: !price.trim() || isNaN(Number(price)) || Number(price) <= 0,
      category: !category.trim(),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(error => error);
    if (hasError) return;

    // Создание нового продукта
    const newProduct = {
      id: Date.now(), // Уникальный идентификатор
      title,
      description,
      image: image || "https://via.placeholder.com/300", // Запасное изображение
      price: parseFloat(price),
      category,
      isLiked: false,
    };

    dispatch(addProduct(newProduct));

    console.log("Добавленный продукт:", newProduct);

    dispatch(setSelectedCategory(null));
    dispatch(setFilter("all"));

    navigate("/products");
  };

  return (
    <Box className={styles.container}>
      <Typography
        variant='h4'
        className={styles.header}
      >
        Создать продукт
      </Typography>
      <Box className={styles.form}>
        <TextField
          label='Название продукта'
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={errors.title}
          helperText={errors.title ? "Название обязательно" : ""}
          fullWidth
          margin='normal'
          autoComplete='off'
        />
        <TextField
          label='Описание'
          value={description}
          onChange={e => setDescription(e.target.value)}
          error={errors.description}
          helperText={errors.description ? "Описание обязательно" : ""}
          fullWidth
          multiline
          rows={4}
          margin='normal'
          autoComplete='off'
        />
        <TextField
          label='Цена'
          value={price}
          onChange={e => setPrice(e.target.value)}
          error={errors.price}
          helperText={errors.price ? "Введите корректную цену" : ""}
          fullWidth
          margin='normal'
          autoComplete='off'
        />
        <Select
          value={category}
          onChange={e => setCategory(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value=''>Выберите категорию</MenuItem>
          {categories.map(cat => (
            <MenuItem
              key={cat}
              value={cat}
            >
              {cat}
            </MenuItem>
          ))}
        </Select>
        {errors.category && (
          <Typography
            color='error'
            variant='body2'
          >
            Категория обязательна
          </Typography>
        )}
        <TextField
          label='URL изображения (опционально)'
          value={image}
          onChange={e => setImage(e.target.value)}
          fullWidth
          margin='normal'
          autoComplete='off'
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Создать
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProductPage;
