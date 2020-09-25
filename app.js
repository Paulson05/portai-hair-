
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
  }) 
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
          <h4>$  {product.price}</h4>
        </article `
      });
 productsDOM.innerHTML = result;

  }
    
};

class Storage{
  static  saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products));
  }
};

document.addEventListener("DOMContentLoaded",() =>{
   
      const ui = new UI();
      const products = new Products();
      products.getproducts()
      .then(products =>{

    ui.displayproducts(products);
    Storage.saveProducts(products);
   }).then(()=>{ 
    ui.getbagbuttons();

   })
});
