CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

INSERT or IGNORE INTO users(user_id, name) VALUES (1, 'Jonas Brothers');
INSERT or IGNORE INTO users(user_id, name) VALUES (2, 'Heavy Steppers');
INSERT or IGNORE INTO users(user_id, name) VALUES (3, 'Lauv');
INSERT or IGNORE INTO users(user_id, name) VALUES (4, 'Blackbear');
