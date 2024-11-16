
export const FetchProducts = async () => {
    try {
      const response = await fetch("db.json");
      
  
      // Eğer hata yoksa veriyi dönüştür
      if (!response.ok) {
        throw new Error("Yanlış URL");
      }
  
      return await response.json();
    } catch (error) {
      console.log(`Hataa: ${error}`);
      return [];
    }
  };
  

  export const renderProducst = (products,addToCartCallBack) =>{

    const productList = document.querySelector("#product-list");

    productList.innerHTML = products
    .map(
      (product) =>
        
        // Bu fonksiyona parametre olarak verilen datayı dön ve her data için bir Html oluştur.
        `
     <div class="product">
          <img
            src="${product.image}"
            alt="product-img"
            class="product-img"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a class="add-to-cart"data-id='${product.id}' >Add to cart</a>
          </div>
        </div>
`
    )
    .join("");

   const addToCartButtons = document.getElementsByClassName("add-to-cart")
   
   for (let i=0;i<addToCartButtons.length;i++){
    
    const addToCartButton =addToCartButtons[i];

    addToCartButton.addEventListener('click',addToCartCallBack)
    
    
   }

  };