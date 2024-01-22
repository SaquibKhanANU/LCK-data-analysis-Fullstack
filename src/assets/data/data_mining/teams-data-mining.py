import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import os
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, jsonify

def scrape_and_save_data(url, headers, json_file_path, num):
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        tables = soup.find_all('table')
        df = pd.read_html(str(tables[num]))[0]
        print("Data successfully scraped and saved.")
        return df
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")

def scrape_and_save_data_parallel(url, headers, json_file_path, num):
    with ThreadPoolExecutor() as executor:
        df = executor.submit(scrape_and_save_data, url, headers, json_file_path, num)
        return df.result()

def get_champion_filter_data(df):
    champion_data = []
    names_list = df['Champion'].tolist()
    for name in names_list:
        champion_info = {
            'name': name,
            'logo': f"https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/{name.replace(" ", "")}.png"
        }
        champion_data.append(champion_info)
    json_file_path_filter_champions = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/filter_data", "filter_champions.json")
    with open(json_file_path_filter_champions, 'w') as json_file:
        json.dump(champion_data, json_file, indent=2)
    
        
# Example usage:
urls = [
    "https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LCK%20Spring%202024/",
    "https://gol.gg/players/list/season-ALL/split-ALL/tournament-LCK%20Spring%202024/",
    "https://gol.gg/tournament/tournament-ranking/LCK%20Spring%202024/",
    "https://gol.gg/champion/list/season-S14/split-ALL/tournament-LCK%20Spring%202024/"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
}
json_file_path_teams = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/2024_season_data", "team_data_spring.json")
json_file_path_players = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/2024_season_data", "player_data_spring.json")
json_file_path_standings = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/2024_season_data", "standings_data_spring.json")
json_file_path_champions = os.path.join("c:/Coding/T1-Data-React.js/t1-data-react/src/assets/data/2024_season_data", "champions_data_spring.json")

def get_data_teams():
    df_teams = scrape_and_save_data_parallel(urls[0], headers, json_file_path_teams, 1)
    json_data_teams = df_teams.set_index('Name').to_json(orient='index', indent=2)
    with open(json_file_path_teams, 'w') as json_file:
        json_file.write(json_data_teams)

def get_data_players():
    df_players = scrape_and_save_data_parallel(urls[1], headers, json_file_path_players, 3)
    json_data_players = df_players.set_index('Player').to_json(orient='index', indent=2)
    with open(json_file_path_players, 'w') as json_file:
        json_file.write(json_data_players)

def get_data_standings():
    df_standings = scrape_and_save_data_parallel(urls[2], headers, json_file_path_standings, 0)
    df_standings = df_standings.dropna()
    json_data_standings = df_standings.set_index('Team').to_json(orient='index', indent=2)
    with open(json_file_path_standings, 'w') as json_file:  
        json_file.write(json_data_standings)

def get_data_champions():
    df_champions = scrape_and_save_data_parallel(urls[3], headers, json_file_path_champions, 5)
    json_data_champions = df_champions.set_index('Champion').to_json(orient='index', indent=2)
    with open(json_file_path_champions, 'w') as json_file:
        json_file.write(json_data_champions)
    
    