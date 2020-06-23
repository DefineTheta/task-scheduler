DROP DATABASE IF EXISTS `task_scheduler_plus`;

CREATE DATABASE IF NOT EXISTS `task_scheduler_plus`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `task_scheduler_plus`;

DROP TABLE IF EXISTS `Managers`;
CREATE TABLE `Managers` (
  manager_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  PRIMARY KEY (manager_id)
);

DROP TABLE IF EXISTS `Workers`;
CREATE TABLE `Workers` (
  worker_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  tasks_completed INT NOT NULL DEFAULT 0,
  current_level INT AS (FLOOR(tasks_completed / 5)),
  PRIMARY KEY (worker_id)
);

DROP TABLE IF EXISTS `Worker_Settings`;
CREATE TABLE `Worker_Settings` (
  worker_id INT NOT NULL,
  availibility VARCHAR(7) NOT NULL DEFAULT '1111111',
  PRIMARY KEY (worker_id)
);

DROP TABLE IF EXISTS `Workspaces`;
CREATE TABLE `Workspaces` (
  workspace_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (workspace_id)
);

DROP TABLE IF EXISTS `Workspaces_Managers`;
CREATE TABLE `Workspaces_Managers` (
  workspace_id INT NOT NULL,
  manager_id INT NOT NULL,
  CONSTRAINT PK_Workspaces_Managers PRIMARY KEY (workspace_id, manager_id),
  FOREIGN KEY (workspace_id) REFERENCES Workspaces(workspace_id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES Managers(manager_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Workspaces_Workers`;
CREATE TABLE `Workspaces_Workers` (
  workspace_id INT NOT NULL,
  worker_id INT NOT NULL,
  CONSTRAINT PK_Workspaces_Workers PRIMARY KEY (workspace_id, worker_id),
  FOREIGN KEY (workspace_id) REFERENCES Workspaces(workspace_id) ON DELETE CASCADE,
  FOREIGN KEY (worker_id) REFERENCES Workers(worker_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Tasks`;
CREATE TABLE `Tasks` (
  task_id INT NOT NULL AUTO_INCREMENT,
  workspace_id INT NOT NULL,
  worker_id INT,
  title VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT False,
  task_date DATE NOT NULL,
  CONSTRAINT PK_Task PRIMARY KEY (task_id, workspace_id),
  FOREIGN KEY (workspace_id) REFERENCES Workspaces(workspace_id) ON DELETE CASCADE,
  FOREIGN KEY (worker_id) REFERENCES Workers(worker_id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS `Task_Groups`;
CREATE TABLE `Task_Groups` (
  task_group_id INT NOT NULL AUTO_INCREMENT,
  workspace_id INT NOT NULL, 
  title VARCHAR(255) NOT NULL,
  PRIMARY KEY (task_group_id),
  FOREIGN KEY (workspace_id) REFERENCES Workspaces(workspace_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Tasks_Groups`;
CREATE TABLE `Tasks_Groups` (
  task_id INT NOT NULL,
  task_group_id INT NOT NULL,
  CONSTRAINT PK_Tasks_Groups PRIMARY KEY (task_id, task_group_id),
  FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,
  FOREIGN KEY (task_group_id) REFERENCES Task_Groups(task_group_id) ON DELETE CASCADE
);

-- Used for user login to check if username and password match --
DELIMITER //
CREATE PROCEDURE CheckUserExists(
  in_username VARCHAR(30), 
  in_pass VARCHAR(255),
  in_account_type INT
)
BEGIN
  IF in_account_type = 0 THEN
    SELECT manager_id
    FROM Managers
    WHERE username = in_username AND pass = in_pass;
  ELSEIF in_account_type = 1 THEN
    SELECT worker_id
    FROM Workers
    WHERE username = in_username AND pass = in_pass;
  END IF;
END //
DELIMITER ;

-- Used to create a new entry in managers table when new manager signs up --
DELIMITER //
CREATE PROCEDURE NewManager(
  in_first_name VARCHAR(255),
  in_last_name VARCHAR(255),
  in_email VARCHAR(255),
  in_username VARCHAR(30),
  in_pass VARCHAR(255)
)
BEGIN
  INSERT INTO Managers (first_name, last_name, email, username, pass)
  VALUES (in_first_name, in_last_name, in_email, in_username, in_pass);

  SELECT manager_id
  FROM Managers
  WHERE manager_id = LAST_INSERT_ID();
END //
DELIMITER ;

-- Used to update a manager's information --
DELIMITER //
CREATE PROCEDURE UpdateManager(
  in_manager_id INT,
  in_first_name VARCHAR(255),
  in_last_name VARCHAR(255),
  in_email VARCHAR(255),
  in_username VARCHAR(30),
  in_pass VARCHAR(255)
)
BEGIN
  UPDATE Managers
  SET first_name = in_first_name,
  last_name = in_last_name,
  email = in_email,
  pass = in_pass
  WHERE manager_id = in_manager_id;
END //
DELIMITER ;

-- Used to create a new entry in workers table when new worker signs up --
DELIMITER //
CREATE PROCEDURE NewWorker(
  in_first_name VARCHAR(255),
  in_last_name VARCHAR(255),
  in_email VARCHAR(255),
  in_username VARCHAR(30),
  in_pass VARCHAR(255)
)
BEGIN
  INSERT INTO Workers (first_name, last_name, email, username, pass)
  VALUES (in_first_name, in_last_name, in_email, in_username, in_pass);

  SET @inserted_worker_id = LAST_INSERT_ID();

  INSERT INTO Worker_Settings (worker_id, availibility)
  VALUES (@inserted_worker_id, "1111111");

  SELECT worker_id
  FROM Workers
  WHERE worker_id = LAST_INSERT_ID();
END //
DELIMITER ;

-- Used to update a worker's information --
DELIMITER //
CREATE PROCEDURE UpdateWorker(
  in_worker_id INT,
  in_first_name VARCHAR(255),
  in_last_name VARCHAR(255),
  in_email VARCHAR(255),
  in_username VARCHAR(30),
  in_pass VARCHAR(255)
)
BEGIN
  UPDATE Workers
  SET first_name = in_first_name,
  last_name = in_last_name,
  email = in_email,
  pass = MD5(in_pass)
  WHERE worker_id = in_worker_id;
END //
DELIMITER ;

-- Used to update a workers's availibility --
DELIMITER //
CREATE PROCEDURE UpdateWorkerAvailibility(
  in_worker_id INT,
  in_availibility VARCHAR(255)
)
BEGIN
  UPDATE Worker_Settings
  SET availibility = in_availibility
  WHERE worker_id = in_worker_id;
END //
DELIMITER ;

-- Used to get all the workspaces a manager manages --
DELIMITER //
CREATE PROCEDURE GetUserWorkspaces(in_user_id INT, in_user_type INT)
BEGIN
  IF in_user_type = 0 THEN
    SELECT Workspaces_Managers.workspace_id as workspace_id,
    Workspaces.name as workspace_name
    FROM Workspaces INNER JOIN Workspaces_Managers
    ON Workspaces.workspace_id = Workspaces_Managers.workspace_id
    WHERE Workspaces_Managers.manager_id = in_user_id;
  ELSEIF in_user_type = 1 THEN
    SELECT Workspaces_Workers.workspace_id as workspace_id,
    Workspaces.name as workspace_name
    FROM Workspaces INNER JOIN Workspaces_Workers
    ON Workspaces.workspace_id = Workspaces_Workers.workspace_id
    WHERE Workspaces_Workers.worker_id = in_user_id;
  END IF;
END //
DELIMITER ;

-- Used to a create new workspace --
DELIMITER //
CREATE PROCEDURE CreateNewWorkspace(
  in_workspace_name VARCHAR(255),
  in_manager_id INT
)
BEGIN
  INSERT INTO Workspaces (name)
  VALUES (in_workspace_name);

  INSERT INTO Workspaces_Managers (workspace_id, manager_id)
  VALUES (LAST_INSERT_ID(), in_manager_id);
END //
DELIMITER ;

-- Used to delete a workspace --
DELIMITER //
CREATE PROCEDURE DeleteWorkspace(
  in_workspace_id INT
)
BEGIN
  DELETE FROM Workspaces
  WHERE workspace_id = in_workspace_id;
END //
DELIMITER ;

-- Used to add a user to a workspace --
DELIMITER //
CREATE PROCEDURE JoinWorkspace(
  in_workspace_id INT,
  in_user_id INT,
  in_user_type INT
)
BEGIN
  IF in_user_type = 0 THEN
    INSERT INTO Workspaces_Managers (workspace_id, manager_id)
    VALUES (in_workspace_id, in_user_id);
  ELSEIF in_user_type = 1 THEN
    INSERT INTO Workspaces_Workers (workspace_id, worker_id)
    VALUES (in_workspace_id, in_user_id);
  END IF;
END //
DELIMITER ;

-- Used to search for a workspace --
DELIMITER //
CREATE PROCEDURE SearchForWorkspace(in_workspace_name VARCHAR(255))
BEGIN
  SELECT Workspaces.workspace_id as workspace_id,
  Workspaces.name as workspace_name
  FROM Workspaces
  WHERE Workspaces.name LIKE in_workspace_name
  LIMIT 5;
END //
DELIMITER ;

-- Used to check if user belongs to workspace --
DELIMITER //
CREATE PROCEDURE IsUserInWorkspace(
  in_workspace_id INT,
  in_user_id INT,
  in_user_type INT
)
BEGIN
  IF in_user_type = 0 THEN
    SELECT Count(1) as count
    FROM Workspaces_Managers
    WHERE workspace_id = in_workspace_id AND manager_id = in_user_id;
  ELSEIF in_user_type = 1 THEN
    SELECT Count(1) as count
    FROM Workspaces_Workers
    WHERE workspace_id = in_workspace_id AND worker_id = in_user_id;
  END IF;
END //
DELIMITER ;

-- Used to check if task is in workspace --
DELIMITER //
CREATE PROCEDURE IsTaskInWorkspace(
  in_workspace_id INT,
  in_task_id INT
)
BEGIN
  SELECT Count(1) as count
  FROM Tasks
  WHERE workspace_id = in_workspace_id AND task_id = in_task_id;
END //
DELIMITER ;

-- Used to get all the tasks today in a workspace --
DELIMITER //
CREATE PROCEDURE GetAllTodayTasks(
  in_workspace_id INT,
  in_today_date VARCHAR(255),
  in_specific_worker BOOLEAN,
  in_worker_id INT
)
BEGIN
  IF in_specific_worker = true THEN
    SELECT Tasks.task_id as task_id,
    Tasks.title as title,
    Tasks.color as color,
    Tasks.completed as completed,
    Tasks.task_date as date,
    Task_Groups.task_group_id as task_group_id,
    Task_Groups.title as task_group_title
    FROM Tasks LEFT JOIN Tasks_Groups
    ON Tasks.task_id = Tasks_Groups.task_id
    LEFT JOIN Task_Groups
    ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
    WHERE Tasks.workspace_id = in_workspace_id
    AND Tasks.worker_id = in_worker_id
    AND Tasks.task_date = STR_TO_DATE(in_today_date, '%d-%m-%Y');
  ELSE
    SELECT Tasks.task_id as task_id,
    Tasks.title as title,
    Tasks.color as color,
    Tasks.completed as completed,
    Tasks.task_date as date,
    Task_Groups.task_group_id as task_group_id,
    Task_Groups.title as task_group_title
    FROM Tasks LEFT JOIN Tasks_Groups
    ON Tasks.task_id = Tasks_Groups.task_id
    LEFT JOIN Task_Groups
    ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
    WHERE Tasks.workspace_id = in_workspace_id
    AND Tasks.task_date = STR_TO_DATE(in_today_date, '%d-%m-%Y');
  END IF;
END //
DELIMITER ;

-- Used to get all the tasks for this week in a workspace --
DELIMITER //
CREATE PROCEDURE GetAllWeekTasks(
  in_workspace_id INT,
  in_start_date VARCHAR(255),
  in_end_date VARCHAR(255),
  in_specific_worker BOOLEAN,
  in_worker_id INT
)
BEGIN
  IF in_specific_worker = true THEN
    SELECT Tasks.task_id as task_id,
    Tasks.title as title,
    Tasks.color as color,
    Tasks.completed as completed,
    Tasks.task_date as date,
    Task_Groups.task_group_id as task_group_id,
    Task_Groups.title as task_group_title
    FROM Tasks LEFT JOIN Tasks_Groups
    ON Tasks.task_id = Tasks_Groups.task_id
    LEFT JOIN Task_Groups
    ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
    WHERE Tasks.workspace_id = in_workspace_id
    AND Tasks.worker_id = in_worker_id
    AND Tasks.task_date >= STR_TO_DATE(in_start_date, '%d-%m-%Y') AND Tasks.task_date <= STR_TO_DATE(in_end_date, '%d-%m-%Y')
    ORDER BY Tasks.task_date ASC;
  ELSE
    SELECT Tasks.task_id as task_id,
    Tasks.title as title,
    Tasks.color as color,
    Tasks.completed as completed,
    Tasks.task_date as date,
    Task_Groups.task_group_id as task_group_id,
    Task_Groups.title as task_group_title
    FROM Tasks LEFT JOIN Tasks_Groups
    ON Tasks.task_id = Tasks_Groups.task_id
    LEFT JOIN Task_Groups
    ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
    WHERE Tasks.workspace_id = in_workspace_id
    AND Tasks.task_date >= STR_TO_DATE(in_start_date, '%d-%m-%Y') AND Tasks.task_date <= STR_TO_DATE(in_end_date, '%d-%m-%Y')
    ORDER BY Tasks.task_date ASC;
  END IF;
END //
DELIMITER ;

-- Used to get all the tasks in a workspace --
DELIMITER //
CREATE PROCEDURE GetAllTasks(
  in_workspace_id INT,
  in_specific_worker BOOLEAN,
  in_worker_id INT
)
BEGIN
  IF in_specific_worker = true THEN
    SELECT Tasks.task_id as task_id,
    Tasks.title as title,
    Tasks.color as color,
    Tasks.completed as completed,
    Tasks.task_date as date,
    Task_Groups.task_group_id as task_group_id,
    Task_Groups.title as task_group_title
    FROM Tasks LEFT JOIN Tasks_Groups
    ON Tasks.task_id = Tasks_Groups.task_id
    LEFT JOIN Task_Groups
    ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
    WHERE Tasks.workspace_id = in_workspace_id
    AND Tasks.worker_id = in_worker_id
    ORDER BY Tasks.task_date ASC;
  ELSE
    SELECT Tasks.task_id as task_id,
    Tasks.title as title,
    Tasks.color as color,
    Tasks.completed as completed,
    Tasks.task_date as date,
    Task_Groups.task_group_id as task_group_id,
    Task_Groups.title as task_group_title
    FROM Tasks LEFT JOIN Tasks_Groups
    ON Tasks.task_id = Tasks_Groups.task_id
    LEFT JOIN Task_Groups
    ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
    WHERE Tasks.workspace_id = in_workspace_id
    ORDER BY Tasks.task_date ASC;
  END IF;
END //
DELIMITER ;

-- Used to get all workers in a workspace --
DELIMITER //
CREATE PROCEDURE GetAllWorkspaceWorkers(in_workspace_id INT)
BEGIN
  SELECT Workers.worker_id as worker_id,
  Workers.first_name as first_name,
  Workers.last_name as last_name,
  Worker_Settings.availibility as worker_availibility
  FROM Workspaces_Workers INNER JOIN Workers
  ON Workspaces_Workers.worker_id = Workers.worker_id
  INNER JOIN Worker_Settings
  ON Workers.worker_id = Worker_Settings.worker_id
  WHERE Workspaces_Workers.workspace_id = in_workspace_id;
END //
DELIMITER ;

-- Used to get all task groups in a workspace --
DELIMITER //
CREATE PROCEDURE GetAllWorkspaceTaskGroups(in_workspace_id INT)
BEGIN
  SELECT Task_Groups.task_group_id as task_group_id,
  Task_Groups.title as task_group_title
  FROM Workspaces INNER JOIN Task_Groups
  ON Workspaces.workspace_id = Task_Groups.workspace_id
  WHERE Workspaces.workspace_id = in_workspace_id;
END //
DELIMITER ;

-- Used to create a new task group --
DELIMITER //
CREATE PROCEDURE NewTaskGroup(in_title VARCHAR(255), in_workspace_id INT)
BEGIN
  INSERT INTO Task_Groups (workspace_id, title)
  VALUES (in_workspace_id, in_title);
END //
DELIMITER ;

-- Used to insert a new task --
DELIMITER //
CREATE PROCEDURE NewTask(
  in_workspace_id INT,
  in_worker_id INT,
  in_title VARCHAR(255),
  in_color VARCHAR(255),
  in_date VARCHAR(255)
)
BEGIN
  INSERT INTO Tasks (workspace_id, worker_id, title, color, task_date)
  VALUES (in_workspace_id, in_worker_id, in_title, in_color, STR_TO_DATE(in_date, '%d-%m-%Y'));
END //
DELIMITER ;

-- Used to update a task --
DELIMITER //
CREATE PROCEDURE UpdateTask(
  in_workspace_id INT,
  in_task_id INT,
  in_worker_id INT,
  in_title VARCHAR(255),
  in_color VARCHAR(255),
  in_date VARCHAR(255)
)
BEGIN
  UPDATE Tasks
  SET worker_id = in_worker_id,
  title = in_title,
  color = in_color,
  task_date = STR_TO_DATE(in_date, '%d-%m-%Y')
  WHERE task_id = in_task_id AND workspace_id = in_workspace_id;
END //
DELIMITER ;

-- Used to delete a task --
DELIMITER //
CREATE PROCEDURE DeleteTask(
  in_workspace_id INT,
  in_task_id INT
)
BEGIN
  DELETE FROM Tasks
  WHERE task_id = in_task_id AND workspace_id = in_workspace_id;
END //
DELIMITER ;

-- Used to change status of a task --
DELIMITER //
CREATE PROCEDURE SetTaskStatus(
  in_workspace_id INT,
  in_task_id INT,
  in_task_status BOOLEAN
)
BEGIN
  UPDATE Tasks
  SET completed = in_task_status
  WHERE task_id = in_task_id AND workspace_id = in_workspace_id;
END //
DELIMITER ;

-- Used to insert task into a task group --
DELIMITER //
CREATE PROCEDURE AddTaskToGroup(in_task_group_id INT)
BEGIN
  INSERT INTO Tasks_ps
  SET task_group_id = in_task_group_id,
  task_id = LAST_INSERT_ID();
END //
DELIMITER ;

-- FILL DATABSE WITH DUMMY DATA --

-- Adding managers to database --
CALL NewManager('Ivory', 'Wolff', 'mona31@example.org', 'kristofer57', '330ff11686d49fed347e95a2ebec411b');
CALL NewManager('Deja', 'Blick', 'wgoldner@example.com', 'jkassulke', '916ec4ef321c02749ce19fddc48e6a1f');
CALL NewManager('Viola', 'Batz', 'bridgette.kunde@example.com', 'mackenzie.o\'hara', '8cca8a9121bc73d02e8766ba0b1d9e83');
CALL NewManager('Israel', 'Wisozk', 'mosciski.kenyatta@example.org', 'kaylin19', 'db784da966c52e65f05a2dc8ffea5e95');
CALL NewManager('Violet', 'Friesen', 'alexander34@example.com', 'medhurst.jessyca', '3b9e7248263ba91b55fee5485eca4ee0');
CALL NewManager('Icie', 'Lynch', 'qokuneva@example.org', 'haley.magnus', '9786d9ea5bed5e260ca4354480fce6f4');
CALL NewManager('Rebecca', 'Heller', 'tremayne.murazik@example.org', 'neoma03', 'bda1f6802868ef54efd88c5673d8f390');
CALL NewManager('Zachary', 'Kemmer', 'jaunita.hessel@example.org', 'alessandra.russel', '1b97b3013ac31c1d314e8f61c8af2134');
CALL NewManager('Brandi', 'Sanford', 'vincent63@example.org', 'casper93', 'eeb16e69fdda4a6923b2eac1125bc13a');
CALL NewManager('Clementine', 'Batz', 'waelchi.einar@example.com', 'stan.gerlach', '9bae6660e1863a152a36869f925f2e26');
CALL NewManager('Myles', 'Gulgowski', 'kari.gaylord@example.com', 'kshlerin.rosalind', '98629651b5ccd9f3e13b2980e97cf446');
CALL NewManager('Avery', 'Langworth', 'gschmidt@example.org', 'pyost', '0745d705c8f012d5fe35c2bb7b0d2dd7');
CALL NewManager('Josephine', 'Bosco', 'wnicolas@example.com', 'hemmerich', 'bbcc8e580a84d0703394286c3c4eaa8d');
CALL NewManager('Hanna', 'Herzog', 'leo23@example.com', 'russ.corwin', '1ce9d258ac80ad33ebfe5669c5c3db8e');
CALL NewManager('Michaela', 'Nicolas', 'annamarie13@example.org', 'josephine93', '76208c26800f1c82a0adc30ad59ea0e9');
CALL NewManager('Rosa', 'Trantow', 'jmuller@example.org', 'gillian.stanton', '21af422aa84897e8cb82bc5f07b8eede');
CALL NewManager('Randall', 'Kuhn', 'patricia71@example.com', 'wyman.antwan', '318e2c446af93b019b38646667688dac');
CALL NewManager('Kristy', 'Jones', 'morissette.cordell@example.com', 'brown.garfield', '2edadc0da8117cc18d5d5db404574e0b');
CALL NewManager('Reece', 'Hilpert', 'imelda.king@example.com', 'bennie.jenkins', '48bbfd0411be44ea384932cd277e7cf5');
CALL NewManager('Emiliano', 'Abernathy', 'ckunze@example.org', 'iarmstrong', '9b39c44012882c67369f2b56c4995379');
CALL NewManager('Test', 'Test', 'ckunze@example.org', 'manager', '5F4DCC3B5AA765D61D8327DEB882CF99'); -- Password is password --

-- Adding workers to database --
CALL NewWorker('Coralie', 'Wyman', 'margaret17@example.com', 'larson.marty', 'f6950773b228687ba7c4408e9e7e2680');
CALL NewWorker('Torey', 'Dooley', 'randy.price@example.net', 'rosalyn.berge', '965da307c709191c5f97cd736b204d9d');
CALL NewWorker('George', 'McKenzie', 'hoppe.chris@example.org', 'fsmith', '83e78250f4d9e69479db86162a3b5931');
CALL NewWorker('Georgette', 'Larson', 'rafaela17@example.org', 'kuhlman.kurt', '91ac2b52c4fb33619f5be54fc481c0be');
CALL NewWorker('Santino', 'Bosco', 'karley.abernathy@example.com', 'nadia.kunze', 'cd0890270ea323f4bdeea91f8b07ab23');
CALL NewWorker('Edwardo', 'Mertz', 'vilma.bartoletti@example.org', 'oking', '9365b46d2969ceecda20dbae6a5e3886');
CALL NewWorker('Jackson', 'Farrell', 'gennaro.cremin@example.net', 'pgreenholt', '1780a9fd820833fc7107068a3e61b377');
CALL NewWorker('Asha', 'Glover', 'toy.keaton@example.net', 'ekutch', '17e3d9552ad48fb41e5a4735d63c7caf');
CALL NewWorker('Letha', 'Turcotte', 'antwon46@example.org', 'parker42', '94e04ed73bf13addfc43167ce1e3490a');
CALL NewWorker('Lemuel', 'Ondricka', 'simonis.hettie@example.com', 'dashawn78', 'd016cb1bcedfb070e435ea84e812090b');
CALL NewWorker('Ignacio', 'Buckridge', 'ratke.chyna@example.com', 'bwintheiser', '01af621e3bb7e037a58c38a818573b99');
CALL NewWorker('Leslie', 'Wilderman', 'thad.reinger@example.net', 'dlittle', '6300947526c83743b963819a0ebcac66');
CALL NewWorker('Maximillian', 'Schamberger', 'eldridge.willms@example.org', 'obins', 'f5a8eb1ca2759313094e8b5aaa57d50e');
CALL NewWorker('Lucienne', 'Smitham', 'abernathy.cristopher@example.net', 'marcos.greenholt', 'd78db1858c3cf385ac8aa1639f69990a');
CALL NewWorker('Mandy', 'Johns', 'gschmeler@example.org', 'savion43', 'da35d89acadc40804aaaf583dadeb621');
CALL NewWorker('Hope', 'Wuckert', 'madonna21@example.net', 'altenwerth.nora', '9d1fc89043f1dcf47dad68d31bca5737');
CALL NewWorker('Seth', 'Parisian', 'rrutherford@example.net', 'upton.carmen', 'bfde7c35accdfd8541882f33941edcad');
CALL NewWorker('Major', 'Deckow', 'qjohns@example.com', 'christ.dicki', '947d70b6c5dc448cdf6a019e4a76e3d6');
CALL NewWorker('Randal', 'Fritsch', 'howell.serena@example.com', 'josiah41', '75f7afd8b8d9ab05e1b5c492ac5d96ae');
CALL NewWorker('Warren', 'Hackett', 'melvina30@example.com', 'lind.rebekah', '26b59ad407ea7b0a3e55946251d3423e');
CALL NewWorker('Warren', 'Hackett', 'melvina30@example.com', 'worker', '5F4DCC3B5AA765D61D8327DEB882CF99'); -- Password is password --

-- Adding workspaces to database --
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (1, 'Ferry-Grant');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (2, 'Glover PLC');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (3, 'Yundt Group');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (4, 'Fay, Rohan and Klein');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (5, 'Cummerata-Tromp');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (6, 'Emard-Swaniawski');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (7, 'Blanda-Carter');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (8, 'Kuhn Inc');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (9, 'Reilly Group');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (10, 'Orn Inc');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (11, 'Towne-Ernser');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (12, 'Pfannerstill-Sawayn');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (13, 'Bruen, Watsica and Satterfield');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (14, 'Daniel Group');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (15, 'Gibson Ltd');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (16, 'Bauch, Hamill and Rempel');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (17, 'Kihn, Watsica and Berge');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (18, 'Skiles, Torp and Walker');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (19, 'Boyer Group');
INSERT INTO `Workspaces` (`workspace_id`, `name`) VALUES (20, 'Hermann-Mraz');

CALL CreateNewWorkspace('🎶 Test Workspace', 21);

-- Adding managers to workspaces --
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (1, 12);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (3, 6);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (3, 9);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (3, 17);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (4, 8);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (4, 11);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (4, 12);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (4, 14);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (6, 11);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (6, 13);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (7, 8);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (8, 13);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (13, 11);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (13, 13);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (15, 6);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (16, 5);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (17, 20);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (18, 1);
INSERT INTO `Workspaces_Managers` (`workspace_id`, `manager_id`) VALUES (20, 6);

-- Adding workers to workspaces --
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (3, 9);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (3, 10);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (3, 13);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (5, 15);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (7, 4);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (7, 8);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (7, 15);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (8, 10);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (10, 12);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (12, 8);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (12, 19);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (13, 4);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (15, 9);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (15, 14);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (16, 2);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (16, 7);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (17, 2);
INSERT INTO `Workspaces_Workers` (`workspace_id`, `worker_id`) VALUES (19, 14);

CALL JoinWorkspace(21, 21, 1);