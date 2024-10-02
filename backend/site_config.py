# ALL AVAIBLE TITLES
# "titles" : ["Brand", "Name", "Link","Price", "Details", "Image_URL", "Tech_Specs"]

competitivecyclist_config = {
    "base_url": "https://www.competitivecyclist.com",
    "name": "competitivecyclist",
    "categories": {
        "road_bikes": "/cat/road-bikes",
        #"bike_helmets": "/cat/bike-helmets",
        #"water_bottles": "/cat/water-bottles-cages",
        #"men_tri_swim": "/cat/mens-tri-swim",
        #"women_tri_swim": "/cat/womens-tri-swim",
        #"men_foot_ware": "/cat/mens-road-shoes",
        #"women_foot_ware": "/cat/womens-road-bike-shoes-accessories",
        #"mens_tops": "/cat/mens-road-bike-tops",
        #"women_tops": "/cat/womens-road-bike-tops"
    },
    "selectors": {
        "brand_name": {'tag': 'p', "attributes": {'class': "chakra-text css-1y2krct", "data-id": "brandName"}},
        "product_name": {'tag': 'h2', "attributes": {'class': "chakra-heading css-1gfqank", "data-id": "title"}},
        "product_price": {'tag': 'span', "attributes": {'class': "chakra-text css-10mpi4h", "data-id": "price"}},
        "product_link": {'tag': 'a', "attributes": {'class': "chakra-linkbox__overlay css-1uw88nq"}},
        "details": {'tag': 'li', "attributes": {'class': 'css-e3648i'}},
        "img": {'tag': 'img', "attributes": {'class': 'chakra-image css-8atqhb', 'data-id': 'mainImage'}},
        "spec_title": {'tag': 'dt', "attributes": {'class': 'chakra-text css-1apn5qx'}},
        "spec_value": {'tag': 'dd', "attributes": {'class': 'chakra-text css-rsyz82'}},
        "next_page": {'tag': 'a', "attributes": {'class': 'chakra-button css-1y31xto', 'data-id': 'nextPage'}}
    },
    "config" : {
        # half : needs to be added to base
        # full : doesn't need to be added to base
        "pages_url" : "half",
        "img_url_need_https":True,
        "titles" : ["Brand", "Name", "Link","Price", "Details", "Image_URL", "Tech_Specs"]
    }
}


triathletesports_config = {
        "base_url": "https://www.triathletesports.com",
        "name":"triathletesports",
        "categories": {
            "swim": "/swim/",
            #"bike": "/bike/",
            #"run": "/run/"
        },
        "selectors": {
            "brand_name": {'tag': 'p', "attributes" : {'class': 'card-text brand-name', 'data-test-info-type':"brandName"}},
            "product_name": {'tag': 'h4',"attributes" : {'class': 'card-title'}},
            "product_price": {'tag': 'span', 'attributes' :{ 'class': 'price price--withoutTax'}},
            "product_link": {'tag': 'a', 'attributes' : {'class': 'card-figure__link'}},
            "details": {'tag': 'span', 'attributes' : {'class': 'Y2IQFc'}},
            "img": {'tag': 'a', "attributes": {'target':"_blank"}},
            "next_page": {'tag': 'a', "attributes": {'class': 'pagination-link', 'aria-label': 'Next'}}
        },
        "config" : {
        # half : needs to be added to base
        # full : doesn't need to be added to base
        "pages_url" : "full",
        "img_url_need_https":False,
        "titles" : ["Brand", "Name", "Link","Price", "Details", "Image_URL"]
    }
    }