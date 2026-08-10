// ========================================
// START NEXLAP SHOPPING
// ========================================

$(document).ready(function () {


    // ========================================
    // STORAGE NAMES
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
    // GET PRODUCT INFORMATION
    // ========================================

    function getProductInfo($button) {


        // ========================================
        // LAPTOP LISTING PAGE
        // ========================================

        const $card =
            $button.closest(
                ".listing-product-card"
            );


        if ($card.length > 0) {

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
                        .attr("src"),

                quantity: 1

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
                    $("#productPrice")
                        .text()
                        .trim(),

                image:
                    $("#productImage")
                        .attr("src"),

                quantity: 1

            };

        }


        return null;

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


        $("#wishlistCount")
            .text(
                wishlistCount
            );


        // ========================================
        // CART COUNT
        // ========================================

        let cartCount = 0;


        cart.forEach(
            function (item) {

                cartCount +=
                    item.quantity;

            }
        );


        $("#cartCount")
            .text(
                cartCount
            );


        // ========================================
        // HEADER WISHLIST ICON
        // ========================================

        const $headerHeart =
            $('.nav-action-icon[href="wishlist.html"] i');


        if (wishlistCount > 0) {

            $headerHeart
                .removeClass(
                    "fa-regular"
                )
                .addClass(
                    "fa-solid"
                );

        } else {

            $headerHeart
                .removeClass(
                    "fa-solid"
                )
                .addClass(
                    "fa-regular"
                );

        }

    }


    // ========================================
    // CHECK WISHLIST PRODUCT
    // ========================================

    function isInWishlist(productId) {

        const wishlist =
            getWishlist();


        let found = false;


        wishlist.forEach(
            function (item) {

                if (
                    item.id ===
                    productId
                ) {

                    found = true;

                }

            }
        );


        return found;

    }


    // ========================================
    // UPDATE LISTING WISHLIST ICONS
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
                        $button.find("i");


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


            if (!product) {

                return;

            }


            let wishlist =
                getWishlist();


            let productIndex = -1;


            wishlist.forEach(
                function (item, index) {

                    if (
                        item.id ===
                        product.id
                    ) {

                        productIndex =
                            index;

                    }

                }
            );


            // ========================================
            // ADD
            // ========================================

            if (productIndex === -1) {

                wishlist.push(
                    product
                );

            }


            // ========================================
            // REMOVE
            // ========================================

            else {

                wishlist.splice(
                    productIndex,
                    1
                );

            }


            saveWishlist(
                wishlist
            );


            updateHeaderCounts();

            updateListingWishlistButtons();

            updateDetailWishlistButton();

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


            if (!product) {

                return;

            }


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
            // ALREADY IN CART
            // ========================================

            if (existingItem) {

                existingItem.quantity += 1;

            }


            // ========================================
            // NEW ITEM
            // ========================================

            else {

                cart.push(
                    product
                );

            }


            saveCart(
                cart
            );


            updateHeaderCounts();


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
    // START
    // ========================================

    updateHeaderCounts();

    updateListingWishlistButtons();

    updateDetailWishlistButton();


});


// ========================================
// END NEXLAP SHOPPING
// ========================================