import requests
from bs4 import BeautifulSoup
import json
import time
import re
import sys
import os

class tri_site_handler:
    def __init__(self, config) -> None:
        self.name = config['name']
        self.base_url = config['base_url']
        self.categories = config['categories']
        self.selectors = config['selectors']
        self.config = config['config']
        self.data = {}
        
    def save(self):
        with open(self.name + ".json", "w", encoding="utf-8") as outfile:
            json.dump(self.data, outfile, indent=4, ensure_ascii=False)
            
            print(f"Saved as : {self.name + '.json'}")
            
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
                        current_url = self.base_url + next_url
                    elif self.config['pages_url'] == "full":
                        current_url = next_url

                current_category_products = {title:[] for title in self.config['titles']}
                keys  = current_category_products.keys()

                print(f"Attempting to fetch f{current_url}", end=" -- ")
                response = requests.get(current_url)          
                print(f"Successfully Fetched. Now extracting begins. ")
                soup = BeautifulSoup(response.content, "html.parser")
                
                if "Brand" in keys:
                    current_category_products["Brand"] = [x.text.strip() for x in soup.find_all(self.selectors["brand_name"]["tag"], self.selectors["brand_name"]["attributes"])]
                if "Name" in keys:
                    current_category_products["Name"]  = [x.text.strip() for x in soup.find_all(self.selectors["product_name"]["tag"], self.selectors["product_name"]["attributes"])]
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
                
                max_len = len(current_category_products["Link"])
                # Now lets obtain infomation from the product page
                if "Link" in keys:       
                    for counter, link in enumerate(current_category_products["Link"]):
                        os.system("clear")
                        print(f"Current url : {current_url}")
                        print(f"Page : {page_number} - {link}")
                        print(f"Counter : ({counter}/{max_len})")
                        inner_response = requests.get(link)
                        inner_soup = BeautifulSoup(inner_response.content, "html.parser")

                        if "Details" in keys:
                            current_category_products["Details"].append([detail.text.strip() for detail in inner_soup.find_all(self.selectors["details"]["tag"], self.selectors["details"]["attributes"])])
                        
                        if "Tech_Specs" in keys:
                            spec_title = inner_soup.find_all(self.selectors["spec_title"]["tag"], self.selectors["spec_title"]["attributes"])
                            spec_value = inner_soup.find_all(self.selectors["spec_value"]["tag"], self.selectors["spec_value"]["attributes"])
                            current_category_products["Tech_Specs"].append({ title.text.strip() : value.text.strip() for title,value in zip(spec_title, spec_value)})
                        
                        if "Image_URL" in keys:
                            img_url = inner_soup.find(self.selectors["img"]["tag"], self.selectors["img"]["attributes"])
                            if self.config["img_url_need_https"]:
                                current_category_products["Image_URL"].append("https:"+img_url.get(self.selectors["img"]["get_tag"]))
                            elif not self.config["img_url_need_https"]:
                                current_category_products["Image_URL"].append(img_url.get(self.selectors["img"]["get_tag"]))
                
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
                page_number+=1
                next_url = next_page.get("href")
                
                

                
class triathletesports(tri_site_handler):
    pass

class competitivecyclist(tri_site_handler):
    pass
                        
class bikeexchange(tri_site_handler):
    pass


from site_config import competitivecyclist_config, triathletesports_config


cc = competitivecyclist(config=competitivecyclist_config)
cc.run()
cc.save()

#ts = triathletesports(config=triathletesports_config)
#ts.run()
#ts.save()