import requests
from bs4 import BeautifulSoup
import json
import time
import re

CONFIG = {
    "bikeexchange" : { 
    "base_url": "https://www.bikeexchange.com",
    "categories": {
        "triathlon_bikes": "/en-US/bikes/road-bikes/triathlon-bikes"
    },
    "selectors": {
        "product_list_container": {'tag': 'div', 'class': 'grid-flow-row'},
        "product_item": {'tag': 'div', 'class': 'col-span-1'},
        "product_name": {'tag': 'div', 'class': 'overflow-hidden truncate font-heading text-lg font-semibold transition duration-300 ease-in-out hover:underline hover:underline-offset-4'},
        "product_link": {'tag': 'a', 'class': None},
        "product_price": {'tag': 'div', 'class': 'text-base font-semibold'},
        "description_container": {'tag': 'div', 'class': 'flex items-center gap-6 py-4'},
        "description": {'tag': 'div', 'class': 'flex'},
    }
    }
    
}

class tri_site_handler:
    def __init__(self, config) -> None:
        self.name = config['name']
        self.base_url = config['base_url']
        self.categories = config['categories']
        self.selectors = config['selectors']
        self.config = config['config']
        self.data = {}
        
    def getting_started(self, soup):
        brand_names = soup.find_all(self.selectors["brand_name"]["tag"], self.selectors["brand_name"]["attributes"])
        product_names = soup.find_all(self.selectors["product_name"]["tag"], self.selectors["product_name"]["attributes"] )
        product_links = soup.find_all(self.selectors["product_link"]["tag"], self.selectors["product_link"]["attributes"])
        product_price = soup.find_all(self.selectors["product_price"]["tag"], self.selectors["product_price"]["attributes"])

        return brand_names, product_names, product_links, product_price

    def save(self):
        with open(self.name + ".json", "w", encoding="utf-8") as outfile:
            json.dump(self.data, outfile, indent=4, ensure_ascii=False)
            
    def extract_current_price(self, price_string):
        match = re.search(r"\$([\d,]+\.\d{2})", price_string)
        if match:
            price = float(match.group(1).replace(',', ''))
            return price
        else:
            return None

    def run(self):
        for catergory, url in self.categories.items():
            page_number = 1
            next_url = ""
            
            while True:
                print(f"Site : {self.base_url} | Page : {page_number}")

                # Create current url for the loop
                if page_number == 1:
                    current_url = self.base_url + url
                else:
                    if self.config['pages_url'] == "half":
                        current_url = self.base_url + url
                    elif self.config['pages_url'] == "full":
                        current_url = next_url

                current_category_products = {title:[] for title in self.config['titles']}
                keys  = current_category_products.keys()

                print(f"Attempting to fetch f{current_url}", end=" -- ")
                response = requests.get(current_url)          
                print(f"Successfully Fetched. Now extracting begins. ")
                soup = BeautifulSoup(response.content, "html.parser")

                if "Brand" in keys:
                    current_category_products["Brand"] = soup.find_all(self.selectors["brand_name"]["tag"], self.selectors["brand_name"]["attributes"])
                if "Name" in keys:
                    current_category_products["Name"]  = soup.find_all(self.selectors["product_name"]["tag"], self.selectors["product_name"]["attributes"] )
                if "Link" in keys:
                    product_links = soup.find_all(self.selectors["product_link"]["tag"], self.selectors["product_link"]["attributes"])
                    product_links_revised = []
                    for product in product_links:
                        if self.config['pages_url'] == "half":
                            product_links_revised.append(self.base_url+product.get("href"))
                        elif self.config['pages_url'] == "full":
                            product_links_revised.append(product.get("href"))
                    current_category_products["Link"] = product_links_revised                
                if "Price" in current_category_products.keys():
                    product_price = soup.find_all(self.selectors["product_price"]["tag"], self.selectors["product_price"]["attributes"])
                    current_category_products["Price"] = [self.extract_current_price(price.text.strip()) for price in product_price]
                
                # Now lets obtain infomation from the product page
                if "Link" in keys:       
                    for link in current_category_products["Link"]:
                        print(f" -- INNER page : {link} ",end= " - ")
                        inner_response = requests.get(link)
                        inner_soup = BeautifulSoup(inner_response.content, "html.parser")
                        print(f"Successfully Fetched. Now extracting begins. ")

                        if "Details" in keys:
                            current_category_products["Details"].append([detail.text.strip() for detail in inner_soup.find_all(self.selectors["details"]["tag"], self.selectors["details"]["attributes"])])
                        if "Image_URL" in keys:
                            img_url = inner_soup.find(self.selectors["img"]["tag"], self.selectors["img"]["attributes"])
                            if self.config["img_url_need_https"]:
                                current_category_products["Image_URL"].append("https:"+img_url.get("src"))
                            if not self.config["img_url_need_https"]:
                                current_category_products["Image_URL"].append(img_url.get("src"))
                
                products_dict = []
                for index in range(len(current_category_products[list(keys)[0]])):
                    item_dict = {}
                    for key in keys:
                        item_dict[key] = current_category_products[key][index]
                products_dict.append(item_dict)
                
                self.data[catergory + " : " + str(page_number)] = products_dict
                
                # Check for next page
                next_page = soup.find(self.selectors['next_page']['tag'], self.selectors['next_page']['attributes'])
                if not next_page:
                    break
                break
                page_number+=1
                next_url = next_page.get("href")
                
