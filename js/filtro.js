document.addEventListener('DOMContentLoaded', function () {

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	var firstCategoryItem = document.querySelector('.category_list .category_item[category="all"]');
	firstCategoryItem.classList.add('ct_item-active');

	// FILTRANDO PRODUCTOS  ============================================

	var categoryItems = document.querySelectorAll('.category_item');
	categoryItems.forEach(function (item) {
		item.addEventListener('click', function () {
			var catProduct = this.getAttribute('category');
			console.log(catProduct);

			// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
			categoryItems.forEach(function (item) {
				item.classList.remove('ct_item-active');
			});
			this.classList.add('ct_item-active');

			// OCULTANDO PRODUCTOS =========================
			var items = document.querySelectorAll('.item');
			items.forEach(function (item) {
				item.style.transform = 'scale(0)';
			});

			function hideProduct() {
				items.forEach(function (item) {
					item.style.display = 'none';
				});
			}
			setTimeout(hideProduct, 400);

			// MOSTRANDO PRODUCTOS =========================
			function showProduct() {
				var filteredItems = document.querySelectorAll('.item[category="' + catProduct + '"]');
				filteredItems.forEach(function (item) {
					item.style.display = 'block';
					item.style.transform = 'scale(1)';
				});
			}
			setTimeout(showProduct, 400);
		});
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================

	var allCategoryItem = document.querySelector('.category_item[category="all"]');
	allCategoryItem.addEventListener('click', function () {
		function showAll() {
			var items = document.querySelectorAll('.item');
			items.forEach(function (item) {
				item.style.display = 'block';
				item.style.transform = 'scale(1)';
			});
		}
		setTimeout(showAll, 400);
	});
});
