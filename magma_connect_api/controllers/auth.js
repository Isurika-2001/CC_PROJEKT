import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidation } from "./validation.js";

export const register = (req, res) => {
  // check queries
  const check = {
    username: "SELECT * FROM users WHERE username = ?",
    nic: "SELECT * FROM startup WHERE nic = ?",
    regNo: "SELECT * FROM business WHERE reg_no = ?",
    driveLicNo: "SELECT * FROM distributor WHERE drl_no = ?",
    vehicleNo: "SELECT * FROM vehicle WHERE vehicle_no = ?",
  };

  //  insert query
  const q =
    "INSERT INTO users (`username`,`email`,`password`,`telephone`,`name`,`roll`) VALUE (?)";

  // sub queries
  const q1 = {
    startup: "INSERT INTO startup (`username`,`nic`) VALUE (?)",
    entrepreneur: "INSERT INTO entrepreneur (`username`) VALUE (?)",

    distributor: "INSERT INTO distributor (`username`,`drl_no`) VALUE (?)",
    consultant:
      "INSERT INTO consultant (`username`,`qualification`,`fee`) VALUE (?)",
  };

  // inner queries
  const q2 = {
    business:
      "INSERT INTO business (`category`,`business_name`,`reg_no`,`address`,`entr_id`) VALUES (?)",
    vehicle:
      "INSERT INTO vehicle (`vehicle_type`,`vehicle_no`,`distributor_id`) VALUES (?)",
  };

  // hash the passowrd
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const values = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    telephone: req.body.telephone,
    name: req.body.name,
    roll: req.body.roll,
  };

  const startupValues = {
    username: req.body.username,
    nic: req.body.nic,
  };

  const entrepreneurValues = {
    username: req.body.username,
  };

  const businessValues = {
    category: req.body.category,
    businessName: req.body.businessName,
    regNo: req.body.regNo,
    address: req.body.address,
  };

  const distributorValues = {
    username: req.body.username,
    driveLicNo: req.body.driveLicNo,
  };

  const vehicleValues = {
    vehicleType: req.body.vehicleType,
    vehicleNo: req.body.vehicleNo,
  };

  const consultantValues = {
    username: req.body.username,
    qualification: req.body.qualification,
    consultationFee: req.body.consultationFee,
  };

  // run check queries
  db.query(check.username, values.username, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(400).json("User already exist!");
    }

    // check validations
    const { error } = registerValidation(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).send(errorMessages);
    }

    if (values.roll === "startup") {
      db.query(check.nic, startupValues.nic, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
          return res.status(400).json("NIC already exists!");
        } else {
          // run insert queries
          db.query(q, [Object.values(values)], (err, data) => {
            if (err) {
              return res.status(500).json("Error while saving user!");
            }
            db.query(
              q1.startup,
              [Object.values(startupValues)],
              (err, data) => {
                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json("Error while saving startup data!");
                }
                return res
                  .status(200)
                  .json("User added to startup table successfully");
              }
            );
          });
        }
      });
    }

    if (values.roll === "existing") {
      db.query(check.regNo, businessValues.regNo, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
          return res.status(400).json("Your business is already registered!");
        } else {
          // run insert queries
          db.query(q, [Object.values(values)], (err, data) => {
            if (err) return res.status(500).json("Error while saving user!");

            let businessArray = Object.values(businessValues);
            db.query(
              q1.entrepreneur,
              [Object.values(entrepreneurValues)],
              (err, data) => {
                const entr_id = data.insertId;
                businessArray.push(entr_id);

                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json("Error while saving entrepreneur data!");
                }

                db.query(q2.business, [businessArray], (err, data) => {
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json("Error while saving business data!");
                  }

                  return res.status(200).json("User added successfully");
                });
              }
            );
          });
        }
      });
    }

    if (values.roll === "distributor") {
      db.query(check.driveLicNo, distributorValues.driveLicNo, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
          return res.status(400).json("existing driving licence number!");
        } else {
          // run insert queries
          db.query(q, [Object.values(values)], (err, data) => {
            if (err) return res.status(500).json("Error while saving user!");

            let vehicleArray = Object.values(vehicleValues);
            db.query(
              q1.distributor,
              [Object.values(distributorValues)],
              (err, data) => {
                const entr_id = data.insertId;
                vehicleArray.push(entr_id);

                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json("Error while saving distributor data!");
                }

                db.query(q2.vehicle, [vehicleArray], (err, data) => {
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json("Error while saving vehihcle data!");
                  }

                  return res.status(200).json("User added successfully");
                });
              }
            );
          });
        }
      });
    }

    if (values.roll === "consultant") {
      // run insert queries
      db.query(q, [Object.values(values)], (err, data) => {
        if (err) {
          return res.status(500).json("Error while saving user!");
        }
        db.query(
          q1.consultant,
          [Object.values(consultantValues)],
          (err, data) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json("Error while saving consultant data!");
            }
            return res.status(200).json("User added successfully");
          }
        );
      });
    }
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or Username!");
    else if (data[0].reg_status === 0)
      return res.status(400).json("Please wait for the approval. Come back later!");
    else {
      const token = jwt.sign({ id: data[0].id }, "secretkey");

      const { password, ...others } = data[0];

      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    }
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};

export const adminLogin = (req, res) => {
  const q = "SELECT * FROM admin WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("admin not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong admin password or admin username!");
    else {
      const token = jwt.sign({ id: data[0].id }, "secretadminkey");

      const { password, ...others } = data[0];

      res
        .cookie("accessAdminToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    }
  });
};
