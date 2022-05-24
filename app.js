require("dotenv").config();
const fs = require("fs-extra");
const https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const mumbai_web3 = createAlchemyWeb3(process.env.MUMBAISCAN_KEY);

const DKGClient = require("dkg-client");
const OT_NODE_HOSTNAME = process.env.OT_NODE_HOSTNAME;
const OT_NODE_PORT = process.env.OT_NODE_PORT;
const node_options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_PORT,
  useSSL: true,
  maxNumberOfRetries: 100,
};
const dkg = new DKGClient(node_options);

const queryTypes = require("./assets/js/queryTypes");
const db = require("better-sqlite3")(`assets/db/pubicdkg.db`, {
  verbose: console.log,
});

if (process.env.SSL_KEY_PATH != "" && process.env.SSL_CERT_PATH != "") {
  const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH);
  const certificate = fs.readFileSync(process.env.SSL_CERT_PATH);
  https
    .createServer(
      {
        key: privateKey,
        cert: certificate,
      },
      app
    )
    .listen(port, function (err) {
      if (err) {
        console.log("Error in server setup");
      }
      console.log("Server listening with SSL on Port", port);
    });
} else {
  app.listen(port, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening without SSL on Port", port);
  });
}

app.use(express.static("assets"));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/js", express.static(__dirname + "assets/js"));
app.use("/img", express.static(__dirname + "assets/img"));
app.use("/vender", express.static(__dirname + "assets/vender"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

//load pages
app.get("/samples", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  console.log(`Visitor:${ip} landed on the home page.`);
  res.render("samples");
});

app.get("/", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  console.log(`Visitor:${ip} landed on the home page.`);
  res.render("search");
});

app.get("/dashboard", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  console.log(`Visitor:${ip} landed on the dashboard page.`);
  res.render("dashboard");
});

app.get("/provision", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  console.log(`Visitor:${ip} landed on the provision page.`);
  res.render("provision");
});

app.get("/resolve", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  console.log(`Visitor:${ip} landed on the resolve page.`);
  res.render("resolve");
});

app.get("/search", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  console.log(`Visitor:${ip} landed on the search page.`);
  res.render("search");
});

app.get("/update", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  console.log(`Visitor:${ip} landed on the update page.`);
  res.render("update");
});

