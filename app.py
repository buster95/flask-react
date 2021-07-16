from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api
from api.services.database import db
from api.services.marshmallow import ma
from api.routes.task_controller import TaskController1, TaskController2

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///crud_todo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
api = Api(app, prefix='/api')
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

db.init_app(app)
ma.init_app(app)
db.create_all(app=app)


@app.route('/api')
def hello_world():
    return 'Welcome API example!!'

api.add_resource(TaskController1, '/task')
api.add_resource(TaskController2, '/task/<int:taskId>')


if __name__ == '__main__':
    app.run(debug=True)
