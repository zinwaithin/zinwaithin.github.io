// ========================================
// START LAPTOPS PAGE
// ========================================

$(document).ready(function () {


    // ========================================
    // CHECK LAPTOPS PAGE
    // ========================================

    if ($("#laptopGrid").length === 0) {
        return;
    }


    // ========================================
    // SETTINGS
    // ========================================

    const productsPerPage = 6;


    // ========================================
    // ELEMENTS
    // ========================================

    const $laptopGrid =
        $("#laptopGrid");

    const $products =
        $(".laptop-item");

    const $pagination =
        $("#laptopPagination");

    const $paginationNav =
        $("#laptopsPaginationNav");

    const $resultCount =
        $("#listingResultCount");

    const $emptyState =
        $("#listingEmptyState");

    const $sort =
        $("#sortLaptops");


    // ========================================
    // STATE
    // ========================================

    let currentPage = 1;

    let filteredProducts =
        $products.toArray();


    // ========================================
    // GET SELECTED VALUES
    // ========================================

    function getSelectedValues(selector) {

        const values = [];


        $(selector + ":checked").each(
            function () {

                const value =
                    $(this).val();


                if (!values.includes(value)) {

                    values.push(value);

                }

            }
        );


        return values;

    }


    // ========================================
    // GET PRICE RANGE
    // ========================================

    function getPriceValues() {

        const minPrice =
            Number(
                $("#desktopMinPrice").val()
            ) || 0;


        const maxValue =
            $("#desktopMaxPrice").val();


        const maxPrice =
            maxValue
                ? Number(maxValue)
                : Infinity;


        return {
            minPrice,
            maxPrice
        };

    }


    // ========================================
    // APPLY FILTERS
    // ========================================

    function applyFilters() {

        const selectedBrands =
            getSelectedValues(
                ".filter-brand"
            );


        const selectedUses =
            getSelectedValues(
                ".filter-use"
            );


        const prices =
            getPriceValues();


        filteredProducts =
            $products
                .toArray()
                .filter(
                    function (product) {

                        const $card =
                            $(product).find(
                                ".listing-product-card"
                            );


                        const brand =
                            String(
                                $card.data("brand")
                            ).toLowerCase();


                        const uses =
                            String(
                                $card.data("use")
                            )
                                .toLowerCase()
                                .split(" ");


                        const productMin =
                            Number(
                                $card.data("price-min")
                            );


                        const productMax =
                            Number(
                                $card.data("price-max")
                            );


                        // Brand
                        const brandMatch =
                            selectedBrands.length === 0 ||
                            selectedBrands.includes(
                                brand
                            );


                        // Shop by Use
                        const useMatch =
                            selectedUses.length === 0 ||
                            selectedUses.some(
                                function (use) {

                                    return uses.includes(
                                        use
                                    );

                                }
                            );


                        // Price
                        const priceMatch =
                            productMax >= prices.minPrice &&
                            productMin <= prices.maxPrice;


                        return (
                            brandMatch &&
                            useMatch &&
                            priceMatch
                        );

                    }
                );


        sortProducts();


        currentPage = 1;


        showPage(currentPage);

    }


    // ========================================
    // SORT PRODUCTS
    // ========================================

    function sortProducts() {

        const sortValue =
            $sort.val();


        filteredProducts.sort(
            function (a, b) {

                const $a =
                    $(a).find(
                        ".listing-product-card"
                    );


                const $b =
                    $(b).find(
                        ".listing-product-card"
                    );


                const nameA =
                    String(
                        $a.data("name")
                    ).toLowerCase();


                const nameB =
                    String(
                        $b.data("name")
                    ).toLowerCase();


                const priceMinA =
                    Number(
                        $a.data("price-min")
                    );


                const priceMinB =
                    Number(
                        $b.data("price-min")
                    );


                const priceMaxA =
                    Number(
                        $a.data("price-max")
                    );


                const priceMaxB =
                    Number(
                        $b.data("price-max")
                    );


                const originalA =
                    Number(
                        $(a).data(
                            "original-index"
                        )
                    );


                const originalB =
                    Number(
                        $(b).data(
                            "original-index"
                        )
                    );


                // Recommended
                if (
                    sortValue === "recommended"
                ) {

                    return (
                        originalA -
                        originalB
                    );

                }


                // Price Low to High
                if (
                    sortValue === "price-low"
                ) {

                    return (
                        priceMinA -
                        priceMinB
                    );

                }


                // Price High to Low
                if (
                    sortValue === "price-high"
                ) {

                    return (
                        priceMaxB -
                        priceMaxA
                    );

                }


                // A to Z
                if (
                    sortValue === "name-asc"
                ) {

                    return nameA.localeCompare(
                        nameB
                    );

                }


                // Z to A
                if (
                    sortValue === "name-desc"
                ) {

                    return nameB.localeCompare(
                        nameA
                    );

                }


                return 0;

            }
        );


        // HTML Grid Order
        filteredProducts.forEach(
            function (product) {

                $laptopGrid.append(
                    product
                );

            }
        );

    }


    // ========================================
    // SHOW PAGE
    // ========================================

    function showPage(page) {

        const totalProducts =
            filteredProducts.length;


        const totalPages =
            Math.ceil(
                totalProducts /
                productsPerPage
            );


        // Page Check
        if (page < 1) {
            page = 1;
        }


        if (
            totalPages > 0 &&
            page > totalPages
        ) {

            page = totalPages;

        }


        currentPage = page;


        // Start Index
        const start =
            (currentPage - 1) *
            productsPerPage;


        // End Index
        const end =
            start +
            productsPerPage;


        // Hide All
        $products.hide();


        // Show Current 6
        $(filteredProducts)
            .slice(
                start,
                end
            )
            .show();


        updateResultCount();

        updateEmptyState();

        createPagination();

    }


    // ========================================
    // RESULT COUNT
    // ========================================

    function updateResultCount() {

        const total =
            filteredProducts.length;


        if (total === 1) {

            $resultCount.text(
                "1 laptop"
            );

        } else {

            $resultCount.text(
                total + " laptops"
            );

        }

    }


    // ========================================
    // EMPTY STATE
    // ========================================

    function updateEmptyState() {

        if (
            filteredProducts.length === 0
        ) {

            $emptyState.removeClass(
                "d-none"
            );


            $paginationNav.hide();

        } else {

            $emptyState.addClass(
                "d-none"
            );

        }

    }


    // ========================================
    // CREATE PAGINATION
    // ========================================

    function createPagination() {

        const totalProducts =
            filteredProducts.length;


        const totalPages =
            Math.ceil(
                totalProducts /
                productsPerPage
            );


        $pagination.empty();


        // One page only
        if (totalPages <= 1) {

            $paginationNav.hide();

            return;

        }


        $paginationNav.show();


        // ========================================
        // PREVIOUS BUTTON
        // ========================================

        $pagination.append(`
            <li
                class="page-item
                ${
                    currentPage === 1
                        ? "disabled"
                        : ""
                }"
            >

                <button
                    class="page-link"
                    type="button"
                    data-page="${
                        currentPage - 1
                    }"
                    aria-label="Previous page"
                >

                    <i
                        class="fa-solid
                               fa-chevron-left"
                        aria-hidden="true"
                    ></i>

                </button>

            </li>
        `);


        // ========================================
        // PAGE NUMBERS
        // ========================================

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            $pagination.append(`
                <li
                    class="page-item
                    ${
                        page === currentPage
                            ? "active"
                            : ""
                    }"
                >

                    <button
                        class="page-link"
                        type="button"
                        data-page="${page}"
                    >
                        ${page}
                    </button>

                </li>
            `);

        }


        // ========================================
        // NEXT BUTTON
        // ========================================

        $pagination.append(`
            <li
                class="page-item
                ${
                    currentPage === totalPages
                        ? "disabled"
                        : ""
                }"
            >

                <button
                    class="page-link"
                    type="button"
                    data-page="${
                        currentPage + 1
                    }"
                    aria-label="Next page"
                >

                    <i
                        class="fa-solid
                               fa-chevron-right"
                        aria-hidden="true"
                    ></i>

                </button>

            </li>
        `);

    }


    // ========================================
    // PAGINATION CLICK
    // ========================================

    $pagination.on(
        "click",
        ".page-link",
        function () {

            const $pageItem =
                $(this).closest(
                    ".page-item"
                );


            if (
                $pageItem.hasClass(
                    "disabled"
                ) ||
                $pageItem.hasClass(
                    "active"
                )
            ) {

                return;

            }


            const page =
                Number(
                    $(this).data(
                        "page"
                    )
                );


            const totalPages =
                Math.ceil(
                    filteredProducts.length /
                    productsPerPage
                );


            if (
                page >= 1 &&
                page <= totalPages
            ) {

                showPage(page);


                $("html, body").animate(
                    {

                        scrollTop:
                            $(".laptops-listing-section")
                                .offset()
                                .top - 20

                    },
                    250
                );

            }

        }
    );


    // ========================================
    // CHECKBOX FILTER
    // ========================================

    $(".filter-brand, .filter-use").on(
        "change",
        function () {

            const value =
                $(this).val();


            const checked =
                $(this).prop(
                    "checked"
                );


            let selector;


            // Brand
            if (
                $(this).hasClass(
                    "filter-brand"
                )
            ) {

                selector =
                    '.filter-brand[value="' +
                    value +
                    '"]';

            }


            // Use
            else {

                selector =
                    '.filter-use[value="' +
                    value +
                    '"]';

            }


            // Sync Desktop + Mobile
            $(selector).prop(
                "checked",
                checked
            );


            applyFilters();

        }
    );


    // ========================================
    // DESKTOP PRICE APPLY
    // ========================================

    $("#applyDesktopFilters").on(
        "click",
        function () {

            $("#mobileMinPrice").val(
                $("#desktopMinPrice").val()
            );


            $("#mobileMaxPrice").val(
                $("#desktopMaxPrice").val()
            );


            applyFilters();

        }
    );


    // ========================================
    // MOBILE PRICE APPLY
    // ========================================

    $("#applyMobileFilters").on(
        "click",
        function () {

            $("#desktopMinPrice").val(
                $("#mobileMinPrice").val()
            );


            $("#desktopMaxPrice").val(
                $("#mobileMaxPrice").val()
            );


            applyFilters();

        }
    );


    // ========================================
    // SORT CHANGE
    // ========================================

    $sort.on(
        "change",
        function () {

            sortProducts();


            currentPage = 1;


            showPage(
                currentPage
            );

        }
    );


    // ========================================
    // CLEAR FILTERS
    // ========================================

    function clearFilters() {

        $(".filter-brand").prop(
            "checked",
            false
        );


        $(".filter-use").prop(
            "checked",
            false
        );


        $("#desktopMinPrice").val("");

        $("#desktopMaxPrice").val("");

        $("#mobileMinPrice").val("");

        $("#mobileMaxPrice").val("");


        $sort.val(
            "recommended"
        );


        filteredProducts =
            $products.toArray();


        sortProducts();


        currentPage = 1;


        showPage(
            currentPage
        );

    }


    $("#clearDesktopFilters").on(
        "click",
        clearFilters
    );


    $("#clearMobileFilters").on(
        "click",
        clearFilters
    );


    // ========================================
    // URL FILTERS
    //
    // laptops.html?brand=asus
    // laptops.html?brand=apple
    //
    // laptops.html?use=study
    // laptops.html?use=gaming
    // ========================================

    function applyUrlFilters() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const brand =
            params.get("brand");


        const use =
            params.get("use");


        if (brand) {

            $(
                '.filter-brand[value="' +
                brand.toLowerCase() +
                '"]'
            ).prop(
                "checked",
                true
            );

        }


        if (use) {

            $(
                '.filter-use[value="' +
                use.toLowerCase() +
                '"]'
            ).prop(
                "checked",
                true
            );

        }

    }


    // ========================================
    // START
    // ========================================

    applyUrlFilters();

    applyFilters();

});


