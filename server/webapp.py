import json

from flask import Flask, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from karaoke import return_search_options, return_karaoke_video

app = Flask(__name__, static_folder="../client/build", static_url_path='')
CORS(app)


@app.route('/v1.0/search_songs', methods=['POST'])
@cross_origin(supports_credentials=True)
def search_songs():
    search_query = request.data.decode()
    search_query = json.loads(search_query)
    mapping = return_search_options(search_query.get('search'))

    response = json.dumps({'mapping': mapping})
    return response, 200


@app.route('/v1.0/get_karaoke_from_url', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_karaoke_from_url():
    search_query = request.data.decode()
    search_query = json.loads(search_query)
    url = return_karaoke_video(search_query.get('url'))

    response = json.dumps({'url': url})
    return response, 200


@app.route('/')
@cross_origin(supports_credentials=True)
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run()