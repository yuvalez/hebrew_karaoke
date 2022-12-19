from bs4 import BeautifulSoup
import requests
import re
from urllib import parse

HEADERS = {
        'cookie': "PHPSESSID=e706925db47e3d64ff6406f35921e05a; __utma=229978118.1578746696.1671125930.1671125930.1671125930.1; __utmc=229978118; __utmz=229978118.1671125930.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not provided); __utmt=1; __utmb=229978118.5.10.1671125930"}

def return_search_options(search_word):
    parsed_search = parse.quote_plus(search_word)

    response = requests.get(f"https://www.karaoke.co.il/searchresults.php?Sstr={parsed_search}", headers=HEADERS)

    soup = BeautifulSoup(response.text, 'html.parser')
    result_boxes = soup.find_all(class_="result_box")

    mapping = [{
        'url': value.find('a').get('href'),
        'title': value.find('img').get('title').replace('פלייבק וקליפ קריוקי של', '').replace("&quot;", '"').split('-')[0].strip(),
        'artist': value.find('img').get('title').replace('פלייבק וקליפ קריוקי של', '').replace("&quot;", '"').split('-')[1].strip()
    } for index, value in enumerate(result_boxes)]
    return mapping


def return_karaoke_video(url):
    response = requests.get(url, headers=HEADERS)
    pattern = re.compile("https://www.karaoke.co.il/develop/.+noadv=true")
    examples = pattern.findall(response.text)
    return parse.unquote_plus(examples[0].replace('https://www.karaoke.co.il/develop/videoplaybackframe.php?',
                                                  '').replace('&time_limit=30', '').replace('simple=true', 'simple=false'))
