CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,

    full_name VARCHAR(255) NOT NULL,

    age INTEGER,

    gender VARCHAR(50),

    description TEXT,

    last_seen_station VARCHAR(255),

    reporter_name VARCHAR(255),

    reporter_phone VARCHAR(50),

    image1 TEXT,

    image2 TEXT,

    image3 TEXT,

    status VARCHAR(50) DEFAULT 'missing',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);