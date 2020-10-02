
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "120px";
    document.getElementById("main").style.marginLeft = "120px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


const tabitems = document.querySelectorAll(".tab-item");
const tabContentitems = document.querySelectorAll(".tab-content-item");
function selectItem(e){
    removeBorder();
    removeShow();
 this.classList.add("tab-border");
  const tabContentitems = document.querySelector(`#${this.id}-content`);
  tabContentitems.classList.add("show");
}
function removeBorder(){
    tabitems.forEach(item =>item.classList.remove("tab-border"));
}
function removeShow(){
    tabContentitems.forEach(item =>item.classList.remove("show"));
}
tabitems.forEach(item => item.addEventListener
    ("click", selectItem))



const secondtabitems = document.querySelectorAll(".second-tab-item");

const secondtabContentitems = document.querySelectorAll(".second-tab-content-item");

function secondselectItem(e){
    secondremoveBorder();
    secondremoveShow();
 this.classList.add("second-tab-border");
  const secondtabContentitems = document.querySelector(`#${this.id}-content`);
  secondtabContentitems.classList.add("second-show");
}
function secondremoveBorder(){
    secondtabitems.forEach(item =>item.classList.remove("second-tab-border"));
}
function secondremoveShow(){
    secondtabContentitems.forEach(item =>item.classList.remove("second-show"));
}
secondtabitems.forEach(item => item.addEventListener
    ("click", secondselectItem));


const cartbtn = document.querySelector('.cart-btn');
const cartitems = document.querySelector(".cart-items");
const productsDOM = document.querySelector(".product-center");
const closebtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartoverlay = document.querySelector(".cart-overlay");
const carttotal = document.querySelector(".cart-total");

const  cartcontent = document.querySelector(".cart-content");


let cart = []; 
  
let buttonsDOM  = [];
  
class Products{ 
  async getproducts(){
    try {
      let result = await fetch
      ("products.json");
      let data =  await result.json();
      
      let products  = data.items;
  products = products.map(item => {
        const {title, price} = item.fields;
        const {id} = item.sys;
        const  image = item.fields.image.fields.file.url;
        return{title, price, id, image};
  }) ;
  return products;
    } catch (error) {
      // console.log(error);
        }
  }

}

