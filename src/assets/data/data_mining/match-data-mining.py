import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import os

def scrape_and_save_data(url, headers):
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        tables = soup.find_all('table')
        tables = [tables[0], tables[6]]


        for i, table in enumerate(tables):
            img_tags = table.select('img.champion_icon')
            champions = []
            for img_tag in img_tags:
                alt_text = img_tag.get('alt', 'No alt text')
                champions.append(alt_text)
                
            df = pd.read_html(str(table))[0]
            df['Champion'] = champions

            json_data = df.to_json(orient='records', indent=2)
            json_file_path = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/game_data", f'team_{i + 1}.json')
            with open(json_file_path, 'w') as json_file:
                json_file.write(json_data)
            

def scrape_bans(url, headers):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    bans_divs = soup.find_all('div', string='Bans')
    team_bans = []
    for bans_div in bans_divs:
        bans = []
        img_tags = bans_div.find_next('div').find_all('img', alt=True)
        for img in img_tags:
            alt_text = img.get('alt')
            if alt_text:
                bans.append(alt_text)
        team_bans.append(bans)

    json_object = {'1': team_bans[0], '2': team_bans[1]}
    json_data = json.dumps(json_object, indent=2)
    json_file_path = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/game_data", "team_bans.json")
    with open(json_file_path, 'w') as json_file:
        json_file.write(json_data)
      

def scrape_score_box(url, headers):
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    score_box_spans = soup.find_all('span', class_='score-box blue_line')
    team_1_scores_dict = {}
    team_1_scores_dict["Drakes"] = []

    for score_box_span in score_box_spans:
        img_tag = score_box_span.find('img', alt=True)
        alt_text = img_tag['alt']
        span_text = score_box_span.get_text(strip=True)
        team_1_scores_dict[alt_text] = span_text
        img_tag = score_box_span.find_next_sibling('img')
        if img_tag:
            alt_text = img_tag.get('alt')
            if (alt_text == "First Tower"):
                team_1_scores_dict["First_Tower"] = True
            elif (alt_text == "First Blood"):
                team_1_scores_dict["First_Blood"] = True
            elif "Drake" in alt_text:
                team_1_scores_dict["Drakes"].append(alt_text)

    team_2_scores_dict = {}
    team_2_scores_dict["Drakes"] = []
    score_box_spans = soup.find_all('span', class_='score-box red_line')
    for score_box_span in score_box_spans:
        img_tag = score_box_span.find('img', alt=True)
        alt_text = img_tag['alt']
        span_text = score_box_span.get_text(strip=True)
        team_2_scores_dict[alt_text] = span_text
        img_tag = score_box_span.find_next_sibling('img')
        if img_tag:
            alt_text = img_tag.get('alt')
            if (alt_text == "First Tower"):
                team_2_scores_dict["First_Tower"] = True
            elif (alt_text == "First Blood"):
                team_2_scores_dict["First_Blood"] = True
            elif "Drake" in alt_text:
                team_2_scores_dict["Drakes"].append(alt_text)

    json_object = {'1': team_1_scores_dict, '2': team_2_scores_dict}
    json_data = json.dumps(json_object, indent=2)
    json_file_path = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/game_data", "team_objectives.json")
    with open(json_file_path, 'w') as json_file:
        json_file.write(json_data)
         


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
}


def mine_game_data(link):
    scrape_and_save_data(link, headers)
    scrape_bans(link, headers)
    scrape_score_box(link, headers)


mine_game_data("https://gol.gg/game/stats/53903/page-game/")