const { db, auth } = require('../firebase/database');
const admin = require('firebase-admin');
const { validationResult } = require('express-validator');
const axios = require('axios');


let startAtRef = null
exports.createIncident = async (req, res) => {
    try {
        const ref = db.ref('incidents');
        const incidentData = {
            user_id: req.body.user_id,
            incident_id: 0,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            location: req.body.location,
            address: req.body.address,
            attachments: req.body.attachments,
            report_number: req.body.report_number || "",
            vote_counts: { upvote_count: req.body.upvote_count, downvote_count: req.body.downvote_count },
            incident_status: req.body.incident_status,
            create_date: new Date().toLocaleDateString(),
        };
        let insertedData = ref.push(incidentData);

        let incident_id = insertedData.getKey();
        insertedData.update({ incident_id: incident_id }, (error) => {
            if (error) {
                res.send(error);
            }
        });
        incidentData['incident_id'] = incident_id;
        res.send(incidentData);
    } catch (err) {
        res.send(err);
    }
};

exports.getAllIncidents = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 30;
        const ref = db.ref('incidents');
        const orderBy = req.query.orderBy || "create_date"
 /*        console.log(limit)
        if (startAtRef !== null) {  ref = db.ref('incidents').orderByChild(orderBy).startAfter(startAtRef).limitToFirst(limit) }
        else { ref = db.ref('incidents').orderByChild(orderBy).limitToFirst(limit) }
        
        console.log(ref) */
       
        await ref.once('value', (data) => {
            if (data) {
                startAtRef = data
                console.log(data.val())
                res.send(data.val());
            } else {
                res.status(500).send('fail oldu be naparsin >)');
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
};

exports.getIncidentById = async (req, res) => {
    try {
        const ref = db.ref(`incidents/${req.params.incident_id}`);
        await ref.once('value', (snapshot) => {
            if (snapshot.exists()) {
                res.send(snapshot.val());
            } else {
                res.status(400).send('incident not exist');
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteIncidentById = async (req, res) => {
    try {
        const ref = db.ref(`incidents/${req.params.incident_id}`);
        await ref.remove((error) => {
            if (error) {
                res.status(400).send('we shoud not find incident');
            } else {
                res.status(200).send('succesfully deleted');
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateIncident = async (req, res) => {
    try {
        const ref = db.ref(`incidents/${req.body.incident_id}`);
        await ref.update(req.body, (error) => {
            if (error) {
                res.send(error);
            } else {
                res.status(200).send('success');
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
