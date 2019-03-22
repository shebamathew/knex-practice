require('dotenv').config()
const knex = require('knex')

const knexInstance = knex ({
    client: 'pg', 
    connection: process.env.DB_URL
})

console.log('connection successful')

function search(searchTerm){
    knexInstance
        .from('shopping_list')
        .select('*')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log('SEARCH TERM', { searchTerm })
            console.log(result)
        })
}

function paginate(pageNumber){
    const productsPerPage = 6
    const offset = productsPerPage * (page-1)
    knexInstansce
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

function getItemsAddedAfter(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list') 
        .where(
            'date_added', 
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
        )
        .then(result => {
            console.log(result)
        })
}

function getCostPerCategory(){
    knexInstance
        .select('price', 'category')
        .count('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}




