let stateModel = require("./model.js");
const express = require('express');
const router = express.Router();



let controller = {
    create(request, response, err) {
        let state = request.body
        
        if(response.status === 200 || 201){
            stateModel
                .create(state)
                .then(state => response.json(state))
            console.log("Added state info :-)" , state)
        } else if(err){
            console.log(`There was an error on: ${err}`)
        }

        
       
    },

    readById(request, response) {
        let id = request.params.id
       stateModel
            .findById(id)
            .then(state => response.json(state))
            console.log('is read by id')
    },

   async readAll(request, response) {
    const pageSize = 20;
    const page = parseInt(request.query.page || "0");
    const totalPages = await stateModel.count(request.query)
        await stateModel
        .find(request.query)
        .limit(pageSize).skip(pageSize * page)
        .then(states => response.json({totalPages: Math.ceil(totalPages / pageSize), states}))
        console.log("Added state info :-)")
    },

    update(request, response) {
        let state = JSON.parse(request.body)
        let id = request.params.id
        stateModel
            .findByIdAndUpdate(id, state, { new: true })
            .then(state => response.json(state))
            console.log('is able to update state by id')
    },

    delete(request, response) {
        let id = request.params.id
        stateModel
            .findByIdAndDelete(id)
            .then(() => response.json({ ok: true }))
            console.log('is able to delete')
    }
}

module.exports = controller