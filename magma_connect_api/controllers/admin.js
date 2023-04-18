import { db } from "../connect.js";

// Get all users with registration status = 0
export const getStartupRequests = (req, res) => {
  const sql =
    "SELECT users.*, startup.* from users, startup where users.username = startup.username and users.username in (select username from users where reg_status=0) ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getEntreprenureRequests = (req, res) => {
  const sql =
    "SELECT users.username, users.name, users.telephone, users.email, users.address as pddress, business.* FROM users INNER JOIN entrepreneur ON users.username = entrepreneur.username INNER JOIN business ON entrepreneur.id = business.entr_id WHERE users.reg_status = 0";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getConsultantRequests = (req, res) => {
  const sql =
    "SELECT users.*, consultant.* from users, consultant where users.username = consultant.username and users.username in (select username from users where reg_status=0)  ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getDistributorRequests = (req, res) => {
  const sql =
    "SELECT users.*, distributor.*, vehicle.* FROM users INNER JOIN distributor ON users.username = distributor.username INNER JOIN vehicle ON distributor.id = vehicle.distributor_id WHERE users.reg_status = 0";
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
  const sql = "UPDATE users SET comment = ? WHERE username = ?";
  const { username, comment } = req.body;
  
  db.query(sql, [comment, username], (err, result) => {
    if (err) throw err;
    res.json({ message: `User with username ${username} has been declined.` });
  });
};




