// import { Navigation, Pagination } from 'swiper';
// import * as devFunctions from './modules/functions.js';

// devFunctions.isWebp();

//const swiper = new Swiper();
"use strict";
let cart = document.querySelector('.header__cart');
let cartBtn = document.querySelector('.header__cart-btn');

cartBtn.addEventListener('click', (e) => {
	e.preventDefault();
	e.stopPropagation();
	cart.classList.toggle('invisible');
})
cart.addEventListener('click', (e) => {
	e.stopPropagation();
})
window.addEventListener('click', (e) => {
	e.stopPropagation();
	if (!cart.classList.contains('invisible')) {
		cart.classList.add('invisible');
	}
})

const btns = document.querySelector('.products');
const database = {
	"product": [
		{
			"id": 0,
			"name": "Tomato",
			"image": "http://placekitten.com/g/300/300",
			"cartImage": "http://placekitten.com/g/50/50",
			"price": 300
		},

		{
			"id": 1,
			"name": "Potato",
			"image": "http://placekitten.com/g/300/300",
			"cartImage": "http://placekitten.com/g/50/50",
			"price": 60
		},
		{
			"id": 2,
			"name": "Cucumber",
			"image": "http://placekitten.com/g/300/300",
			"cartImage": "http://placekitten.com/g/50/50",
			"price": 980
		},
		{
			"id": 3,
			"name": "Cherry",
			"image": "http://placekitten.com/g/300/300",
			"cartImage": "http://placekitten.com/g/50/50",
			"price": 360
		},
		{
			"id": 4,
			"name": "Cabbage",
			"image": "http://placekitten.com/g/300/300",
			"cartImage": "http://placekitten.com/g/50/50",
			"price": 34
		},
		{
			"id": 5,
			"name": "Watermelon",
			"image": "http://placekitten.com/g/300/300",
			"cartImage": "http://placekitten.com/g/50/50",
			"price": 80
		}
	]
},
	PRODUCTS = fetchData(),
	userCart = [];


btns.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('buy-btn')) {
		addProduct(evt.target);
	}
})

cart.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('del-btn')) {
		removeProduct(evt.target);
	}
})
function fetchData() {
	let arr = [];
	database.product.forEach(element => arr.push(takeInfo(element)));
	return arr;
}

function takeInfo(element) {
	return {
		id: element.id,
		name: element.name,
		image: element.image,
		cartImage: element.cartImage,
		price: element.price,
		quantity: 0,
		createTemplate: function () {
			return `<div class="products-item" data-id="${this.id}">
					<img src="${this.image}" alt="${this.name}">
					<div class="desc">
						<h3>${this.name}</h3>
						<p>${this.price} &#8381;</p>
						<button class="buy-btn" 
						data-id="${this.id}"
						data-name="${this.name}"
						data-price="${this.price}">КУПИТЬ</button>
					</div>
				</div>`
		}
	}
}

function addProduct(product) {
	let productID = +product.dataset.id;
	let find = userCart.find(element => element.id === productID) //return true if find same parametr in cart or false 
	if (!find) {
		userCart.push({
			id: productID,
			name: product.dataset.name,
			price: product.dataset.price,
			quantity: 1,
			img: PRODUCTS[productID].cartImage
		})
	} else {
		find.quantity++;
	}
	renderCart();
}
function renderProduct() {
	let str = "";
	for (const product of PRODUCTS) {
		str += product.createTemplate();
	}
	btns.insertAdjacentHTML('afterbegin', str);

}

function renderCart() {
	let addedProduct = '';
	for (let item of userCart) {
		addedProduct += `<div class="cart-item" data-id="${item.id}">
	<div class="product-bio">
		<img src="${item.img}" alt="some image">
		<div class="product-desc">
			<p class="product-title">${item.name}</p>
			<p class="product-quantity">${item.quantity}</p>
			<p class="product-single-price">${item.price} &#8381;</p>
		</div>
		<div class="right-block">
			<button class="del-btn" data-id="${item.id}">&times;</button>
		</div>
	</div>
</div>`;
	}
	cart.innerHTML = addedProduct;
}

function removeProduct(product) {
	let productID = +product.dataset.id;
	let find = userCart.find(element => element.id === productID);
	if (find.quantity > 1) {
		find.quantity--;
	} else {
		userCart.splice(userCart.indexOf(find), 1);
	}
	renderCart();
}
renderProduct();