

async function addProduct(pid, cartId) {
    try {
         // Realiza la solicitud al servidor para obtener el carrito
         const response = await fetch(`/api/carts/${cartId}`);

         if (!response.ok) {
            
             throw new Error('Error en la solicitud al servidor');
         }
         // Convierte el cuerpo de la respuesta en un objeto JSON
         const data = await response.json();


         const cartData = data.payload;

         // Buscar el producto en el carrito por el ID del producto
         const existingProductIndex = cartData.products.find(p => p.product._id.toString() === pid);
         

        if (existingProductIndex) {
            // Si el producto ya existe en el carrito, incrementa la cantidad
            existingProductIndex.quantity += 1;
        } else {
       // Crea un nuevo objeto de producto utilizando el ID del producto
       const addedProduct = {
         product: pid,
           quantity: 1
       };
       
       // Agrega el producto al arreglo "products" del carrito
       await cartData.products.push(addedProduct);
     }

 
         // Realizar una solicitud fetch para actualizar el carrito
         const updateResponse = await fetch(`/api/carts/${cartId}`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(cartData)
         }); 
         if (updateResponse.status === 200) {
            req.logger.info('Producto añadido al carrito', cartData);
         };

         Toastify({
            text: `tu producto ha sido agregado al carrito`,
            gravity: "bottom",
            duration: 3000
        }).showToast();

     
    } catch (error) {
        req.logger.error(error);
    }
  }