// ========================================
// END LAPTOPS PAGE
// ========================================



// ========================================
// START WISHLIST AND CART
// ========================================

$(document).ready(function () {


    // ========================================
    // STORAGE KEYS
    // ========================================

    const wishlistKey =
        "nexlapWishlist";

    const cartKey =
        "nexlapCart";


    // ========================================
    // GET WISHLIST
    // ========================================

    function getWishlist() {

        const savedWishlist =
            localStorage.getItem(
                wishlistKey
            );


        if (savedWishlist) {

            return JSON.parse(
                savedWishlist
            );

        }


        return [];

    }


    // ========================================
    // SAVE WISHLIST
    // ========================================

    function saveWishlist(wishlist) {

        localStorage.setItem(
            wishlistKey,
            JSON.stringify(wishlist)
        );


        updateNavCounts();

        updateWishlistButtons();

    }


    // ========================================
    // GET CART
    // ========================================

    function getCart() {

        const savedCart =
            localStorage.getItem(
                cartKey
            );


        if (savedCart) {

            return JSON.parse(
                savedCart
            );

        }


        return [];

    }


    // ========================================
    // SAVE CART
    // ========================================

    function saveCart(cart) {

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );


        updateNavCounts();

    }


    // ========================================
    // GET PRODUCT INFORMATION
    // ========================================

    function getProductInfo($button) {


        // ========================================
        // LAPTOPS PAGE PRODUCT
        // ========================================

        const $card =
            $button.closest(
                ".listing-product-card"
            );


        if ($card.length > 0) {

            return {

                id:
                    String(
                        $card.data("id")
                    ),

                brand:
                    $card
                        .find(
                            ".listing-product-brand"
                        )
                        .text()
                        .trim(),

                name:
                    $card
                        .find(
                            ".listing-product-title"
                        )
                        .text()
                        .trim(),

                price:
                    $card
                        .find(
                            ".listing-product-price"
                        )
                        .text()
                        .trim(),

                image:
                    $card
                        .find(
                            ".listing-product-image"
                        )
                        .attr("src")

            };

        }


        // ========================================
        // PRODUCT DETAIL PAGE
        // ========================================

        if (
            $("#productDetailContent")
                .length > 0
        ) {

            return {

                id:
                    String(
                        $button.attr(
                            "data-product-id"
                        )
                    ),

                brand:
                    $("#productBrand")
                        .text()
                        .trim(),

                name:
                    $("#productName")
                        .text()
                        .trim(),

                price:
                    $("#productPrice")
                        .text()
                        .trim(),

                image:
                    $("#productImage")
                        .attr("src")

            };

        }


        return null;

    }


    // ========================================
    // UPDATE NAV COUNTS
    // ========================================

    function updateNavCounts() {

        const wishlist =
            getWishlist();

        const cart =
            getCart();


        // Wishlist Count
        const wishlistCount =
            wishlist.length;


        // Cart Count
        let cartCount = 0;


        cart.forEach(
            function (item) {

                cartCount +=
                    item.quantity;

            }
        );


        // Wishlist Header Count
        $(
            '.nav-action-icon[href="wishlist.html"] .icon-count'
        ).text(
            wishlistCount
        );


        // Cart Header Count
        $(
            '.nav-action-icon[href="cart.html"] .icon-count'
        ).text(
            cartCount
        );

    }


    // ========================================
    // UPDATE WISHLIST BUTTONS
    // ========================================

    function updateWishlistButtons() {

        const wishlist =
            getWishlist();


        const wishlistIds =
            wishlist.map(
                function (item) {

                    return item.id;

                }
            );


        // ========================================
        // LAPTOP LISTING HEARTS
        // ========================================

        $(".listing-wishlist-button")
            .each(
                function () {

                    const $button =
                        $(this);


                    const productId =
                        String(
                            $button
                                .closest(
                                    ".listing-product-card"
                                )
                                .data("id")
                        );


                    const isSaved =
                        wishlistIds.includes(
                            productId
                        );


                    const $icon =
                        $button.find("i");


                    if (isSaved) {

                        $button.addClass(
                            "is-active"
                        );


                        $icon
                            .removeClass(
                                "fa-regular"
                            )
                            .addClass(
                                "fa-solid"
                            );


                        $button.attr(
                            "title",
                            "Remove from wishlist"
                        );

                    } else {

                        $button.removeClass(
                            "is-active"
                        );


                        $icon
                            .removeClass(
                                "fa-solid"
                            )
                            .addClass(
                                "fa-regular"
                            );


                        $button.attr(
                            "title",
                            "Add to wishlist"
                        );

                    }

                }
            );


        // ========================================
        // PRODUCT DETAIL WISHLIST BUTTON
        // ========================================

        const $detailButton =
            $("#productWishlistButton");


        if (
            $detailButton.length > 0
        ) {

            const productId =
                String(
                    $detailButton.attr(
                        "data-product-id"
                    )
                );


            const isSaved =
                wishlistIds.includes(
                    productId
                );


            if (isSaved) {

                $detailButton.html(
                    '<i class="fa-solid fa-heart me-2" aria-hidden="true"></i>' +
                    "Remove from Wishlist"
                );

            } else {

                $detailButton.html(
                    '<i class="fa-regular fa-heart me-2" aria-hidden="true"></i>' +
                    "Add to Wishlist"
                );

            }

        }

    }


    // ========================================
    // WISHLIST CLICK
    // ========================================

    $(document).on(
        "click",
        ".listing-wishlist-button, #productWishlistButton",
        function () {

            const $button =
                $(this);


            const product =
                getProductInfo(
                    $button
                );


            if (
                !product ||
                !product.id
            ) {

                return;

            }


            const wishlist =
                getWishlist();


            const existingIndex =
                wishlist.findIndex(
                    function (item) {

                        return (
                            item.id ===
                            product.id
                        );

                    }
                );


            // ========================================
            // ADD TO WISHLIST
            // ========================================

            if (
                existingIndex === -1
            ) {

                wishlist.push(
                    product
                );

            }


            // ========================================
            // REMOVE FROM WISHLIST
            // ========================================

            else {

                wishlist.splice(
                    existingIndex,
                    1
                );

            }


            saveWishlist(
                wishlist
            );

        }
    );


    // ========================================
    // ADD TO CART CLICK
    // ========================================

    $(document).on(
        "click",
        ".listing-cart-button, #productCartButton",
        function () {

            const $button =
                $(this);


            const product =
                getProductInfo(
                    $button
                );


            if (
                !product ||
                !product.id
            ) {

                return;

            }


            const cart =
                getCart();


            const existingItem =
                cart.find(
                    function (item) {

                        return (
                            item.id ===
                            product.id
                        );

                    }
                );


            // ========================================
            // PRODUCT ALREADY IN CART
            // ========================================

            if (existingItem) {

                existingItem.quantity += 1;

            }


            // ========================================
            // NEW PRODUCT
            // ========================================

            else {

                product.quantity = 1;


                cart.push(
                    product
                );

            }


            saveCart(
                cart
            );


            // ========================================
            // BUTTON FEEDBACK
            // ========================================

            const oldHtml =
                $button.html();


            $button.html(
                '<i class="fa-solid fa-check me-1" aria-hidden="true"></i>' +
                "Added"
            );


            setTimeout(
                function () {

                    $button.html(
                        oldHtml
                    );

                },
                800
            );

        }
    );


    // ========================================
    // START
    // ========================================

    updateNavCounts();

    updateWishlistButtons();


});


// ========================================
// END WISHLIST AND CART
// ========================================