app.post("/dashboard", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  console.log(req.body.account);
  console.log(`Visitor:${ip} landed on the dashboard.`);

  //DELIVER DASHBOARD DATA HERE
  const searches = await db
    .prepare(
      "SELECT * FROM txn_header WHERE action = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("search", req.body.account);

  const provisions = await db
    .prepare(
      "SELECT * FROM txn_header WHERE action = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("provision", req.body.account);

  const updates = await db
    .prepare(
      "SELECT * FROM txn_header WHERE action = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("update", req.body.account);

  const resolves = await db
    .prepare(
      "SELECT * FROM txn_header WHERE action = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("resolve", req.body.account);

  const action = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("Action", req.body.account);

  const biochementity = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("BioChemEntity", req.body.account);

  const creativework = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("CreativeWork", req.body.account);

  const event = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("Event", req.body.account);

  const intangible = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("Intangible", req.body.account);

  const medicalentity = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("MedicalEntity", req.body.account);

  const organization = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("Organization", req.body.account);

  const person = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("Person", req.body.account);

  const place = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("Place", req.body.account);

  const product = await db
    .prepare(
      "SELECT * FROM txn_header WHERE type = ? AND account = ? ORDER BY timestamp DESC"
    )
    .all("Product", req.body.account);

  const txn_header = await db
    .prepare(
      "SELECT * FROM txn_header WHERE account = ? ORDER BY timestamp DESC"
    )
    .all(req.body.account);

  const txn_header_asc = await db
    .prepare(
      "SELECT * FROM txn_header WHERE account = ? ORDER BY timestamp ASC"
    )
    .all(req.body.account);

  let mumbai_costs = 0;
  for (i = 0; i < txn_header.length; i++) {
    row = txn_header[i];

    if (row.txn_hash) {
      txn_result = await mumbai_web3.eth.getTransaction(row.txn_hash);
      txn_rec = await mumbai_web3.eth.getTransactionReceipt(row.txn_hash);

      gasPrice = txn_result.gasPrice;
      gasUsed = mumbai_web3.utils.fromWei(
        JSON.stringify(txn_rec.gasUsed),
        "ether"
      );

      gasCost = gasPrice * gasUsed;
      mumbai_costs = mumbai_costs + gasCost;
    }
  }

  res.render("dashboard", {
    searches: searches,
    provisions: provisions,
    updates: updates,
    resolves: resolves,
    txn_header: txn_header,
    action: action,
    biochementity: biochementity,
    event: event,
    intangible: intangible,
    medicalentity: medicalentity,
    organization: organization,
    person: person,
    place: place,
    product: product,
    txn_header_asc: txn_header_asc,
    mumbai_costs: mumbai_costs,
    account: req.body.account,
  });
});

//post data
app.post("/search", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  request = "search";
  spamCheck = await queryTypes.spam();
  permission = await spamCheck
    .getData(request, ip)
    .then(async ({ permission }) => {
      return permission;
    })
    .catch((error) => console.log(`Error : ${error}`));

  if (permission != "allow") {
    res.render("search", {
      blocked: "You can only submit 1 search request per 30 seconds.",
    });
  } else {
    console.log(`Visitor:${ip} searched the dkg.`);
    result_type = req.body.result_type;
    keywords = req.body.keywords;

    options = { query: keywords, resultType: result_type };
    console.log(`Searching the DKG for ${result_type} - ${keywords}`);
    dkg_search_result = await dkg
      .search(options)
      .then((result) => {
        //console.log(JSON.stringify(result));
        return result;
      })
      .catch((error) => {
        console.log(error);
        res.render("limit", {
          result: `Our node has reached the request limit of 10 request per minute. Please try again in a few minutes.`,
        });
      });

    if (req.body.account) {
      timestamp = new Date();
      timestamp = Math.abs(timestamp);

      console.log(
        `Inserting search transaction for account: ${req.body.account}`
      );

      await db
        .prepare("INSERT INTO txn_header VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run([
          req.body.account,
          "search",
          result_type,
          keywords,
          timestamp,
          null,
          null,
          null,
          null,
        ]);
    }

    console.log(dkg_search_result);
    res.render("search", { data: dkg_search_result, result_type: result_type });
  }
});

//post data
app.post("/resolve", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  request = "resolve";
  spamCheck = await queryTypes.spam();
  permission = await spamCheck
    .getData(request, ip)
    .then(async ({ permission }) => {
      return permission;
    })
    .catch((error) => console.log(`Error : ${error}`));

  if (permission != "allow") {
    res.render("resolve", {
      blocked:
        "You can only submit 1 resolve request per 30 seconds. Please do not spam.",
    });
  } else {
    console.log(`Visitor:${ip} resolved to the dkg.`);

    ids = [req.body.resolve_ids];
    console.log(ids);
    dkg_resolve_result = await dkg
      .resolve({ ids })
      .then((result) => {
        //console.log(JSON.stringify(result));
        return result;
      })
      .catch((error) => {
        console.log(error);
        res.render("limit", {
          result: `Our node has reached the request limit of 10 request per 30 seconds. Please try again in a few minutes.`,
        });
      });

    console.log(req.body);
    if (req.body.account) {
      timestamp = new Date();
      timestamp = Math.abs(timestamp);

      console.log(
        `Inserting resolve transaction for account: ${req.body.account}`
      );

      await db
        .prepare("INSERT INTO txn_header VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?)")
        .run([
          req.body.account,
          "resolve",
          null,
          null,
          timestamp,
          req.body.resolve_ids,
          null,
          null,
          null,
        ]);
    }

    res.render("resolve", { data: dkg_resolve_result });
  }
});