class UI{
  displayproducts(products){
    // console.log(products);
    let result = "";
      products.forEach(product => {
          result +=`   <article class="product">
          <div class="img-container">
              <img src="${product.image}" alt="" class="product-img">
              <button class="bag-btn" data-id=${product.id}>add to cart</button>
          </div>
          <h3>${product.title}</h3>
          <h4>${product.price}</h4>
        </article `
      });
 productsDOM.innerHTML = result;

  }
  getbagbuttons(){
    const buttons  = [...document.querySelectorAll (".bag-btn")]; 
      // console.log(buttons);
      buttonsDOM = buttons;
      buttons.forEach(button => {
          let id = button.dataset.id;
          // console.log(id);
          let incart = cart.find(item => item.id === id);
          if (incart){
            button.innerHTML  = "in cart";
            button.disabled  = true;
          } else{
            button.addEventListener("click", event =>{
              // console.log(event);
              event.target.innerText = "in cart";
              event.target.disabled = true;

              // get product from products
              let cartitem = {...Storage.getproducts(id), amount:1};
             
              // console.log(cartitem);
              //add product from cart
              cart = [... cart, cartitem];
// console.log(cart);
              // save cart values 
              Storage.savecart(cart);
              //set cart
               this.setcartvalues(cart);
              // display cart item
              this.addcartitem(cartitem);
              // show the cart
              // this.showcart();          this wil  display cart hen bag button is click when comment out it will not display it when button is click
            })
          }
          
      })
        
}
setcartvalues(cart){
  let temptotal = 0;
  let itemtotal  = 0;
  cart.map(item =>{
      temptotal += item.price * item.amount;
      itemtotal += item.amount;
  });
  carttotal.innerText = parseFloat(temptotal.toFixed(2));
  cartitems.innerText = itemtotal;
  cartitems.innerText = itemtotal;
  // console.log(carttotal, cartitems);
}
addcartitem(item){
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `<img src=${item.image} alt="" class="product-img">
  <div>
      <h4>${item.title}</h4>
      <h5>$${item.price}</h5>
      <span class="remove-item" data-id=${item.id}>remove</span>
  </div>
  <div>
      <i class="fa fa-chevron-up" data-id=${item.id}></i>
      <p class="item-amount">${item.amount}</p>
      <i class="fa fa-chevron-down" data-id=${item.id}></i>
  </div>`;
  cartcontent.appendChild(div);

}
 
showcart(){
  cartoverlay.classList.add("transparentbcg");
  cartDom.classList.add("showcart");
}
setupApp(){
  cart = Storage.getcart();
  this.setcartvalues(cart);  
  this.populatecart(cart);
  cartbtn.addEventListener("click", this.showcart);
  closebtn.addEventListener("click", this.hidecart); 
}
populatecart(cart){
  cart.forEach(item => this.addcartitem(item));
}
hidecart(){
  cartoverlay.classList.remove("transparentbcg");
  cartDom.classList.remove("showcart");
}
cartlogic(){
  // clear cart button
  clearCartBtn.addEventListener("click", () => {
      this.clearCart();
  });
  // cart functionality
  cartcontent.addEventListener("click", event =>{
   
     if(event.target.classList.contains("remove-item")){
         let removeitem = event.target;
         let id =  removeitem.dataset.id;
         cartcontent.removeChild(removeitem.parentElement.parentElement);
         this.removeitem(id);
     }  else if(event.target.classList.contains("fa-plus-square-o")){
         let addAmount = event.target;
         let id = addAmount.dataset.id;
      //    console.log(addAmount);
      let tempitem = cart.find(item => item.id ===id);
      tempitem.amount = tempitem.amount + 1;
      Storage.savecart(cart);
      this.setcartvalues(cart);
      addAmount.nextElementSibling.innerText =
      tempitem.amount; 
     }
      else if(event.target.classList.contains("fa-minus-square")){
      let lowerAmount =  event.target;
      let id = lowerAmount.dataset.id;
      // console.log(lowerAmount)
      let tempitem = cart.find(item => item.id ===id);
      tempitem.amount = tempitem.amount - 1;
      if( tempitem.amount  > 0){
          Storage.savecart(cart);
          this.setcartvalues(cart);
          lowerAmount.previousElementSibling.innerText =
          tempitem.amount; 
      }
      else{
          cartcontent.removeChild(lowerAmount.parentElement.parentElement)
          this.removeitem(id)
      }
     }
  });

}
clearCart(){
  let cartitems = cart.map(item => item.id);

  cartitems.forEach(id  =>this.removeitem(id));
  while(cartcontent.children.length>0){
      cartcontent.removeChild(cartcontent.children[0]);
  }
  this.hidecart();
  
}
removeitem(id){
  cart  = cart.filter(item  => item.id  !==id );
  this.setcartvalues(cart);
  Storage.savecart(cart);
  let button = this.getsinglebutton(id);
  button.disabled = false;
  button.innerHTML = `<i class = "fa fa-shopping-cart"></i>add to cart`;
  
 
}
getsinglebutton(id){
  return buttonsDOM.find(button => button.dataset.id === id); 
}

};

class Storage{
  static  saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getproducts(id){
    let products  = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id ); 
}
static savecart(cart){
  localStorage.setItem("cart", JSON.stringify(cart ));
}
static getcart(){
  return localStorage.getItem("cart")?JSON.parse(localStorage.getItem('cart')):[];
}
};

document.addEventListener("DOMContentLoaded",() =>{
   
      const ui = new UI();
      const products = new Products();

      ui.setupApp(); 

      products.getproducts()
      .then(products =>{

    // ui.displayproducts(products);
    Storage.saveProducts(products);
   }).then(()=>{ 
    ui.getbagbuttons();
    ui.cartlogic();
   })
});
