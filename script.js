const products = [
	{
		id: 1,
		title: "BERSERK",
		price: 1299,
		category: "dark-fantasy",
		pages: 696,
		ageLimit: 16,
		author: "miura kentaro",
		magazine: "null",
		instock: true,		
		discount: "-20%",
		plot: "Guts is born from the corpse of his hanged mother and raised by Gambino, an abusive mercenary captain. After Gambino's death, Guts becomes a wandering warrior whose combat prowess attracts Griffith, leader of the Band of the Hawk. ",
	},
	{
		id: 2,
		title: "SLAM DUNK",
		price: 1500,
		category: "sport",
		pages: 894,
		ageLimit: 12,
		author: "takehiko inoue",
		magazine: "shonen jump",
		instock: true,		
		discount: false,
		plot: "Hanamichi Sakuragi is a high school delinquent and gang leader. He is very unpopular among girls, having been rejected fifty times. In his first year at Shohoku High School, Sakuragi meets Haruko Akagi, the girl of his dreams",
	},
	{
		id: 3,
		title: "VAGABOND",
		price: 2000,
		category: "samurai",
		pages: 728,
		ageLimit: 18,
		author: "takehiko inoue",
		magazine: "morning",
		instock: true,		
		discount: false,
		plot: "Vagabond is a fictionalized reimagining of the life of one of Japan's most renowned swordsmen, the Sword Saint Miyamoto Musashi. The story chronicles the rise of this great warrior and his journey to discovering friendship, life, and himself."
	},	
	{
		id: 4,
		title: "JUJUTSU KAISEN",
		price: 3000,
		category: "magic",
		pages: 682,
		ageLimit: 16,
		author: "takehiko inoue",
		magazine: "shonen jump",
		instock: false,		
		discount: "-40%",
		plot: "Yuji Itadori is an athletic high school student living in Sendai with his grandfather. Due to his dislike of sports, he consistently avoids the school track and field team, despite possessing superhuman strength."
	},
	{
		id: 5,
		title: "ATTACK ON TITAN",
		price: 2199,
		category: "titan",
		pages: 801,
		ageLimit: 18,
		author: "hajime isayama",
		magazine: "shonen jump",
		instock: true,		
		discount: false,
		plot: "According to the manga's premise, 100 years before the events of the manga, humanity was almost completely destroyed by an unknown humanoid race of enormous creatures called titans . "
	},
	{
		id: 6,
		title: "ONE PIECE",
		price: 2399,
		category: "pirates",
		pages: 22000,
		ageLimit: 18,
		author: " Eiichiro Oda",
		magazine: "shonen jump",
		instock: true,		
		discount: "-10%",
		plot: "The fictional universe of One Piece is inhabited by both humans and other intelligent races, such as Skypieans, mermaids, fishmen, and giants."
	},
	{
		id: 7,
		title: "NARUTO",
		price: 1200,
		category: "ninja",
		pages: 15800,
		ageLimit: 12,
		author: "masashi kishimoto",
		magazine: "shonen jump",
		instock: true,		
		discount: "-10%",
		plot: "Twelve years before the events of the manga, a fox demon attacked the Village Hidden in the Leaves ( Konohagakure no Sato , or simply Konoha  ) . To save Konoha, the village's leader, the Fourth Hokage , sacrifices his life and seals the fox demon within his newborn son, Naruto."
	},
	{
		id: 8,
		title: "SAGA OF VINLAND",
		price: 2000,
		category: "viking",
		pages: 1256,
		ageLimit: 18,
		author: "makoto ukimura",
		magazine: "shonen jump",
		instock: true,		
		discount: false,
		plot: "This story begins in the early 11th century, when the Vikings were dominating the northern seas and continuing their raids on England. In an era when an axe was a more powerful weapon than words, a young boy loses his father. As he embarks on the path of a warrior, he seeks an honorable duel with his father's killer."
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