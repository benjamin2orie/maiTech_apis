
import moment from 'moment';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import taskModel from '../models/task_model';
import { sendEmailNotification } from '../services/send_email_notification';
import userModel from '../models/user_model';


export const createTask = async (req:Request, res:Response):Promise<any> =>{

    const{ title, description, status, dueDate} = req.body;

    if(!title || !description || !dueDate){
        return res.status(400).json({message: 'Please provide all required fields'});
    };

    const isValidDate = moment(dueDate, 'YYYY-MM-DD', true).isValid();
    const isValidStatus = ['pending', 'in-progress', 'completed'].includes(status);
    const isFutureDate = moment(dueDate, 'YYYY-MM-DD').isAfter(moment());

    if(!isValidDate){
        return res.status(400).json({message: 'Invalid date format. Use YYYY-MM-DD'});
    };

    if(!isValidStatus){
        return res.status(400).json({message: 'Invalid status. Use pending, in-progress, or done'});
    };

    if(!isFutureDate){
        return res.status(400).json({message: 'Due date must be in the future'});
    };

    try {
        const assignedTo = req.user.id;

        const newTask = await taskModel.create({
            title,
            description,
            status: status || 'pending',
            dueDate,
            assignedTo
        });

        const members = await userModel.find({role: "member"});
        const memmbersEmails = members.map(member => member.email);

        await Promise.all(
            memmbersEmails.map(email =>{
                return sendEmailNotification(
                     email,
                     'New Task Created',
                    `A new task has been created with the title: ${title}.`
                );

            })
        )

        return res.status(201).json({message: 'Task created', task:newTask});
    } catch (error) {
        console.error('Error occured while creating a task', error)
        
    }
};


export const getAllTasks = async (req:Request, res:Response):Promise<any> => {
    try {
        const tasks = await taskModel.find();
        return res.status(200).json({message: 'Tasks fetched successfully', tasks});
    } catch (error) {
        console.error('Error occured while fetching tasks', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};



export const updateTaskById = async(req:Request, res:Response):Promise<any>=>{
    const {taskId} = req.params;
    const {title, description, status, dueDate} = req.body;

    if(!mongoose.Types.ObjectId.isValid(taskId)){
        return res.status(400)
        .json({message: "Invalid task ID"});
    };



    try {
        if(!taskId){
            return res.status(400)
            .json({message: "task id is required"});
        };
        

        const task = await taskModel.findById(taskId);
        if(!task){
            return res.status(404)
            .json({message: "Provide a valid task id"});
        };

        if(title) task.title = title;
        if(description) task.description = description;
        if(status) task.status = status;
        if(dueDate) task.dueDate = dueDate;


        const updatedTask = await task.save();

        const members = await userModel.find({role: "member"});
        const emails = members.map(member => member.email);

        await Promise.all(
            emails.map(email =>{
                return sendEmailNotification(
                    email,
                    "Task Updated",
                    `The task has been updated! Please check your learning dashboard.`
                )
            })

        )
        res.status(200)
        .json({message: "Task updated", task: updatedTask});
    } catch (error) {
        console.log("Error occured unable to update task! Please try again later", error);
        res.status(500)
        .json({message: "Server error! Unable to update a task! Please try again later🤣"})
        
    };
};


export const deleteTaskById = async(req:Request, res:Response):Promise<any> =>{
    const {taskId} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(taskId)){
        return res.status(400).json({message: "Invalid task ID"});
    };

    if(!taskId){
        return res.status(400).json({message: "Task ID is required"});
    };

    try {
        const task = await taskModel.findByIdAndDelete(taskId);

        if(!task){
            return res.status(401).json({message: "invalid task ID"});
        };

        return res.status(200).json({message: "Task deleted successful"});
    } catch (error) {
        console.log("Error occured while deleting the task! Please try again");
        res.status(500).json({message: "Internal server error! Please try again"});
        
    }
};
