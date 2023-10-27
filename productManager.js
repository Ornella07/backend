class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (this.isCodeUnique(code)) {
        const product = {
          id: this.generateUniqueId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        this.products.push(product);
      } else {
        console.error("El código del producto ya está en uso.");
      }
    }
  
    isCodeUnique(code) {
      return !this.products.some(product => product.code === code);
    }
  
    generateUniqueId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado");
      }
    }
  }
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Obtener productos (debería devolver un arreglo vacío [])
  console.log(productManager.getProducts());
  
  // Agregar un producto
  try {
    productManager.addProduct(
      "producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    );
    console.log("Producto agregado con éxito.");
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtener productos nuevamente (debería mostrar el producto recién agregado)
  console.log(productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código (debería arrojar un error)
  try {
    productManager.addProduct(
      "producto repetido",
      "Este es un producto repetido",
      300,
      "Sin imagen",
      "abc123",
      10
    );
    console.log("Producto repetido agregado con éxito.");
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtener un producto por ID (debería devolver el producto agregado previamente)
  try {
    const product = productManager.getProductById(productManager.getProducts()[0].id);
    console.log("Producto encontrado:", product);
  } catch (error) {
    console.error(error.message);
  }