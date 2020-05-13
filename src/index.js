
const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(id, products) {
	const arrId = getEachId(id,products);
	const listProudct =  getProducts(arrId);
	const category = getCategory(listProudct);
	const priceTotal =  getPromotion(arrId,category);
	const discountValue = calculationDiscountValue(arrId, priceTotal);
	const discount = calculationDiscount(arrId, discountValue);
	const result = {
		products: listProudct,
		promotion: `${category}`, 
		totalPrice: `${priceTotal}`,
		discountValue: `${discountValue}`,
		discount: `${discount}%`
	}
	return result;

	function getEachId (id,api) {
		let escolhidos= [];
		id.forEach(element => {
			const each = api.filter(value => value.id === element);
			escolhidos.push(...each);
		});
		return escolhidos;
	};

	function getProducts (arrId) {
		let product = [];
		arrId.forEach(element => {
			const {name, category} = element;
			const products = ({name,category}) 
			product.push(products);
		});
		return product;
	};

	function getCategory (list) {
		const cate = list.map(value => value.category);
		const resultCate = cate.reduce((value, item) => {
			if (!value[item]) {
				value[item]= 1;
			} else {
				value[item]++;
			};
			return value;
		}, {});
		const numberCategory = Object.values(resultCate);
		const max = numberCategory.reduce((a,b) => Math.max(a,b));
		let categoryI;
		if (max == 1){
			categoryI = promotions[3];
		} else if (max == 4) {
			categoryI = promotions[0];
		} else {
			categoryI = promotions[max-1];
		}
		
		return categoryI;
	};

	function getPromotion (arrId,category) {
		const promotionEach = arrId.map(value => value.promotions);
		const regularPriceEach = arrId.map(value => value.regularPrice);
		let count = 0;
		const priceTotal = promotionEach.reduce((value, item)=> {
			
			const verifiq = item.reduce ((arr, element) => {
				let values = Object.values(element);
				const verif = values[0].includes(category);
	
				if (verif == true) {
					value += Math.round( values[1] * 100 + Number.EPSILON ) / 100; //Expresão que chega mais perto de um number float
					arr.push(verif);
				}
				return arr;
			}, []);
			if( verifiq == false) {
				value += Math.round( regularPriceEach[count] * 100 + Number.EPSILON ) / 100;
			}
			count++;
			return value;
		}, 0 );
		
		return priceTotal.toFixed(2);
	};

	function calculationRegularPrice(arrId) {
		let soma = 0;
		arrId.forEach(element => {
			let valor = element.regularPrice;
			soma += Math.round( valor * 100 + Number.EPSILON ) / 100; //Expresão que chega mais perto de um number float
		});
		return soma;
	};

	function calculationDiscountValue(arrId, priceTotal) {
		let total = calculationRegularPrice(arrId)
		let discountValue = total - priceTotal;
		return discountValue.toFixed(2);
		
	}
	
	function calculationDiscount(arrId, discountValue) {
		let total = calculationRegularPrice(arrId)
		let discount = Math.round(((discountValue * 100)/total) * 100 + Number.EPSILON ) / 100;
		return discount.toFixed(2);
	}


}

module.exports = { getShoppingCart };
