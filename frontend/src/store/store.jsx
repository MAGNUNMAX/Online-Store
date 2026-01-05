import {createContext,useEffect , useState }  from 'react';

// creando el contexto , que va a envolver a la app y proveer los datos a los componentes que lo necesiten
export const StoreContext = createContext();

 const fallbackImg = "/assets/fallbackImg/blackpolo.png"; 
 
export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [unicImageId, setUnicImageId] = useState(null);
  const [image  , setImage]=useState(null);
  const [cart, setCart] = useState([]);
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
      

  return (
    <StoreContext.Provider value={{ products, setProducts, unicImageId, setUnicImageId, fallbackImg , image , setImage, cart, setCart , user, setUser, checkoutData, setCheckoutData, isAuth, login, logout, }}>
      {children}
    </StoreContext.Provider>
  );
};
