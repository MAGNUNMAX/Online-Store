  import React from "react";
  import Collections from './Collections';
  
 

  function UpdateMain(){
    


   /*  const fallbackImg = "/assets/fallbackImg/blackpolo.png";  */                  // backup image for broken links



    return(

        <>
        

          <p className="fs-2 text-white mt-5 mb-4">Featured: The Nocturnal Collection</p>
          <main className="row mt-3">

            <Collections />
            {/*  <Collections products={products} fallbackImg={fallbackImg} />  */}           {/* Collections component to show product list */}
          

            <div className="card bg-dark text-white rounded-0 mt-5 mb-5">
            <img src="img/tenis3.png" className="card-img" alt="Sneakers"/>
            <div className="card-img-overlay">
                <h5 className="card-title">"Vanguard Step" Sneakers</h5>
                <p className="card-text"> Light up every step with a futuristic neon design. The perfect blend of comfort and bold style, built to dominate the urban landscape.</p>
                <p className="card-text">Last updated 3 mins ago</p>
            </div>
            </div>

          </main>

           
         


        </>
    )   
  }

  export default UpdateMain;