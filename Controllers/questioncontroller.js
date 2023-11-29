const Question = require("../Models/Subject");
const User = require("../Models/User");
const nodemailer = require("nodemailer");

//add question
const addQuestion = async(req,res,next)=>{

    const {type,head,body,file,answer} = req.body;
    let question;
    try {
        question = new Question({
            // user_id: req.user.id,
            type,
            head,
            body,
            file,
            answer,
        });

        await question.save();
    } catch (error) {
        console.log(error);
    }

    if(!question){
        console.log(req.user_id)
        return res.status(500).json({message:"Quesion Added fail"})
    }
    
    return res.status(201).json({message:"Quesion Added Success"})
}

//update question
const updateQuestion = async(req,res,next) => {
    const id = req.params.id;
    const {type,head,body,file,answer} = req.body;
    let question;

    try {
        question = await Question.findByIdAndUpdate(id, {
            type,
            head,
            body, 
            file,
            answer
        })
        question = await question.save();

    } catch (error) {
        console.log(error)
    }

    if(!question){
        return res.status(404).json({message:"Question update failed"});
    }
    return res.status(200 ).json({message:"Question update successful!"})
}

//get all question
const getQuestion = async(req,res,next) => {
    const q_type=req.params.type;
    let question;

    try {
       
        question = await Question.find();
    } catch (error) {
        console.log(error)
    }

    if(!question){
        return res.status(404).json({message:"There are no questions"})
    }
   
    return res.status(200).json({question})
}

//filter question by type
const filterQuestion = async(req,res,next) => {
    const q_type=req.params.type;
    let question;

    try {
        question = await Question.find({type:q_type});
    } catch (error) {
        console.log(error)
    }

    if(question == ''){
        return res.status(404).json({message:"There are no questions"})
    }
    
    return res.status(200).json({question})
}

//delete question
const deleteQuestion = async(req,res,next) => {
    const id = req.params.id;
    let question;
    try {
        question = await Question.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    if(!question){
        return res.status(404).json({message:"Unable to Delete"});
    }
    return res.status(200 ).json({message:"Question successfully deleted!"});
}

exports.addQuestion = addQuestion;
exports.updateQuestion = updateQuestion;
exports.getQuestion = getQuestion;
exports.deleteQuestion = deleteQuestion;
exports.filterQuestion = filterQuestion;