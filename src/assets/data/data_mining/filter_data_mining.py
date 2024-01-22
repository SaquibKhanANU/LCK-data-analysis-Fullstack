import requests
from bs4 import BeautifulSoup

urls = [
"https://gol.gg/champion/list/season-S14/split-ALL/tournament-LCK%20Spring%202024/"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
}

def get_champion_filter_data(url, headers, json_file_path):
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        print(soup.prettify())
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")


get_champion_filter_data(urls[0], headers, json_file_path_champions)