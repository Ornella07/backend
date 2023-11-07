//Modificacion de primer entregable, Trabajando con FileSystem 

const fs = require('fs');

class ProductManager {
    constructor(fileName){
        this.fileName = fileName;
        if(fs.existsSync(fileName)){
            try{
                let products = fs.readFileSync(fileName, 'utf-8');
                this.products = JSON.parse(products)
            }catch(error){
                this.products = [];
            }
        }else{
            this.products = [];
        }
    }
    getProducts(){
        return this.products;
    }
    async saveFile(){
        try{
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify(this.products,null, '\t'),'utf-8');
        }catch(error){
            console.error(`Error ${error}`);
        }
    }
    async addProducts(product){
        const productos = this.products.find((p) => p.code === product.code)

        if(productos){
            console.log(`Error, codigo  existe`);
        }else{
            const newProduct = {...product, id:this.products.length + 1};
            this.products.push(newProduct);

            await this.saveFile();
        }
    }

    async deleteProduct(id){
        const prodSelect = this.products.find((p) => p.id == id);
        if(prodSelect){
            const newProdArr = this.products.filter((p)=> p.id != id);

            this.products = newProdArr;

            await this.saveFile();
        }else{
            console.log('Error');
        }

    }

}

class Products {
    constructor(title, description, price, thumbnail, code, stock){
        (this.title = title),
        (this.description = description),
        (this.price = price),
        (this.thumbnail = thumbnail),
        (this.code = code),
        (this.stock = stock);
    }
}


(async () => {
    const Productos = new ProductManager('./productos.json');

   await Productos.addProducts(new Products("producto repetido", 
    "Este es un producto repetido",
    300,
    "Sin imagen", 
    "abc123",
    10))

    Productos.getProducts();

    await Productos.deleteProduct(1);

    await Productos.addProducts(new Products("producto repetido", 
    "Este es un producto repetido",
    300,
    "Sin imagen", 
    "asd123",
    10));

    await Productos.addProducts(new Products("producto repetido", 
    "Este es un producto repetido",
    300,
    "Sin imagen", 
    "asf123",
    10))


    Productos.getProducts()
})();




console.log(productManager.consultarProductos())

