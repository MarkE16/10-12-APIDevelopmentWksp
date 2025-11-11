from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from uuid import uuid4 as uuid
from sqlalchemy import UUID
from flask_socketio import SocketIO, emit

class Base(DeclarativeBase):
    pass

app = Flask(__name__, template_folder="./templates", static_folder="./static")
socketio = SocketIO(app, cors_allowed_origins="*")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# Secret key for session management
# In a real app, this should be kept in a .env or in a
# key vault like AWS Secrets Manager, Azure Key Vault, Infisical, etc...
app.config['SECRET_KEY'] = 'f4be30ccd98f6c7a569e7ead66789a08'
db = SQLAlchemy(model_class=Base)

# Database Models

class User(db.Model):
    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, nullable=False)
    username: Mapped[str] = mapped_column(unique=True, nullable=False)

### Routes

@app.route('/')
def main() -> None:
    return render_template('login.html')

@app.route('/chat')
def chat() -> None:
    return render_template('chat.html', username=session.get('username'))

### Endpoints

### SocketIO Events

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    socketio.run(app)
