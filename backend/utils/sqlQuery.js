export const createUsersTableQuery = `
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        student BOOLEAN NOT NULL,
        coach BOOLEAN NOT NULL
    );
    INSERT INTO Users (Name, Phone, Student, Coach)
    VALUES ('John Doe', '1111111111', false, true);
    INSERT INTO Users (Name, Phone, Student, Coach)
    VALUES ('Jane Doe', '2222222222', false, true);
    INSERT INTO Users (Name, Phone, Student, Coach)
    VALUES ('Juan Garcia', '3333333333', false, true);
    INSERT INTO Users (Name, Phone, Student, Coach)
    VALUES ('Tom Johnson', '4444444444', true, false);
    INSERT INTO Users (Name, Phone, Student, Coach)
    VALUES ('Maria Gomez', '5555555555', true, false);
    INSERT INTO Users (Name, Phone, Student, Coach)
    VALUES ('Sam Smith', '6666666666', true, false);
`

export const createEventsTableQuery = `
    CREATE TABLE events(
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        startTime TIME NOT NULL,
        endTime TIME NOT NULL,
        coachName VARCHAR(50) NOT NULL,
        coachPhone VARCHAR(50) NOT NULL,
        studentName VARCHAR(50) DEFAULT NULL,
        studentPhone VARCHAR(50) DEFAULT NULL,
        studentSatisfaction INTEGER DEFAULT NULL,
        notes VARCHAR(100) DEFAULT NULL
    );
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone, studentSatisfaction, notes)
    VALUES ('4/11/2025', '9:00', '11:00', 'John Doe', '1111111111', 'Maria Gomez', '5555555555', 4, 'Random notes go here...');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone)
    VALUES ('4/15/2025', '15:00', '17:00', 'Juan Garcia', '3333333333', 'Maria Gomez', '5555555555');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone)
    VALUES ('4/15/2025', '17:00', '19:00', 'Juan Garcia', '3333333333', 'Tom Johnson', '4444444444');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone)
    VALUES ('4/11/2025', '15:00', '17:00', 'Jane Doe', '2222222222', 'Tom Johnson', '4444444444');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone)
    VALUES ('4/11/2025', '13:00', '15:00', 'John Doe', '1111111111', 'Sam Smith', '6666666666');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone)
    VALUES ('4/13/2025', '13:00', '15:00', 'Jane Doe', '2222222222', 'Sam Smith', '6666666666');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone, studentSatisfaction, notes)
    VALUES ('4/15/2025', '13:00', '15:00', 'Juan Garcia', '3333333333', 'Tom Johnson', '4444444444', 3, 'Session notes go here...');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone, studentSatisfaction, notes)
    VALUES ('4/13/2025', '15:00', '17:00', 'Jane Doe', '2222222222', 'Maria Gomez', '5555555555', 5, 'Notes notes notes notes notes');
    INSERT INTO Events (date, startTime, endTime, coachName, coachPhone, studentName, studentPhone, studentSatisfaction, notes)
    VALUES ('4/11/2025', '11:00', '13:00', 'John Doe', '1111111111', 'Tom Johnson', '4444444444', 1, 'Bad session notes here...');
`

export const getAllUsersQuery = `
    SELECT * FROM users;
`

export const getAllEventsQuery = `
    SELECT * FROM events;
`

export const createEventQuery = `
    INSERT INTO events(date, startTime, endTime, coachName, coachPhone)
    VALUES($1, $2, $3, $4, $5) RETURNING *;
`

export const updateEventQuery = `
    UPDATE events
    SET
    date = COALESCE($1, date),
    startTime = COALESCE($2, startTime),
    endTime = COALESCE($3, endTime),
    coachName = COALESCE($4, coachName),
    coachPhone = COALESCE($5, coachPhone),
    studentName = COALESCE($6, studentName),
    studentPhone = COALESCE($7, studentPhone),
    studentSatisfaction = COALESCE($8, studentSatisfaction),
    notes = COALESCE($9, notes)
    WHERE id = $10
    RETURNING *;
`