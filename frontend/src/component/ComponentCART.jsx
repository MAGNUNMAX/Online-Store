import React from "react";
import { useContext  } from "react";
import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom"; 


function ComponentCART(){               //el componente se esta renderizando en APP.jsx para produccion

   /*  const { checkoutData } = useContext(StoreContext); */

    const { cart,setCheckoutData } = useContext(StoreContext);
    const navigate = useNavigate();

    if(cart.length === 0){
        return null;
    };



    return(
        <div className="container text-white">
             {cart.map((item, index) => (
                    <React.Fragment key={index}>

            <div className="row mt-3 border border-sucess">
               
                        <div className="col-auto border border-danger">
                            <img  src={item.image} alt={item.title} className="rounded me-3" width="80" height="80" />  {/* imagen */}
                        </div>
                        <div className="col border border-primary">{item.title}</div>
                        <div className="col-auto border border-info">$ {item.price}</div>
                        <div className="col-auto border border-danger">
                            <button class="btn btn-outline-danger " onClick={()=>item.id}>X</button>
                        </div> {/* boton de cerrar */}
                 
            </div>


            <div className="row border mb-3 border border-danger">

                <div className="col-6 text-success border border-warning d-flex justify-content-center">{/* Item #{item.id} */} 
                    <button className="btn btn-outline-secondary btn-sm btn-primary text-white " onClick={() => navigate("/")}>Continue Shopping</button>
                </div>
                <div className="col-6 border border-primary d-flex justify-content-center">
                     <button className="btn btn-outline-secondary btn-sm btn-success text-white  " onClick={() => { setCheckoutData(cart.reduce((total, item) => total + item.price, 0).toFixed(2)); navigate("/checkout"); }}>CheckOut</button>
                </div>
                {/* <div className="col border border-sucess"></div>
                <div className="col border border-info"></div> */}

            </div>

               </React.Fragment>
                 ))}
        
         </div>

    );

}

export default ComponentCART;