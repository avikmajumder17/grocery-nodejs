const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");


//api

const homeData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const homeDataObj = JSON.parse(homeData);


//templates

const tempHomePage = fs.readFileSync(`${__dirname}/template/index.html`, "utf-8");
const tempProductDetails = fs.readFileSync(`${__dirname}/template/grocery.html`, "utf-8");
const tempPageNotFound = fs.readFileSync(`${__dirname}/template/pagenotfound.html`, "utf-8");


//template components

const tempHeaderComponent = fs.readFileSync(`${__dirname}/template/components/header/header.html`, "utf-8");
const homeBannerComponent = fs.readFileSync(`${__dirname}/template/components/homePageComponents/s1Banners/homeBanner.html`, "utf-8");
const homeCategoryComponent = fs.readFileSync(`${__dirname}/template/components/homePageComponents/s2Category/category.html`, "utf-8");
const productCard = fs.readFileSync(`${__dirname}/template/components/homePageComponents/s3Products/product-card.html`, "utf-8");
const featuredProductCard = fs.readFileSync(`${__dirname}/template/components/homePageComponents/featuredProducts/featured-products.html`, "utf-8");
const clientFeedback = fs.readFileSync(`${__dirname}/template/components/homePageComponents/clientFeedback/client-feedback.html`, "utf-8");
const tempProductReview = fs.readFileSync(`${__dirname}/template/components/productDetails/reviews/product-reviews.html`, "utf-8");
const tempFooterComponent = fs.readFileSync(`${__dirname}/template/components/footer/footer.html`, "utf-8");


//fetching

//home page//

//banner

const replaceHomeBanner = (homeBannerTemp, homeBannerDetail) => {
    let output = homeBannerTemp.replace(/{%HOME_BANNER_SUB_TITLE%}/g, homeBannerDetail.banner_sub_title);
    output = output.replace(/{%HOME_BANNER_TITLE%}/g, homeBannerDetail.banner_title);
    output = output.replace(/{%HOME_BANNER_BIG_IMAGE%}/g, homeBannerDetail.banner_big_image);
    output = output.replace(/{%HOME_BANNER_DISCOUNT_IMAGE%}/g, homeBannerDetail.banner_discount_image);
    output = output.replace(/{%ID%}/g, homeBannerDetail.id);

    return output;
};

//category

const replaceCategory = (homeCategoryTemp, homeCategoryDetail) => {
    let output = homeCategoryTemp.replace(/{%CATEGORY_ICON%}/g, homeCategoryDetail.category_image);
    output = output.replace(/{%CATEGORY_NAME%}/g, homeCategoryDetail.category);
    output = output.replace(/{%CATEGORY_QTY%}/g, homeCategoryDetail.quantity);

    return output;
};

//product card

const replaceHomeProduct = (homeProductTemp, productDetail) => {
    let output = homeProductTemp.replace(/{%PRODUCT_IMAGE%}/g, productDetail.products_image);

    if (!productDetail.discount) {
        output = output.replace(/{%DISCOUNT%}/g, "d-none");
    }
    
    output = output.replace(/{%DISCOUNT_PERCENTAGE%}/g, productDetail.discount_percentage);
    output = output.replace(/{%PRODUCT_NAME%}/g, productDetail.product_name);
    output = output.replace(/{%PRODUCT_PRICE%}/g, productDetail.product_price);
    output = output.replace(/{%PRODUCT_RATING%}/g, productDetail.rating);
    output = output.replace(/{%PRODUCT_DESC%}/g, productDetail.product_desc);
    output = output.replace(/{%PRODUCT_SKU%}/g, productDetail.product_info.sku);
    output = output.replace(/{%PRODUCT_CAT%}/g, productDetail.product_info.categories);
    output = output.replace(/{%PRODUCT_TAG%}/g, productDetail.product_info.tags);
    output = output.replace(/{%PRODUCT_WEIGHT%}/g, productDetail.product_info.weight);
    output = output.replace(/{%PRODUCT_DIMENSION%}/g, productDetail.product_info.dimensions);
    output = output.replace(/{%PRODUCT_SHIPPING%}/g, productDetail.product_info.shipping);
    output = output.replace(/{%PRODUCT_BRAND%}/g, productDetail.product_info.brand);
    output = output.replace(/{%PRODUCT_REVIEW_NAME%}/g, productDetail.reviews.user);
    output = output.replace(/{%PRODUCT_DATE%}/g, productDetail.reviews.date);
    output = output.replace(/{%PRODUCT_REVIEW_COMMENT%}/g, productDetail.reviews.comment);
    output = output.replace(/{%SMALL_IMAGE_1%}/g, productDetail.small_images[0]);
    output = output.replace(/{%SMALL_IMAGE_2%}/g, productDetail.small_images[1]);
    output = output.replace(/{%SMALL_IMAGE_3%}/g, productDetail.small_images[2]);
    output = output.replace(/{%ID%}/g, productDetail.id);

    return output;
};

//featured product card

