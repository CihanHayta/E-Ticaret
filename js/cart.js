import { calculateCartTotal, getFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./utils.js";

let cart = getFromLocalStorage();



export const addToCart =(event,products) => {
   const productId = parseInt(event.target.dataset.id);

   const product = products.find((product)=> product.id === productId);
   
 if(product){
   const exitingItem = cart.find((item) => item.id === productId);


if(exitingItem){
        // Ürün sepette varsa bunu ekleme miktarını bir arttır.

 exitingItem.quantity++;
}

    else{
      // Sepete eklenecek objeyi oluştur yani dizi
        const cartItem = {

            id: product.id,
            title :product.title,
            price:product.price,
            image :product.image,
            quantity :1,

        };
              // Oluşturulan cartItem ı sepete ekle
        cart.push(cartItem);

        event.target.textContent = "added";

        saveToLocalStorage(cart);

        updateCartIcon(cart);


    }


 }
     
};


const removeFromCart = (event) =>{
  const productID = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);

  saveToLocalStorage(cart);
  renderCartItems();
  displayCartTotal();
  updateCartIcon(cart);

  
};



export const renderCartItems = () =>{

const cartItemsElement = document.querySelector("#cartItems");

cartItemsElement.innerHTML = cart
.map(
  (item) => `

 <div class="cart-item">
           <img
            src="${item.image}"
           
          />
          <!-- Info -->
          <div class="cart-item-info">
            <h2 class="cart-item-title">${item.title}</h2>
            <input
              type="number"
              min="1"
              value=${item.quantity}
              class="cart-item-quantity"
              data-id='${item.id}'
            />
          </div>
          <h2 class="cart-item-price">$${item.price}</h2>
          <button class="remove-from-cart" data-id='${item.id} '>Remove</button>
        </div>
`
)
.join("");

 const removeButtons = document.querySelectorAll(".remove-from-cart");

for (let i = 0 ; i<removeButtons.length;i++){
  const removeButton =removeButtons[i];
   
  removeButton.addEventListener("click", removeFromCart);
  
}
 


const quantityInputs = document.querySelectorAll(".cart-item-quantity");

for (let i = 0; i < quantityInputs.length; i++) {
  const quantityInput = quantityInputs[i];
  
  quantityInput.addEventListener("change", onQuantityChange);
}





};

const onQuantityChange =(event)=>{
  
  const  newQuantity =+event.target.value;
  const productID =+event.target.dataset.id;
 
  if(newQuantity>0){
    const cartItem = cart.find((item)=>item.id === productID);

  

  if(!cartItem) return;

  cartItem.quantity =newQuantity;

  saveToLocalStorage(cart);
  displayCartTotal();
  updateCartIcon(cart);
  };

};


export const displayCartTotal = () => {
  // Toplam fiyat alanına eriş
  const cartTotalElement = document.querySelector("#cartTotal");
  // Sepetteki toplam ürün fiyatını hesapla
  const total = calculateCartTotal(cart);
  // Toplam fiyat kısmını güncelle
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
