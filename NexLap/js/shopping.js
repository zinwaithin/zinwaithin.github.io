// ========================================
// START NEXLAP SHOPPING
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


        if (!savedWishlist) {

            return [];

        }


        return JSON.parse(
            savedWishlist
        );

    }


    // ========================================
    // SAVE WISHLIST
    // ========================================

    function saveWishlist(wishlist) {

        localStorage.setItem(
            wishlistKey,
            JSON.stringify(wishlist)
        );

    }


    // ========================================
    // GET CART
    // ========================================

    function getCart() {

        const savedCart =
            localStorage.getItem(
                cartKey
            );


        if (!savedCart) {

            return [];

        }


        return JSON.parse(
            savedCart
        );

    }


    // ========================================
    // SAVE CART
    // ========================================

    function saveCart(cart) {

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );

    }


    // ========================================
    // FORMAT MONEY
    // ========================================

    function formatMoney(number) {

        return Number(number)
            .toLocaleString("en-US");

    }


    // ========================================
    // GET MINIMUM PRICE FROM PRICE TEXT
    // ========================================

    function getPriceMinFromText(priceText) {

        if (!priceText) {

            return 0;

        }


        const firstPrice =
            priceText.split("–")[0];


        const cleanPrice =
            firstPrice.replace(
                /[^0-9]/g,
                ""
            );


        return Number(
            cleanPrice
        );

    }


    // ========================================
    // GET PRODUCT INFO
    // ========================================

    function getProductInfo($button) {


        // ========================================
        // LAPTOPS PAGE
        // ========================================

        const $card =
            $button.closest(
                ".listing-product-card"
            );


        if ($card.length > 0) {

            const priceText =
                $card
                    .find(
                        ".listing-product-price"
                    )
                    .text()
                    .trim();


            return {

                id:
                    String(
                        $card.attr(
                            "data-id"
                        )
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
                    priceText,

                priceMin:
                    Number(
                        $card.attr(
                            "data-price-min"
                        )
                    ) ||
                    getPriceMinFromText(
                        priceText
                    ),

                image:
                    $card
                        .find(
                            ".listing-product-image"
                        )
                        .attr("src"),

                quantity:
                    1

            };

        }


        // ========================================
        // PRODUCT DETAIL PAGE
        // ========================================

        if (
            $("#productDetailContent")
                .length > 0
        ) {

            const productId =
                $button.attr(
                    "data-product-id"
                );


            if (!productId) {

                return null;

            }


            const priceText =
                $("#productPrice")
                    .text()
                    .trim();


            return {

                id:
                    String(
                        productId
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
                    priceText,

                priceMin:
                    getPriceMinFromText(
                        priceText
                    ),

                image:
                    $("#productImage")
                        .attr("src"),

                quantity:
                    1

            };

        }


        return null;

    }


    // ========================================
    // FIND PRODUCT IN WISHLIST
    // ========================================

    function isInWishlist(productId) {

        const wishlist =
            getWishlist();


        let found =
            false;


        wishlist.forEach(
            function (item) {

                if (
                    item.id ===
                    productId
                ) {

                    found =
                        true;

                }

            }
        );


        return found;

    }


    // ========================================
    // UPDATE HEADER COUNTS
    // ========================================

    function updateHeaderCounts() {

        const wishlist =
            getWishlist();

        const cart =
            getCart();


        // ========================================
        // WISHLIST COUNT
        // ========================================

        const wishlistCount =
            wishlist.length;


        $(
            "#wishlistCount, " +
            '.nav-action-icon[href="wishlist.html"] .icon-count'
        ).text(
            wishlistCount
        );


        // ========================================
        // CART COUNT
        // ========================================

        let cartCount =
            0;


        cart.forEach(
            function (item) {

                cartCount +=
                    Number(
                        item.quantity
                    ) || 1;

            }
        );


        $(
            "#cartCount, " +
            '.nav-action-icon[href="cart.html"] .icon-count'
        ).text(
            cartCount
        );

    }


    // ========================================
    // UPDATE LAPTOP HEART BUTTONS
    // ========================================

    function updateListingWishlistButtons() {

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
                                .attr(
                                    "data-id"
                                )
                        );


                    const $icon =
                        $button.find(
                            "i"
                        );


                    if (
                        isInWishlist(
                            productId
                        )
                    ) {

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

    }


    // ========================================
    // UPDATE DETAIL WISHLIST BUTTON
    // ========================================

    function updateDetailWishlistButton() {

        const $button =
            $("#productWishlistButton");


        if ($button.length === 0) {

            return;

        }


        const productId =
            $button.attr(
                "data-product-id"
            );


        if (!productId) {

            return;

        }


        if (
            isInWishlist(
                productId
            )
        ) {

            $button.html(
                '<i class="fa-solid fa-heart me-2"></i>' +
                "Remove from Wishlist"
            );

        } else {

            $button.html(
                '<i class="fa-regular fa-heart me-2"></i>' +
                "Add to Wishlist"
            );

        }

    }


    // ========================================
    // ADD PRODUCT TO CART
    // ========================================

    function addProductToCart(product) {

        const cart =
            getCart();


        let existingItem =
            null;


        cart.forEach(
            function (item) {

                if (
                    item.id ===
                    product.id
                ) {

                    existingItem =
                        item;

                }

            }
        );


        // ========================================
        // ALREADY EXISTS
        // ========================================

        if (existingItem) {

            existingItem.quantity =
                Number(
                    existingItem.quantity
                ) + 1;

        }


        // ========================================
        // NEW PRODUCT
        // ========================================

        else {

            product.quantity =
                1;


            cart.push(
                product
            );

        }


        saveCart(
            cart
        );

    }


    // ========================================
    // RENDER WISHLIST PAGE
    // ========================================

    function renderWishlist() {

        const $wishlistItems =
            $("#wishlistItems");


        if (
            $wishlistItems.length === 0
        ) {

            return;

        }


        const wishlist =
            getWishlist();


        $wishlistItems.empty();


        // ========================================
        // EMPTY
        // ========================================

        if (
            wishlist.length === 0
        ) {

            $("#wishlistEmpty")
                .removeClass(
                    "d-none"
                )
                .show();


            $("#wishlistContent")
                .addClass(
                    "d-none"
                );


            return;

        }


        // ========================================
        // HAS PRODUCTS
        // ========================================

        $("#wishlistEmpty")
            .hide();


        $("#wishlistContent")
            .removeClass(
                "d-none"
            );


        wishlist.forEach(
            function (item) {


                const productHtml = `

                    <div class="col">

                        <article
                            class="card
                                   listing-product-card
                                   h-100">

                            <div
                                class="listing-product-image-box">

                                <img
                                    class="listing-product-image"
                                    src="${item.image}"
                                    alt="${item.name}">

                            </div>


                            <div
                                class="card-body
                                       d-flex
                                       flex-column
                                       p-4">

                                <p
                                    class="listing-product-brand
                                           text-uppercase
                                           fw-bold
                                           mb-2">

                                    ${item.brand}

                                </p>


                                <h2
                                    class="listing-product-title
                                           fw-bold
                                           mb-3">

                                    ${item.name}

                                </h2>


                                <p
                                    class="listing-product-price
                                           fw-semibold
                                           mb-4">

                                    ${item.price}

                                </p>


                                <!-- ========================================
                                     WISHLIST ACTIONS
                                ========================================= -->

                                <div class="mt-auto">


                                    <!-- ========================================
                                         MORE DETAILS + ADD TO CART
                                    ========================================= -->

                                    <div
                                        class="d-flex
                                               flex-row
                                               flex-nowrap
                                               align-items-stretch
                                               gap-2
                                               w-100">


                                        <!-- More Details -->

                                        <a
                                            class="btn
                                                   btn-outline-dark
                                                   flex-fill
                                                   d-inline-flex
                                                   align-items-center
                                                   justify-content-center
                                                   text-nowrap"
                                            href="product-detail.html?id=${item.id}">

                                            More Details

                                        </a>


                                        <!-- Add to Cart -->

                                        <button
                                            class="btn
                                                   btn-nexlap
                                                   flex-fill
                                                   d-inline-flex
                                                   align-items-center
                                                   justify-content-center
                                                   text-nowrap
                                                   wishlist-add-cart-button"
                                            type="button"
                                            data-id="${item.id}">

                                            <i
                                                class="fa-solid
                                                       fa-cart-plus
                                                       me-1">
                                            </i>

                                            Add to Cart

                                        </button>


                                    </div>


                                    <!-- ========================================
                                         REMOVE
                                    ========================================= -->

                                    <div
                                        class="text-center
                                               mt-2">

                                        <button
                                            class="btn
                                                   btn-link
                                                   text-danger
                                                   text-decoration-none
                                                   wishlist-remove-button"
                                            type="button"
                                            data-id="${item.id}">

                                            <i
                                                class="fa-solid
                                                       fa-trash
                                                       me-2">
                                            </i>

                                            Remove

                                        </button>

                                    </div>


                                </div>

                            </div>

                        </article>

                    </div>

                `;


                $wishlistItems.append(
                    productHtml
                );

            }
        );

    }


    // ========================================
    // RENDER CART PAGE
    // ========================================

    function renderCart() {

        const $cartItems =
            $("#cartItems");


        if (
            $cartItems.length === 0
        ) {

            return;

        }


        const cart =
            getCart();


        $cartItems.empty();


        // ========================================
        // EMPTY CART
        // ========================================

        if (
            cart.length === 0
        ) {

            $("#cartEmpty")
                .removeClass(
                    "d-none"
                )
                .show();


            $("#cartContent")
                .addClass(
                    "d-none"
                );


            $("#cartItemCount")
                .text("0");


            $("#cartSubtotal")
                .text(
                    "0 MMK"
                );


            $("#cartTotal")
                .text(
                    "0 MMK"
                );


            return;

        }


        // ========================================
        // SHOW CART
        // ========================================

        $("#cartEmpty")
            .hide();


        $("#cartContent")
            .removeClass(
                "d-none"
            );


        let totalQuantity =
            0;


        let subtotal =
            0;


        cart.forEach(
            function (item) {


                const quantity =
                    Number(
                        item.quantity
                    ) || 1;


                const priceMin =
                    Number(
                        item.priceMin
                    ) ||
                    getPriceMinFromText(
                        item.price
                    );


                totalQuantity +=
                    quantity;


                subtotal +=
                    priceMin *
                    quantity;


                const productHtml = `

                    <article
                        class="card
                               border
                               shadow-none">

                        <div
                            class="card-body
                                   p-3
                                   p-md-4">

                            <div
                                class="row
                                       g-3
                                       align-items-center">


                                <!-- Image -->

                                <div
                                    class="col-4
                                           col-md-3">

                                    <a
                                        href="product-detail.html?id=${item.id}">

                                        <img
                                            class="img-fluid"
                                            src="${item.image}"
                                            alt="${item.name}"
                                            style="
                                                width: 100%;
                                                height: 140px;
                                                object-fit: contain;
                                            ">

                                    </a>

                                </div>


                                <!-- Product -->

                                <div
                                    class="col-8
                                           col-md-4">

                                    <p
                                        class="section-label
                                               text-uppercase
                                               fw-bold
                                               mb-2">

                                        ${item.brand}

                                    </p>


                                    <h2
                                        class="h5
                                               fw-bold
                                               mb-2">

                                        ${item.name}

                                    </h2>


                                    <p
                                        class="text-secondary
                                               small
                                               mb-0">

                                        ${item.price}

                                    </p>

                                </div>


                                <!-- Quantity -->

                                <div
                                    class="col-7
                                           col-md-3">

                                    <p
                                        class="small
                                               text-secondary
                                               mb-2">

                                        Quantity

                                    </p>


                                    <div
                                        class="d-inline-flex
                                               align-items-center
                                               border
                                               rounded">

                                        <button
                                            class="btn
                                                   border-0
                                                   cart-minus-button"
                                            type="button"
                                            data-id="${item.id}"
                                            aria-label="Decrease quantity">

                                            <i
                                                class="fa-solid
                                                       fa-minus">
                                            </i>

                                        </button>


                                        <span
                                            class="px-3
                                                   fw-semibold">

                                            ${quantity}

                                        </span>


                                        <button
                                            class="btn
                                                   border-0
                                                   cart-plus-button"
                                            type="button"
                                            data-id="${item.id}"
                                            aria-label="Increase quantity">

                                            <i
                                                class="fa-solid
                                                       fa-plus">
                                            </i>

                                        </button>

                                    </div>

                                </div>


                                <!-- Remove -->

                                <div
                                    class="col-5
                                           col-md-2
                                           text-end">

                                    <button
                                        class="btn
                                               btn-link
                                               text-danger
                                               text-decoration-none
                                               cart-remove-button"
                                        type="button"
                                        data-id="${item.id}"
                                        title="Remove from cart">

                                        <i
                                            class="fa-solid
                                                   fa-trash">
                                        </i>

                                    </button>

                                </div>

                            </div>

                        </div>

                    </article>

                `;


                $cartItems.append(
                    productHtml
                );

            }
        );


        // ========================================
        // SUMMARY
        // ========================================

        $("#cartItemCount")
            .text(
                totalQuantity
            );


        $("#cartSubtotal")
            .text(
                formatMoney(
                    subtotal
                ) +
                " MMK"
            );


        $("#cartTotal")
            .text(
                formatMoney(
                    subtotal
                ) +
                " MMK"
            );

    }


    // ========================================
    // REFRESH SHOPPING UI
    // ========================================

    function refreshShoppingUI() {

        updateHeaderCounts();

        updateListingWishlistButtons();

        updateDetailWishlistButton();

        renderWishlist();

        renderCart();

    }


    // ========================================
    // LISTING / DETAIL WISHLIST CLICK
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


            if (!product) {

                return;

            }


            let wishlist =
                getWishlist();


            let existingIndex =
                -1;


            wishlist.forEach(
                function (item, index) {

                    if (
                        item.id ===
                        product.id
                    ) {

                        existingIndex =
                            index;

                    }

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


            refreshShoppingUI();

        }
    );


    // ========================================
    // LAPTOP / DETAIL ADD TO CART
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


            if (!product) {

                return;

            }


            addProductToCart(
                product
            );


            refreshShoppingUI();


            // ========================================
            // BUTTON FEEDBACK
            // ========================================

            const oldHtml =
                $button.html();


            $button.html(
                '<i class="fa-solid fa-check me-2"></i>' +
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
    // REMOVE FROM WISHLIST PAGE
    // ========================================

    $(document).on(
        "click",
        ".wishlist-remove-button",
        function () {

            const productId =
                String(
                    $(this).attr(
                        "data-id"
                    )
                );


            let wishlist =
                getWishlist();


            wishlist =
                wishlist.filter(
                    function (item) {

                        return (
                            item.id !==
                            productId
                        );

                    }
                );


            saveWishlist(
                wishlist
            );


            refreshShoppingUI();

        }
    );


    // ========================================
    // ADD WISHLIST PRODUCT TO CART
    // ========================================

    $(document).on(
        "click",
        ".wishlist-add-cart-button",
        function () {

            const productId =
                String(
                    $(this).attr(
                        "data-id"
                    )
                );


            const wishlist =
                getWishlist();


            let selectedProduct =
                null;


            wishlist.forEach(
                function (item) {

                    if (
                        item.id ===
                        productId
                    ) {

                        selectedProduct =
                            item;

                    }

                }
            );


            if (!selectedProduct) {

                return;

            }


            addProductToCart(
                selectedProduct
            );


            refreshShoppingUI();

        }
    );


    // ========================================
    // CART QUANTITY PLUS
    // ========================================

    $(document).on(
        "click",
        ".cart-plus-button",
        function () {

            const productId =
                String(
                    $(this).attr(
                        "data-id"
                    )
                );


            const cart =
                getCart();


            cart.forEach(
                function (item) {

                    if (
                        item.id ===
                        productId
                    ) {

                        item.quantity =
                            Number(
                                item.quantity
                            ) + 1;

                    }

                }
            );


            saveCart(
                cart
            );


            refreshShoppingUI();

        }
    );


    // ========================================
    // CART QUANTITY MINUS
    // ========================================

    $(document).on(
        "click",
        ".cart-minus-button",
        function () {

            const productId =
                String(
                    $(this).attr(
                        "data-id"
                    )
                );


            let cart =
                getCart();


            cart.forEach(
                function (item) {

                    if (
                        item.id ===
                        productId
                    ) {

                        item.quantity =
                            Number(
                                item.quantity
                            ) - 1;

                    }

                }
            );


            // Remove products with quantity 0

            cart =
                cart.filter(
                    function (item) {

                        return (
                            Number(
                                item.quantity
                            ) > 0
                        );

                    }
                );


            saveCart(
                cart
            );


            refreshShoppingUI();

        }
    );


    // ========================================
    // REMOVE PRODUCT FROM CART
    // ========================================

    $(document).on(
        "click",
        ".cart-remove-button",
        function () {

            const productId =
                String(
                    $(this).attr(
                        "data-id"
                    )
                );


            let cart =
                getCart();


            cart =
                cart.filter(
                    function (item) {

                        return (
                            item.id !==
                            productId
                        );

                    }
                );


            saveCart(
                cart
            );


            refreshShoppingUI();

        }
    );


    // ========================================
    // START
    // ========================================

    refreshShoppingUI();


});


// ========================================
// END NEXLAP SHOPPING
// ========================================