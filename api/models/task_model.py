from api.services.database import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field


class TaskModel(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(255), nullable=False, default='')
    iscompleted = db.Column(db.Boolean, nullable=False, default=False)

    def __str__(self) -> str:
        return f'Task-{self.id}: {self.task}'


class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TaskModel
        include_relationships = True
        load_instance = True
