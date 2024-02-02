exports.up = knex =>
  knex('account_types').insert([
    { title: 'Dinheiro' },
    { title: 'Conta Corrente' },
    { title: 'Investimento' },
    { title: 'Conta Poupança' },
    { title: 'Outro' }
  ])

exports.down = knex =>
  knex('account_types')
    .delete()
    .where([
      { title: 'Dinheiro' },
      { title: 'Conta Corrente' },
      { title: 'Investimento' },
      { title: 'Conta Poupança' },
      { title: 'Outro' }
    ])