const replaceHomeFeaturedProduct = (featuredProductTemp, productDetail) => {
    let output = featuredProductTemp.replace(/{%PRODUCT_IMAGE%}/g, productDetail.products_image);

    if (!productDetail.discount) {
        output = output.replace(/{%DISCOUNT%}/g, "d-none");
    }
    
    output = output.replace(/{%DISCOUNT_PERCENTAGE%}/g, productDetail.discount_percentage);
    output = output.replace(/{%PRODUCT_NAME%}/g, productDetail.product_name);
    output = output.replace(/{%PRODUCT_PRICE%}/g, productDetail.product_price);
    output = output.replace(/{%PRODUCT_RATING%}/g, productDetail.rating);
    output = output.replace(/{%ID%}/g, productDetail.id);

    return output;
};

//testimonials

const replaceHomeClientFeedback = (clientFeedbackTemp, feedbackDetail) => {
    let output = clientFeedbackTemp.replace(/{%CLIENT_NAME%}/g, feedbackDetail.client_name);
    output = output.replace(/{%CLIENT_PROFESSION%}/g, feedbackDetail.client_profession);
    output = output.replace(/{%CLIENT_DESCRIPTION%}/g, feedbackDetail.feedback);
    output = output.replace(/{%CLIENT_RATING%}/g, feedbackDetail.rating);

    return output;
};


//product detail//

//product detail review

const replaceReviews = (productReviewTemp, productReviewDetail) => {
    let output = productReviewTemp.replace(/{%PRODUCT_REVIEW_NAME%}/g, productReviewDetail.user);
    output = output.replace(/{%PRODUCT_REVIEW_NAME%}/g, productReviewDetail.user);
    output = output.replace(/{%PRODUCT_DATE%}/g, productReviewDetail.date);
    output = output.replace(/{%PRODUCT_REVIEW_COMMENT%}/g, productReviewDetail.comment);

    return output;
};


//css

const tempBootstrap = fs.readFileSync(`${__dirname}/template/assets/css/bootstrap.min.css`);
const tempMeanMenu = fs.readFileSync(`${__dirname}/template/assets/css/meanmenu.min.css`);
const tempAnimate = fs.readFileSync(`${__dirname}/template/assets/css/animate.css`);
const tempSwiper = fs.readFileSync(`${__dirname}/template/assets/css/swiper.min.css`);
const tempSlick = fs.readFileSync(`${__dirname}/template/assets/css/slick.css`);
const tempMagnific = fs.readFileSync(`${__dirname}/template/assets/css/magnific-popup.css`);
const tempFontawesome = fs.readFileSync(`${__dirname}/template/assets/css/fontawesome-pro.css`);
const tempSpacing = fs.readFileSync(`${__dirname}/template/assets/css/spacing.css`);
const tempMain = fs.readFileSync(`${__dirname}/template/assets/css/main.css`);
const tempGrocery = fs.readFileSync(`${__dirname}/template/assets/css/grocery.css`);

//js

const tempJqueryJs = fs.readFileSync(`${__dirname}/template/assets/js/jquery-3.6.0.min.js`);
const tempWaypointsJs = fs.readFileSync(`${__dirname}/template/assets/js/waypoints.min.js`);
const tempBootstrapJs = fs.readFileSync(`${__dirname}/template/assets/js/bootstrap.bundle.min.js`);
const tempMeanMenuJs = fs.readFileSync(`${__dirname}/template/assets/js/meanmenu.min.js`);
const tempSwiperJs = fs.readFileSync(`${__dirname}/template/assets/js/swiper.min.js`);
const tempSlickJs = fs.readFileSync(`${__dirname}/template/assets/js/slick.min.js`);
const tempMagnificPopupJs = fs.readFileSync(`${__dirname}/template/assets/js/magnific-popup.min.js`);
const tempCounterupJs = fs.readFileSync(`${__dirname}/template/assets/js/counterup.js`);
const tempWowJs = fs.readFileSync(`${__dirname}/template/assets/js/wow.js`);
const tempAjaxFormJs = fs.readFileSync(`${__dirname}/template/assets/js/ajax-form.js`);
const tempBeforeafterJs = fs.readFileSync(`${__dirname}/template/assets/js/beforeafter.jquery-1.0.0.min.js`);
const tempMainJs = fs.readFileSync(`${__dirname}/template/assets/js/main.js`);

//mime types

const mimeTypes = ({
    png: "image/png",
    jpg: "image/jpg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml"
});



