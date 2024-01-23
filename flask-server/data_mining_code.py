import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import os   
import concurrent.futures


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
}
session = requests.Session()
session.headers.update(headers)


def scrape_and_save_data(url, headers=headers):
    response = session.get(url)

    team_data_dict = {}
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'lxml')
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

            # Convert DataFrame to dictionary
            team_data_dict[f'team_{i + 1}'] = df.to_dict(orient='records')

    return team_data_dict

            

def scrape_bans(url, headers=headers):
    response = session.get(url)
    soup = BeautifulSoup(response.content, 'lxml')

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

    bans_dict = {'1': team_bans[0], '2': team_bans[1]}
    return bans_dict

      

def scrape_score_box(url, headers=headers):
    response = session.get(url)
    soup = BeautifulSoup(response.content, 'lxml')

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
    return json_object

def mine_game_panel_data(link):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        team_data_future = executor.submit(scrape_and_save_data, link)
        team_bans_future = executor.submit(scrape_bans, link)

    team_data = team_data_future.result()
    team_bans = team_bans_future.result()
    return {'team_data': team_data, 'team_bans': team_bans}

def mine_game_data(link):
    teams_scores = scrape_score_box(link)
    return teams_scores

session.close()
