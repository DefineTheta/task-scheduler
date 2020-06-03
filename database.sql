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
  task_date INT(11) UNSIGNED NOT NULL,
  CONSTRAINT PK_Task PRIMARY KEY (task_id, workspace_id),
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

-- Used for manager login to check if username and password match --
DELIMITER //
CREATE PROCEDURE CheckManagerExists(
  in_username VARCHAR(30), 
  in_pass VARCHAR(255)
)
BEGIN
  SELECT COUNT(1)
  FROM Managers
  WHERE username = in_username AND pass = MD5(in_pass);
END //
DELIMITER ;

-- Used for worker login to check if username and password match --
DELIMITER //
CREATE PROCEDURE CheckWorkerExists(
  in_username VARCHAR(30), 
  in_pass VARCHAR(255)
)
BEGIN
  SELECT COUNT(1)
  FROM Workers
  WHERE username = in_username AND pass = MD5(in_pass);
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
  VALUES (in_first_name, in_last_name, in_email, in_username, MD5(in_pass));
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
  pass = MD5(in_pass)
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
  VALUES (in_first_name, in_last_name, in_email, in_username, MD5(in_pass));
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
CREATE PROCEDURE GetManagerWorkspaces(in_manager_id INT)
BEGIN
  SELECT Workspaces_Managers.manager_id as user_id,
  Workspaces_Managers.workspace_id as workspace_id,
  Workspaces.name as workspace_name
  FROM Workspaces INNER JOIN Workspaces_Managers
  ON Workspaces.workspace_id = Workspaces_Managers.workspace_id
  WHERE Workspaces_Managers.manager_id = in_manager_id;
END //
DELIMITER ;

-- Used to get all the workspaces a worker works at --
DELIMITER //
CREATE PROCEDURE GetWorkerWorkspaces(in_worker_id INT)
BEGIN
  SELECT Workspaces_Workers.worker_id as user_id,
  Workspaces_Workers.workspace_id as workspace_id,
  Workspaces.name as workspace_name
  FROM Workspaces INNER JOIN Workspaces_Workers
  ON Workspaces.workspace_id = Workspaces_Workers.workspace_id
  WHERE Workspaces_Workers.worker_id = in_worker_id;
END //
DELIMITER ;

-- Used to get all the tasks today in a workspace --
DELIMITER //
CREATE PROCEDURE GetAllTodayTasks(in_today_date INT(11))
BEGIN
  SELECT Tasks.task_id as task_id,
  Tasks.title as title,
  Tasks.color as color,
  Tasks.completed as completed,
  Task_Groups.task_group_id as task_group_id,
  Task_Groups.title as task_group_title
  FROM Tasks LEFT JOIN Tasks_Groups
  ON Tasks.task_id = Tasks_Groups.task_id
  LEFT JOIN Task_Groups
  ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
  WHERE Tasks.task_date = in_today_date;
END //
DELIMITER ;

-- Used to get all the tasks for this week in a workspace --
DELIMITER //
CREATE PROCEDURE GetAllWeekTasks(in_today_date INT(11), in_end_date INT(11))
BEGIN
  SELECT Tasks.task_id as task_id,
  Tasks.title as title,
  Tasks.color as color,
  Tasks.completed as completed,
  Task_Groups.task_group_id as task_group_id,
  Task_Groups.title as task_group_title
  FROM Tasks LEFT JOIN Tasks_Groups
  ON Tasks.task_id = Tasks_Groups.task_id
  LEFT JOIN Task_Groups
  ON Tasks_Groups.task_group_id = Task_Groups.task_group_id
  WHERE Tasks.task_date >= in_today_date AND Tasks.task_date <= in_end_date
  ORDER BY Tasks.task_date ASC;
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
  in_completed BOOLEAN,
  in_date INT(11)
)
BEGIN
  INSERT INTO Tasks (workspace_id, worker_id, title, color, completed, task_date)
  VALUES (in_workspace_id, in_worker_id, in_title, in_color, in_completed, in_date);
END //
DELIMITER ;

-- Used to update a task --
DELIMITER //
CREATE PROCEDURE UpdateTask(
  in_task_id INT,
  in_workspace_id INT,
  in_worker_id INT,
  in_title VARCHAR(255),
  in_color VARCHAR(255),
  in_completed BOOLEAN,
  in_date INT(11)
)
BEGIN
  UPDATE Tasks
  SET workspace_id = in_workspace_id,
  worker_id = in_worker_id,
  title = in_title,
  color = in_color,
  completed = in_completed,
  task_date = in_date
  WHERE task_id = in_task_id;
END //
DELIMITER ;

-- Used to delete a task --
DELIMITER //
CREATE PROCEDURE DeleteTask(in_task_id INT)
BEGIN
  DELETE FROM Tasks
  WHERE task_id = in_task_id;
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