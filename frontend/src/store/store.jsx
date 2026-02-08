import {createContext,useEffect , useState, useCallback }  from 'react';

// creando el contexto , que va a envolver a la app y proveer los datos a los componentes que lo necesiten
export const StoreContext = createContext();

 const fallbackImg = "/assets/fallbackImg/blackpolo.png"; 
 
export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [unicImageId, setUnicImageId] = useState(null);
  const [image  , setImage]=useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });
  const [user, setUser] = useState(null); 
  const [checkoutData, setCheckoutData] = useState(null); 
 
    // ================= 🔐 NUEVO (AUTH) =================
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem('token')
  );

  const login = (token, userData = null) => {
    localStorage.setItem('token', token);
    setIsAuth(true);
    if (userData) setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    setUser(null);
    setCart([]);
  };

    // ================= PRODUCTOS =================

  useEffect(() => {
    /* fetch('/product.json') */
    fetch('http://localhost:5000/api/products')
      .then((resp) => { 
        if (!resp.ok) {
          throw new Error(`Error HTTP: ${resp.status}`);
        }
         return resp.json()
        })
       
       
        .then((data)=>{ setProducts(data)})
        .catch((error)=> console.error("Error Loading JSON Data ",error))
      },[]);

    // Nota: la inicialización del carrito desde localStorage
    // ahora se realiza en el lazy initializer de useState para
    // evitar sobrescribir el storage cuando el componente monta.

    // Persistir carrito en localStorage
    useEffect(() => {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Error saving cart to localStorage', e);
      }
    }, [cart]);

    // Utilidades del carrito
    const addToCart = (item) => {
      setCart((prev) => {
        const found = prev.find((p) =>(p.id || p.id_product)  === item.id);
        if (found) {
          return prev.map((p) => ((p.id || p.id_product) === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p));
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    };

    const removeFromCart = (id) => {
      setCart((prev) => prev.filter((p) => (p.id || p.id_product) !== id));
    };

    const incrementQuantity = (id) => {
      setCart((prev) => prev.map((p) => ((p.id || p.id_product) === id ? { ...p, quantity: (p.quantity || 1) + 1 } : p)));
    };

    const decrementQuantity = (id) => {
      setCart((prev) =>
        prev
          .map((p) => ((p.id || p.id_product) === id ? { ...p, quantity: (p.quantity || 1) - 1 } : p))
          .filter((p) => (p.quantity || 0) > 0)
      );
    };

  

    const clearCart = () => setCart([]);

    // Nota: la lógica de mostrar mensajes de pago y limpiar inputs
    // se gestiona en los componentes (p.ej. `Cart.jsx`) para que solo
    // se active cuando el usuario pulse el botón de pago.

    const getCartTotal = useCallback((cartParam = cart) => {
      return cartParam.reduce((s, it) => s + (Number(it.price) || 0) * (it.quantity || 1), 0).toFixed(2);
    }, [cart]);

    // Actualizar checkoutData siempre que cambie el carrito
    useEffect(() => {
      setCheckoutData(getCartTotal());
    }, [cart, getCartTotal]);
      

  return (
    <StoreContext.Provider value={{
      products,
      setProducts,
      unicImageId,
      setUnicImageId,
      fallbackImg,
      image,
      setImage,
      cart,
      setCart,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      getCartTotal,
      user,
      setUser,
      checkoutData,
      setCheckoutData,
      isAuth,
      login,
      logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