//post data
app.post("/update", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  request = "update";
  spamCheck = await queryTypes.spam();
  permission = await spamCheck
    .getData(request, ip)
    .then(async ({ permission }) => {
      return permission;
    })
    .catch((error) => console.log(`Error : ${error}`));

  if (permission != "allow") {
    res.render("update", {
      blocked:
        "You can only submit 1 update per 30 seconds. Please do not spam.",
    });
  } else {
    console.log(`Visitor:${ip} updated UAL.`);
    type = req.body.type;
    ual = req.body.ual;
    body = req.body;

    console.log(type);
    console.log(ual);

    work = await queryTypes.work();
    data = await work
      .getData(body)
      .then(async ({ data }) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.log(`Error : ${error}`));

    keywords = req.body.keywords;
    keywords = keywords.replace("'", "");
    keywords = keywords.replace('"', "");
    keywords = keywords + ",Provisioned with Girraph";
    if (req.body.account) {
      keywords = keywords + `,${req.body.account}`;
    }
    keywords = [keywords];
    keywords = keywords[0].split(",");

    data = JSON.stringify(data);
    console.log(data);

    options = {
      data,
      keywords: keywords,
      visibility: "public",
    };

    dkg_update_result = await dkg.assets
      .update(ual, options)
      .then((result) => {
        //console.log(JSON.stringify(result));
        return result;
      })
      .catch((error) => {
        console.log(error);
        res.render("limit", {
          result: `Our node has reached the request limit of 10 request per minute. Please try again in a few minutes.`,
        });
      });

    console.log(dkg_update_result);

    if (req.body.account && dkg_update_result) {
      timestamp = new Date();
      timestamp = Math.abs(timestamp);

      console.log(
        `Inserting update transaction for account: ${req.body.account}`
      );

      await db
        .prepare("INSERT INTO txn_header VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run([
          req.body.account,
          "update",
          type,
          req.body.keywords,
          timestamp,
          dkg_update_result.data.id,
          ual,
          dkg_update_result.data.blockchain.name,
          dkg_update_result.data.blockchain.transactionHash,
        ]);
    }

    res.render("update", { data: dkg_update_result });
  }
});

app.post("/update_ual", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  console.log(`Visitor:${ip} updated UAL.`);
  type = req.body.type;
  ual = req.body.ual;

  console.log(type);
  console.log(ual);

  res.render("update", { type: type, ual: ual });
});

app.post("/provision", async function (req, res) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }
  request = "provision";
  spamCheck = await queryTypes.spam();
  permission = await spamCheck
    .getData(request, ip)
    .then(async ({ permission }) => {
      return permission;
    })
    .catch((error) => console.log(`Error : ${error}`));

  if (permission != "allow") {
    res.render("provision", {
      blocked: "You can only submit 1 provision request per 30 seconds.",
    });
  } else {
    body = req.body;
    work = await queryTypes.work();
    data = await work
      .getData(body)
      .then(async ({ data }) => {
        return data;
      })
      .catch((error) => console.log(`Error : ${error}`));

    data["@type"] = req.body.type;

    keywords = req.body.keywords;
    keywords = keywords.replace("'", "");
    keywords = keywords.replace('"', "");
    keywords = keywords + ",Provisioned with Girraph";
    if (req.body.account) {
      keywords = keywords + `,${req.body.account}`;
    }
    keywords = [keywords];
    keywords = keywords[0].split(",");

    data = JSON.stringify(data);

    options = {
      data,
      keywords: keywords,
      visibility: "public",
    };

    console.log(`Visitor:${ip} is provisioning ${data} to the dkg.`);

    dkg_provision_result = await dkg.assets
      .create(options)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        res.render("limit", {
          data: `Our node has reached the request limit of 10 request per 30 seconds. Please try again in a few minutes.`,
        });
      });

    if (req.body.account && dkg_provision_result) {
      timestamp = new Date();
      timestamp = Math.abs(timestamp);

      console.log(
        `Inserting provision transaction for account: ${req.body.account}`
      );

      console.log(dkg_provision_result);
      await db
        .prepare("INSERT INTO txn_header VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run([
          req.body.account,
          "provision",
          req.body.type,
          req.body.keywords,
          timestamp,
          dkg_provision_result.data.id,
          dkg_provision_result.data.metadata.UALs[0],
          dkg_provision_result.data.blockchain.name,
          dkg_provision_result.data.blockchain.transactionHash,
        ]);
    }

    res.render("provision", { data: dkg_provision_result });
  }
});
