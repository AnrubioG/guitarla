import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localSorageCart = localStorage.getItem("cart");
    return localSorageCart ? JSON.parse(localSorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      const ubdateCart = [...cart];
      ubdateCart[itemExist].cantidad++;
      setCart(ubdateCart);
    } else {
      item.cantidad = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const incrementarItems = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.cantidad < 10) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const decrementarItems = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id) {
        if (item.cantidad === 1) {
          removeFromCart(id);
        } else {
          return {
            ...item,
            cantidad: item.cantidad - 1,
          };
        }
      }
      return item;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarItems={incrementarItems}
        decrementarItems={decrementarItems}
        clearCart={clearCart}
      ></Header>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) => (
            <Guitar
              key={guitarra.id}
              guitar={guitarra}
              cart={cart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
