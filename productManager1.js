//Modificacion de primer entregable, Trabajando con FileSystem 

const fs = require('fs');

class ProductManager {
    constructor(fileName){
        this.fileName = fileName;
        if(fs.existsSync(fileName)){
             // Si el archivo existe, intenta leerlo y analizar su contenido
            try{
                let productos = fs.readFileSync(fileName, 'utf-8');
                this.productos = JSON.parse(productos);
            }catch(error){
                 // Si hay un error al leer o analizar el archivo, se establece un arreglo vacío
                this.productos = [];
            }
        }else{
            // Si el archivo no existe, se inicializa el array vacio.
            this.productos = [];
        }
    }
    
    getProducts() {
        return this.productos;
    }

    async saveFile(data){
        try{
            // Escribo los datos en el archivo como JSON formateado
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify(data, null, '\t')
            );
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    }
    

    async addProductos(producto){
        // Agrega un producto al array de productos y guarda los datos en el archivo.
        this.productos.push(producto);
        const respuesta = await this.saveFile(this.productos)

        if(respuesta){
            console.log('🥳🥳🥳 Producto Creado 🥳🥳🥳');
        }else{
            console.log('😪😪😪 Oh Oh, hubo un error al crear el producto 😪😪😪');
        }
    }

    // Verifico si el codigo es unico en la lista de productos
    isCodeUnique(code){
        return !this.productos.some(producto => producto.code === code)
    }

    // Genero el identificador unico con un valor aleatorio 
    generateUniqueId(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    // Busco un producto por su ID
    getProductById(id){
        const producto = this.productos.find(producto => producto.id === id);
        if(producto){
            return producto;
        }else{
            console.error('😪😪😪 Producto no encontrado😪😪😪 ')
        }
    }
    consultarProductos(){
        console.log(this.productos);
        return this.productos;
    }
}

class Producto {
    constructor(productManager, title, description, price, thumbnail, code, stock) {
        this.productManager = productManager;

        if (this.productManager.isCodeUnique(code)) {
            // Si el código es unico, se crea el objeto de producto y se agrega al administrador
            const producto = {
                id: this.productManager.generateUniqueId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.productManager.addProductos(producto);
        } else {
            console.error("El código del producto ya está en uso.");
        }
    }
}

// Pruebas
// Creo una instancia de ProductManager con un nombre de archivo. 
const productManager = new ProductManager("./products.json");

// Creo el nuevo Porducto
const producto1 = new Producto(productManager, "producto repetido", "Este es un producto repetido", 300, "Sin imagen", "abc123", 10);
const producto2 = new Producto(productManager,  "producto repetido", "Este es un producto repetido", 300, "Sin imagen", "abc123", 10);
const producto3 = new Producto(productManager, "producto repetido", "Este es un producto repetido", 300, "Sin imagen", "a2223", 10);
const producto4 = new Producto(productManager, "producto repetido", "Este es un producto repetido", 300, "Sin imagen", "a125", 10);



console.log(productManager.consultarProductos())

