// ========================================
// START PRODUCT DETAIL PAGE
// ========================================


// ========================================
// PRODUCT DATA
// ========================================

const products = {


    // ========================================
    // ASUS LAPTOP
    // ========================================

    "asus-laptop": {

        id: "asus-laptop",

        brand: "ASUS",

        name: "ASUS Laptop",

        image:
            "images/laptops/asus-laptop.png",

        uses: [
            "study",
            "office",
            "programming"
        ],

        priceMin: 1600000,

        priceMax: 4600000,

        price:
            "1,600,000 – 4,600,000 MMK",

        specs: {

            processor:
                "Intel Core i5",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // LENOVO LAPTOP
    // ========================================

    "lenovo-laptop": {

        id: "lenovo-laptop",

        brand: "Lenovo",

        name: "Lenovo Laptop",

        image:
            "images/laptops/lenovo-laptop.png",

        uses: [
            "study",
            "office",
            "programming"
        ],

        priceMin: 1400000,

        priceMax: 2400000,

        price:
            "1,400,000 – 2,400,000 MMK",

        specs: {

            processor:
                "Intel Core i5",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel Integrated Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // ACER LAPTOP
    // ========================================

    "acer-laptop": {

        id: "acer-laptop",

        brand: "Acer",

        name: "Acer Laptop",

        image:
            "images/laptops/acer-laptop.png",

        uses: [
            "study",
            "office",
            "gaming"
        ],

        priceMin: 1400000,

        priceMax: 2900000,

        price:
            "1,400,000 – 2,900,000 MMK",

        specs: {

            processor:
                "Intel Core i5",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // HP LAPTOP
    // ========================================

    "hp-laptop": {

        id: "hp-laptop",

        brand: "HP",

        name: "HP Laptop",

        image:
            "images/laptops/hp-laptop.png",

        uses: [
            "study",
            "office"
        ],

        priceMin: 1850000,

        priceMax: 3000000,

        price:
            "1,850,000 – 3,000,000 MMK",

        specs: {

            processor:
                "Intel Core i5",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // DELL LAPTOP
    // ========================================

    "dell-laptop": {

        id: "dell-laptop",

        brand: "Dell",

        name: "Dell Laptop",

        image:
            "images/laptops/dell-laptop.png",

        uses: [
            "study",
            "office",
            "programming"
        ],

        priceMin: 1400000,

        priceMax: 4200000,

        price:
            "1,400,000 – 4,200,000 MMK",

        specs: {

            processor:
                "Intel Core i5",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // APPLE LAPTOP
    // ========================================

    "apple-laptop": {

        id: "apple-laptop",

        brand: "Apple",

        name: "Apple Laptop",

        image:
            "images/laptops/apple-laptop.png",

        uses: [
            "study",
            "office",
            "programming"
        ],

        priceMin: 5400000,

        priceMax: 7200000,

        price:
            "5,400,000 – 7,200,000 MMK",

        specs: {

            processor:
                "Apple M-Series Chip",

            memory:
                "16GB Unified Memory",

            storage:
                "512GB SSD",

            display:
                "Liquid Retina Display",

            graphics:
                "Apple Integrated GPU",

            operatingSystem:
                "macOS"

        }

    },


    // ========================================
    // ASUS VIVOBOOK 16
    // ========================================

    "asus-vivobook-16": {

        id: "asus-vivobook-16",

        brand: "ASUS",

        name: "ASUS Vivobook 16",

        image:
            "images/laptops/asus-vivobook-16.png",

        uses: [
            "study",
            "office",
            "programming"
        ],

        priceMin: 1800000,

        priceMax: 2400000,

        price:
            "1,800,000 – 2,400,000 MMK",

        specs: {

            processor:
                "Intel Core i5-1335U",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "16-inch WUXGA 1920 × 1200",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // ASUS TUF GAMING A15
    // ========================================

    "asus-tuf-a15": {

        id: "asus-tuf-a15",

        brand: "ASUS",

        name: "ASUS TUF Gaming A15",

        image:
            "images/laptops/asus-tuf-a15.png",

        uses: [
            "gaming",
            "programming"
        ],

        priceMin: 3200000,

        priceMax: 4600000,

        price:
            "3,200,000 – 4,600,000 MMK",

        specs: {

            processor:
                "AMD Ryzen 7 7735HS",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD 144Hz",

            graphics:
                "NVIDIA GeForce RTX 4060 8GB",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // LENOVO IDEAPAD SLIM 3
    // ========================================

    "lenovo-ideapad-slim-3": {

        id: "lenovo-ideapad-slim-3",

        brand: "Lenovo",

        name: "Lenovo IdeaPad Slim 3",

        image:
            "images/laptops/lenovo-ideapad-slim-3.png",

        uses: [
            "study",
            "office"
        ],

        priceMin: 1400000,

        priceMax: 1800000,

        price:
            "1,400,000 – 1,800,000 MMK",

        specs: {

            processor:
                "Intel Core i5-13420H",

            memory:
                "8GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel UHD Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // LENOVO LOQ 15
    // ========================================

    "lenovo-loq-15": {

        id: "lenovo-loq-15",

        brand: "Lenovo",

        name: "Lenovo LOQ 15",

        image:
            "images/laptops/lenovo-loq-15.png",

        uses: [
            "gaming",
            "programming"
        ],

        priceMin: 2100000,

        priceMax: 2400000,

        price:
            "2,100,000 – 2,400,000 MMK",

        specs: {

            processor:
                "Intel Core i5-13450HX",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD 144Hz",

            graphics:
                "NVIDIA GeForce RTX 4050 6GB",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // ACER ASPIRE 5
    // ========================================

    "acer-aspire-5": {

        id: "acer-aspire-5",

        brand: "Acer",

        name: "Acer Aspire 5",

        image:
            "images/laptops/acer-aspire-5.png",

        uses: [
            "study",
            "office"
        ],

        priceMin: 1400000,

        priceMax: 1900000,

        price:
            "1,400,000 – 1,900,000 MMK",

        specs: {

            processor:
                "Intel Core i5-1335U",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // ACER NITRO V 15
    // ========================================

    "acer-nitro-v-15": {

        id: "acer-nitro-v-15",

        brand: "Acer",

        name: "Acer Nitro V 15",

        image:
            "images/laptops/acer-nitro-v-15.png",

        uses: [
            "gaming",
            "programming"
        ],

        priceMin: 2400000,

        priceMax: 2900000,

        price:
            "2,400,000 – 2,900,000 MMK",

        specs: {

            processor:
                "Intel Core i7-13620H",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD 144Hz",

            graphics:
                "NVIDIA GeForce RTX 4050 6GB",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // HP PAVILION 15
    // ========================================

    "hp-pavilion-15": {

        id: "hp-pavilion-15",

        brand: "HP",

        name: "HP Pavilion 15",

        image:
            "images/laptops/hp-pavilion-15.png",

        uses: [
            "study",
            "office"
        ],

        priceMin: 2000000,

        priceMax: 2500000,

        price:
            "2,000,000 – 2,500,000 MMK",

        specs: {

            processor:
                "Intel Core i5-1335U",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD IPS",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // HP VICTUS 15
    // ========================================

    "hp-victus-15": {

        id: "hp-victus-15",

        brand: "HP",

        name: "HP Victus 15",

        image:
            "images/laptops/hp-victus-15.png",

        uses: [
            "gaming",
            "programming"
        ],

        priceMin: 2500000,

        priceMax: 3000000,

        price:
            "2,500,000 – 3,000,000 MMK",

        specs: {

            processor:
                "Intel Core i7-13620H",

            memory:
                "16GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD 144Hz",

            graphics:
                "NVIDIA GeForce RTX 4050 6GB",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // DELL INSPIRON 15
    // ========================================

    "dell-inspiron-15": {

        id: "dell-inspiron-15",

        brand: "Dell",

        name: "Dell Inspiron 15",

        image:
            "images/laptops/dell-inspiron-15.png",

        uses: [
            "study",
            "office"
        ],

        priceMin: 1400000,

        priceMax: 2000000,

        price:
            "1,400,000 – 2,000,000 MMK",

        specs: {

            processor:
                "Intel Core i5-1334U",

            memory:
                "8GB RAM",

            storage:
                "512GB SSD",

            display:
                "15.6-inch Full HD",

            graphics:
                "Intel Iris Xe Graphics",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // DELL G15
    // ========================================

    "dell-g15": {

        id: "dell-g15",

        brand: "Dell",

        name: "Dell G15",

        image:
            "images/laptops/dell-g15.png",

        uses: [
            "gaming",
            "programming"
        ],

        priceMin: 3200000,

        priceMax: 4200000,

        price:
            "3,200,000 – 4,200,000 MMK",

        specs: {

            processor:
                "Intel Core i7-13650HX",

            memory:
                "16GB RAM",

            storage:
                "1TB SSD",

            display:
                "15.6-inch Full HD 165Hz",

            graphics:
                "NVIDIA GeForce RTX 4060 8GB",

            operatingSystem:
                "Windows 11"

        }

    },


    // ========================================
    // MACBOOK AIR 13
    // ========================================

    "macbook-air-13": {

        id: "macbook-air-13",

        brand: "Apple",

        name: "MacBook Air 13",

        image:
            "images/laptops/macbook-air-13.png",

        uses: [
            "study",
            "office",
            "programming"
        ],

        priceMin: 5400000,

        priceMax: 6100000,

        price:
            "5,400,000 – 6,100,000 MMK",

        specs: {

            processor:
                "Apple M3 Chip",

            memory:
                "16GB Unified Memory",

            storage:
                "512GB SSD",

            display:
                "13.6-inch Liquid Retina",

            graphics:
                "Apple 10-core GPU",

            operatingSystem:
                "macOS"

        }

    },


    // ========================================
    // MACBOOK PRO 14
    // ========================================

    "macbook-pro-14": {

        id: "macbook-pro-14",

        brand: "Apple",

        name: "MacBook Pro 14",

        image:
            "images/laptops/macbook-pro-14.png",

        uses: [
            "office",
            "programming"
        ],

        priceMin: 6500000,

        priceMax: 7200000,

        price:
            "6,500,000 – 7,200,000 MMK",

        specs: {

            processor:
                "Apple M3 Pro Chip",

            memory:
                "18GB Unified Memory",

            storage:
                "512GB SSD",

            display:
                "14.2-inch Liquid Retina XDR",

            graphics:
                "Apple 14-core GPU",

            operatingSystem:
                "macOS"

        }

    }

};


// ========================================
// PRODUCT DETAIL LOGIC
// ========================================

$(document).ready(function () {


    // ========================================
    // CHECK PRODUCT DETAIL PAGE
    // ========================================

    if (
        $("#productDetailContent").length === 0
    ) {

        return;

    }


    // ========================================
    // ELEMENTS
    // ========================================

    const $productDetailContent =
        $("#productDetailContent");

    const $productNotFound =
        $("#productNotFound");


    const $productImage =
        $("#productImage");

    const $productBrand =
        $("#productBrand");

    const $productName =
        $("#productName");

    const $productPrice =
        $("#productPrice");


    const $productUseTags =
        $("#productUseTags");

    const $productBestFor =
        $("#productBestFor");


    const $productBreadcrumbBrand =
        $("#productBreadcrumbBrand");

    const $productBreadcrumbName =
        $("#productBreadcrumbName");


    const $productProcessor =
        $("#productProcessor");

    const $productMemory =
        $("#productMemory");

    const $productStorage =
        $("#productStorage");

    const $productDisplay =
        $("#productDisplay");

    const $productGraphics =
        $("#productGraphics");

    const $productOperatingSystem =
        $("#productOperatingSystem");


    const $productCartButton =
        $("#productCartButton");

    const $productWishlistButton =
        $("#productWishlistButton");


    // ========================================
    // GET PRODUCT ID FROM URL
    // ========================================

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");


    // ========================================
    // GET PRODUCT
    // ========================================

    const product =
        products[productId];


    // ========================================
    // PRODUCT NOT FOUND
    // ========================================

    function showProductNotFound() {

        document.title =
            "Product Not Found | NexLap";


        $productDetailContent.hide();


        $productNotFound
            .removeClass("d-none");

    }


    // ========================================
    // CHECK PRODUCT
    // ========================================

    if (
        !productId ||
        !product
    ) {

        showProductNotFound();

        return;

    }


    // ========================================
    // SHOW PRODUCT CONTENT
    // ========================================

    $productNotFound
        .addClass("d-none");


    $productDetailContent.show();


    // ========================================
    // FORMAT USE LABEL
    // ========================================

    function formatUseLabel(use) {

        if (!use) {

            return "";

        }


        return (
            use.charAt(0).toUpperCase() +
            use.slice(1)
        );

    }


    // ========================================
    // RENDER USE TAGS
    // ========================================

    function renderUseTags() {

        $productUseTags.empty();


        if (
            !Array.isArray(product.uses) ||
            product.uses.length === 0
        ) {

            return;

        }


        product.uses.forEach(
            function (use) {

                const label =
                    formatUseLabel(use);


                const $tag =
                    $("<span>")
                        .addClass(
                            "product-use-tag"
                        )
                        .text(label);


                $productUseTags.append(
                    $tag
                );

            }
        );

    }


    // ========================================
    // RENDER BEST FOR
    // ========================================

    function renderBestFor() {

        $productBestFor.empty();


        if (
            !Array.isArray(product.uses) ||
            product.uses.length === 0
        ) {

            return;

        }


        product.uses.forEach(
            function (use) {

                const label =
                    formatUseLabel(use);


                const $tag =
                    $("<span>")
                        .addClass(
                            "product-best-for-tag"
                        )
                        .text(label);


                $productBestFor.append(
                    $tag
                );

            }
        );

    }


    // ========================================
    // RENDER SPECIFICATIONS
    // ========================================

    function renderSpecifications() {

        const specs =
            product.specs || {};


        $productProcessor.text(
            specs.processor || "—"
        );


        $productMemory.text(
            specs.memory || "—"
        );


        $productStorage.text(
            specs.storage || "—"
        );


        $productDisplay.text(
            specs.display || "—"
        );


        $productGraphics.text(
            specs.graphics || "—"
        );


        $productOperatingSystem.text(
            specs.operatingSystem || "—"
        );

    }


    // ========================================
    // RENDER PRODUCT
    // ========================================

    function renderProduct() {


        // ========================================
        // PAGE TITLE
        // ========================================

        document.title =
            product.name +
            " | NexLap";


        // ========================================
        // PRODUCT IMAGE
        // ========================================

        $productImage
            .attr(
                "src",
                product.image
            )
            .attr(
                "alt",
                product.name
            );


        // ========================================
        // BRAND
        // ========================================

        $productBrand.text(
            product.brand
        );


        // ========================================
        // PRODUCT NAME
        // ========================================

        $productName.text(
            product.name
        );


        // ========================================
        // PRICE
        // ========================================

        $productPrice.text(
            product.price
        );


        // ========================================
        // BREADCRUMB
        // ========================================

        $productBreadcrumbBrand.text(
            product.brand
        );


        $productBreadcrumbName.text(
            product.name
        );


        // ========================================
        // BUTTON PRODUCT ID
        // ========================================

        $productCartButton.attr(
            "data-product-id",
            product.id
        );


        $productWishlistButton.attr(
            "data-product-id",
            product.id
        );


        // ========================================
        // USE TAGS
        // ========================================

        renderUseTags();


        // ========================================
        // BEST FOR
        // ========================================

        renderBestFor();


        // ========================================
        // SPECIFICATIONS
        // ========================================

        renderSpecifications();

    }


    // ========================================
    // START
    // ========================================

    renderProduct();


});


// ========================================
// END PRODUCT DETAIL PAGE
// ========================================