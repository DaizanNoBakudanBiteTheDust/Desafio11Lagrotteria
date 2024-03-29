// dependencia de los NPM
import {
    promises
} from 'fs'


class cartManager {
    constructor(path) {
        this.path = path;
    }


    // obtencion productos devuelve arreglo vacio si no hay 

    getAll = async () => {
        try {
            const cartProducts = await promises.readFile(this.path, 'utf-8');
            return JSON.parse(cartProducts) || [];
        } catch (error) {
            req.logger.error(error);
            return [];
        }
    }

    //Creo productos

    addProducts = async (producto) => {
        // Obtiene productos
        try {
            const products = await this.getAll();

            const existingProduct = products.find((p) => p.id === producto.id);
            // verifica si existe
            if (existingProduct) {
                req.logger.warn("El carro existe");
                return null;
            }
            // se agrega el producto
            products.push(producto);

            await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return producto;

        } catch (error) {
            req.logger.error(error);
            return null
        }
    }

    // Obtiene por ID

    getProductById = async (idProduct) => {

        const products = await this.getAll();

        const indexProduct = products.findIndex(product => product.id === idProduct);

        if (indexProduct === -1) {
            return req.logger.warn('Producto no encontrado');

        } else {
            return products[indexProduct]
        }


    }

    //Actualiza

    updateProduct = async (idProduct, updatedProduct) => {
        const products = await this.getAll();
        const indexProduct = products.findIndex(product => product.id === idProduct);

        if (indexProduct === -1) {
            req.logger.warn("No existe el producto")
        } else {
            products[indexProduct] = {
                ...products[indexProduct], 
                ...updatedProduct, 
            }

            await promises.writeFile(this.path, JSON.stringify(products, null, 4));

        }

    }


}

export default cartManager