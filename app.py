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

@app.route('/api/login', methods=['POST'])
def login():
    username = None
    data = request.get_json()
    username = data.get('username')

    if not username:
        pass
        # return ...

    # Find or create the user
    existing = User.query.filter_by(username=username).first()
    if not existing:
        # add new user...
        # new_user = ...
        try:
            pass
        except Exception as e:
            db.session.rollback()
            # Return a JSON error so clients can handle it
            # return ...
    else:
        new_user = existing

    session['user_id'] = str(new_user.id)
    session['username'] = new_user.username

    # Return JSON representation of the user
    # return ...

### SocketIO Events

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    socketio.run(app)
