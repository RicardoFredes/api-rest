exports.seed = function(knex) {
  return knex("kanbans")
    .del()
    .then(function() {
      return knex("kanbans").insert([{ name: "Default" }]);
    })
    .then(function(kanbansId) {
      const kanban_id = kanbansId[0];
      return knex("kanbans_steps").insert([
        { name: "To-do's", order: 0, kanban_id },
        { name: "In progress", order: 1, kanban_id },
        { name: "Product review", order: 2, kanban_id },
        { name: "Beta", order: 3, kanban_id },
        { name: "Done", order: 4, kanban_id }
      ]);
    });
};
