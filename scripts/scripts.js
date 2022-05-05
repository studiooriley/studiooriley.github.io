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
var contentful = require('contentful');

var client = contentful.createClient({
  space: '<izdjqwxzyzcv>',
  accessToken: '<12jAfO_yvwGUFdfsNdRVK-XL3ylBGZdswtyhrgfnuw8>',
});

client.getEntry('<18hcpQ5DjAG8JWCokGWqGU>').then(function (entry) {
  // logs the entry metadata
  console.log(entry.sys);

  // logs the field with ID title
  console.log(entry.fields.productName);
});