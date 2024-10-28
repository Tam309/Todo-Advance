const emptyOrRows = (result) => {
    if(!result) return []
    return result.rows 
}

module.exports = { emptyOrRows }