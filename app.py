from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
# import uuid
from sqlalchemy import UUID
from flask_socketio import SocketIO

class Base(DeclarativeBase):
    pass

app = Flask(__name__, template_folder="./templates", static_folder="./static")
socketio = SocketIO(app, cors_allowed_origins="*")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(model_class=Base)

# Database Models

class User(db.Model):
    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, nullable=False)
    username: Mapped[str] = mapped_column(unique=True, nullable=False)

@app.route('/')
def main() -> None:
    return render_template('login.html')

@app.route('/chat')
def chat() -> None:
    return render_template('chat.html')

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    socketio.run(app)
