import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import styles from "./ProductDetailsPage.module.scss";
import { Button } from "@mui/material";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === Number(id))
  );

  if (!product) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Продукт не найден!</h2>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate("/products")}
          className={styles.backButton}
        >
          Вернуться к списку
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.category}>Категория: {product.category}</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant='contained'
          onClick={() => navigate("/products")}
          className={styles.backButton}
        >
          Назад к списку
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate(`/products/${id}/edit`)}
          className={styles.editButton}
        >
          Редактировать продукт
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
