import random
from datetime import datetime

import pyrebase
from flask import Blueprint, request

from config import config
from users import check_token

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("statistics", __name__, url_prefix="/statistics")


@bp.route("/unit_emotion", methods=["GET"])
def get_unit_emotion():
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    user_id = decoded["localId"]
    user = db.child("users").child(user_id).get().val()
    unit = user["affiliated_unit"]
    all_data = db.child("emotion_data").order_by_child("unit").equal_to(unit).get().val()

    count = {
        "happiness": 0,
        "anxious": 0,
        "surprise": 0,
        "anger": 0,
        "hurt": 0,
        "sadness": 0
    }

    total = 0

    for key in all_data:
        data = all_data[key]
        count[data["top_emotion"]] += 1
        total += 1

    return {"count": count, "total": total}, 200


@bp.route("/all", methods=["GET"])
def get_general_statistics():
    today = datetime.now().strftime("%Y-%m-%d")
    data = db.child("statistics").child("daily").child(today).get().val()
    return data if data is not None else {}, 200
