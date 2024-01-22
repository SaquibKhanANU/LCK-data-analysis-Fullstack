import asyncio
import requests
import json
import os
import urllib.parse
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
import aiohttp

base_url = 'https://gol.gg/'
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
urls = [
    "https://gol.gg/tournament/tournament-matchlist/LCK%20Spring%202024/",
    "https://gol.gg/tournament/tournament-matchlist/LCK%20Spring%20Playoffs%202023/",
    "https://gol.gg/tournament/tournament-matchlist/LCK%20Summer%202023/",
    "https://gol.gg/tournament/tournament-matchlist/LCK%20Summer%20Playoffs%202023/",
    "https://gol.gg/tournament/tournament-matchlist/LCK%20Regional%20Finals%202023/"
]

columns_headers = ['teams', 'team1', 'score', 'team2', 'week', 'patch', 'date']
file_names = ['spring', 'spring_playoffs', "summer", "summer_playoffs", "regionals"]


def get_logo(team_name):
    logos = {
        "Gen.G eSports": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1655210113163_GenG_logo_200407-05.png",
        "T1": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1704375161752_T1_esports.png",
        "Hanwha Life eSports": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819564399_hle-2021-worlds.png",
        "KT Rolster": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fkt_darkbackground.png",
        "Dplus KIA": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1673260049703_DPlusKIALOGO11.png",
        "DRX": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1672910733664_01.Basic_W.png",
        "FearX": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1704371545847_teamlogo_Fullcolorfordark.png",
        "Kwangdong Freecs": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1641186009897_KDF_KR_logo.png",
        "OK BRION": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1684916981638_OKSavingsBankBRION_fullcolor_darkbg_vertical.png",
        "Nongshim RedForce": "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FNSFullonDark.png"
    }
    return logos.get(team_name, None)

def get_shorthand(team_name):
    logos = {
        "Gen.G eSports": "GENG",
        "T1": "T1",
        "Hanwha Life eSports": "HLE",
        "KT Rolster": "KT",
        "Dplus KIA": "DK",
        "DRX": "DRX",
        "FearX": "FOX",
        "Kwangdong Freecs": "KDF",
        "OK BRION": "BRO",
        "Nongshim RedForce": "NS"
    }
    return logos.get(team_name, None)

async def scrape_games(request_url):
    games = []

    async with aiohttp.ClientSession() as session:
        async with session.get(request_url, headers=headers) as response:
            if response.status == 200:
                soup = BeautifulSoup(await response.text(), 'html.parser')

                game_menu_div = soup.find('div', {'class': 'collapse navbar-collapse', 'id': 'gameMenuToggler'})

                if game_menu_div:
                    # Extract the list items (li) inside the div
                    list_items = game_menu_div.find_all('li')

                    for li in list_items:
                        # Extract the href value and text inside the <a> tag
                        a_tag = li.find('a')
                        if a_tag:
                            href_value = urllib.parse.urljoin(base_url, a_tag.get('href'))
                            text_value = a_tag.text.strip()
                            games.append({'game_number': text_value, 'game_data_link': href_value})

    return games


async def scrape_and_save_data(url, columns_headers, output_filename):
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            if response.status == 200:
                soup = BeautifulSoup(await response.text(), 'html.parser')

                # Identify the table on the webpage, adjust the selector accordingly
                table = soup.find('tbody')

                # Initialize an empty list to store rows
                table_data = []

                # Create a list of tasks for each row
                tasks = []
                for row in table.find_all('tr'):
                    task = asyncio.ensure_future(process_row(row, columns_headers, table_data))
                    tasks.append(task)

                # Wait for all tasks to complete
                await asyncio.gather(*tasks)

                # Convert the list of row data to JSON
                json_data = json.dumps(table_data, indent=2)
                json_file_path = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/2024_season_data", output_filename)

                # Save the JSON data to a file
                with open(json_file_path, 'w') as json_file:
                    json_file.write(json_data)


async def process_row(row, columns_headers, table_data):
    # Initialize an empty dictionary to store the data for each row
    row_data = {}

    # Iterate through each cell (td) in the row
    for index, cell in enumerate(row.find_all('td')):
        # Use the index as a key (or customize it based on your needs)
        key = columns_headers[index]

        # Extract the text content of the cell and store it in the dictionary
        a_tag = cell.find('a')
        if a_tag:
            # Extract the href attribute from the <a> tag and store it in the dictionary
            row_data['games'] = await scrape_games(urllib.parse.urljoin(base_url, a_tag.get('href')))

        row_data[key] = cell.text.strip()

    row_data['logo1'] = get_logo(row_data['team1'])
    row_data['logo2'] = get_logo(row_data['team2'])
    row_data['shorthand1'] = get_shorthand(row_data['team1'])
    row_data['shorthand2'] = get_shorthand(row_data['team2'])

    # Add the row data to the list
    table_data.append(row_data)

# Use a ThreadPoolExecutor for parallel processing
with ThreadPoolExecutor() as executor:
    loop = asyncio.get_event_loop()
    tasks = [scrape_and_save_data(url, columns_headers, f"{file_name}_data.json") for url, file_name in zip(urls, file_names)]
    loop.run_until_complete(asyncio.gather(*tasks))






