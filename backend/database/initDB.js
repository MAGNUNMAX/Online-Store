import pool from './db.js';

export async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id serial NOT NULL,
        id_product integer,
        name character varying(150) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        price numeric(10, 2) NOT NULL,
        stock integer NOT NULL,
        create_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        image_url text COLLATE pg_catalog."default",
        category character varying(100) COLLATE pg_catalog."default",
        CONSTRAINT products_pkey PRIMARY KEY (id),
        CONSTRAINT unique_external_product UNIQUE (id_product)
      );
    `);

    console.log('✅ Tabla creada/verificada');
  } catch (err) {
    console.error('❌ Error creando tabla:', err);
  }
}
