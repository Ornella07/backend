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
        let productos = await fs.readFileSync(this.fileName, 'utf-8');
        productos = JSON.parse(productos);
        
        const existeElCodigo = productos.find((p) => p.code === product.code)
        if(existeElCodigo){
            console.log('Error, el codigo existe');
        }else{
            const newProduct = {...product, id:productos.length + 1};
            productos.pus(newProduct)

            await this.saveFile(productos)
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




