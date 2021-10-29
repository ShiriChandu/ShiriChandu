import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
    employee: 'employee',
    rmdData: 'rmdData',
    assignedProjects: 'assignedProjects',
    pc: 'PC',
    empAsRMEmployees: 'EmpAsRMEmployees',
    assignedEmployees: 'AssignedEmployees',
    ddprojecttasks: 'dd_project_tasks',
    ddprojecttaskemployees: 'dd_project_task_employees',
    ddtasks: 'dd_tasks',
    employeeTask: 'employeeTask',
  };

  constructor(private sqlite: SQLite) {}

  async createDatabase() {
    await this.sqlite
      .create({
        name: 'dailydiary_database',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert('error on creating database' + JSON.stringify(e));
      });

    await this.createTables();
  }
  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.employee} (
        Id Integer PrimaryKey Auto Increment,
        UserId Integer ,
        EmployeeId int(11) ,
        EmpRole int(11) ,
        EmployeeName varchar(255) ,
        CompanyEmail varchar(100) ,
        ContactNumber varchar(150) ,
        ProfileImg text ,
        ReportingManager varchar(255)
      ) `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.rmdData} (
        Id Integer Primarykey AUTO_INCREMENT,
        rm_userid int  ,
        rm_employeeid int  ,
        rm_name varchar(255)
        )

      `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.assignedProjects} (
        Id Integer Primarykey AUTO_INCREMENT,
        pid int,
        project_id int  ,
        project_name Varchar  ,
        project_shortname varchar,
        isPC int
        )

