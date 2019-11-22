const knex = require("knex")(require("./config/knexfile"));

knex
  .from("users")
  .select("name")
  .then(showResults("USERS"));

knex("kanbans")
  .where({ "kanbans.name": "Default" })
  .join("kanbans_steps", { kanban_id: "kanbans.id" })
  .select(
    "kanbans.name",
    { step: "kanbans_steps.name" },
    "kanbans_steps.order",
    { stepId: "kanbans_steps.id" }
  )
  .then(r => groupArrayByKey(r, "name", true))
  .then(showResults("KANBANS"));

knex("tasks")
  .join("users", { onner_id: "users.id" })
  .select("tasks.title", "tasks.text", "users.name", "users.thumbnail")
  .then(showResults("TASKS"));

function showResults(name) {
  return function(r) {
    console.log("\n" + name);
    console.log(r);
    return r;
  };
}

function groupArrayByKey(arr = [], key, removeKeyFromArray = false) {
  if (!key || arr.length === 0) return {};
  return arr.reduce((acc, a) => {
    if (!acc[a[key]]) acc[a[key]] = [];
    acc[a[key]].push(a);
    if (removeKeyFromArray) delete a[key];
    return acc;
  }, {});
}
