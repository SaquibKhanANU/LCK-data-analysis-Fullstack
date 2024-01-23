from flask import Flask, jsonify, request
from data_mining_code import mine_game_data, mine_game_panel_data   
import concurrent.futures

app = Flask(__name__)

# Members API Route

@app.route('/api/get_game_panel_data', methods=['GET'])
def get_match_panel_data():
    link = request.args.get('link', '')
    data = mine_game_panel_data(link)
    return jsonify(data)

@app.route('/api/get_game_data', methods=['GET'])
def get_match_data():
    link = request.args.get('link', '')
    data = mine_game_data(link)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)