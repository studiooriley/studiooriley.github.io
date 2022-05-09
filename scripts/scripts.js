const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {
    const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    }
    else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

// Contentful API

var contentfulClient = contentful.createClient({
  accessToken: '12jAfO_yvwGUFdfsNdRVK-XL3ylBGZdswtyhrgfnuw8',
  space: 'isdjqwxzyzcv'
})

var PRODUCT_CONTENT_TYPE_ID = '18hcpQ5DjAG8JWCokGWqGU'

var container = document.getElementById('content')

contentfulClient.getEntries({
    content_type: PRODUCT_CONTENT_TYPE_ID
  })
  .then(function(entries) {
    container.innerHTML = renderProducts(entries.items)
  })

function renderProducts(products) {
  return '<h1>Products hello</h1>' +
    '<div class="products">' +
    products.map(renderSingleProduct).join('\n') +
    '</div>'
}

function renderSingleProduct(product) {
  var fields = product.fields
  console.log(fields)
  return '<div class="product-in-list">' +
    '<div class="product-image">' +
    renderImage(fields.image[0], fields.slug) +
    '</div>' +
    '<div class="product-details">' +
    renderProductDetails(fields) +
    '</div>' +
    '</div>'
}

function renderProductDetails(fields) {
  return renderProductHeader(fields) +
    '<p class="product-categories">' +
    fields.categories.map(function(category) {
      return category.fields.title
    }).join(', ') +
    '</p>' +
    '<p>' + marked(fields.productDescription) + '</p>' +
    '<p>' + fields.price + ' &euro;</p>' +
    '<p class="product-tags"><span>Tags:</span> ' + fields.tags.join(', ') + '</p>'
}

function renderProductHeader(fields) {
  return '<div class="product-header">' +
    '<h2>' +
    '<a href="product/' + fields.slug + '">' +
    fields.productName +
    '</a>' +
    '</h2>' +
    ' by ' +
    '<a href="brand/' + fields.brand.sys.id + '">' + fields.brand.fields.companyName + '</a>' +
    '</div>'
}

function renderImage(image, slug) {
  if (image && image.fields.file) {
    return '<a href="product/' + slug + '">' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
      '</a>'
  } else {
    return ''
  }
}

