export const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Localstorage'dan verileri alan fonksiyon
export const getFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  // Eğer data varsa bunu JSON.parse ile dönüştür ve bunu return et ama eğer data yoksa bunun yerine [] return
  return data ? JSON.parse(data) : [];
};

  export const calculateCartTotal = (cart) =>{
    return cart.reduce((sum, item)=> sum + item.price * item.quantity,0);
  };

 
  export const updateCartIcon = (cart) =>{
    const cartIcon =document.querySelector("#cart-icon");
    const i =document.querySelector(".bxs-shopping-bag");

    let totalQuantity = cart.reduce((sum,item)=>{

      return sum + item.quantity;
    },0);

    i.setAttribute("data-quantity", totalQuantity);


  };
  