`,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.pc} (
        Id Integer Primarykey AUTO_INCREMENT,
        userid string  ,
        employeeid string  ,
        employeename varchar
        )
      `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.empAsRMEmployees} (
        Id           INTEGER PRIMARY KEY AUTOINCREMENT,
        userid       STRING,
        employeeid   STRING,
        employeename STRING
    );
    `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE ${this.tables.assignedEmployees} (
      Id           INTEGER PRIMARY KEY AUTOINCREMENT,
      userid       STRING,
      employeeid   STRING,
      employeename STRING,
      project_id   STRING
  );
  `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE   Employees
    (
        Id           INTEGER PRIMARY KEY AUTOINCREMENT,
        userid       STRING,
        employeeid   STRING,
        employeename STRING,
        project_id   STRING
    );
    `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.ddprojecttasks} (
        id Integer AUTO_INCREMENT PRIMARY KEY,
        pid int(11) ,
        project_id bigint(20)  ,
        task_id bigint(20)  ,
        parent_task varchar(200) ,
        estimated_hrs mediumint(5)  ,
        is_billable tinyint(1) ,
        billable_rate decimal(25,2) ,
        created_by int(11) ,
        modified_by int(10)  ,
        is_active tinyint(4) ,
        created timestamp  ,
        modified timestamp

      )
      `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.ddprojecttaskemployees} (
          id Integer PRIMARY KEY AUTOINCREMENT,
          project_id bigint(20) ,
          task_id bigint(20) ,
          project_task_id bigint(20) ,
          emp_id int(10) ,
          start_date date ,
          end_date date ,
          estimated_hrs varchar(20) ,
          description text,
          created_by int(11) ,
          modified_by int(10)  ,
          is_active tinyint(4) ,
          created timestamp  ,
          modified timestamp

        );
        `,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.ddtasks} (
            id Integer PRIMARY KEY  AUTOINCREMENT,
            tid int,
            task text ,
            parent_task varchar(250) ,
            has_child text,
            is_default tinyint(4) ,
            created_by int(11) ,
            modified_by int(10)  ,
            is_active tinyint(4) ,
            created timestamp,
            modified timestamp

          );
          `,
      []
    );
    await this.databaseObj.executeSql(
      `CREATE TABLE ${this.tables.employeeTask} (
        Id            INTEGER  PRIMARY KEY AUTOINCREMENT,
        tid           INTEGER,
        task          TEXT,
        parent_task   TEXT,
        start_date    DATETIME,
        end_date      DATETIME,
        estimated_hrs TEXT,
        projectid  INTEGER,
        employeeid INTEGER,
        description Text,
        createdby text,
        new_old Integer,
        taskname Text,
        parenttask Text,
        status INTEGER
    );

      `,
      []
    );
  }

  async addEmployee(
    userId: string,
    employeeId: string,
    empRole: string,
    employeeName: string,
    companyEmail: string,
    contactNumber: string,
    profileImg: string,
    reportingManager: string
  ) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.employee}
      (UserId,
        EmployeeId,
        EmpRole,
        EmployeeName,
        CompanyEmail,
        ContactNumber,
        ProfileImg,
        ReportingManager)
      VALUES
      ('${userId}',
      '${employeeId}',
      '${empRole}',
      '${employeeName}',
      '${companyEmail}',
      '${contactNumber}',
      '${profileImg}',
      '${reportingManager}')`,
        []
      )
      .then(() => {
        console.log('employeee added');
      })
      .catch((e) => {
        console.log('geeting error on adding employee', JSON.stringify(e));
      });
  }

  async addCalenderTask(
    projectid: any,
    employeeid: any,
    taskid: any,
    startdate: any,
    enddate: any,
    estimatedhrs: any,
    description: any,
    newold: any,
    taskname: any,
    parenttask: any,
    status: any
  ) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.employeeTask}
    (projectid,employeeid,tid,start_date,end_date,estimated_hrs,description,new_old,taskname,parenttask,status)
    VALUES
    ('${projectid}',
    '${employeeid}',
    '${taskid}',
    '${startdate}',
    '${enddate}',
    '${estimatedhrs}',
    '${description}',
    '${newold}',
    '${taskname}',
    '${parenttask}',
    '${status}')`,
        []
      )
      .then(() => {
        console.log('Calender Task added');
      })
      .catch((e) => {
        console.log('geeting error on adding Calender Task', JSON.stringify(e));
      });
  }

  async addRMD(rmuserid: string, rmemploeid: string, rmname: string) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.rmdData}
       (rm_userid,
        rm_employeeid,
        rm_name)
        VALUES
        ('${rmuserid}',
         '${rmemploeid}',
         '${rmname}')
      `,
        []
      )
      .then(() => {
        console.log('rmd added');
      })
      .catch((e) => {
        console.log('geeting error on adding RMD', JSON.stringify(e));
      });
  }

  async addEmpAsRMEmployees(userid: any, employeeid: any, employeename: any) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.empAsRMEmployees}
       (userid,employeeid,employeename)
        VALUES
       ('${userid}',
       '${employeeid}',
       '${employeename}')
       `,
        []
      )
      .then(() => {
        console.log('EmpAsRMEmployees added');
      })
      .catch((e) => {
        console.log(
          'geeting error on adding EmpAsRMEmployees',
          JSON.stringify(e)
        );
      });
  }

  async addAssignProjects(
    pid: number,
    projectid: string,
    projectname: string,
    projectshortname: string,
    ispc: string
  ) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.assignedProjects}
      (pid,
        project_id,
       project_name,
       project_shortname,
       isPC)
       VALUES
       ('${pid}',
         '${projectid}',
       '${projectname}',
       '${projectshortname}',
       '${ispc}')
       `,
        []
      )
      .then(() => {
        console.log('assign projects added');
      })
      .catch((e) => {
        console.log(
          'getting error on adding AssignProjctes',
          JSON.stringify(e)
        );
      });
  }

  async addEmployeesData(
    userid: string,
    employeeid: string,
    employeename: string,
    projectid: string
  ) {
    this.databaseObj
      .executeSql(
        `INSERT INTO Employees
        (userid,employeeid,employeename,project_id)
        VALUES
        ('${userid}',
         '${employeeid}',
         '${employeename}',
         '${projectid}'
        )
      `,
        []
      )
      .then(() => {
        console.log('Employees  added', projectid);
      })
      .catch((e) => {
        console.log('getting error on adding Employees', JSON.stringify(e));
      });
  }

  async addPCdata(userid: string, employeeid: string, employeename: string) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.pc}
        (userid,employeeid,employeename)
        VALUES
        ('${userid}',
         '${employeeid}',
         '${employeename}'
        )
      `,
        []
      )
      .then(() => {
        console.log('PC  added');
      })
      .catch((e) => {
        console.log('getting error on adding PC', JSON.stringify(e));
      });
  }

  async addDDTasksData(tid: any, task: any, parenttask: any, haschild: any) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.ddtasks}
  (tid,task,parent_task,has_child)
  VALUES
  ('${tid}',
  '${task}',
  '${parenttask}',
  '${haschild}'
  )
  `,
        []
      )
      .then(() => {
        console.log('DDtasks Added');
      })
      .catch((e) => {
        console.log('getting error on adding DDTasks', JSON.stringify(e));
      });
  }

  async addEmployeeTasksData(
    tid: any,
    task: any,
    parenttask: any,
    startdate: any,
    enddate: any,
    estimatedhrs: any
  ) {
    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.employeeTask}
      (tid,task,parent_task,start_date,end_date,estimated_hrs)
      VALUES
      ('${tid}',
      '${task}',
      '${parenttask}',
      '${startdate}',
      '${enddate}',
      '${estimatedhrs}')`,
        []
      )
      .then(() => {
        console.log('EmployeeTask Added');
      })
      .catch((e) => {
        console.log('getting error on adding EmployeeTask', JSON.stringify(e));
      });
  }

  async getEmployeeInfo() {
    return this.databaseObj
      .executeSql(`SELECT * FROM ${this.tables.employee}`, [])
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.log('error on getting Employee', JSON.stringify(e));
        return 'error on getting Employee' + JSON.stringify(e);
      });
  }

  async getAssignedProjects() {
    return this.databaseObj
      .executeSql(`SELECT * FROM ${this.tables.assignedProjects}`, [])
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.log('error on getting Assigned Projects', JSON.stringify(e));
        return 'error on getting Assigned Projects' + JSON.stringify(e);
      });
  }

  async getAssignedProjectsById(projectId: string) {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.assignedProjects} WHERE project_id=${projectId}`,
        []
      )
      .then((res) => {
        console.log('projects: ', res);
        return res;
      })
      .catch((e) => {
        console.log('error on getting Assigned Projects', JSON.stringify(e));
        return 'error on getting Assigned Projects' + JSON.stringify(e);
      });
  }

  async getEmployees(projectId: string) {
    return this.databaseObj
      .executeSql(`SELECT * FROM Employees WHERE project_id=${projectId}`, [])
      .then((res) => {
        console.log('employees: ', res);
        return res;
      })
      .catch((e) => {
        console.log(
          'error on getting Employees by project Id',
          JSON.stringify(e)
        );
        return 'error on getting Employees by project Id' + JSON.stringify(e);
      });
  }

  async getEmployeeTask() {
    return this.databaseObj
      .executeSql(
        `SELECT task,start_date,end_date FROM ${this.tables.employeeTask}`,
        []
      )
      .then((res) => {
        console.log('employeeTasks: ', res);
        return res;
      })
      .catch((e) => {
        console.log('error on getting Employees Tasks ', JSON.stringify(e));
        return 'error on getting Employees Tasks ' + JSON.stringify(e);
      });
  }

  async getSubTaskOfParentIdzero() {
    return this.databaseObj
      .executeSql(
        `select tid, task, parent_task,has_child from dd_tasks where parent_task= '0'`,
        []
      )
      .then((res) => {
        console.log('SubTasks: ', res);
        return res;
      })
      .catch((e) => {
        console.log('error on getting SubTasks ', JSON.stringify(e));
        return 'error on getting SubTasks ' + JSON.stringify(e);
      });
  }

  async getSubTasksOfProjcts(parentTask: any) {
    return this.databaseObj
      .executeSql(
        `select tid, task, parent_task,has_child from dd_tasks where parent_task='${parentTask}'`,
        []
      )
      .then((res) => {
        console.log('getSubTasksOfProjcts: ', res);
        return res;
      })
      .catch((e) => {
        console.log(
          'error on getting getSubTasksOfProjcts ',
          JSON.stringify(e)
        );
        return 'error on getting getSubTasksOfProjcts ' + JSON.stringify(e);
      });
  }
  async getParentTaskId(tid: any) {
    return this.databaseObj
      .executeSql(`select parent_task from dd_tasks where tid= '${tid}'`, [])
      .then((res) => {
        console.log('getParentTaskId: ', res);
        return res;
      })
      .catch((e) => {
        console.log('error on getting getParentTaskId ', JSON.stringify(e));
        return 'error on getting getParentTaskId ' + JSON.stringify(e);
      });
  }
}
