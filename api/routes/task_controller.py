from flask import request
from flask_restful import Resource
from api.services.database import db
from api.models.task_model import TaskModel, TaskSchema


class TaskController1(Resource):
    def get(self):
        data = db.session.query(TaskModel).all()
        return TaskSchema().dump(data, many=True), 200

    def post(self):
        task: TaskModel = TaskSchema().load(request.json, many=False, session=db.session)
        db.session.add(task)
        db.session.commit()
        return TaskSchema().dump(task), 201


class TaskController2(Resource):
    def get(self, taskId: int):
        data = db.session.query(TaskModel).filter_by(id=taskId).first()
        return TaskSchema().dump(data), (data == None and 404 or 200)

    def put(self, taskId: int):
        data = db.session.query(TaskModel).filter_by(id=taskId).first()
        if data == None:
            return {'message': 'Not Found'}, 404
        data = TaskSchema().load(request.json, many=False, session=db.session)
        db.session.commit()
        return TaskSchema().dump(data), 200

    def delete(self, taskId: int):
        data = db.session.query(TaskModel).filter_by(id=taskId).first()
        if data == None:
            return {'message': 'Not Found'}, 404
        db.session.delete(data)
        db.session.commit()
        return {'message': 'success'}, 200
