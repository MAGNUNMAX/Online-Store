import React, { useEffect, useState } from "react";
import '../CSS/Clothing.css';
import Collections from './Collections';

function Clothing(){
  const fallbackImg = "/assets/fallbackImg/blackpolo.png";
  const [clothing, setClothing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('http://localhost:5000/api/products/clothing')
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching clothing');
        return res.json();
      })
      .then((data) => {
        if (mounted) setClothing(data);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError(err.message || 'Error');
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);

  return(
    <div className="clothing-component">
      <p className="fs-2 text-white mt-5 mb-4">Featured Clothing Collection</p>
      <main className="row mt-3">
        {loading && (
          <div className="d-flex justify-content-center align-items-center my-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando productos...</span>
            </div>
          </div>
        )}
        {error && <div className="text-danger">{error}</div>}
        {!loading && !error && <Collections products={clothing} fallbackImg={fallbackImg} />}
      </main>
    </div>
  )
}

export default Clothing;