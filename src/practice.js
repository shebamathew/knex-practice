const knex = require('knex')

const knexInstance = knex ({
    client: 'pg', 
    connection: process.env.DB_URL
})

const qry = knexInstance
    .from('amazong_prodcuts')
    .select('product_id', 'name', 'price', 'category')
    .where({name: 'Point of view gun'})
    .first()
    .toQuery() 

console.log(qry)

function searchByProduceName(searchTerm) {
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
    })
}
searchByProduceName('holo')

function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page-1)
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}
paginateProducts(2)

// filter products with images
function getProductsWithImages() {
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result)
        })
}
getProductsWithImages() 

function mostPopularVideosForDays(days) {
    knexInstance
        .select('video_name', 'region') 
        .count('date_viewed AS views')
        .from('whopipe_video_views')
        .where(
            'date_viewed', 
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
        )
        .groupBy('video_name', 'region')
        .orderBy([
            {column: 'region', order: 'ASC'},
            {column: 'views', order: 'DESC'}, 
        ])
        .then(result => {
            console.log(result)
        })
}
mostPopularVideosForDays(30)

    

   