class triathletesports(tri_site_handler):
    pass

 
class competitivecyclist(tri_site_handler):
    def run(self):
        for catergory, url in self.categories.items():
            page_number = 1
            next_url = ""
            while True:
                print(f"ON PAGE {page_number}")
                if page_number == 1:
                    current_url = self.base_url+url
                else:
                    current_url = self.base_url+next_url
                    
                current_category_products = []
                print(f"Attempting to fetch f{current_url}", end=" -- ")
                response = requests.get(current_url)
                print(f"Successfully Fetched. Now extracting begins. ")
                soup = BeautifulSoup(response.content, "html.parser")
                
                brand_names, product_names, product_links, product_price = self.getting_started(soup=soup)
                
                product_links_formated = []
                product_details = []
                image_urls =[]
                tech_specs = []
                for product in product_links:
                    current_link = self.base_url+product.get("href")
                    product_links_formated.append(current_link)
                    print(f" -------------- Attempting to Inner fetch {current_link}" ,end=" -- ")
                    inner_response = requests.get(current_link)
                    inner_soup = BeautifulSoup(inner_response.content, "html.parser")
                    print(f"Successfully Fetched. Now extracting begins. ")
                    #IMAGE URL
                    img_url = inner_soup.find(self.selectors["img"]["tag"], self.selectors["img"]["attributes"])
                    image_urls.append("https:"+img_url.get("src"))       
                    #TECH SPEC
                    spec_title = inner_soup.find_all(self.selectors["spec_title"]["tag"], self.selectors["spec_title"]["attributes"])
                    spec_value = inner_soup.find_all(self.selectors["spec_value"]["tag"], self.selectors["spec_value"]["attributes"])
                    tech_specs.append({ title.text.strip() : value.text.strip() for title,value in zip(spec_title, spec_value)})

                    #DETAILS
                    details = []
                    for detail in inner_soup.find_all(self.selectors["details"]["tag"], self.selectors["details"]["attributes"]):
                        details.append(detail.text.strip())
                    product_details.append(details)
                
                #print(f"Brands : {len(brand_names)} , Product-Name : {len(product_names)} , Product-Links : {len(product_links_formated)} , Product Price : {len(product_price)}")

                for brand, name, page_link, price, details, image_url, tech_spec in zip(brand_names, product_names, product_links_formated, product_price, product_details, image_urls, tech_specs):
                    
                    current_category_products.append({"Brand" : brand.text.strip(), 
                                                    "Name" : name.text.strip(), 
                                                    "Link" : page_link,
                                                    "Price" : self.extract_current_price(price.text.strip()),
                                                    "Details" : details,
                                                    "Image_URL" : image_url,
                                                    "Tech_Specs": tech_spec})
                
                self.data[catergory+" : "+str(page_number)] = current_category_products
                
                next_page = soup.find(self.selectors['next_page']['tag'], self.selectors['next_page']['attributes'])
                if not next_page:
                    break
                
                page_number+=1
                next_url = next_page.get("href")
                

        
        
class bikeexchange(tri_site_handler):
    pass


from site_config import competitivecyclist_config, triathletesports_config


#cc = competitivecyclist(config=competitivecyclist_config)
#cc.run()
#cc.save()

ts = triathletesports(config=triathletesports_config)
ts.run()
ts.save()