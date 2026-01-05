class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Método de validación de email (por ejemplo)
  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}

module.exports = User;



class Product {
  constructor(id, name, description, price, stock) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }

  // Método para verificar si el producto está en stock
  isInStock() {
    return this.stock > 0;
  }
}

module.exports = Product;


class Cart {
  constructor(id, userId, status) {
    this.id = id;
    this.userId = userId;
    this.status = status;
  }

  // Método para cambiar el estado del carrito
  updateStatus(newStatus) {
    this.status = newStatus;
  }
}

module.exports = Cart;