const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === "/" || pathname === "/home") {        
        res.writeHead(200, { "Content-type": "text/html" });

        const homeBannerHtml = homeDataObj.homeBanners.map(homeBanner => replaceHomeBanner(homeBannerComponent, homeBanner)).join("");
        const homeCategoryHtml = homeDataObj.categories.map(category => replaceCategory(homeCategoryComponent, category)).join("");
        const homeProductHtml = homeDataObj.products.map(product => replaceHomeProduct(productCard, product)).join("");
        const homeBestSellerProductHtml = homeDataObj.products.filter(product => product.best_seller === true).map(product => replaceHomeProduct(productCard, product)).join("");
        const homeFeaturedProductHtml = homeDataObj.products.map(product => replaceHomeFeaturedProduct(featuredProductCard, product)).join("");
        const homeClientFeedbackHtml = homeDataObj.testimonials.map(testimonial => replaceHomeClientFeedback(clientFeedback, testimonial)).join("");

        const homePageHtml = tempHomePage
            .replace(/{%HEADER%}/, tempHeaderComponent)
            .replace(/{%HOME_BANNERS%}/, homeBannerHtml)
            .replace(/{%CATEGORY%}/, homeCategoryHtml)
            .replace(/{%PRODUCT_CARDS%}/, homeProductHtml)
            .replace(/{%BEST_PRODUCT_CARDS%}/, homeBestSellerProductHtml)
            .replace(/{%FEATURED_PRODUCT_CARDS%}/, homeFeaturedProductHtml)
            .replace(/{%CLIENT_FEEDBACK%}/, homeClientFeedbackHtml)
            .replace(/{%FOOTER%}/, tempFooterComponent);
        
        res.end(homePageHtml);
    } else if (pathname === "/contact") {
        res.end("Welcome to the contact us page");
    } else if (pathname === "/about") {
        res.end("Welcome to the about us page");
    } else if (pathname === "/blog") {
        res.end("Welcome to the blog page");
    } else if (pathname === "/blog/:blog-details") {        
        res.end("Welcome to the blog details page");
    } else if (pathname === "/faq") {
        res.end("Welcome to the faq page");
    } else if (pathname === "/shop") {
        res.end("Welcome to the shop page");
    } else if (pathname === "/grocery") {
        res.writeHead(200, { "Content-type": "text/html" });

        const groceryProduct = homeDataObj.products.find(product => product.id === Number(query.id));
        const groceryProductDetail = replaceHomeProduct(tempProductDetails, groceryProduct);

        const groceryProductReviewHtml = homeDataObj.products.find(product => product.id === Number(query.id))?.reviews?.map(review => replaceReviews(tempProductReview, review)).join("");
        const noOfReviews = homeDataObj.products.find(product => product.id === Number(query.id))?.reviews.length;

        const groceryDetailHtml = groceryProductDetail
            .replace(/{%PRODUCT_REVIEW%}/, groceryProductReviewHtml)
            .replace(/{%NO_OF_REVIEWS%}/g, noOfReviews);
        
        res.end(groceryDetailHtml);
    } else if (pathname === "/wishlist") {
        res.end("Welcome to the wishlist page");
    } else if (pathname === "/cart") {
        res.end("Welcome to the cart page");
    } else if (pathname === "/checkout") {
        res.end("Welcome to the checkout page");
    } else if (pathname === "/coming-soon") {
        res.end("Welcome to the coming soon page");
    } else if (pathname.startsWith("/assets/imgs/")) {
        const imageFilePath = path.join(__dirname, "template", pathname);
        console.log(imageFilePath)
        const ext = path.extname(imageFilePath).slice(1);
        const mimeType = mimeTypes[ext] || "application/octet-stream";
        
        fs.readFile(imageFilePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-type": "text/html" });
                res.end("<h1>IMage File Not Found!!</h1>");
            } else {
                res.writeHead(200, { "Content-type": mimeType });
                res.end(data);
            }
        });
    } else if (pathname === "/assets/css/bootstrap.min.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempBootstrap);
    } else if (pathname === "/assets/css/meanmenu.min.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempMeanMenu);
    } else if (pathname === "/assets/css/animate.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempAnimate);
    } else if (pathname === "/assets/css/swiper.min.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempSwiper);
    } else if (pathname === "/assets/css/slick.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempSlick);
    } else if (pathname === "/assets/css/magnific-popup.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempMagnific);
    } else if (pathname === "/assets/css/fontawesome-pro.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempFontawesome);
    } else if (pathname === "/assets/css/spacing.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempSpacing);
    } else if (pathname === "/assets/css/main.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempMain);
    } else if (pathname === "/assets/css/grocery.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(tempGrocery);
    } else if (pathname === "/assets/js/jquery-3.6.0.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempJqueryJs);
    } else if (pathname === "/assets/js/waypoints.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempWaypointsJs);
    } else if (pathname === "/assets/js/bootstrap.bundle.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempBootstrapJs);
    } else if (pathname === "/assets/js/meanmenu.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempMeanMenuJs);
    } else if (pathname === "/assets/js/swiper.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempSwiperJs);
    } else if (pathname === "/assets/js/slick.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempSlickJs);
    } else if (pathname === "/assets/js/magnific-popup.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempMagnificPopupJs);
    } else if (pathname === "/assets/js/counterup.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempCounterupJs);
    } else if (pathname === "/assets/js/wow.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempWowJs);
    } else if (pathname === "/assets/js/ajax-form.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempAjaxFormJs);
    } else if (pathname === "/assets/js/beforeafter.jquery-1.0.0.min.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempBeforeafterJs);
    } else if (pathname === "/assets/js/main.js") {
        res.writeHead(200, {"Content-type": "application/javascript"});
        res.end(tempMainJs);
    } else if (pathname === "/api") {
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(homeData);
    } else {
        res.writeHead(404, {"Content-type": "text/html"});
        res.end(tempPageNotFound);
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Server is running on port 8000");
})