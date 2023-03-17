import { db } from "../connect.js";

// Get all users with registration status = 0
export const getStartupRequests = (req, res) => {
  const sql =
    "SELECT users.username, users.name, users.telephone, users.email, startup.nic from users, startup where users.username = startup.username and users.username in (select username from users where reg_status=0) ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getEntreprenureRequests = (req, res) => {
  const sql =
    "SELECT users.username, users.name, users.telephone, users.email, business.category, business.business_name, business.reg_no, business.address FROM users INNER JOIN entrepreneur ON users.username = entrepreneur.username INNER JOIN business ON entrepreneur.id = business.entr_id WHERE users.reg_status = 0";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getConsultantRequests = (req, res) => {
  const sql =
    "SELECT users.username, users.name, users.telephone, users.email, consultant.qualification, consultant.fee from users, consultant where users.username = consultant.username and users.username in (select username from users where reg_status=0)  ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getDistributorRequests = (req, res) => {
  const sql =
    "SELECT users.username, users.name, users.telephone, users.email, distributor.drl_no, vehicle.vehicle_type, vehicle.vehicle_no FROM users INNER JOIN distributor ON users.username = distributor.username INNER JOIN vehicle ON distributor.id = vehicle.distributor_id WHERE users.reg_status = 0";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Approve requests
export const approveRequests = (req, res) => {
  const sql = "UPDATE users SET reg_status = 1 WHERE username = ?";
  const username = req.params.username;
  db.query(sql, username, (err, result) => {
    if (err) throw err;
    res.json({ message: `users with username ${username} has been approved.` });
  });
};

// Decline requests
export const declineRequests = (req, res) => {
  const sql = "DELETE FROM users WHERE username = ?";
  const username = req.params.username;
  db.query(sql, username, (err, result) => {
    if (err) throw err;
    res.json({ message: `User with username ${username} has been declined.` });
  });
};

export const getEntreprenures = (req, res) => {
  const sql =
    "SELECT users.username, business.description, business.category, business.business_name, business.reg_no, business.address FROM users INNER JOIN entrepreneur ON users.username = entrepreneur.username INNER JOIN business ON entrepreneur.id = business.entr_id WHERE users.reg_status = 1";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getConsultants = (req, res) => {
  const sql =
    "SELECT users.username, users.name, consultant.id, consultant.description, consultant.qualification, consultant.fee from users, consultant where users.username = consultant.username and users.username in (select username from users where reg_status=1)  ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
