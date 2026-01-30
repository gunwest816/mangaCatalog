const products = [
	{
		id: 1,
		title: "GTA 5",
		price: 1299,
		category: "action-adventure",
		ageLimit: 16,
		author: "Rockstar Games",
		instock: true,		
		discount: "-20%",
		img: "imgs/GTA5.jpg",
		plot:"это масштабная игра в жанре action-adventure с открытым миром от Rockstar Games, действие которой происходит в вымышленном городе Лос-Сантосе, аналоге Лос-Анджелеса, где игроки вживаются в роли трех совершенно разных преступников — Майкла, Франклина и Тревора", 
	},
	{
		id: 2,
		title: "dark souls",
		price: 1500,
		category: "dark fantasy",
		ageLimit: 12,
		author: "from-software",
		instock: true,		
		discount: false,
		img:"imgs/ds1.avif",
		plot:"культовая Action/RPG от FromSoftware, действие которой происходит в мрачном королевстве Лордран, поражённом проклятием нежити, где игрок, будучи Избранным Мертвецом, должен возжечь Пламя, чтобы продлить Эпоху Огня",
	},
	{
		id: 3,
		title: "dark souls 2",
		price: 2000,
		category: "dark fantasy",
		ageLimit: 18,
		author: "from-software",
		instock: true,		
		discount: false,
		img:"imgs/ds2.webp",
		plot: "хардкорная action/RPG от FromSoftware, продолжение первой части, где игрок в роли проклятого нежитью путешественника отправляется в руины королевства Дранглик в поисках исцеления",
	},	
	{
		id: 4,
		title: "dark souls 3",
		price: 3000,
		category: "dark fantasy",
		ageLimit: 16,
		author: "from-software",
		instock: false,		
		discount: "-40%",
		img:"imgs/ds3.webp",
		plot: "хардкорная Action/RPG от FromSoftware, заключительная часть серии, где игроку предстоит затухающий мир Лотрик в роли Негорящего, чтобы найти Повелителей Пепла",
	},
	{
		id: 5,
		title: "kingdom come deliverence 2",
		price: 2199,
		category: "past",
		ageLimit: 18,
		author: " Warhorse Studios",
		instock: true,		
		discount: false,
		img:"imgs/kgd2.jpg",
		plot: "это историческая ролевая игра-продолжение, где игрок снова управляет Индрихом в XV веке в Богемии, погружаясь в гражданскую войну, политические интриги, ища справедливость",
	},
	{
		id: 6,
		title: "Minecraft: Java Edition",
		price: 2399,
		category: "SandBox",
		ageLimit: 7,
		author: "Mojang studios",
		instock: true,		
		discount: "-10%",
		img:"imgs/Minecraft.jpeg",
		plot: "популярная игра-«песочница» с открытым миром из кубических блоков, где игроки добывают ресурсы, строят сооружения и исследуют процедурно генерируемые миры"
	},
	{
		id: 7,
		title: "fortnite",
		price: 1200,
		category: "Battle Royal",
		ageLimit: 12,
		author: "epic games",
		instock: true,		
		discount: "-10%",
		img:"imgs/fortnite.jpg",
		plot: "популярная бесплатная онлайн-игра от Epic Games, известная своим режимом «Королевская битва», где 100 игроков сражаются на острове, собирая ресурсы, оружие и строя укрепления, чтобы остаться единственным выжившим, пока игровая зона сужается"
	},
	{
		id: 8,
		title: "Days Gone",
		price: 2000,
		category: "survivor",
		ageLimit: 18,
		author: "SIE Bend Studio",
		instock: true,		
		discount: false,
		img:"imgs/dg.jpeg",
		plot: "приключенческий экшен в постапокалиптическом открытом мире от третьего лица, где игрок в роли байкера Дикона Сент-Джона ищет смысл жизни",
	},
];
let cart = [];
const cartInfo = document.getElementById("cart-info");
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input")
const categoryFilter = document.getElementById("category-filter")
const minPriceInput = document.getElementById("min-price-input");
const resultsInfo = document.getElementById("results-info");
function loadCart(){
	const savedCart = localStorage.getItem("cart");
	if (savedCart){
		try {
			const parse = JSON.parse(savedCart);
			if (Array.isArray(parse)) {
				cart = parse;
			} else{
				cart = [];
			}
		} catch(error) {
			cart = []
		}
	} else {
		cart = [];
	}
}

function saveCart(){
	localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount(){
	cartInfo.textContent = `products in cart ${cart.length}`;
}
function renderProducts(productsArray){
productsArray.forEach(function(product){
	const card = document.createElement("div");
	card.classList.add("product-card");

	card.innerHTML = `
		<img src="${product.img}" class="product-img">
		<h3>${product.title}</h3>
		<p class="product-category">category: ${product.category}</p>
		<p class="product-plot">plot: ${product.plot}</p>
		<p class = "product-price">price: ${product.price} грн</p>
		<button Class="add-to-card-btn">add to cart</button>
	`;

	const addButton = card.querySelector(".add-to-card-btn");
	addButton.addEventListener("click", function(){
		cart.push(product.id);
		saveCart();
		updateCartCount();
		console.log(`list of products: ${cart}`)
	});

	productsContainer.appendChild(card);
});
}

document.getElementById("del-from-cart").addEventListener("click", function() {
	cart = [];
	saveCart()
	updateCartCount();
	cartInfo.textContent = `products in cart 0`
})

function filterAndRender(){
	const searchText = searchInput.value.toLowerCase().trim();
	const selectedCategory = categoryFilter.value;
	const minPriceValue = minPriceInput.value;
	const filteredProducts = products.filter(function(product){
	const title = product.title.toLowerCase();
	const plot = product.plot.toLowerCase();
	const matchesText =	searchText === "" ||	title.includes(searchText) ||	plot.includes(searchText);
	const matchesCategory =	selectedCategory === "all" ||	product.category === selectedCategory;
	const matchesPrice = minPriceValue === "" || product.price >= Number(minPriceValue);
	return matchesText && matchesCategory && matchesPrice;
	});

	productsContainer.innerHTML = "";
	renderProducts(filteredProducts);
	if (filteredProducts.length > 0) {
		resultsInfo.textContent = `products found: ${filteredProducts.length}`;
	} else {
		resultsInfo.textContent = "No found products were for your request.";
	}
}





loadCart();
updateCartCount();
filterAndRender()
minPriceInput.addEventListener("input", filterAndRender);
searchInput.addEventListener("input", filterAndRender);
categoryFilter.addEventListener("change", filterAndRender)