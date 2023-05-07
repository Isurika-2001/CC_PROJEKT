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
    "SELECT users.username, users.name, users.telephone, users.email, users.address as pddress, business.* FROM users INNER JOIN entrepreneur ON users.username = entrepreneur.username INNER JOIN business ON entrepreneur.id = business.entr_id WHERE users.reg_status = 0 and users.comment is null";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getSwitchRequests = (req, res) => {
  const sql =
    "SELECT switch_requests.*, users.name FROM switch_requests INNER JOIN users ON switch_requests.username = users.username";
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

  const sql1 = "UPDATE business SET reg_status = 1 WHERE reg_no = ?";
  const reg_no = req.params.reg_no;

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    db.query(sql1, [reg_no], (err, result) => {
      if (err) throw err;
      res.json({
        message: `user with username ${username} and business with registration number ${reg_no} has been approved.`,
      });
    });
  });
};

export const approveSwitchRequests = (req, res) => {
  const queries = {
    remove: "DELETE from switch_requests where username = ?",
    remove2: "DELETE from startup where username = ?",
    update: "UPDATE users SET roll = 'existing' WHERE username = ?",
    entrepreneur: "INSERT INTO entrepreneur (`username`) VALUE (?)",
    business:
      "INSERT INTO business (`category`,`business_name`,`reg_no`,`address`,`entr_id`) VALUES (?)",
  };
  const username = req.params.username;
  const values = {
    category: req.params.category,
    business_name: req.params.business_name,
    reg_no: req.params.reg_no,
    address: req.params.address,
  };

  db.query(queries.update, username, (err, result) => {
    if (err) throw err;
    let businessArray = Object.values(values);
    db.query(queries.entrepreneur, username, (err, data) => {
      const entr_id = data.insertId;
      businessArray.push(entr_id);

      if (err) {
        console.error(err);
        return res.status(500).json("Error while saving entrepreneur data!");
      }

      db.query(queries.business, [businessArray], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Error while saving business data!");
        }
        db.query(queries.remove, username, (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Error while removing request!");
          }
          db.query(queries.remove2, username, (err, data) => {
            if (err) {
              console.error(err);
              return res.status(500).json("Error while removing startup!");
            }
          });
          return res.status(200).json("User added successfully");
        });
      });
    });
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

export const declineSwitchRequests = (req, res) => {
  const sql = "UPDATE users SET comment = ? WHERE username = ?";
  const sql2 = "DELETE from switch_requests where username = ?";
  const { username, comment } = req.body;

  db.query(sql, [comment, username], (err, result) => {
    if (err) throw err;
    db.query(sql2, username, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error while removing request!");
      }
      return res.status(200).json("Removed successfully");
    });
  });
};
