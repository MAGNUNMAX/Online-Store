import React from "react";
import '../CSS/Clothing.css';

function Clothing(){
    return(
        <div className="clothing-component">

            <h2 className="clothing-title text-white display-2">Clothing Component</h2>
            <p className="clothing-description text-danger fw-bold "><h2>This is the Clothing page. It is under construction.</h2></p>
            <img className="clothing-image w-25 d-block mx-auto" src="img/underConstruct.png" alt="under construction" />

        </div>
    )
}

export default Clothing;