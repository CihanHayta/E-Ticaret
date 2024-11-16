import { addToCart, renderCartItems ,displayCartTotal} from "./cart.js";
import { FetchProducts ,renderProducst} from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");


menuIcon.addEventListener('click',() => {
    menu.classList.toggle("open-menu");
   
})


document.addEventListener('DOMContentLoaded',async()=>{

    let cart =getFromLocalStorage();

    if(window.location.pathname.includes('cart.html')){
        console.log('cart sayfası');
        renderCartItems();
        displayCartTotal();
        
    }else{

        const product =  await FetchProducts();

        console.log('anasayfa');
        renderProducst(product,(event) => {
            addToCart(event,product);
        });
    }

    updateCartIcon(cart);

});



 
