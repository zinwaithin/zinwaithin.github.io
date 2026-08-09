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